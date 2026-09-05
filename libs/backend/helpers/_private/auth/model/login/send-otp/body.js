 const typemap = {
    email:{
        'email-with-otp':true,
        'email-with-password':true,
        'username-with-email-otp':true
    },
    mobile:{
        'mobile-with-otp':true,
        'mobile-with-password':true,
        'username-with-mobile-otp':true,
        
    },
    username:{
        'username-with-password':true,
        'username-with-email-otp':true,
        'username-with-mobile-otp':true
    },

    password:{
        'email-with-password':true,
        'mobile-with-password':true
    }
}

const email = async (type, req, res) => {
    return {
        id:req.helpers.json.val(req, 'body.data.identifier')
    }
}

const mobile = async (type, req, res) => {
    return { 
        isd:req.helpers.json.val(req, 'body.data.isd'),
        iso2:req.helpers.json.val(req, 'body.data.iso2'),
        iso3:req.helpers.json.val(req, 'body.data.iso3'),
        number:req.helpers.json.val(req, 'body.data.identifier'),
    }
}

const username = async (type, req, res) => {
    return req.helpers.json.val(req, 'body.data.identifier');
}

const get = async (type, req, res) => {
    let body = req.helpers.json.val(req, 'body.data', {});
        body.org = body.org || {};

    if(typemap && typemap.email && typemap.email[type]){
        body.org.email = await email(type, req, res);
    }

    if(typemap && typemap.mobile && typemap.mobile[type]){
        body.org.mobile = await mobile(type, req, res);
    }

    if(typemap && typemap.username && typemap.username[type]){
        body.org.username = await username(type, req, res);
    };

    req.body.data = body;
}

exports.get = get;