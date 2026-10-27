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

const metaByKey = (arg, key, fallback, overrides = {}) => {
    return helpers.json.merge({
        key: key,
        id: helpers.random.key(),
        value: (arg && typeof arg[key] !== 'undefined' ? arg[key] : fallback)
    }, overrides);
};

const dvalByType = (rval, type, key, value, options) => {
    if (type && typeof DVALUE_BY_TYPE[type] !== 'undefined') {
        rval.push(metaByKey(value, 'dvalue', DVALUE_BY_TYPE[type]));
    }
    return rval;
};

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

const createNode = (key, value, options = {}, overrides = {}) => {
    return {
        __: helpers.json.merge({
            actions: {
                edit: true
            },
            key: key,
            type: 'string',
            editing: false,
            expanded: false,
            id: helpers.random.key(),
            metas: metas(key, value, options),
            isNull: (value === null || overrides.isNull === true)
        }, overrides)
    }
};

const blank = (key, value, type = 'string', options = {}, overrides = {}) => {
    let rval = createNode(key, value, options);
    rval.__ = rval.__ || {};
    rval.__.type = type;
    rval.__.nonEditable = true;
    rval.__ = helpers.json.merge(rval.__, overrides || {});

    if (rval.__.metas) {
        delete rval.__.metas;
    }

    return rval;
};

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

const predefined = (rval, key, value, options) => {
    const childs = helpers.json.get(value, '___.predefined', {});
    const metas = {
        from: metaByKey(childs, 'from', ''),
        mapping: metaByKey(childs, 'mapping', ''),
        overwirte: metaByKey(childs, 'overwirte', {})
    }

    const base = {
        editing: true,
        expanded: true,
        hideHeader: true
    };

    let props = blank('predefined', false, 'asEditorObject', options, { ...base, metaMap: metas });
    props.__.metas = [metas.from, metas.mapping, metas.overwirte];
    rval.__.details = props;

    return setChilds(rval, [setChilds(blank('___', false, 'asEditorObject', options, base), [props])]);
};

const nested = (rval, key, value, options) => {
    const childs = helpers.json.get(value, '___.nested', {});
    const hasChilds = helpers.data.type.is(childs, 'object') && helpers.json.length(childs) > 0;
    const base = {
        editing: true,
        expanded: true,
        hideHeader: true
    };

    let props = blank('nested', false, 'asEditorObject', options, {
        ...base,
        asHeader: true,
        hideHeader: false,
        actions: {
            add: true,
            edit: false,
        }
    });

    return setChilds(rval, [setChilds(blank('___', false, 'asEditorObject', options, base), [setChilds(props, (hasChilds ? start(childs, options) : []))])]);
};


const enums = (rval, key, value, options) => {
    const map = helpers.json.get(value, '___.enum', {});
    const metas = {
        from: metaByKey(map, 'from', ''),
        mapping: metaByKey(map, 'mapping', '')
    }
    const base = {
        editing: true,
        expanded: true,
        hideHeader: true
    };

    let props = blank('enum', false, 'asEditorObject', options, {
        ...base,
        metaMap: metas
    });

    props.__.metas = [metas.from, metas.mapping];
    rval.__.details = props;

    return setChilds(rval, [setChilds(blank('___', false, 'asEditorObject', options, base), [props])]);
};

const childTree = (rval, key, value, options) => {
    const type = value && value.type ? value.type : '';

    switch (type) {
        case 'nested':
            return nested(rval, key, value, options);
        case 'compProps':
        // return processCompPropsType(rval, key, value, options);
        case 'predefined':
            return predefined(rval, key, value, options);
        case 'enum':
            return enums(rval, key, value, options);
        default:
            return rval;
    }
};

const transform = (rval, key, value, options) => {
    const type = value && value.type ? value.type : '';

    if (value === null || TYPES[type]) {
        let node = createNode(key, value, options);

        if (type && value) {
            node.__ = node.__ || {};
            node.__.type = type;
            node = childTree(node, key, value, options);
        }

        rval.push(node);
    }

    return rval;
};

const start = (arg, options) => {
    if (!arg || typeof arg !== 'object') {
        return [];
    }

    const rval = [];

    for (const attributeKey in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, attributeKey)) {
            transform(rval, attributeKey, arg[attributeKey], options);
        }
    }

    return helpers.array.sortByOrder(rval, helpers.json.get(options, 'sortOrder', []), {
        path: helpers.json.get(options, 'sortPath', '__.type')
    });
};

const onCreate = (arg) => {
    if (arg?.__) {
        arg.__.actions = {
            edit: true
        };
        arg.__.metas = getBaseMetas(arg.__.key, arg.__, {});
    };

    return arg;
}

const onUpdate = (arg, prev, options) => {
    let nt = helpers.json.get(arg, '__.type', '');
    let pt = helpers.json.get(prev, '__.type', '');

    if (nt && pt && pt != nt) {
        switch (nt) {
            case 'nested':
                return nested(arg, arg.__.key, arg.__, options);
                break;
            case 'compProps':
                // return processCompPropsType(rval, key, value, options);
                break;
            case 'predefined':
                return predefined(arg, arg.__.key, arg.__, options);
                break;
            case 'enum':
                return enums(arg, arg.__.key, arg.__, options);
                break;
            default:
                arg.__.metas = getBaseMetas(arg.__.key, arg.__, {});
        }
    };

    return arg;
}

export default {
    init: start,
    onCreate: onCreate,
    onUpdate: onUpdate
};