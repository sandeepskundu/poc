import helpers from 'ui-helpers';

const TYPES = {
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
    predefined: true
};

const DVALUE_BY_TYPE = {
    any: '',
    jsx: '',
    enum: '',
    object: {},
    string: '',
    number: '',
    boolean: false,
    function: null
};

/**
 * Creates standard metadata properties safely without heavy lookup overhead.
 */
const metaByKey = (arg, key, fallback, overrides = {}) => {
    const value = arg && typeof arg[key] !== 'undefined' ? arg[key] : fallback;
    return {
        key: key,
        id: helpers.random.key(),
        value: value,
        ...overrides
    };
};

/**
 * Appends 'dvalue' metadata matching the data type's signature.
 */
const dvalByType = (rval, type, key, value, options) => {
    if (type && typeof DVALUE_BY_TYPE[type] !== 'undefined') {
        rval.push(metaByKey(value, 'dvalue', DVALUE_BY_TYPE[type]));
    }
    return rval;
};

/**
 * Public utility resolving baseline metadata arrays (Required, Description, Defaults).
 */
const getBaseMetas = (key, value, options) => {
    const type = value && value.type ? value.type : '';
    const rval = [
        metaByKey(value, 'required', false),
        metaByKey(value, 'description', '')
    ];

    return dvalByType(rval, type, key, value, options);
};

const metas = (key, value, options) => {
    return getBaseMetas(key, value, options);
};

/**
 * Baseline factory returning a fully initialized Schema Builder node object.
 */
const createNode = (key, value, options = {}, overrides = {}) => {
    // If 'Set Null' is active, override representation & serialize key: null directly.
    const isNullState = value === null || overrides.isNull === true;

    return {
        __: {
            key: key,
            type: 'string', // Default mirror layout type mapping
            editing: false,
            expanded: false,
            nonEditable:false,
            isNull: isNullState,
            id: helpers.random.key(),
            metas: metas(key, value, options),
            ...overrides
        }
    };
};

/**
 * Helper generating wrapper containers with standardized exclusions and editable properties.
 */
const createBlankHeader = (key, value, type = 'string', options = {}, overrides = {}) => {
    const rval = createNode(key, value, options);

    rval.__ = rval.__ || {};
    rval.__.type = type;
    rval.__.nonEditable = true;

    if (rval.__.metas) {
        delete rval.__.metas;
    }

    if (overrides) {
        Object.assign(rval.__, overrides);
    }

    return rval;
};

/**
 * Immutable children setter matching React reactive rendering environments.
 */
const setChilds = (rval, childs) => {
    const currentMeta = rval.__ || {};
    return {
        ...rval,
        __: {
            ...currentMeta,
            children: childs
        }
    };
};

/**
 * Layout Processors for Complex Schema Structs
 */
const processNestedType = (rval, key, value, options) => {
    const baseLayout = {
        editing: true,
        expanded: true,
        hideHeader: true,
        excludeActions: {
            edit: true,
            expend: true
        }
    };

    const childs = value && value.___ && value.___.nested ? value.___.nested : {};

    let wrapperHeader = createBlankHeader('___', false, 'asEditorObject', options, baseLayout);
    let nestedPropsHeader = createBlankHeader('nested', false, 'asEditorObject', options, baseLayout);

    const hasChilds = helpers.data.type.is(childs, 'object') && helpers.json.length(childs) > 0;
    const childTree = hasChilds ? start(childs, options) : [];

    nestedPropsHeader = setChilds(nestedPropsHeader, childTree);
    wrapperHeader = setChilds(wrapperHeader, [nestedPropsHeader]);

    return setChilds(rval, [wrapperHeader]);
};

