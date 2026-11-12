const auth = process.aioBeLibs('helpers/_private/auth');
const components = process.aioAppMiddlewares('components');
const session = process.aioBeLibs('helpers/_private/session');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);
    debugger;

    console.log(ad);
}