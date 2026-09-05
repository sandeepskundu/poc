
const dT = require('./../../data/type');

const on = (name, cb) => {
    if(name && cb && dT.is(name, 'string') && dT.is(cb, 'function')){
        let listener = (e) => cb(e.detail);
        window.addEventListener(name, listener);
        return () => window.removeEventListener(name, listener);
    }
}

const off = (name, cb) => {
    if(name && cb && dT.is(name, 'string') && dT.is(cb, 'function')){
        window.removeEventListener(name, cb);
    }
}

const emit = (name, data) => {
    if(name && dT.is(name, 'string') && dT.is(data, 'defined')){
        window.dispatchEvent(new CustomEvent(name, {
            detail:data 
        }));
    }
}

exports.on = on;
exports.off = off;
exports.emit = emit;