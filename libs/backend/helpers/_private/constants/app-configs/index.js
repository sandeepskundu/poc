module.exports = {
    appInstanceModes:[
        {
            "id":'public',
            "label":"Public"
        }, {
            "id":'partner',
            "label":"Partner"
        }, {
            "id":'internal',
            "label":"Internal"
        }, {
            "id":'scheduler',
            "label":"Scheduler"
        }
    ],
    applicationTypes:[
        {
            "id":'ui',
            "label":"UI"
        }, {
            "id":'api',
            "label":"Api"
        }
    ],
    hooksLables:{
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
    cacheDurType:[
        {
            "id":"s",
            "label":"Second"
        }, {
            "id":"m",
            "label":"Minutes"
        }, {
            "id":"h",
            "label":"Hours"
        }, {
            "id":"d",
            "label":"Day"
        }, {
            "id":"w",
            "label":"Week"
        }
    ]
}