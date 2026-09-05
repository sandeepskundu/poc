const req = (id) => {
    return {
        cache:{
            basedOn:{
                url:true,
                data:true,
                method:true,
                params:true
            }
        },
        request:{
            data:{},
            params:{
                id:id
            },
            headers:{},
            method:'get',
            url:'http://localhost:1300/cdn/gUtilsApi/health',
        }
    }
}

const list = (map, lastEnum) => {
    let rv = [];
    let li = map.split('.');
    if(li && li.length > 0){
        for(const a in li){
            let id = li[a];

            if(id != lastEnum){
                rv.push(req(id)); 
            }
        }
    }

    return rv;
}

const getItem = (label, id) => { 
    return {
        "id":id,
        "label":label,
        "hasChilds":false
    }
}

const parseResp = (res, onResp) => {
    let rval = {};

    if(res && res.length > 0){
        for(const a in res){
            let item = res[a];
            let id = helpers.json.val(item, 'config.request.params.id');
            let li = {};

            for(let b = 0 ; b < (parseInt(a)+10); b++){

                if(b === 0 || b === '0'){
                    li[b] = getItem(`${parseInt(a)+1} > ${b}`, id);
                }else{
                    li[b] = getItem(`${parseInt(a)+1} > ${b}`, `${id+a+b}`);
                } 
            }

            rval[id] = li;
        }
    }

    if(onResp){
        onResp(rval);
    }
}

const init = (map, lastEnum, onResp) => {
    let li = list(map, lastEnum);

    if(li && li.length > 0){
        helpers.request.ui.list.get(li, (resp) => {
            parseResp(resp, onResp)
        });
    }
}

export default {
    init:init
}