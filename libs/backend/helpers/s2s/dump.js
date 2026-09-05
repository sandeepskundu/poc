const requestCounts = {
    get: 0,
    post: 0,
  };
  const https = require('https');
  const axios = require('axios');
  const { url, json, logs } = require('utils');
  
  const agent = new https.Agent({
    rejectUnauthorized: process.env.ENV === 'production' && !!process.env.SSLAUTHORIZED,
  });
  
  const mergeQuery = (rval, req, config) => {
    let merge = json.get(config, 'request.mergeQuery');
  
    if (merge) {
      let rQp = json.get(req, 'query', {});
      let cQp = json.get(rval, 'query', {});
      rQp = json.mergeBoth(cQp, rQp);
  
      rval = rval || {};
      rval.query = rQp || {};
    }
  
    return rval;
  };
  
  const mockApiUrl = (rv, path, config) => {
    return rv;
  };
  
  const makeUrl = (arg, path, config) => {
    let rv = json.get(arg, 'url');
    let qp = url.qSerailize(json.get(arg, 'query', {}));
  
    rv = mockApiUrl(rv, path, config);
  
    if (qp && rv) {
      rv = `${rv}?${qp}`;
    }
  
    return rv;
  };
  
  const headers = (req, config) => {
    let header = json.get(req, 'headers', {
      'Content-Type': 'application/json; charset=UTF-8',
    });
  
    delete header.host;
    delete header.origin;
    delete header.referer;
    delete header['accept-encoding'];
  
    return header;
  };
  
  const method = (req, config, path) => {
    let rv = json.get(config, 'request.method');
  
    if (!rv) {
      rv = json.get(req, 'method');
    }
  
    return rv;
  };
  
  const data = (req, config) => {
    let m = method(req, config);
  
    if (m === 'get' || m === 'GET') {
      return false;
    } else {
      if (config && config.body) {
        return json.get(config, 'body', {});
      } else {
        return json.get(req, 'body', {});
      }
    }
  };
  
  const getConfig = (req, p, config) => {
    let qp = url.getProps(p);
    qp = mergeQuery(qp, req, config);
  
    return {
      timeout: 180000,
      url: makeUrl(qp, p, config),
      httpsAgent: agent,
      data: data(req, config),
      method: method(req, config, p),
      headers: headers(req, config),
    };
  };
  
  const headerInSmall = (arg) => {
    let rv = {};
  
    for (let a in arg) {
      let n = a.toLowerCase();
      rv[n] = arg[a];
    }
  
    return rv;
  };
  
  const printRequestLog = (conf) => {
    console.log('');
    console.log(
      'api request =>',
      JSON.stringify({
        url: json.get(conf, 'url'),
        // data: json.get(conf, 'data', {}),
        method: json.get(conf, 'method'),
        // headers: json.get(conf, 'headers'),
        timeout: json.get(conf, 'timeout'),
      }),
    );
  };
  
  const printRequestCounts = (msg, methodName) => {
    if (methodName) {
      requestCounts[methodName] = requestCounts[methodName] || 0;
      requestCounts[methodName] = requestCounts[methodName] + 1;
      console.log('');
      console.log(`${msg} =>`, requestCounts[methodName]);
    }
  };
  
  const shouldGetFromMockData = (req, u, config, getMockData) => {
    let rv = false;
  
    if (getMockData && req.query && (req.query.mockApi === '1' || req.query.mockApi === 1)) {
      rv = true;
    }
  
    return rv;
  };
  
  const getMockApiData = (req, u, config, getMockData, radisConfig) => {
    return getMockData(req, url, config, radisConfig);
  };
  
  const init = async (req, u, config, getMockData, radisConfig) => {
    const conf = getConfig(req, u, config);
    let headers = headerInSmall(conf.headers);
    let getFromMock = shouldGetFromMockData(req, u, config, getMockData);
  
    try {
      if (conf.method === 'post' || conf.method === 'POST') {
        let ref = json.get(headers, 'referer');
        conf.headers = {
          Accept: json.get(headers, 'accept', 'application/json, text/plain, */*'),
          'Accept-Language': json.get(headers, 'accept-language', 'en-GB,en-US;q=0.9,en;q=0.8'),
          'Access-Control-Allow-Headers': json.get(
            headers,
            'access-control-allow-headers',
            'Origin, X-Requested-With, Content-Type, Accept',
          ),
          'Access-Control-Allow-Origin': json.get(headers, 'access-control-allow-origin', '*'),
          'Cache-Control': json.get(headers, 'cache-control', 'no-cache'),
          Connection: json.get(headers, 'connection', 'keep-alive'),
          'Content-Type': json.get(headers, 'content-type', 'application/json; charset=UTF-8'),
          //'Pragma':json.get(headers, 'pragma', 'no-cache'),
          //'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31', //json.get(headers, 'user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'),
          'User-Agent': json.get(
            headers,
            'user-agent',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31',
          ),
          agentid: json.get(headers, 'agentid'),
          channelid: json.get(headers, 'channelid', 'Web'),
          traceid: json.get(headers, 'traceid'),
          traceparent: '00-20dcc85ce5574acca0dbe8350df05204-eb0d68b688f24abb-01', //json.get(headers, 'traceparent'),
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
        };
  
        if (headers['ocp-apim-subscription-key']) {
          conf.headers['Ocp-Apim-Subscription-Key'] = headers['ocp-apim-subscription-key'];
        }
  
        if (ref) {
          conf.headers['referer'] = ref;
        }
  
        printRequestLog(conf);
        printRequestCounts('CT search API counts', 'post');
  
        if (getFromMock) {
          return await getMockApiData(req, u, config, getMockData, radisConfig);
        } else {
          return await axios
            .post(conf.url, conf.data, conf)
            .then((resp) => {
              console.log('');
              printRequestLog(conf);
              console.log('');
              try {
                let d = json.get(resp, 'data');
                // console.log('api respone sucess', {
                //   //data:d,
                //   status: {
                //     code: json.get(resp, 'status'),
                //   },
                // });
  
                try {
                  JSON.stringify(d);
                  return resp;
                } catch (error) {
                  return {
                    data: {},
                    status: json.get(resp, 'status'),
                  };
                }
              } catch (error) {
                console.log('api error in response', error);
                console.log('');
                console.log('api error in response status', json.get(resp, 'status'));
                return {
                  data: {},
                  status: json.get(resp, 'status'),
                };
              }
            })
            .catch((e) => {
              console.log('api response failed => ', e.message);
              return {
                data: {},
                status: json.get(e.response, 'status'),
              };
            });
        }
      } else {
        if (!getFromMock) {
          return await axios(conf)
            .then((resp) => {
              console.log('');
              printRequestLog(conf);
              console.log('');
              // console.log(resp);
              try {
                let d = json.get(resp, 'data');
                // console.log('api respone sucess', {
                //   //data:d,
                //   status: {
                //     code: json.get(resp, 'status'),
                //   },
                // });
  
                try {
                  JSON.stringify(d);
                  return resp;
                } catch (error) {
                  return {
                    data: {},
                    status: json.get(resp, 'status'),
                  };
                }
              } catch (error) {
                console.log('api error in response', error);
                console.log('api error in response status', json.get(resp, 'status'));
                return {
                  data: {},
                  status: json.get(resp, 'status'),
                };
              }
            })
            .catch((e) => {
              console.log('api response failed => ', e.message);
              return {
                data: {},
                status: json.get(e.response, 'status'),
              };
            });
        }
      }
    } catch (error) {
      return {
        data: {},
        status: 404,
      };
    }
  };
  
  exports.init = init;
  exports.getConfig = getConfig;
  