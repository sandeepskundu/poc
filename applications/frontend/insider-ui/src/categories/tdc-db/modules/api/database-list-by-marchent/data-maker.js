import helpers from 'ui-helpers';

const parse = (resp) => {
    let rv = [];

    for(const a in resp){
        let item = resp[a];
            rv.push({
                id:helpers.json.val(item, 'vd.id'),
                name:helpers.json.val(item, 'name'),
            })
    }

    return rv;
}

const init = (resp) => {
    if(resp && resp.length > 0){
        return {
            blank:false,
            list:parse(resp)
        }
    }else{
        return {
            list:[],
            blank:false
        }
    }
}

export default {
    init:init
}