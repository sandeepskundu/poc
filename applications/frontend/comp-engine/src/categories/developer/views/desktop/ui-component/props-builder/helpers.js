import helpers from 'ui-helpers';

const types = {
    any: true,
    jsx: true,
    enum: true,
    object: true,
    string: true,
    number: true,
    nested: true,
    boolean: true,
    function: true,
    compProps: true,
    predefined: true,
}

const dvalueByType = {
    any: '',
    jsx: '',
    enum: '',
    object: {},
    //nested:'',
    string: '',
    number: '',
    //compProps:'',
    //predefined:'',
    boolean: false,
    function: null,
}

const metaByKey = (arg, key, fallback, overrides = {}) => {
    return {
        key: key,
        id: helpers.random.key(),
        value: helpers.json.get(arg, key, fallback),
        ...overrides
    }
}

const dvalByType = (rval, type, key, value, options) => {
    if (type && typeof dvalueByType[type] != 'undefined') {
        rval.push(metaByKey(value, 'dvalue', dvalueByType[type]))
    }

    return rval;
}

const getBaseMetas = (key, value, options) => {
    let type = helpers.json.get(value, 'type', '');
    let rval = [
        metaByKey(value, 'required', false),
        metaByKey(value, 'description', '')
    ]

    rval = dvalByType(rval, type, key, value, options);

    return rval;
}

const metas = (key, value, options) => {
    let rval = getBaseMetas(key, value, options);

    return rval;
}

/**
    * Factory utility creating standard node structural objects for the Schema Builder.
    * Directly exports standard JS functional utilities to maintain maximum reliability.
    * 
    * @param {string} key - Schema attribute key.
    * @param {any} value - Input value to parse/evaluate.
    * @param {Object} options - Builder framework configurations.
    * @param {Object} overrides - Object containing explicit overrides (e.g., from blankHeader).
    * @returns {Object} A fresh builder schema node object.
**/

const node = (key, value, options = {}, overrides = {}) => {
    // Resolve 'Set Null' conditions. If value is null, the field serializes as key: null.
    const isNullState = value === null || overrides.isNull === true;

    return {
        __: {
            key:key,
            type:'string', // Ensure structural mapping mirrors null override
            editing:false,
            expanded:false,
            isNull:isNullState,
            id:helpers.random.key(),
            metas:metas(key, value, options),
            ...overrides // Overrides are spread last so callers can modify defaults securely
        }
    };
};

/**
    * Generates a non-editable, auto-expanded structural header node.
    * 
    * @param {string} key - Node property identifier.
    * @param {any} value - Default fallback evaluation value.
    * @param {string} type - DataType categorization (defaults to 'string').
    * @param {Object} options - Custom compiler options passed to standard node creation.
    * @returns {Object} A fully configured wrapper header node.
**/

const blankHeader = (key, value, type = 'string', options = {}, overrides = {}) => {
    const rval = node(key, value, options);

    // Initialize private metadata branch safely
    rval.__ = rval.__ || {};
    // Group config properties directly and cleanly
    Object.assign(rval.__, {
        type:type,
        hideHeader:true,
        nonEditable:true,
    });

    // Safely clean up unused meta descriptors
    if (rval.__?.metas) {
        delete rval.__.metas;
    }

    Object.assign(rval.__, {...overrides}); // Overrides are spread last so callers can modify defaults securely

    
    return rval;
};

/**
    * Set nested child nodes safely using an immutable pattern to support React reactive states.
    * 
    * @param {Object} rval - The target node object.
    * @param {Array} childs - The list of children to append.
    * @returns {Object} A shallow copy of the updated node.
**/

const setChilds = (rval, childs) => {
    const currentMeta = rval.__ || {};

    return {
        ...rval,
        __: {
            ...currentMeta,
            children: childs,
        },
    };
};

/**
    * Processes nested nodes for the React JSON Schema Builder.
    * Maps dynamic child nodes under the standard evaluation tree.
    * 
    * @param {Object} rval - The accumulator tree node.
    * @param {string} key - Node property identifier.
    * @param {Object} value - The active node representation.
    * @param {Object} options - Decoupled compiler & builder settings.
    * @returns {Object} Updated accumulator layout structure.
 **/

