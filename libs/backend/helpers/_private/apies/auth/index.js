const helpers = require('./../helpers');
const map = {
    '/user/v1/cart/create':require('./user_v1_cart_create'),
    '/cart/v1/login/create':require('./cart_v1_login_create'),
    '/login/v1/fpwd/create':require('./login_v1_fpwd_create'),
    '/login/v1/cpwd/create':require('./login_v1_cpwd_create'),
    '/login/v1/logout/fetch':require('./login_v1_logout_fetch'),
    '/login/v1/access/fetch':require('./login_v1_access_fetch'),
    '/login/v1/details/fetch':require('./login_v1_details_fetch'),
    '/login/v1/verify/create':require('./login_v1_verify_create'),
    '/login/v1/session/create':require('./login_v1_session_create'),
    '/account/v1/verify/create':require('./account_v1_verify_create'),
    '/account/v1/details/create':require('./account_v1_details_create'),
    '/account/v1/username/create':require('./account_v1_username_create'),
    '/account/v1/password/create':require('./account_v1_password_create'),
    '/account/v1/dummay/create':require('./account_v1_dummay_create'),
};

exports.get = async (name, req, extend, list) => { return await helpers.build(name, map, req, extend, list) };