const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

const CONSTANTS = {
    key: 'importedRoot',
    name: 'Auto created name from bulk json import',
    summary: "Auto created summary from bulk json import",
    description: 'Auto created description from bulk json import',
    reserveKeys: ['key', 'mapId', 'name', 'summary', 'description', 'value'],
}

const id = (req, val = null) => {
    return String(val ? new req.mdb.db.Types.ObjectId(String(val)) : new req.mdb.db.Types.ObjectId());
};

const toSafeKey = (key) => {
    return String(key).replace(/[^A-Za-z0-9_-]/g, '_');
};

const item = ({ nodeId, mapId = null, key, name, summary = '', description = '', value = null, meta = {}, nodemap = [], details = {} }) => {
    return {_id:nodeId, mapId, key:toSafeKey(key), name, summary, description, value, meta, details, nodemap};
};

const refine = async (req, obj) => {
    let isobj = req.helpers.data.type.is(obj, 'object');

    if (isobj) {
        let rval = req.helpers.json.copy(obj);
        let schema = req.helpers.json.get(req, 'runtime.model.config.schema', {});

        for (let a in schema) {
            delete rval[a];
        }

        return rval;
    }

    return obj;
}

const valueByType = async (req, obj, type, fb) => {
    let isobj = req.helpers.data.type.is(obj, 'object');

    if (isobj) {
        let rk = req.helpers.random.key();
        let val = req.helpers.json.get(obj, type, rk);
        if (val != rk) {
            return val;
        }
    }

    return fb;
}

const shredObject = async (rval, obj, mapId, req, res, nodemap) => {
    const entries = Object.entries(obj || {});

    for (let idx = 0; idx < entries.length; idx++) {
        let nodeId = id(req);
        let nmap = [...nodemap]
        let [key, val] = entries[idx];
        let isobj = req.helpers.data.type.is(val, 'object');

            nmap.push(key)
            rval.push(item({
                key: key,
                nodemap: nmap,
                mapId: mapId,
                nodeId: nodeId,
                meta: await valueByType(req, val, 'meta', {}),
                name: await valueByType(req, val, 'name', key),
                details: await valueByType(req, val, 'details', {}),
                value: await valueByType(req, val, 'value', (isobj ? null : val)),
                summary: await valueByType(req, val, 'summary', CONSTANTS.summary),
                description: await valueByType(req, val, 'description', CONSTANTS.description)
            }));

        if (isobj) {
            rval = await shredObject(rval, await refine(req, val), nodeId, req, res, nmap);
        }
    }

    return rval;
};

const importJson = async (payload, req, res, next) => {
    let docs = [];
    let data = req.helpers.json.get(payload, 'data', {});
    let mapId = req.helpers.json.get(payload, 'mapId', null);
    let datalen = req.helpers.json.length(data);

    if (!mapId && datalen > 1) {
        // Case 1: Multiple top-level keys and no parent mapId -> Auto-create a Root node first

        let key = await valueByType(req, data, 'key', req.helpers.json.get(payload, 'root.key', CONSTANTS.key));
        let nodemap = [key];
            mapId = id(req);
            docs.push(item({
                key: key,
                mapId: null,
                nodeId: mapId,
                nodemap: nodemap,
                name: await valueByType(req, data, 'name', key),
                meta: await valueByType(req, data, 'meta', {}),
                value: await valueByType(req, data, 'value', null),
                details: await valueByType(req, data, 'details', {}),
                summary: await valueByType(req, data, 'summary', CONSTANTS.summary),
                description: await valueByType(req, data, 'description', CONSTANTS.description),
            }));

            docs = await shredObject(docs, await refine(req, data), mapId, req, res, nodemap);

    } else if (!mapId && datalen === 1) {
        // Case 2: Single top-level key and no parent mapId -> Use that key as the Root node

        let [key, val] = Object.entries(data)[0];
        let isobj = req.helpers.data.type.is(val, 'object');
        let nodemap = [key];
            mapId = id(req);
            docs.push(item({
                key: key,
                mapId: null,
                nodeId: mapId,
                nodemap: nodemap,
                name: await valueByType(req, val, 'name', key),
                meta: await valueByType(req, val, 'meta', {}),
                details: await valueByType(req, val, 'details', {}),
                value: await valueByType(req, val, 'value', (isobj ? null : val)),
                summary: await valueByType(req, val, 'summary', CONSTANTS.summary),
                description: await valueByType(req, val, 'description', CONSTANTS.description),
            }));

            if (isobj) {
                docs = await shredObject(docs, await refine(req, val), mapId, req, res, nodemap);
            }
    } else {
        // Case 3: parentMapId was provided -> Shred directly under `rootId` (parentMapId)
        docs = await shredObject(docs, await refine(req, data), mapId, req, res, nodemap);
    }

    return {
        docs: docs,
        rootId: mapId
    };
};

