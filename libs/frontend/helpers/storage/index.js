class StorageManager {
    constructor(storageType = 'localStorage', prefix = '') {
        this.storageType = storageType;
        this.prefix = prefix?`${prefix}_`:'';
    }

    get _storage() {
        if(typeof window === 'undefined'){
            return null;
        }
        try {
            return window[this.storageType];
        } catch {
            console.warn(`[Storage] ${this.storageType} is unavailable or blocked.`);
            return null;
        }
    }
  
    _getKey(key) {
        return this.prefix ? `${this.prefix}${key}` : key;
    }

    set(key, value, ttlInSeconds = null) {
        const storage = this._storage;

        if(!storage){
            return false;
        }

        try {
            storage.setItem(this._getKey(key), JSON.stringify({
                data:value,
                expiry:ttlInSeconds ? Date.now() + ttlInSeconds * 1000 : null,
            }));
            return true;
        } catch (error) {
            if (error.name === 'QuotaExceededError' || error.code === 22) {
                console.error(`[Storage Error] Quota exceeded on ${this.storageType}.`);
            } else {
                console.error(`[Storage Error] Failed to set "${key}":`, error);
            }
            return false;
        }
    }

  
    get(key, defaultValue = null) {
        const storage = this._storage;
        if (!storage){
            return defaultValue;
        }

        const fullKey = this._getKey(key);
        const item = storage.getItem(fullKey);

        if(item === null){
            return defaultValue;
        }

        try {
            const parsed = JSON.parse(item);

            if (parsed && typeof parsed === 'object' && 'data' in parsed && 'expiry' in parsed) {
                if (parsed.expiry && Date.now() > parsed.expiry) {
                    this.remove(key);
                    return defaultValue;
                }

                return parsed.data;
            }

            return parsed;
        } catch {
            return item;
        }
    }

  
    update(key, updates, ttlInSeconds = null) {
        const currentData = this.get(key, {});

        let updatedData;

        if (typeof updates === 'function') {
            updatedData = updates(currentData);
        } else if (typeof currentData === 'object' && currentData !== null && !Array.isArray(currentData)){
            updatedData = { ...currentData, ...updates };
        } else {
            updatedData = updates;
        }

        return this.set(key, updatedData, ttlInSeconds);
    }

    remove(key) {
        const s = this._storage;

        if (s){ 
            s.removeItem(this._getKey(key));
        };
    }

  
    clear() {
        let s = this._storage;

        if (!s) {
            return;
        }else{
            if (!this.prefix) {
                ck.clear();
            }else{
                let li = [];

                for (let i = 0; i < s.length; i++) {
                    let ck = s.key(i);

                        if (ck && ck.startsWith(this.prefix)) {
                            li.push(ck);
                        }
                }

                li.forEach((k) => s.removeItem(k));
            }
        }
    }

    has(key) {
        return this.get(key, null) !== null;
    }
}

const registry = {
    local:new StorageManager('localStorage'),
    session:new StorageManager('sessionStorage')
};

registry.create = (name, prefix = '', type = 'localStorage') => {
    if (!name || typeof name !== 'string') {
        throw new Error('Storage instance name must be a non-empty string.');
    }

    const types = ['localStorage', 'sessionStorage'];
    
    if (!types.includes(type)) {
        throw new Error(`Invalid storage type "${type}". Allowed values: ${types.join(', ')}`);
    }

    if (name === 'create') {
        throw new Error('Cannot create an instance named "create" as it is reserved.');
    }

    if (registry[name]) {
        return registry[name];
    }

    registry[name] = new StorageManager(type, prefix);

    return registry[name];
};

module.exports = registry;