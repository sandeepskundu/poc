const helpers = require('ui-helpers');

const parse = (resp) => {
    let rv = [];
    for(const a in resp){
        let item = resp[a];
            rv.push({
                id:helpers.json.val(item, 'vd.id'),
                name:helpers.json.val(item, 'collection.name'),
            })
    }

    return rv;
}

const start = (resp) => {
    if(resp){
        return parse(resp)
    }else{
        return {}
    }
}

module.exports = {
    start:start
}