const onResponse = (resp, config) => {
    const res = helpers.json.val(resp, 'data.result');
    const cb = helpers.json.val(config, 'callback.onResp');
    if(cb){
        cb(res[0], config);
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
            url:'http://localhost:9900/api/merchant-admin/collections/schema/v1/details/fetch/:_id_:/:_dbId_:',
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