const dv = {
    "appInstanceModes":{
        0:{
            "id":'public',
            "label":"Public"
        },
        1:{
            "id":'partner',
            "label":"Partner"
        },
        2:{
            "id":'internal',
            "label":"Internal"
        },
        3:{
            "id":'scheduler',
            "label":"Scheduler"
        }
    },
    "applicationTypes":{
        "ui":{
            "id":'ui',
            "label":"UI"
        },
        "express":{
            "id":'api',
            "label":"Api"
        }
    },
    "hooksLables":{
        "_____AIO__GLOBAL__HEAD__CSS__HOOK_____": "Global css hook",
        "_____AIO__APP__HEAD__CSS__HOOK_____": "App Css hook",
        "_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": "Global page header hook",
        "_____AIO__GLOBAL__APP__HEADER__HOOK_____": "Global app header hook",
        "_____AIO__GLOBAL__BODY__HOOK_____": "Global body hook",
        "_____AIO__APP__BODY__HOOK_____": "App body hook",
        "_____AIO__GLOBAL__APP__FOOTER__HOOK_____": "Global app footer hook",
        "_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": "Global page footer hook",
        "_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": "Global footer scripr hook",
        "_____AIO__APP__FOOTER__SCRIPT__HOOK_____": "App footer scripr hook"
    },
    "cacheDurType":{
        0:{
            "id":"s",
            "label":"Second"
        },
        1:{
            "id":"m",
            "label":"Minutes"
        },
        2:{
            "id":"h",
            "label":"Hours"
        },
        3:{
            "id":"d",
            "label":"Day"
        },
        4:{
            "id":"w",
            "label":"Week"
        }
    }
}

const get = (props, callback) => {
    if(callback){
        callback(dv);
    }
}

export default {
    get:get
}