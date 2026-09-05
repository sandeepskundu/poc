const include = ['aioHd', 'helpers', 'appConfig', 'cookies', 'runtime', 'enums', 'getEnum', 'mdb', 'host', 'hostname', 'ip', 'params', 'method'];
const excludeFromCopy = {
    ip:true,
    mdb:true,
    host:true,
    method:true,
    getEnum:true,
    helpers:true,
    hostname:true,
}

const create = (req) => {
    const rval = {};
    const dv = req.helpers.random.id(24);

    for(const a in include){
        const name = include[a];
        const value = req.helpers.json.val(req, name);
       
        if(value){
            if(excludeFromCopy[name]){
                rval[name] = value;
            }else{
                rval[name] = JSON.parse(JSON.stringify(value))
            }
        }
    }

    return rval;
}

exports.create = create;