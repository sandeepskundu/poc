const eventBus = require('./../event-bus');
const dType = require('./../../data/type');

const onmount = (ref, uE, callback) => {
    if(ref && uE && callback){
        uE(() => {
            if(ref.current){
                return;
            }else{
                ref.current = true;
                if(dType.is(callback, 'function')){
                    callback();
                }
            }
        }, []);
    }else{
        if(callback && dType.is(callback, 'function')){
            callback();
        }
    }
}

exports.event = eventBus;
exports.onmount = onmount;
