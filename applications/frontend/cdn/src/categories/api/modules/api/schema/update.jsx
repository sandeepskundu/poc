const onResponse = (resp, config) => {
    const valid = helpers.json.val(resp, 'valid')
    const cb = helpers.json.val(config, 'callback.onResp');

    if(cb && valid){
        cb({
            schema:helpers.json.val(resp, 'data.schema', {}),
            collection:helpers.json.val(resp, 'data.collection', {})
        }, config)
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
            data:arg,
            headers:{},
            method:'post',
            url:'http://localhost:9900/api/merchant-admin/collections/schema/v1/details/update',
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