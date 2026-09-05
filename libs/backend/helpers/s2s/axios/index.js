const axios = process.nodeModules('axios');

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
        _timeout:20000000000000,
        //httpsAgent:agent,
        responseType:'json',
        headers:header(conf),
    };
  };

const init = async (arg, req, res, next) => {
    let conf = config(arg);
        conf = req.helpers.json.merge(conf, arg);
    if (conf.method === 'post' || conf.method === 'POST') {
        let resp = await axios.post(conf.url, conf.data, conf);
            return resp.data || {};
    } else {
        return await axios(conf).then(resp => {
            return resp.data || {};
        }).catch(err => {
            return {}
        });

    }
};

exports.init = init;