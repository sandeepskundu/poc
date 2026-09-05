const helpers = require('ui-helpers');

const parse = (arg) => {
    return {
        id:helpers.json.val(arg, 'vd.id'),
        label:helpers.json.val(arg, 'appName')
    }
}

const start = (data, resp, configs, error) => {
    let rval = {};
    let list = helpers.json.val(data, 'data.result');

    if(list && list.length > 0){
        for(const a in list){
            rval[a] = parse(list[a])
        }
    }

    return rval;
}

module.exports = {
    start:start
}