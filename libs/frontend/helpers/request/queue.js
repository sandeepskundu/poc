const queue = {};
const initEnum = 'init';
const json = require('./../json');

const sample = {
    queue:[],
    state:'init'
}

const getId = (config) => {
    return json.val(config, 'request.id')
}

const add = (config, onRespCb, resolve) => {
    const id = getId(config);
    const cbs = {
        resolve:resolve,
        onResp:onRespCb || json.val(config, 'onResponse')
    }

    if(id && cbs && cbs.onResp && queue[id] && queue[id].state === initEnum){
        queue[id].queue.push(cbs);
    }
}

const check = (config) => {
    const id = getId(config);

    if(id && queue[id] && queue[id].state === initEnum){
        return false;
    }else{
        queue[id] = {
            queue:[],
            state:initEnum,
        }
    }

    return true;
}

const clean = (config, data) => {
    const id = getId(config);

    if(id){
        const ql = json.val(queue, `${id}.queue`, []);

        if(data && ql && ql.length > 0){
            for(const a in ql){
                const item = ql[a];
                if(item.onResp){
                    item.onResp(data, config, item.resolve);
                }
            }
        }

        delete queue[id];
    }
}

exports.add = add;
exports.check = check;
exports.clean = clean;