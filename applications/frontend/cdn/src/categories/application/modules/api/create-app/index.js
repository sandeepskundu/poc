const dv = {
    "applicationTypes":{
        "ui":{
            "id":'ui',
            "label":"UI"
        },
        "express":{
            "id":'express',
            "label":"Express"
        }
    }
}



const init = (details, callback) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                url:'http://localhost:9900/api/merchant-admin/appDetails/details/v1/createUiApp/create',
                params:{},
                headers:{},
                method:'post',
                data:details
            }
        })
        callback(dv);
    }
}

export default {
    init:init
}