const employee = process.aioAppModels('employee');
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');



module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if(ad && ad.login === 1){
        return await employee.find.allEmployeeByMerchant(req, res, next);
    }else{
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}