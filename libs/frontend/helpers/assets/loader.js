const random = require('./../random');

class AssetTypeManager {
    constructor(type, commonConfig = {}) {
        this.type = type;
        this.cache = new Map();
        this.commonTarget = commonConfig.target || (['image', 'video', 'audio'].includes(type) ? 'body' : 'head');
        this.commonAttributes = commonConfig.attributes || {};
    }

    _findExistingElement(id, url){
        if(id && document.getElementById(id)) {
            return document.getElementById(id);
        }

        const map = {
            css:`link[href="${url}"]`,
            font:`link[href="${url}"]`,
            js:`script[src="${url}"]`,
            image:`img[src="${url}"]`,
            video:`video[src="${url}"]`,
            audio:`audio[src="${url}"]`
        };

        return document.querySelector(map[this.type] || `[src="${url}"]`);
    }

    _createElement(url, attrs) {
        attrs = attrs || {};

        let elmmap = {
            js:{
                elm:'script',
                attrs:{
                    src:url,
                    type:'text/javascript'
                }
            },
            css:{
                elm:'link',
                attrs:{
                    href:url,
                    rel:'stylesheet'
                }
            },
            font:{
                elm:'link',
                attrs:{
                    as:'font',
                    href:url,
                    rel:'preload'
                }
            },
            image:{
                elm:'img',
                attrs:{
                    src:url
                }
            },
            video:{
                elm:'video',
                attrs:{
                    src:url
                }
            },
            audio:{
                elm:'audio',
                attrs:{
                    src:url
                }
            }
        }

        let elm = (() => {
            if(this.type && elmmap[this.type] && elmmap[this.type].elm){
                let rv = document.createElement(elmmap[this.type].elm)

                if(this.type === 'font' && !attrs.crossOrigin){
                    rv.crossOrigin = 'anonymous';
                }

                attrs = {...elmmap[this.type].attrs || {}, ...attrs}

                return rv;
            }
        })();

        Object.entries(attrs).forEach(([key, value]) => {
            elm.setAttribute(key, value);
        });

        return elm;
    }

    load(url, options = {}) {
        const target = options.target || this.commonTarget;
        const {id = random.key(), attributes = {}, onLoad, onError} = options;

        if (!id || typeof id !== 'string') {
            throw new Error(`[${this.type} Manager] Asset "id" must be a non-empty string.`);
        }
        if (!url || typeof url !== 'string') {
            throw new Error(`[${this.type} Manager] Asset "url" must be a non-empty string.`);
        }

        // 1. Return from in-memory cache if already loaded/loading
        if (this.cache.has(id)) {
            return this.cache.get(id).then(
                (elem) => {
                    if(typeof onLoad === 'function'){
                        onLoad(elem);
                    }
                },
                (err) => {
                    if(typeof onError === 'function'){
                        onError(err);
                    }
                    throw err;
                }
            );
        }

        // 2. Check if already present in DOM (e.g. from SSR)
        const eElm = this._findExistingElement(id, url);

        if (eElm) {
            this.cache.set(id, Promise.resolve(eElm));
            if(typeof onLoad === 'function'){
                onLoad(eElm);
            }
        }

        // 3. Build element and initiate load
        const attrs = {...this.commonAttributes, ...{...attributes, ...{id:id}}}
        const element = this._createElement(url, attrs);
        const loadPromise = new Promise((resolve, reject) => {
            const handleSuccess = () => {
                if (typeof onLoad === 'function'){
                    onLoad(element);
                }
                resolve(element);
            };

            const handleError = (e) => {
                this.cache.delete(id); // Allow retry on failure
                element.remove();
                const err = new Error(`Failed to load ${this.type} asset from: ${url}`);
                if(typeof onError === 'function'){
                    onError(err, e);
                }
                reject(err);
            };

            // Media elements (video/audio) use media buffer events
            if (this.type === 'video' || this.type === 'audio') {
                element.onloadeddata = handleSuccess;
                element.onerror = handleError;
            } else {
                element.onload = handleSuccess;
                element.onerror = handleError;
            }

            // Inject to DOM
            const container = target === 'body' ? document.body : document.head;

            if (container) {
                container.appendChild(element);
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    (target === 'body' ? document.body : document.head).appendChild(element);
                });
            }
        });

        this.cache.set(id, loadPromise);
    }
}


const registry = {
    js:new AssetTypeManager('js', { target:'body', attributes:{async: 'true'}}),
    css:new AssetTypeManager('css', {target:'head' })
};

registry.create = (name, type, commonConfig = {}) => {
    if (!name || typeof name !== 'string') {
        throw new Error('Asset manager name must be a non-empty string.');
    }

    const validTypes = ['js', 'css', 'font', 'image', 'video', 'audio'];

    if (!validTypes.includes(type)) {
        throw new Error(`Invalid asset type "${type}". Allowed values: ${validTypes.join(', ')}`);
    }

    if (name === 'create') {
        throw new Error('Cannot create an instance named "create" as it is reserved.');
    }

    // Return existing instance if already created
    if (registry[name]) {
        return registry[name];
    }

    // Create and register new instance
    registry[name] = new AssetTypeManager(type, commonConfig);

    return registry[name];
};

module.exports = registry;
