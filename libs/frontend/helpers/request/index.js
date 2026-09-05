const ui = require('./ui');
const list = require('./list');
const json = require('./../json');
const axios = require('node-modules/axios/dist/browser/axios.cjs'); 

ui.list = list;

/*--
const https = require('https');
const agent = new https.Agent({
  rejectUnauthorized: process.env.ENV === 'production' && !!process.env.SSLAUTHORIZED,
});

---*/

const authHeader = (rval, conf) => {
    return rval;
}

const header = (conf) => {
    let rval = {
        channelId: 'Web',
    };

    return authHeader(rval, conf);
};

const config = (conf) => {
    return {
        method:'get',
        timeout:200000,
        //httpsAgent:agent,
        responseType:'json',
        headers:header(conf),
    };
  };

const init = (arg, onResp, extra) => {
    let conf = config(arg);
        conf = json.merge(conf, arg);
    if (conf.method === 'post' || conf.method === 'POST') {
        return axios.post(conf.url, conf.data, conf).then((res) => {
            onResp({
                data:res.data,
                status:res.status,
                header:res.headers
            }, extra);
        }).catch((error) => {
            if (onResp) {
                onResp({
                    data:{},
                    status:{},
                    header:{},
                }, extra);
            }
        });
    } else {
      return axios(conf).then((res) => {
            if (onResp) {
                onResp({
                    data:res.data,
                    status:res.status,
                    header:res.headers
                }, extra);
            }
        }).catch((error) => {
            if (onResp) {
                onResp({
                    data:{},
                    status:{},
                    header:{},
                }, extra);
            }
        });
    }
};

module.exports = {
    ui:ui,
    init:init
};