import helpers from 'ui-helpers';

const parse = (resp) => {
    let rv = [];

    for(const a in resp){
        let item = resp[a];
            rv.push({
                id:helpers.json.val(item, 'vd.id'),
                name:helpers.json.val(item, 'name'),
                code:helpers.json.val(item, 'code'),
                hId:helpers.json.val(item, 'hashId'),
                signature:helpers.json.val(item, 'signature'),
                description:helpers.json.val(item, 'description'),
            })
    };

    return rv;
}

const init = (resp) => {
    const rval = {
        id:helpers.json.val(resp, 'vd.id'),
        code:helpers.json.val(resp, 'code'),
        name:helpers.json.val(resp, 'name'),
        hId:helpers.json.val(resp, 'vd.hId'),
        parentId:helpers.json.val(resp, 'parentId'),
        signature:helpers.json.val(resp, 'signature'),
        description:helpers.json.val(resp, 'description'),
        colors:helpers.json.val(resp, 'details.colors', {})
    }

    return {
        theme:{
            modified:rval,
            original:rval
        }
    }
}

export default {
    init:init
}