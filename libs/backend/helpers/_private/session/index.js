const sample = {
    data:{
        login:0, // 0|1 >>>
        type:'USER', // USER|GUEST, >>>
        anonId:'id', // >>>
        sigId:'',
        sExpiry:'',
        authExpiry:'',
        userId:'',
        cd:{
            email:{},
            mobile:{},
        },
        pd:{}
    }
}

const GUEST_KEYS = ['login', 'type', 'anonId', 'sigId', 'sExpiry'];
const exposedAuthInfo = ['login', 'type', 'userId', 'cd', 'anonId', 'username', 'uIds'];

const getConfig = (req, map) => {
    const rval = req.helpers.json.val(req, 'appConfig.appConfig.authConfigs', {});

    if(map){
        return req.helpers.json.val(rval, map);
    }else{
        return rval;
    }
}

const id = (req) => {
    return req.helpers.uuid.create();
}

const authExpiry = (req) => {
    return req.helpers.date.timestamp.ahead(getConfig(req, 'expiry.auth'))
}

const cookieExpiry = (req) => {
    return req.helpers.date.timestamp.ahead(getConfig(req, 'expiry.session'));
}

const sessionExpiry = (req) => {
    return req.helpers.date.timestamp.ahead(getConfig(req, 'expiry.session'))
}

const baseObj = (req) =>  {
    return {
        "login":0,
        "type":"GUEST",
        "sigId":id(req),
        "anonId":id(req),
        "created":Date.now(),
        "updated":Date.now(),
        "sExpiry":sessionExpiry(req),
    };
}

const encode = (arg, req) => {
    let rval = req.helpers.jwt.sign(arg, getConfig(req, 'secrets.jwt'));
        rval = req.helpers.crypto.en(rval, getConfig(req, 'secrets.crypto'));

    return rval;
}

const decode = (arg, req) => {
    let rval = req.helpers.crypto.de(arg, getConfig(req, 'secrets.crypto'));
        rval = req.helpers.jwt.verify(rval, getConfig(req, 'secrets.jwt'));

    return rval;
}

const set = (val, req, res) => {
    req.helpers.cookie.set(getConfig(req, 'cookies.authToken'), encode(val, req), req, res, {
        expires:new Date(cookieExpiry(req))
    });
}

const get = (req) => {
    return req.helpers.cookie.get(getConfig(req, 'cookies.authToken'), req);
}

const doLogout = async (arg, req) => {
    let rval = {};
        arg.login = 0;
        arg.type = 'GUEST';
        arg.updated = Date.now();
        arg.sExpiry = sessionExpiry(req);

    for(const a in GUEST_KEYS){
        let n = GUEST_KEYS[a];
            rval[n] = arg[n];
    }

    return rval;
}

const relogin = async (arg, req, res, refresh) => {
    let islogin = req.helpers.json.val(arg, 'login');
    let cate = req.helpers.json.val(req, 'appConfig.appConfig.category')

    if(islogin === 1 && cate === 'api'){
        let aExpiry = req.helpers.json.val(arg, 'authExpiry', Date.now())
        let diff = req.helpers.date.minDiffInDates(new Date(), new Date(aExpiry));
            diff = 7;

        if((diff > 1 && diff < 10) || refresh){
            const au = await process.aioBeLibs('helpers/_private/auth');
            const ud = await au.module.fetch.fetchProfile(arg.userId, req, res);

            if(ud && ud.id){
                arg = await loginData(arg, ud, req);
            }else{
                arg = await doLogout(arg, req, res);
            }
        }else{
            if(diff < 2){
                arg = await doLogout(arg, req, res);
            }
        }
    }

    return arg;
}

const refresh = async (arg, req, res, reset) => {
    if(reset){
        set(baseObj(req), req, res);
    }else{
        set(await relogin(arg, req, res), req, res);
    }
}

const revalidate = async (arg, req, res) => {
    let sExpiry = req.helpers.json.val(arg, 'sExpiry', Date.now());
    let diff = req.helpers.date.minDiffInDates(new Date(), new Date(sExpiry));

    if(diff < 1){
        await refresh(false, req, res, true);
    }else{
        if(diff < (req.helpers.date.valueIn('1D', "MIN"))){
            arg.updated = Date.now();
            arg.sExpiry = sessionExpiry(req);
        };
        await refresh(arg, req, res);
    }
}

const auth = async (req, res) => {
    let token = get(req);

    if(token){
        await revalidate(decode(token, req), req, res);
    }else{
        set(baseObj(req), req, res);
    }
}

const loginData = async (d, data, req) => {
    let email = req.helpers.json.val(data, 'email');
    let mobile = req.helpers.json.val(data, 'mobile');
    let username = req.helpers.json.val(data, 'username');
        d.cd = {};
        d.login = 1;
        d.type = 'USER';
        d.updated = Date.now();
        d.authExpiry = authExpiry(req);
        d.sExpiry = sessionExpiry(req);
        d.userId = req.helpers.json.val(data, 'id');

    if(data.uIds){
        d.uIds = data.uIds;
    }

    if(username){
        d.username = username;
    }

    if(email){
        d.cd.email = email;
    }

    if(mobile){
        d.cd.mobile = mobile;
    }

    return d;
}

const login = async (data, req, res) => {
    let token = get(req);

    if(token){
        let d = decode(token, req);
            d = await loginData(d, data, req);
            set(d, req, res);
    }
}

const logout = async (req, res) => {
    let token = get(req);

    if(token){
        let d = decode(token, req);
            d = await doLogout(d, req, res);
            set(d, req, res);
    }
}

const resync = async (req, res) => {
    let token = get(req);

    if(token){
        let d = decode(token, req);
            d = await relogin(d, req, res, true);
            set(d, req, res);
    }
}

const details = (req) => {
    let token = get(req);

    if(token){
        return decode(token, req);
    }else{
        return null;
    }
}

const authInfo = async (req, res) => {
    let rval = {};
    let ad = await details(req, res);
    let dv = req.helpers.random.id(20);
    
    for(const a in exposedAuthInfo){
        let n = exposedAuthInfo[a];
        let v = req.helpers.json.val(ad, n, dv);

        if(v != dv){
            rval[n] = v;
        }
    }

    return rval;
}

const runtime = async (req, res) => {
    let ad = await authInfo(req, res);
        req.runtime = req.runtime || {};
        req.runtime.auth = {
            islogin:(ad.login===1)
        }
}

const init = async (req, res) => { 
    await auth(req, res);
    await runtime(req, res)
}

exports.init = init;
exports.login = login;
exports.logout = logout;
exports.resync = resync;
exports.details = details;
exports.authInfo = authInfo;