
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

const version = (name, arg, id) => {
    return versioning.init(`js_${id}`)
}

const events = (arg, id) => {
    return {
        preview:`${id}Preview`
    }
}

class SchemaManager {
    constructor(name, arg) {
        this.name = name;
        this.utils = buildUtils(arg);
        this.id = arg.id || 'jsonBuilder';
        this.version = version(name, arg, this.id);
        this.utils.eventNames = events(arg, this.id);
    }

    sanitize = (node) => {
        if(!node) {
            return node;
        }else{
            let rval = {...node, metas:node.metas || []};
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
            metas: [], // Array of { id, key, value }
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

            if ((node.metas || []).some((meta) => !meta.key || !meta.key.trim())) {
                return false;
            }
            
            if ((node.children && (node.type === 'object' || node.type === 'array')) && (!this.isTreeValid(node.children, node.type))) {
                return false;
            }
        }

        return true;
    }

    matchesQuery = (node, query) => {
        if (!query) {
            return true;
        };

        const q = query.toLowerCase();
        const childs = node.children || [];
        const keyMatch = (node.key || '').toLowerCase().includes(q);
        const typeMatch = (node.type || '').toLowerCase().includes(q);
        const valueMatch = String(node.value || '').toLowerCase().includes(q);
        const metaMatch = (node.metas || []).some((meta) => (meta.key || '').toLowerCase().includes(q) || String(meta.value || '').toLowerCase().includes(q));

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

    parseMetaValue = (val) => {
        let trimmed = String(val).trim();
        
        if(trimmed.toLowerCase() === 'true') {
            return true;
        };

        if(trimmed.toLowerCase() === 'false') {
            return false;
        };

        if(!isNaN(trimmed) && trimmed !== '') {
            return Number(trimmed);
        };

        return val;
    };

    serializeDefinition = (nodes, parentType = 'object') => {
        const activeNodes = nodes || [];

        if(parentType === 'array') {
            return activeNodes.map((child) => {
                if (child.isNull) {
                    return null;
                }
    
                const base = {
                    type:child.type,
                    dvalue:child.dvalue,
                    required:Boolean(child.required),
                };
    
          const metaArray = child.metas || [];
          if (metaArray.length > 0) {
            metaArray.forEach((meta) => {
              if (meta.key && meta.key.trim()) {
                base[meta.key.trim()] = this.parseMetaValue(meta.value);
              }
            });
          }
    
          if (child.type === 'object') {
            const nestedProps = this.serializeDefinition(child.children || [], 'object');
            Object.assign(base, nestedProps);
          } else if (child.type === 'array') {
            base.items = this.serializeDefinition(child.children || [], 'array');
          } else if (child.type === 'function') {
            base.code = child.value;
          } else if (child.type === 'jsx') {
            base.template = child.value;
          } else {
            base.value = child.value;
          }
    
          return base;
        });
      }
    
      const result = {};
      for (const node of activeNodes) {
        const key = (node.key || '').trim() || `unnamed_${node.id.slice(0, 4)}`;
    
        // STRICT NULL OVERRIDE
        if (node.isNull) {
          result[key] = null;
          continue;
        }
    
        const definition = {
          type: node.type,
          required: Boolean(node.required),
          dvalue: node.dvalue,
        };
    
        const metaArray = node.metas || [];
        if (metaArray.length > 0) {
          metaArray.forEach((meta) => {
            if (meta.key && meta.key.trim()) {
              definition[meta.key.trim()] = this.parseMetaValue(meta.value);
            }
          });
        }
    
        if (node.type === 'object') {
          const nestedChildren = this.serializeDefinition(node.children || [], 'object');
          Object.assign(definition, nestedChildren);
        } else if (node.type === 'array') {
          definition.items = this.serializeDefinition(node.children || [], 'array');
        } else if (node.type === 'function') {
          definition.code = node.value;
        } else if (node.type === 'jsx') {
          definition.template = node.value;
        } else {
          definition.value = node.value;
        }
    
        result[key] = definition;
      }
      return result;
    };




















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