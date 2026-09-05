const dump = {
    map:{
        "ACTION_ONE":true,
        "ACTION_TWO":true,
        "ACTION_THREE":true
    },
    list:{
        "6738829afbe779c7746626ab":{
            id:'6738829afbe779c7746626ab',
            label:"Action one"
        },
        "6738829afbe779c7746626ac":{
            id:'6738829afbe779c7746626ac',
            label:"Action two"
        },
        "6738829afbe779c7746626ad":{
            id:'6738829afbe779c7746626ad',
            label:"Action three"
        }
    }
}



const parse = (list) => {
    let rval = {
        map:{},
        list:{}
    }

    if(list && list.length > 0){
        for(const a in list){
            let item = list[a].collection;
            let name = item.name;
            
                rval.list[item.id] = {
                    id:item.id,
                    label:name
                };

                rval.map[name.toUpperCase()] = true;
        }
    }

    return dump; //rval;
}

const onResponse = (resp, config) => {
    const res = helpers.json.val(resp, 'data.result');
    const cb = helpers.json.val(config, 'callback.onResp');
    if(cb){
        cb(parse(res), config);
    }
}

const init = (arg, onResp) => {
    helpers.request.ui.init({
        cache:{
            name:"",
            ttl:2000,
            enabled:false
        },
        request:{ 
            data:{},
            params:arg,
            headers:{},
            method:'get',
            url:'http://localhost:9900/api/merchant-admin/collections/schema/v1/list/fetch/:_appId_:',
        },
        options:{
            timeout:100000,
            pathMap:"common.auth",
            baseURL:'apiBasePath'
        },
        callback:{
            onResp:onResp,
        },
        onResponse:onResponse
    }, onResp);
}

export default {
    init:init
}