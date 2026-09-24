
const random = require('./../../random');
const storage = require('./../../storage');

class VersionManager {
    constructor(name, arg) {
        this.key = name;
        this.storage = storage.create(name);
    }

    create = (tree, version, description = '') => {
        return {
            id:random.key(),
            version:version,
            description:description,
            timestamp:new Date().toISOString(),
            tree:JSON.parse(JSON.stringify(tree || []))
        };
    }

    save = (versions) => {
        return this.storage.set(this.key, versions);
    };

    load = () => {
        return this.storage.get(this.key, [])
    }
}

const registry = {};

registry.init = (name, arg) => {
    if(registry[name]) {
        return registry[name];
    }

    registry[name] = new VersionManager(name, arg);

    return registry[name];
};

module.exports = registry;