const mapvalidation = async (validation, docs, payload, req, res, next) => {
    let rval = req.helpers.json.copy(validation);
    let vdoby = req.helpers.json.get(validation, 'data.body', []);
    rval.data = {};

    for (let a in docs) {
        let doc = docs[a];
        let vdoc = vdoby[a];
        let map = req.helpers.json.get(doc, 'nodemap', []);
        let nmap = map.join('.');

        if (nmap) {
            rval.data = req.helpers.json.set(rval.data, nmap, vdoc);
        }
    }

    return rval;
}

const validate = async (docs, payload, validation, req, res, next) => {
    let resc = req.helpers.json.copy(req);
    resc.body.data = docs;

    return await mapvalidation(req.helpers.express.validation.api.request.data.validate(validation.validation || {}, resc, res, next), docs, payload, req, res, next);
}

const compile = async (payload, req, res, next, validation) => {
    let rval = {
        valid: true
    }

    const mapId = req.helpers.json.get(payload, 'mapId', null);
    const model = req.helpers.json.get(req, 'runtime.model.instance', false);

    // 1. If attaching under an existing parent `mapId`, verify parent exists & write permission
    if (mapId) {
        rval = await helpers.chain.getParents(req, res, mapId, 'write', { checkPermission: true });
    }

    if (!rval.valid) {
        return rval;
    }

    // 2. Shred the nested JSON into flat linked `TreeNode` documents
    const { rootId, docs } = await importJson(payload, req, res, next);
    const valid = await validate(docs, payload, validation, req, res, next);


    if (!valid.valid) {
        return valid;
    }

    // 3. Persist shredded nodes using your framework's insert action (or model.insertMany)
    if (model) {
        req.body.data = docs;
        req.runtime.model.config.schema._id = true;
        rval = await req.helpers.mongoose.actions.types.insert.start(model, req, res, next);
    }

    if (rval.valid) {
        return {
            docs: docs,
            valid: true,
            rootId: rootId
        }
    } else {
        return rval;
    }
};

const getPayload = async (req, body) => {
    return {
        data:req.helpers.json.get(body, 'data', {}),
        root:req.helpers.json.get(body, 'root', {}),
        mapId:req.helpers.json.get(body, 'mapId', null), // null when importing a new root
    }
}

const init = async (req, res, next) => {
    const body = req.helpers.json.get(req, 'body.data', {});
    const data = req.helpers.json.get(body, 'data', {});
    const isobj = req.helpers.data.type.is(body, 'object');

    if (data && isobj && req.helpers.json.length(data) > 0) {
        return await compile(await getPayload(req, body), req, res, next, await req.helpers.express.docs.json.get('apiMeta', req, res, next));
    } else {
        return req.helpers.express.response.getRespByCode(400, req, res, next, {
            body: {
                data: {
                    valid: false,
                    message: 'Data is invalid',
                    error: true,
                    value: data,
                },
            },
        });
    }
};

exports.init = init;