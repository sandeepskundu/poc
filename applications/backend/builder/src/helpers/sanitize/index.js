const stringSanitizer = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, '');
  };

const sanitize = (arg) => {
    let rval = {};

    if(arg){
        for(let a in arg){
            if(arg[a] || !a){
                rval[a] = arg[a];
            }
        }
    }

    return rval;
} 

const body = (arg) => {
    let rval = {};
    if(arg){
        for(let a in arg){
            if(arg[a] && a){
                let name = stringSanitizer(a);
                try {
                   rval[name] = arg[a];
                } catch(e) {
                    rval[a] = arg[a];
                    
                }
            }else{
                rval[a] = arg[a];
            }
        }
    }

    return rval;
}

const init = (req, res, next) => {
    req.body = body(req.body);
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);
    return req;
}


exports.init = init;
exports.body = body;
exports.stringSanitizer = stringSanitizer;