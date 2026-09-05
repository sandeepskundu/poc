const dud = {
    "id":'672cac644a0dded765b5c3b2',
    contacts:{
        mobile:{
            isd:"91",
            iso:"IND",
            verifed:1,
            number:"8826410930"
        },
        email:{
            verifed:1,
            id:'sandeepskundu@gmail.com_ abcdefghijklnmopqrstuvwxyz1234567890123456789012345'
        }
    },
    personal:{
        "img":'sandeepskundu@gmail.com_ abcdefghijklnmopqrstuvwxyz1234567890123456789012345',
        "name":{
            "fn":"Sandeep abcdefghijklnmopqrstuvwxyz1234567890123456789012345",
            "mn":"kumar abcdefghijklnmopqrstuvwxyz1234567890123456789012345",
            "ln":"kundu abcdefghijklnmopqrstuvwxyz1234567890123456789012345",
            'initial':'SK abcdefghijklnmopqrstuvwxyz1234567890123456789012345'
        },
        "title":{
            id:"mr",
            label:"Mr."
        },
        dob:28061990
    }
}

/*-- 
{
    "sigId":"NIKG78J0-0M3C-44M8-C522-1714158337170",
    "anonId":"JG955GJL-EPBB-4HEH-PG30-1714158340228",
    "uId":"D4MPK62D-8KEJ-46NI-IDA2-1714052722600",
    "login":1, // 0|1
    "authExpiry":1716750585613,
    "sExpiry":1745694585613,
    "createdAt":1714158322
    "iat":1714158322
}
--*/


const expiry = {
    auth:'30D',
    session:'365D'
}

const scName = () => {
    return ['ws', 'T', 'ok', 'en'].join('')  
}

const cName = () => {
    return ['ss', 'oT', 'ok', 'en'].join('')  
}

const authExpiry = (req, res, next) => {
    return req.helpers.date.timestamp.ahead(expiry.auth)
}

const sessionExpiry = (req, res, next) => {
    return req.helpers.date.timestamp.ahead(expiry.session)
}

const cookieExpiry = (req, res, next) => {
    return req.helpers.date.valueIn(expiry.session, 'MS');
}

const baseObj = (req, res, next, arg) =>  {
    return {
        "sigId":req.helpers.uuid.create(),
        "anonId":req.helpers.uuid.create(),
        "sExpiry":sessionExpiry(req, res, next)
    };
}

const encode = (arg, req, res, next) => {
    let uId = req.helpers.json.val(arg, 'id');
    let rval = {
        "cd":req.helpers.json.val(arg, 'contacts', {}),
        "pd":req.helpers.json.val(arg, 'personal', {})
    }

    if(uId){
        rval.login = 1;
        rval.userId = uId;
        rval.authExpiry = authExpiry(req, res, next);
    }else{
        rval.login = 0;
        delete rval.userId;
        delete rval.authExpiry;
    }

    return rval;
}

const update = (arg, req, res, next, type) => {
    arg.createdAt = Date.now();
    //arg.exp = sessionExpiry(req, res, next);
    arg = req.helpers.jwt.sign(arg);
    arg = req.helpers.crypto.en(arg);

    if(type === 'session'){
        req.helpers.cookie.set(scName(), arg, req, res, {
            type:'session',
            maxAge:cookieExpiry(req, res, next)
        });
    }else{
        req.helpers.cookie.set(cName(), arg, req, res, {
            maxAge:cookieExpiry(req, res, next)
        });
    }
}

const refresh = (arg, req, res, next, reset) => {
    const diff = req.helpers.date.minDiffInDates(new Date(), new Date(arg.authExpiry));

    if(diff < 1 || reset){
        addGuest({
            "sExpiry":sessionExpiry(req, res, next),
            "sigId":req.helpers.json.val(arg, 'sigId', req.helpers.uuid.create()),
            "anonId":req.helpers.json.val(arg, 'anonId', req.helpers.uuid.create()),
        }, req, res, next);
    }else{
        const vIf = req.helpers.date.valueIn('1D', "MIN");
        if(diff < vIf){
            arg.sExpiry = sessionExpiry(req, res, next);
            arg.authExpiry = authExpiry(req, res, next);
            update(arg, req, res, next);
        }
    }
}

const getAuthDetails = (req, res, next) => {
    let td = req.helpers.cookie.get(cName(), req, res);
        td = req.helpers.crypto.de(td);
    return req.helpers.jwt.verify(td);
}

const getSessionDetails = (req, res, next) => {
    let td = req.helpers.cookie.get(scName(), req, res);
        td = req.helpers.crypto.de(td);
    return req.helpers.jwt.verify(td);
}

const extend = (arg, req, res, next) => {
    let ud = encode(arg, req, res, next);
    let td = getAuthDetails(req, res, next);
    update({...(td || {}), ...ud}, req, res, next)
}

const isValid = (req, res, next) => {
    let valid = false;
    let details = getAuthDetails(req, res, next);

    if(details && details.login){
        let diff = req.helpers.date.minDiffInDates(new Date(), new Date(details.authExpiry));
        if(diff < 1){
            refresh(td, req, res, next, true);
        }else{
            let vIf = req.helpers.date.valueIn('1D', "MIN");
                valid = true;
            if(diff < vIf) {
                arg.sExpiry = sessionExpiry(req, res, next);
                arg.authExpiry = authExpiry(req, res, next);
                update(arg, req, res, next);
            }
        }
    }

    return {
        valid:valid,
        data:getAuthDetails(req, res, next)
    };
}

// This method calls in API level check globally and sync auth details 
const validate = (req, res, next) => {
    let td = getAuthDetails(req, res, next);

    if(td && td.login){
        refresh(td, req, res, next);
    }else{
        if(td && td.sExpiry){
            const vIf = req.helpers.date.valueIn('1D', "MIN");
            const diff = req.helpers.date.minDiffInDates(new Date(), new Date(arg.sExpiry));
            if(diff < vIf){
                refresh(td, req, res, next, true);
            }
        }else{
            refresh(td, req, res, next, true);
        }
    }
}

const addGuest = (arg, req, res, next) => {
    const ud = encode(dud, req, res, next);
    update({...arg, ...ud}, req, res, next);
}

const windowSession = (req, res, next) => {
    const ws = req.helpers.cookie.get(scName(), req, res);

    if(!ws){
        update({
            "sigId":req.helpers.uuid.create(),
            "traceId":req.helpers.uuid.create()
        }, req, res, next, 'session');
    }

    return getSessionDetails(req, res, next);;
}

exports.extend = extend;
exports.baseObj = baseObj;
exports.isValid = isValid;
exports.ssoCookie = cName();
exports.addGuest = addGuest;
exports.validate = validate;
exports.windowSession = windowSession;
exports.authDetails = getAuthDetails;
exports.sessionDetails = getSessionDetails
