const map = async (rval, config, req, res) => {
        rval.status = rval.status || {};
        rval.channels = rval.channels || {};
    let opts = req.helpers.json.val(rval, 'otps', {})

    for(const a in opts){
        rval.channels[a] = true;
        rval.status[a] = 'SENT';
    }

    return rval;
}

exports.map = map;