const processCompPropsType = (rval, key, value, options) => {
    const baseLayout = {
        editing: true,
        expanded: true,
        showMetas: true,
        hideHeader: true,
        editorDataType: 'compProps',
        excludeActions: {
            add: true,
            edit: true,
            expend: true
        }
    };

    const childs = value && value.___ && value.___.compProps ? value.___.compProps : {};
    const isRootVal = value && value.___ && typeof value.___.asroot !== 'undefined' ? value.___.asroot : false;

    let wrapperHeader = createBlankHeader('___', false, 'asEditorObject', options, {
        ...baseLayout,
        metas: [
            metaByKey({}, 'asroot', isRootVal)
        ]
    });

    const componentPropsHeader = createBlankHeader('compProps', false, 'asEditorObject', options, {
        ...baseLayout,
        key: 'compProps',
        metas: [
            metaByKey(childs, 'from', ''),
            metaByKey(childs, 'mapping', ''),
            metaByKey(childs, 'overwirte', {}) // Keeps consistent spelling schema with existing mappings
        ]
    });

    wrapperHeader = setChilds(wrapperHeader, [componentPropsHeader]);

    return setChilds(rval, [wrapperHeader]);
};

const processPredefinedType = (rval, key, value, options) => {
    const baseLayout = {
        editing: true,
        expanded: true,
        hideHeader: true,
        excludeActions: {
            add: true,
            edit: true,
            expend: true
        }
    };

    const childs = value && value.___ && value.___.predefined ? value.___.predefined : {};

    let wrapperHeader = createBlankHeader('___', false, 'asEditorObject', options, baseLayout);
    const predefinedPropsHeader = createBlankHeader('predefined', false, 'asEditorObject', options, {
        ...baseLayout,
        showMetas: true,
        editorDataType: 'predefined',
        metas: [
            metaByKey(childs, 'from', ''),
            metaByKey(childs, 'mapping', ''),
            metaByKey(childs, 'overwirte', {})
        ]
    });

    wrapperHeader = setChilds(wrapperHeader, [predefinedPropsHeader]);

    return setChilds(rval, [wrapperHeader]);
};

const processEnumType = (rval, key, value, options) => {
    const baseLayout = {
        editing: true,
        expanded: true,
        hideHeader: true,
        excludeActions: {
            edit: true,
            expend: true
        }
    };

    const childs = value && value.___ && value.___.enum ? value.___.enum : {};

    let wrapperHeader = createBlankHeader('___', false, 'asEditorObject', options, baseLayout);
    const enumPropsHeader = createBlankHeader('enum', false, 'asEditorObject', options, {
        ...baseLayout,
        showMetas: true,
        editorDataType: 'enum',
        metas: [
            metaByKey(childs, 'from', ''),
            metaByKey(childs, 'mapping', ''),
            metaByKey(childs, 'options', '')
        ]
    });

    wrapperHeader = setChilds(wrapperHeader, [enumPropsHeader]);
    return setChilds(rval, [wrapperHeader]);
};

/**
 * Route structures dynamically into type-specific processors
 */
const routeChildTree = (rval, key, value, options) => {
    const type = value && value.type ? value.type : '';

    switch (type) {
        case 'nested':
            return processNestedType(rval, key, value, options);
        case 'compProps':
            return processCompPropsType(rval, key, value, options);
        case 'predefined':
            return processPredefinedType(rval, key, value, options);
        case 'enum':
            return processEnumType(rval, key, value, options);
        default:
            return rval;
    }
};

/**
 * Standard leaf transformation logic
 */
const transformNode = (rval, key, value, options) => {
    const type = value && value.type ? value.type : '';

    if (value === null || TYPES[type]) {
        let freshNode = createNode(key, value, options);

        if (type && value) {
            freshNode.__ = freshNode.__ || {};
            freshNode.__.type = type; // Performant native inline assignment over deep-merging

            freshNode = routeChildTree(freshNode, key, value, options);
        }

        rval.push(freshNode);
    }

    return rval;
};

/**
 * Compiles and sorts tree-node structures based on specified schema rules.
 */
const start = (arg, options) => {
    if (!arg || typeof arg !== 'object') {
        return [];
    }

    const rval = [];

    for (const attributeKey in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, attributeKey)) {
            transformNode(rval, attributeKey, arg[attributeKey], options);
        }
    }

    console.log(rval);

    return helpers.array.sortByOrder(rval, helpers.json.get(options, 'sortOrder', []), {
        path: helpers.json.get(options, 'sortPath', '__.type')
    });
};

export default {
    init: start,
    getBaseMetas: getBaseMetas
};
