class EventBus {
    constructor() {
        this.events = {};
        this.callbackId = 0;
    }

    dispatch(name, ...args) {
        const cbs = this.events[name];

        if (!cbs){
            return console.warn(name + " not found!");
        }else{
            cbs(...args)
        }

        for (let id in cbs) {
            cbs[id](...args);
        }
    }

    create(name, callback, multi) {
        if (!this.events[name]) {
            this.events[name] = {};
        }

        const id = this.callbackId++;
        this.events[name] = callback;

        const remove = () => {
            delete this.events[name];
        };

        return {
            remove:remove 
        }
    }
};

module.exports = EventBus;