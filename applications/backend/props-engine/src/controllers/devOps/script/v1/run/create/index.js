const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');


const payload = async (req, res, next) => {
    let data = req.helpers.json.get(req, 'body.data', {});
    let mode = req.helpers.json.get(data, 'mode', 'queue');
    let stream = req.helpers.json.get(data, 'stream', true);
    let commands = req.helpers.json.get(data, 'commands_', [
            "npm run dev -- --port 6006",
            "npm run watch:css"
        ]);

    let rval = {
        mode:mode,
        stream:Boolean(stream || stream === 'true')
    }

    const list = (() => {
        if(req.helpers.data.type.is(commands, 'list')){
            return commands;
        }

        if(commands && req.helpers.data.type.is(commands, 'string')){
            return [commands]
        }

        return [];
    })();

    rval.tasks = list.map((item) => {
        if(item){
            if(req.helpers.data.type.is(item, 'string')){
                item = item.trim();

                if(item){
                    return {
                        cwd:'',
                        env:'',
                        cmd:item,
                    }
                }
            }

            if(req.helpers.data.type.is(item, 'object') && item.cmd){
                return {
                    cwd:'',
                    env:'',
                    cmd:item.cmd
                }
            }
        }

        return null;
    }).filter(Boolean);

    return rval;

}

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if((ad && ad.login === 1) || (1 === 1)){
        req.helpers.devops.controllers.script.run.init(req, res, next, await payload(req, res, next)); 

        return {
            type:'stream'
        }
    }else{
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}