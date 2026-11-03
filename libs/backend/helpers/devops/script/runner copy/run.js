const utils = require('./utils');
const service = require('./service');
const session = process.aioBeLibs('helpers/_private/session');

const init = async (req, res, next, payload) => {
    const tasks = req.helpers.json.get(payload, 'tasks', [])

    if(!tasks.length) {
        req.helpers.express.response.respByCode(400, req, res, next, req.helpers.express.response.getRespByCode(400, req, res, next, {
            error:{
                rcode:'COMMAND_NOT_DEFINED',
                message:'Please provide at least one command to proceed.'
            }
        }))
    }else{
        let runs = [];
        let ad = await session.details(req);
        let model = await utils.getModel(req, 'run');
        let batchId = new req.mdb.db.Types.ObjectId().toString();
        let ud = {
            uId:ad.anonId,
            aId:ad.anonId
        }

        for (const task of tasks) {
            const doc = await model.create({
                ud:ud,
                cmd:task.cmd,
                cwd:task.cwd,
                env:task.env,
                status:'queued',
                batchId:batchId,
                mode:payload.mode,
            });

            await service.ensureWatcher(req, doc)
            await service.appendLogsToDb(req, String(doc._id), {
                type:'triggered',
                msg:`Run initiated by User ID: ${ud.uId}`
            });
            await service.appendLogsToDb(req, String(doc._id), {
                type:'queued',
                msg:`Waiting in scheduling queue... - "${task.cmd}"`
            });

            runs.push(doc);
        }

        debugger;

        if (payload.stream) {
            await service.attachStream(req, res, runs);
        }

        if (payload.mode === 'parallel') {
            await Promise.all(runs.map((d) => service.launchRun(req, d)));
        } else {
            await service.runQueue(req);
        }

        if (payload.stream){
            return;
        }else{
            req.helpers.express.response.respByCode(200, req, res, next, req.helpers.express.response.getRespByCode(200, req, res, next, {
                data:{
                    batchId,
                    mode:payload.mode,
                    runs:runs.map((r) => {
                        return {
                            pid:r.pid,
                            cmd:r.cmd,
                            cwd:r.cwd,
                            mode:r.mode,
                            runId:r._id,
                            status:r.status
                        }
                    })
                }
            }));
        }
    }
}

exports.init = init;