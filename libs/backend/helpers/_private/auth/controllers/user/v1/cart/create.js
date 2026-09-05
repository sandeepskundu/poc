const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');
const iCounter = process.aioBeLibs('helpers/_private/index-counter')
const adaptiveLogin = process.aioBeLibs('helpers/_private/auth/adaptive-login/user');

module.exports = async (req, res, next) => {
    //const i = await iCounter.getNext(req, 'users');
    return await adaptiveLogin.sendOtp.init({
        datamap:{
            body:'data.cart.contacts'
        },
        configs:{
            "loginBy":"email",
            "hasDataFor":"both"
        }
    }, req, res, next);
}