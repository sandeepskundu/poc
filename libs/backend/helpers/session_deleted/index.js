const auth = require('./auth');

const initialize = (req, res, next) => {
    const token = req.helpers.cookie.get(auth.ssoCookie, req, res);
    if(!token){
        let td = auth.baseObj(req, res, next);
            auth.addGuest(td, req, res, next);
    }else{
        auth.validate(req, res, next);
    }
    auth.windowSession(req, res, next);
}


exports.auth = auth;
exports.initialize = initialize;