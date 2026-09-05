import helpers from 'ui-helpers';

const dummy = {
    collection:{},

    method:{
        details:{
            name:""
        }
    },
    model:{
        md5Hash:{},
        response:{},
        valuemap:{},
        pagination:{},
        signature:{},
        query:{
            hidden:{},
            runtime:{}
        }
    },

    validation:{
        request:{
            auth:{},
            body:{},
            methods:{},
            headers:{}
        },
        validation:{
            body:{},
            query:{},
            params:{},
            headers:{},
            cookies:{}
        }
    }
}

const actions = (resp) => {
    let rval = {};
    let li = helpers.json.val(resp, 'methods', []);

    if(li && li.length > 0){
        for(const a in li){
            let n = helpers.json.val(li[a], 'name', '');
                if(n){
                    rval[n] = li[a];
                }
        }
    }

    return rval;
}

const saved = (resp) => {
    return {
        actions:actions(resp)
    }
}

const configs = (resp) => {
    return {
        saved:saved(resp),
        appDetails:helpers.json.val(resp, 'appDetails', {}),
        db:{
            columns:{
                '_a':{},
                '_id':{},
                '_dbId':{},
            },
            schema:{
                kundu:{
                    kinala:{
                        hissar:true
                    }
                },
                name:{
                    last:'',
                    middle:{
                        last:true
                    }
                }
            },
        }
    }
}

const dbId = (details, resp) => {
    const app = helpers.json.val(resp, 'appDetails', {});

    return helpers.json.val(details, 'dbId', helpers.json.val(app, 'appConfig.dbConfigs.dbId', ''));
}

const parse = (resp) => {
    let dum = helpers.json.copy(dummy);
    let md = helpers.json.val(resp, 'methodDetails', {});

    return helpers.json.merge(dum, helpers.json.merge(md, {
        dbId:dbId(md, resp),
        method:{
            details:{
                name:helpers.json.val(md, 'name', '')
            }
        },
    }))
}

const start = (resp) => {
    
    return { 
        details:parse(resp),
        configs:configs(resp),
    }
}

export default {
    start:start
}