const nested = (rval, key, value, options) => {
    // Extract nested child items safely using utility helper
    let childs = helpers.json.get(value, '___.nested', {});

    // Generate blank header wrappers
    let h = blankHeader('___', false, 'nested', options);
    let ns = blankHeader('nested', false, 'asEditorObject', options);

    // Determine valid child representation
    const hasChilds = helpers.data.type.is(childs, 'object') && helpers.json.length(childs) > 0;
    const childTree = hasChilds ? start(childs, options) : [];

    // Compose the nested layout tree elegantly
    ns = setChilds(ns, childTree);
    h = setChilds(h, [ns]);

    return setChilds(rval, [h]);
};

const compProps = (rval, key, value, options) => {
    let childs = helpers.json.get(value, '___.compProps', {});
    let header = blankHeader('___', false, 'asEditorObject', options, {
        showMetas:true,
        editorDataType:'compProps',
        metas:[
            metaByKey({}, 'asroot', helpers.json.get(value, '___.asroot', false))
        ]
    });

    let cProps = blankHeader('compProps', false, 'asEditorObject', options, {
        showMetas:true,
        key:'compProps',
        editorDataType:'compProps',
        metas:[
            metaByKey(childs, 'from', ''),
            metaByKey(childs, 'mapping', ''),
            metaByKey(childs, 'overwirte', {})
        ]
    });

    header = setChilds(header, [cProps]);

    return setChilds(rval, [header]);
}

const predefined = (rval, key, value, options) => {
    let childs = helpers.json.get(value, '___.predefined', {});
    let header = blankHeader('___', false, 'asEditorObject', options, {});
    let predefinedProps = blankHeader('predefined', false, 'asEditorObject', options, {
        showMetas:true,
        editorDataType:'predefined',
        metas:[
            metaByKey(childs, 'from', ''),
            metaByKey(childs, 'mapping', ''),
            metaByKey(childs, 'overwirte', {})
        ]
    });

    header = setChilds(header, [predefinedProps]);

    return setChilds(rval, [header]);
}

const enums = (rval, key, value, options) => {
    let childs = helpers.json.get(value, '___.enum', {});
    let header = blankHeader('___', false, 'asEditorObject', options, {});
    let enumProps = blankHeader('enum', false, 'asEditorObject', options, {
        showMetas:true,
        editorDataType:'enum',
        metas:[
            metaByKey(childs, 'from', ''),
            metaByKey(childs, 'mapping', ''),
            metaByKey(childs, 'options', '')
        ]
    });

    header = setChilds(header, [enumProps]);
    return setChilds(rval, [header]);
}

const childs = (rval, key, value, options) => {
    let type = helpers.json.get(value, 'type', '');

    switch (type) {
        case 'nested':
            rval = nested(rval, key, value, options);
        break;
        case 'compProps':
            rval = compProps(rval, key, value, options);
        break;
        case 'predefined':
            rval = predefined(rval, key, value, options);
        break;
        case 'enum':
            rval = enums(rval, key, value, options);
        break;
        default:
    }

    return rval;
}

const transform = (rval, key, value, options) => {
    let type = helpers.json.get(value, 'type', '');

    if (value === null || types[type]) {
        let d = node(key, value, options);

        if (type && value) {
            d = helpers.json.merge(d, {
                __: {
                    type: type
                }
            });

            d = childs(d, key, value, options);
        }

        rval.push(d);
    }

    return rval;
}

const start = (arg, options) => {
    if (!arg || typeof arg !== 'object') {
        return [];
    }

    let rval = [];


    for (let a in arg) {
        rval = transform(rval, a, arg[a], options)
    }

    return helpers.array.sortByOrder(rval, helpers.json.get(options, 'sortOrder', []), {
        path: helpers.json.get(options, 'sortPath', '__.type')
    });
}

export default {
    init: start,
    getBaseMetas: getBaseMetas
}