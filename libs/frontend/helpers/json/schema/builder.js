const utils = require('./utils');
const json = require('./../index');
const dT = require('./../../data/type');
const random = require('./../../random');
const versioning = require('./versioning');

const dataType = (arg) => {
    let dt = json.get(arg, 'utils.dataType', []);
    return (dt && dt.length > 0) ? dt : json.get(utils, 'dataType', []);
}

const keyRegex = (arg) => {
    let kr = json.get(arg, 'utils.keyRegex');
    return (kr ? kr : json.get(utils, 'keyRegex', ''));
}

const keyReplaceRegex = (arg) => {
    let kr = json.get(arg, 'utils.keyReplaceRegex');
    return (kr ? kr : json.get(utils, 'keyReplaceRegex', ''));
}

const dataTypeFlags = (arg) => {
    let rval = {};
    let flags = json.merge(json.get(utils, 'dataTypeFlags', {}), json.get(arg, 'utils.dataTypeFlags', {}));

    for(let a in flags){
        if(flags[a] && dT.is(flags[a], 'list') && flags[a].length > 0){
            rval[a] = new Set(flags[a])
        }
    }

    return rval;
}

const keysmap = (arg) => {
    return json.merge(json.get(utils, 'keysmap', {}), json.get(arg, 'utils.keysmap', {}));
}

const buildUtils = (arg) => {
    return {
        keysmap:keysmap(arg),
        dataType:dataType(arg),
        keyRegex:keyRegex(arg),
        dataTypeFlags:dataTypeFlags(arg),
        keyReplaceRegex:keyReplaceRegex(arg),
    }
}

const version = (name, arg, id) => {
    return versioning.init(`js_${id}`)
}

const events = (arg, id) => {
    return {
        preview: `${id}Preview`
    }
}

class SchemaManager {
    constructor(name, arg = {}) {
        this.name = name;
        this.utils = buildUtils(arg);
        this.id = arg.id || 'jsonBuilder';
        this.callbacks = arg.callbacks || {};
        this.version = version(name, arg, this.id);
        this.utils.eventNames = events(arg, this.id);
    }

    isDataType = (list, type) => {
        let options = this.utils.dataTypeFlags[type];

        if(options){
            return (Array.isArray(list)?list:[list]).some(type => options.has(type));
        }

        return false;
    }

    sanitize = (node) => {
        if (!node) {
            return node;
        } else {
            const rval = {...node,
                __: {
                    ...node?.__,
                    metas:node?.__?.metas || []
                }
            };

            if (Array.isArray(rval.__.children)) {
                rval.__.children = rval.__.children.map(child => this.sanitize(child));
            };

            return rval;
        }
    }

    createNode = (key, type, overrides = {}, expended = false, editing = false) => {
        const cb = json.get(this, 'callbacks.onNodeCreate');
        const hasChild = (this.isDataType(type, 'object') || this.isDataType(type, 'array'));
        let rval = {
            __:{
                metas:[],
                key:key,
                type:type,
                isNull:false,
                id:random.key(),
                editing:editing,
                expanded:expended,
                ...(hasChild && { children: [] })
            }
        };

        if (overrides) {
            rval = {
                ...rval,
                ...overrides,
                __: {
                    ...rval.__,
                    ...(overrides.__ || {})
                }
            };
        }

        if (cb && dT.is(cb, 'function')) {
            return cb(rval);
        }

        return rval;
    }

    onNodeUpdate = (node, prev) => {
        let rval = {...prev, ...node};
        let cb = json.get(this, 'callbacks.onNodeUpdate');
        if (cb && dT.is(cb, 'function')) {
            return cb(rval, prev);
        }

        return rval;
    }

    updateNode = (nodes = [], targetId, updater) => {
        return nodes.map((node) => {
            const meta = node.__ || {};

            // 1. Found the target node to update
            if (meta.id === targetId) {
                return this.sanitize(updater(node));
            }

            // 2. Recursively search children inside the metadata block
            if (Array.isArray(meta.children)) {
                const updatedChildren = this.updateNode(meta.children, targetId, updater);
                if (updatedChildren !== meta.children) {
                    return {
                        ...node,
                        __: {
                            ...meta, // Safely preserve sibling metadata (id, key, expended, editing, etc.)
                            children: updatedChildren // Consistently write back to the metadata block
                        }
                    };
                }
            }

            // 3. Return original node reference if no changes occurred in this branch
            return node;
        });
    }

    deleteNode = (nodes = [], targetId) => {
        return nodes.filter((node) => node.__?.id !== targetId).map((node) => {
            const meta = node.__ || {};

            if (Array.isArray(meta.children)) {
                const updatedChildren = this.deleteNode(meta.children, targetId);
                if (updatedChildren !== meta.children) {
                    return {
                        ...node,
                        __: {
                            ...meta,
                            children: updatedChildren
                        }
                    };
                }
            }
            return node;
        });
    }

