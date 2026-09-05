const ui = require('./ui');

const req = {
    cache:{
        name:"",
        _ttl:2000,
        _enabled:false,
        _basedOn:{
            url:true,
            data:true,
            method:true,
            params:true,
            headers:true,
            others:true
        }
    },
    request:{
        params:{},
        headers:{},
        method:'post',
        data:{
            data:{
                schema:{
                    k:{
                        sk:{
                            s:"kundu"
                        }
                    }
                },
                collection:{
                    name:"Kundu",
                    dbId:"6737058b985ce50cc1f02b41"
                },
                signature: {
                    id: "67496840cc8946516c194c3f",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ5Njg0MGNjODk0NjUxNmMxOTRjM2YiLCJfbWVyY2hhbnRJZCI6IjY3MmNhYzY0NGEwZGRlZDc2NWI1YzNiMiIsImlhdCI6MTczMjg2NDA2NH0.eP3ABl6kb6GxUkHQsC5oUp1DxqScmxpfXx8HJBmL94c"
                }
            }
        },
        url:'http://localhost:1300/cdn/gUtilsApi/health',
    },
    options:{
        timeout:100000,
        pathMap:"common.auth",
        baseURL:'apiBasePath'
    },
    onResponse:(resp, config) => {
        debugger;
    },
}

const get = (list, rescb, c) => {
    if(list && list.length > 0){
        let pl = [];
        for (let a in list) {
            pl.push(
                new Promise((resolve, reject) => {
                    let item = list[a];
                        //item.request.data.data[a] = a+c;
                        const cb = (resp, config) => {
                            resolve({
                                resp:resp,
                                config:config
                            });
                        };

                        item.onResponse = cb;
                        ui.init(item, cb)
                }).then((resp) => {
                    return resp;
                })
            );
        }
    
        Promise.all(pl).then((resp) => {
            rescb(resp);
        });
    }
}

exports.get = get;