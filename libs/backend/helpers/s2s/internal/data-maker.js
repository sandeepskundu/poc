const name = (resp, req) => {
    let rv = req.helpers.json.val(resp, 'conf.name');

    if(!rv){
        rv = req.helpers.random.id(24)
    }

    return rv;
}

const header = (headers, resp, req) => {
    let rval = headers || {};
    let rheaders = req.helpers.json.val(resp, 'resp.headers', {});

    return req.helpers.json.merge(rval, rheaders);
}

const response = (data, resp, req) => {
    let rval = data || {};
    let n = name(resp, req);
    let rdata = req.helpers.json.val(resp, 'resp.resp.data', {});
    let rdatal = req.helpers.json.length(rdata);

    if(rdatal > 0){
        rval[n] = rdata;
    }

    return rval;
}

const start = async (rval, resp, req) => {
    rval.data = response(rval.data, resp, req);
    rval.header = header(rval.header, resp, req);

    return rval;
}

exports.start = start;