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
    predefined:true
}

const dvalueByType = {
    any:'',
    jsx:'',
    enum:'',
    object:{},
    string:'',
    number:'',
    boolean:false,
    function:null,
    predefined:{}
}

const blankBase = {
    editing:true,
    expanded:true,
    hideHeader:true,
    excludeActions:{
        add:true,
        edit:true,
        expend:true
    }
}

const metaByKey = (arg, key, fallback, overrides = {}) => {
    return {
        key:key,
        id:helpers.random.key(),
        value:helpers.json.get(arg, key, fallback),
        ...overrides
    }
}

const getBaseMetas = (key, value, options) => {
    let rval = [];
    let type = helpers.json.get(value, 'type', '');

    if(value && typeof value.required != 'undefined'){
        rval.push(metaByKey(value, 'required', false));
    }

    if(value && typeof value.description != 'undefined'){
        rval.push(metaByKey(value, 'description', ''));
    }

    if(value && typeof value.dvalue != 'undefined'){
        rval.push(metaByKey(value, 'dvalue', dvalueByType[type]));
    }

    return rval;
}

const metas = (key, value, options) => {
    return getBaseMetas(key, value, options);
}

const node = (key, value, options = {}, overrides = {}) => {
    const isNullState = value === null || overrides.isNull === true;

    return {
        __: {
            key:key,
            type:'string',
            editing:false,
            expanded:false,
            isNull:isNullState,
            id:helpers.random.key(),
            metas:metas(key, value, options),
            ...overrides
        }
    };
};

const blankHeader = (key, value, type = 'string', options = {}, overrides = {}) => {
    let rval = node(key, value, options);
        rval.__ = rval.__ || {};
    
        Object.assign(rval.__, {type:type, nonEditable:true});

        if (rval.__?.metas) {
            delete rval.__.metas;
        }

        Object.assign(rval.__, {...overrides});

    return rval;
};

const setChilds = (rval, childs) => {
    const currentMeta = rval.__ || {};

    return {...rval, __:{...currentMeta, children:childs} };
};

const nested = (rval, key, value, options) => {
    let base = {...blankBase};
    // Extract nested child items safely using utility helper
    let childs = helpers.json.get(value, '___.nested', {});
    let hasChilds = helpers.data.type.is(childs, 'object') && helpers.json.length(childs) > 0;

    // Generate blank header wrappers
    let h = blankHeader('___', false, 'asEditorObject', options, {
        ...base
    });

    let ns = blankHeader('nested', false, 'asEditorObject', options, {
        ...base
    });

    return setChilds(rval, [setChilds(h, [setChilds(ns, (hasChilds?start(childs, options):[]))])]);
};

const enums = (rval, key, value, options) => {
    let base = {...blankBase};
    let childs = helpers.json.get(value, '___.enum', {});
    let header = blankHeader('___', false, 'asEditorObject', options, {...base});
    let enumProps = blankHeader('enum', false, 'asEditorObject', options, {
        ...base,
        metas:[],
        showMetas:true,
        editorDataType:'enum',
    });

    if(childs && typeof childs.from != 'undefined'){
        enumProps.__.metas.push(metaByKey(childs, 'from', ''));
    }

    if(childs && typeof childs.mapping != 'undefined'){
        enumProps.__.metas.push(metaByKey(childs, 'mapping', ''));
    }

    if(childs && typeof childs.options != 'undefined'){
        enumProps.__.metas.push(metaByKey(childs, 'options', ''));
    }

    header = setChilds(header, [enumProps]);
    return setChilds(rval, [header]);
}

const predefined = (rval, key, value, options) => {
    let base = {...blankBase};
    let childs = helpers.json.get(value, '___.predefined', {});
    let header = blankHeader('___', false, 'asEditorObject', options, base);
    let predefinedProps = blankHeader('predefined', false, 'asEditorObject', options, {
        ...base,
        metas:[],
        showMetas:true,
        editorDataType:'predefined'
    });

    if(childs && typeof childs.from != 'undefined'){
        predefinedProps.__.metas.push(metaByKey(childs, 'from', ''));
    }

    if(childs && typeof childs.mapping != 'undefined'){
        predefinedProps.__.metas.push(metaByKey(childs, 'mapping', ''));
    }

    predefinedProps.__.metas.push(metaByKey(childs, 'overwirte', {}));

    return setChilds(rval, [setChilds(header, [predefinedProps])]);
}

const childs = (rval, key, value, options) => {
    let type = helpers.json.get(value, 'type', '');

    switch (type) {
        case 'nested':
            rval = nested(rval, key, value, options);
        break;
        case 'enum':
            rval = enums(rval, key, value, options);
        break;
        case 'predefined':
            rval = predefined(rval, key, value, options);
        break;
        default:
            //rval = node(key, value, options, {});
    }

    return rval;
}

const transform = (rval, key, value, options) => {
    let type = helpers.json.get(value, 'type', '');

    if (value === null || types[type]) {
        let d = node(key, value, options);

        if (type && value) {
            d = childs(helpers.json.merge(d, {
                __: {
                    type: type
                }
            }), key, value, options);
        }

        rval.push(d);
    }

    return rval;
}

const transformRoot = (rval, value, options) => {
    let type = helpers.json.get(value, 'type', '');
    let h = blankHeader('___blank___', false, 'asEditorObject', options, {
        ...blankBase
    });

    switch (type) {
        case 'nested':
            rval.push(setChilds(h, [nested(h, '', value, options)]));
        break;
        case 'enum':
            rval.push(setChilds(h, [enums(h, '', value, options)]));
        break;
        case 'predefined':
            rval.push(setChilds(h, [predefined(h, '', value, options)]));
        break;
        default:
            h.__.type = type;
            h.__.nonEditable = false;
            h.__.metas = metas('', value, options);
            rval.push(h);
    }

    return rval;
}

const start = (arg, options, map = []) => {
    if (!arg || typeof arg !== 'object') {
        return [];
    }

    let rval = [];

    if(arg.type){
        rval = transformRoot(rval, arg, options)
    }else{
        for (let a in arg) {
            rval = transform(rval, a, arg[a], options)
        }
    }

    console.log(rval);

    return helpers.array.sortByOrder(rval, helpers.json.get(options, 'sortOrder', []), {
        path: helpers.json.get(options, 'sortPath', '__.type')
    });
}

export default {
    init:start
}