    addChildNode = (nodes = [], parentId, newNode) => {
        return nodes.map((node) => {
            const meta = node.__ || {};

            // Scenario 1: Found the target parent node
            if (meta.id === parentId) {
                // Check 'type' from root level (or fallback safely)
                const isArrayType = node.type === 'array';

                const preparedChild = {
                    ...newNode,
                    __: {
                        ...newNode.__,
                        editing:true,
                        key: isArrayType ? '' : (newNode.__?.key ?? '')
                    }
                };

                return {
                    ...node,
                    __: {
                        ...meta,
                        editing:false,
                        expanded:true,
                        children: [
                            ...(meta.children || []),
                            this.sanitize(preparedChild)
                        ]
                    }
                };
            }

            // Scenario 2: Recursive traversal of sub-trees
            if (Array.isArray(meta.children)) {
                const updatedChildren = this.addChildNode(meta.children, parentId, newNode);

                // Optimization: Compare updatedChildren against meta.children
                if (updatedChildren !== meta.children) {
                    return {
                        ...node,
                        __: {
                            ...meta,
                            children:updatedChildren
                        }
                    };
                }
            }

            return node;
        });
    }

    isDuplicate = (nodes, targetId, name) => {
        name = (name || '').trim();

        if (!name) {
            return false
        }

        let active = nodes || [];
        let index = active.findIndex((node) => node.__.id === targetId);

        if (index !== -1) {
            return active.some((node) => node.__.id !== targetId && (node.__.key || '').trim() === name);
        }

        for (let node of active) {
            if (node.__.children && this.isDuplicate(node.__.children, targetId, name)) {
                return true;
            }
        }

        return false;
    }

    isTreeValid = (nodes, parentType = 'object') => {
        for (let node of (nodes || [])) {
            if (this.isDataType(parentType, 'object')) {
                if((!node.__.key || !node.__.key.trim()) || (this.isDuplicate(nodes, node.__.id, node.__.key))) {
                    return false;
                }
            }

            if ((node.__.metas || []).some((meta) => !meta.key || !meta.key.trim())) {
                return false;
            }

            if ((node.__.children && (this.isDataType(node.__.type, 'array') || this.isDataType(node.__.type, 'object')))) {
                return this.isTreeValid(node.__.children, node.__.type);
            }
        }

        return true;
    }

    expendNodes = (nodes, query, expended = true) => {
        if(!query){
            return nodes;
        }else{
            return (nodes || []).map((node) => {
                if(node.__.children) {
                    return { 
                        ...node,
                        __:{
                            expended:expended,
                            children:this.expandMatching(node.__.children, query, expended) 
                        },
                        
                    };
                }
                return node;
            });
        }
    }

    parseMetaValue = (val) => {
        if (val === null || val === undefined || typeof val === 'object') {
            return val;
        }

        const trimmed = String(val).trim();

        // 2. Boolean evaluation
        const lower = trimmed.toLowerCase();
        if (lower === 'true') return true;
        if (lower === 'false') return false;

        // 3. Strict Numeric Check (retains string format for decimals ending with . or containing 0x hex)
        if (trimmed !== '' && !isNaN(Number(trimmed)) && !trimmed.startsWith('0x')) {
            return Number(trimmed);
        }

        return val;
    };

    serializeNode = (node) => {
        const __ = node?.__ || {};

        if (__.isNull || !__.type) {
            return null;
        }

        const base = {
            type: __.type,
        };

        const metas = __.metas || [];

        for (const meta of metas) {
            const key = meta?.key?.trim();
            if (key && meta.value !== undefined) {
                base[key] = this.parseMetaValue(meta.value);
            }
        }

        if (this.isDataType(__.type, 'object')) {
            Object.assign(base, this.serializeDefinition(__.children || [], 'object'));
        }
        if (this.isDataType(__.type, 'array')) {
            base[json.get(this.utils, 'keysmap.arrayChilds', 'items')] = this.serializeDefinition(__.children || [], 'array');
        }

        return base;
    };

    serializeDefinition = (nodes = [], parentType = 'object') => {
        if (this.isDataType(parentType, 'array')) {
            return nodes.map(node => this.serializeNode(node));
        }

        return nodes.reduce((acc, node) => {
            const key = node?.__?.key?.trim();

            if (key) {
                acc[key] = this.serializeNode(node);
            }

            return acc;
        }, {});
    };
}

const inst = {};

inst.init = (name, arg) => {
    if (inst[name]) {
        return inst[name];
    }

    inst[name] = new SchemaManager(name, arg);

    return inst[name];
};

module.exports = inst;