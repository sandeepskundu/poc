const helpers = require('ui-helpers');

const parse = (arg) => {
    return {
        id:helpers.json.val(arg, 'vd.hId'),
        label:helpers.json.val(arg, 'name'),
        code:helpers.json.val(arg, 'details.code'),
        hasChilds:helpers.json.val(arg, 'hasChilds'),
        description:helpers.json.val(arg, 'description')
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