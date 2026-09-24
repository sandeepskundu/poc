
const utils = require('./utils');
const json = require('./../index');
const dT = require('./../../data/type');
const random = require('./../../random');
const versioning = require('./versioning');

const dataType = (arg) => {
    let dt = json.get(arg, 'utils.dataType', []);
    return (dt && dt.length > 0)?dt:json.get(utils, 'dataType', []);
}

const dvalueByType = (arg) => {
    let dvByType = json.get(arg, 'utils.dvalueByType');
    return (dvByType && dT.is(dvByType, 'function'))?dvByType:json.get(utils, 'dvalueByType')
}

const keyRegex = (arg) => {
    let kr = json.get(arg, 'utils.keyRegex');
    return (kr?kr:json.get(utils, 'keyRegex', ''));
}

const iconByType = (arg) => {
    let ibt = json.get(arg, 'utils.iconByType');
    return (ibt?ibt:json.get(utils, 'iconByType', ''));
}

const buildUtils = (arg) => {
    return {
        dataType:dataType(arg),
        keyRegex:keyRegex(arg),
        iconByType:iconByType(arg),
        dvalueByType:dvalueByType(arg)
    }
}

const version = (name, arg) => {
    return versioning.init(`${name}_${json.get(arg, 'utils.storageKey', json.get(utils, 'storageKey', 'SCHEMA_BUILDER'))}`)
}

class SchemaManager {
    constructor(name, arg) {
        this.name = name;
        this.utils = buildUtils(arg);
        this.version = version(name, arg);
    }

    sanitize = (node) => {
        if(!node) {
            return node;
        }else{
            let rval = {...node, customMeta:node.customMeta || []};
            if (rval.children) {
                rval.children = rval.children.map(child => this.sanitize(child));
            }
            return rval;
        }
    };

    createNode = (key = '', type = 'string', overrides = {}) => {
        let dval = this.utils.dvalueByType(type)
        return {
            key:key,
            type:type,
            dvalue:dval,
            isNull:false,
            required:false,
            customMeta: [], // Array of { id, key, value }
            id:random.key(),
            isExpanded:false,
            showMetaSettings:false,
            children:type === 'object' || type === 'array' ? [] : undefined,
            ...overrides,
        };
    }

    updateNode = (nodes, targetId, updater) => {
        return (nodes || []).map((node) => {
            if (node.id === targetId){
                return this.sanitize(updater(node));
            };

            if (node.children) {
                return {...node, children:this.updateNode(node.children, targetId, updater) };
            };

            return node;
        });
    }

    deleteNode = (nodes, targetId) => {
        return (nodes || []).filter((node) => node.id !== targetId).map((node) => ({...node, children:node.children?this.deleteNode(node.children, targetId):undefined}));
    }

    addChildNode = (nodes, parentId, newNode) => {
        return (nodes || []).map((node) => {
            if (node.id === parentId){
                return {...node, isExpanded:true, children:[...(node.children || []), this.sanitize({...newNode, key:(node.type === 'array')?'':newNode.key})]};
            }

            if (node.children) {
                return {...node, children:this.addChildNode(node.children, parentId, newNode)};
            }

            return node;
        })
    }

    isDuplicate = (nodes, targetId, name) => {
        name = (name || '').trim();

        if(!name){
            return false
        }

        let active = nodes || [];
        let index = active.findIndex((node) => node.id === targetId);

        if (index !== -1) {
            return active.some((node) => node.id !== targetId && (node.key || '').trim() === name);
        }

        for(let node of active) {
            if (node.children && this.isDuplicate(node.children, targetId, name)) {
                return true;
            }
        }

        return false;
    }

    isTreeValid = (nodes, parentType = 'object') => {
        for (let node of (nodes || [])) {
            if(parentType !== 'array') {
                if ((!node.key || !node.key.trim()) || (this.isDuplicate(nodes, node.id, node.key))){
                    return false;
                }
            }

            if ((node.customMeta || []).some((meta) => !meta.key || !meta.key.trim())) {
                return false;
            }
            
            if ((node.children && (node.type === 'object' || node.type === 'array')) && (!this.isTreeValid(node.children, node.type))) {
                return false;
            }
        }

        return true;
    }

    extractNode = (nodes, targetId) => {
        let draggedNode = null;
        let filterTree = (list) => {
            return (list || []).filter((node) => {
                if(node.id === targetId) {
                    draggedNode = this.sanitize(node);
                    return false;
                }
                return true;
            }).map((node) => {
                if (node.children) {
                    return { ...node, children:filterTree(node.children) };
                }
                return node;
            });
        };
        return {draggedNode, cleanedTree:filterTree(nodes)};
    }

    insertAtActiveLevel = (nodes, targetParentId, draggedNode, targetIndex) => {
        if(targetParentId === 'root') {
            return [...(nodes || [])].splice(targetIndex, 0, this.sanitize(draggedNode));
        }

        return (nodes || []).map((node) => {
            if(node.id === targetParentId) {
                return {...node, children:[...(node.children || [])].splice(targetIndex, 0, this.sanitize(draggedNode))};
            };

            if (node.children) {
                return {...node, children:insertAtActiveLevel(node.children, targetParentId, draggedNode, targetIndex)};
            }

            return node;
        });
    }

    sanitizeForParent = (node, destinationType) => {
        if(!node){
            return node
        }

        let rval = this.sanitize(node);

        if(destinationType === 'array') {
            return {...rval, key:''};
        };

        if(destinationType === 'object' && (!clean.key || !clean.key.trim())) {
            return {...rval, key:`prop_${Math.random().toString(36).substring(2, 6)}`};
        };

        return rval;
    };

    reparentNode = (nodes, draggedId, targetParentId) => {
        const {cleanedTree, draggedNode} = this.extractNode(nodes, draggedId);

        if (!draggedNode){
            return nodes;
        }
    
        if (targetParentId === 'root') {
            return [...cleanedTree, this.sanitizeForParent(draggedNode, 'object')];
        }
    
        let insertRecursive = (treeList) => {
            return (treeList || []).map((node) => {
                if (node.id === targetParentId) {
                    return {...node, isExpanded: true, children: [...(node.children || []), this.sanitizeForParent(draggedNode, node.type)]};
                }
                if (node.children) {
                    return { ...node, children:insertRecursive(node.children) };
                }
                return node;
            });
        };
    
        return insertRecursive(cleanedTree);
    };

    matchesQuery = (node, query) => {
        if (!query) {
            return true;
        };

        const q = query.toLowerCase();
        const childs = node.children || [];
        const keyMatch = (node.key || '').toLowerCase().includes(q);
        const typeMatch = (node.type || '').toLowerCase().includes(q);
        const valueMatch = String(node.value || '').toLowerCase().includes(q);
        const metaMatch = (node.customMeta || []).some((meta) => (meta.key || '').toLowerCase().includes(q) || String(meta.value || '').toLowerCase().includes(q));

        if (keyMatch || typeMatch || valueMatch || metaMatch){
            return true
        }
        
        if (childs.length > 0) {
            return childs.some((child) => this.matchesQuery(child, query));
        }

        return false;
    };

    expandMatching = (nodes, query) => {
        if(!query){
            return nodes;
        };

        return (nodes || []).map((node) => {
            if(node.children) {
                return {...node, isExpanded:this.matchesQuery(node, query)?true:node.isExpanded, children:this.expandMatching(node.children, query)};
            };

            return node;
        })
    }
}

const registry = {};

registry.init = (name, arg) => {
    if(registry[name]) {
        return registry[name];
    }

    registry[name] = new SchemaManager(name, arg);

    return registry[name];
};

module.exports = registry;