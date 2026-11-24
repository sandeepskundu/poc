const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

const isMapIdValid = async (model, mapId, deleted, req, res, next) => {
    if (mapId) {
        let qp = { _id: mapId }

        if (typeof deleted != undefined) {
            qp._deleted = deleted;
        }

        return await model.findOne(qp);
    } else {
        return true;
    }
}

const init = async (req, res, next) => {
    let id = req.helpers.json.get(req, 'params.id', '');
    let mapId = req.helpers.json.get(req, 'body.data.mapId', '');
    let mconfig = req.helpers.json.get(req, 'runtime.model.config', {});
    let model = req.helpers.json.get(req, 'runtime.model.instance', false);

    if (id === mapId) {
        return req.helpers.express.response.getRespByCode(400, req, res, next, {
            error: {
                description: "Id and mapId can have same value to move the selected item."
            }
        });
    }

    if (id) {
        let childs = await helpers.chain.getChilds(req, res, id, 0, 'relativeDepth');
            childs = req.helpers.json.get(childs, 'data', []);

        if (childs && childs.length > 0) {
            let mapDoc = await isMapIdValid(model, mapId, 0, req, res, next);

            if (!mapDoc) {
                return req.helpers.express.response.getRespByCode(400, req, res, next, {
                    error: {
                        description: "Invalid Map ID. Please check the ID and try again."
                    },
                });
            };

            let idsMap = new Map();
            let key = req.helpers.json.get(req, 'body.data.key', '');
            let name = req.helpers.json.get(req, 'body.data.name', '');
            let sorted = [...childs].sort((a, b) => (a.relativeDepth ?? -1) - (b.relativeDepth ?? -1));

            for (const node of sorted) {
                idsMap.set(String(node._id), String(new req.mdb.db.Types.ObjectId()));
            }

            const docs = sorted.map((n) => {
                let pId = null;
                let d = JSON.parse(JSON.stringify(n));
                let isroot = String(n._id) === String(id);

                if (isroot) {
                    if (mapId) {
                        pId = mapId;
                    } else {
                        if (n.mapId) {
                            pId = idsMap.get(String(n.mapId))
                        }
                    }
                }else {
                    if (n.mapId) {
                        pId = idsMap.get(String(n.mapId))
                    }
                }

                return {...d, ...{
                    mapId:pId,
                    //meta: n.meta ?? null,
                    //value: n.value ?? null,
                    //details: n.details ?? {},
                    //summary: n.summary || '',
                    //description: n.description || '',
                    _id: idsMap.get(String(n._id)),
                    key: isroot && key ? key : isroot ? `${n.key}-copy` : n.key,
                    name: isroot && name ? name : isroot ? `${n.name} (Copy)` : n.name,
                }};
            });


            let saved = [];
            let rejected = [];
            let idsmap = {};
            let savedId = {};

            for(let a of docs){
                let d = JSON.parse(JSON.stringify(a));
                let id = req.helpers.json.get(d, '_id');
                    d = req.helpers.mongoose.docHelpers.runtime.parse(d, mconfig, req, res, next);
                    d._id = id;
                    idsmap[id] = d;

                try {
                    let doc = await model.insertOne(d);
                        savedId[id] = doc
                        saved.push({
                            doc:doc
                        })
                } catch (err) {
                    rejected.push({
                        doc:d,
                        error:err
                    })
                }
            }

            if(rejected && rejected.length > 0){
                let data = [];
                let slist = [];
                let errors = await mongodb.query.utils.errorMap(rejected, req, mconfig)

                for(const a of docs){
                    let item = {...a}
                    let id = String(item._id);

                    if(errors[id]){
                        item = req.helpers.json.merge(JSON.parse(JSON.stringify(item)), req.helpers.json.get(errors, id, {}));
                    }

                    if(savedId[id]){
                        slist.push(id);
                    }

                    data.push(await req.helpers.mongoose.docHelpers.transform.start(item, {}, mconfig, model, req, res, next));
                }

                await mongodb.query.utils.deleteById(slist, model, true, req, res);
                return req.helpers.express.response.getRespByCode(400, req, res, next, {
                    data:data
                });
            }else{  
                let data = [];

                for(let a of saved){
                    let item = await req.helpers.mongoose.docHelpers.addRuntime(a.doc, mconfig, model, req, res);
                        data.push(item)
                }

                return req.helpers.express.response.getRespByCode(200, req, res, next, {
                    data:data
                });
            }
        } else {
            return req.helpers.express.response.getRespByCode(400, req, res, next, {
                error: {
                    description: "Invalid id. Please check the ID and try again."
                },
            });
        }
    }

    return req.helpers.express.response.getRespByCode(400, req, res, next, {});
}

exports.init = init;