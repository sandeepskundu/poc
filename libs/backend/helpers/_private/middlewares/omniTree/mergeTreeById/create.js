const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const mw = process.aioBeLibs('helpers/_private/middlewares/omniTree');
const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

// Build relative path maps (excluding the root node's own key so dev -> prod merges cleanly)
const buildPathMap = (list, rootId) => {
    const byId = new Map(list.map((n) => [String(n._id), n]));
    const byRelPath = new Map();

    for (const node of list) {
        if (String(node._id) === String(rootId)) {
            continue;
        }
        const parts = [node.key];
        let cursor = node;
        while (cursor.mapId && String(cursor.mapId) !== String(rootId)) {
            const parent = byId.get(String(cursor.mapId));
            if (!parent) break;
            parts.unshift(parent.key);
            cursor = parent;
        }
        byRelPath.set(parts.join('.'), node);
    }
    return byRelPath;
}

// Sort paths shallow-to-deep so parent folders are created before their children
const sortPaths = async (list, req, res, next) => {
    return [...list.keys()].sort((a, b) => a.split('.').length - b.split('.').length);
}

const init = async (req, res, next) => {
    let rval = {};
    let strategy = 'add-only';
    let sourceId = req.helpers.json.get(req, 'body.data.sourceId', '');
    let targetId = req.helpers.json.get(req, 'body.data.targetId', '')

    if (targetId) {
        rval = await helpers.chain.getParents(req, res, targetId, 'write', { checkPermission: true });
    }

    if (rval.valid) {
        let sourceData = await helpers.chain.getChilds(req, res, sourceId);
        let targetData = await helpers.chain.getChilds(req, res, targetId);

        if (!sourceData.valid || !targetData.valid) {
            let rv = await req.helpers.express.response.noResult(req, res, next, {});
            let node = (sourceData.valid ? 'targetId' : 'sourceId')
            rv.data = rv.data || {};
            rv.data[node] = {
                "valid": false,
                "error": true,
                "message": 'Results not found',
                "value": (sourceData.valid ? targetId : sourceId)
            }

            return rv;
        } else {
            const sourceByPath = buildPathMap(req.helpers.json.get(sourceData, 'data', []), sourceId);
            const targetByPath = buildPathMap(req.helpers.json.get(targetData, 'data', []), targetId);
            const sorted = await sortPaths(sourceByPath, req, res, next);
            const targetRootOid = targetId;

            const docs = {
                insert: [],
                update: []
            }

            let skippedCount = 0;

            for (const relPath of sorted) {
                const srcNode = sourceByPath.get(relPath);
                const existingTarget = targetByPath.get(relPath);

                if (!existingTarget) {
                    const segments = relPath.split('.');
                    const parentRelPath = segments.slice(0, -1).join('.');
                    const targetParentId = parentRelPath ? targetByPath.get(parentRelPath)?._id : targetRootOid;

                    docs.insert.push({
                        key: srcNode.key,
                        name: srcNode.name,
                        mapId: targetParentId,
                        meta: srcNode.meta ?? {},
                        value: srcNode.value ?? null,
                        details: srcNode.details ?? {},
                        summary: srcNode.summary ?? '',
                        description: srcNode.description ?? '',
                        _id:String(new req.mdb.db.Types.ObjectId())
                    });
                } else if (strategy === 'overwrite' || 1 === 1) {
                    docs.update.push({
                        _id: existingTarget._id,
                        key: srcNode.key ?? existingTarget.value,
                        meta: srcNode.meta ?? existingTarget.meta,
                        name: srcNode.name ?? existingTarget.name,
                        value: srcNode.value ?? existingTarget.value,
                        details: srcNode.extend ?? existingTarget.extend,
                        summary: srcNode.summary ?? existingTarget.summary,
                        mapId: String(srcNode.mapId ?? existingTarget.mapId),
                        description: srcNode.description ?? existingTarget.description,
                    });
                } else {
                    skippedCount += 1;
                }
            }

            if (docs.insert.length > 0 || docs.update.length > 0) {
                if (docs.insert && docs.insert.length > 0) {
                    return await mongodb.query.upsert.updateAndInsertBoth(docs, '_id', false, req, res, next);
                } else {
                    return await mongodb.query.update.byId(docs.update, false, req, false, req);
                }
            } else {
                return req.helpers.express.response.getRespByCode(200, req, res, next, {
                    "status": {
                        "rcode": "ALREADY_SYNCED",
                        "description": "Your data is already synced"
                    }
                });
            }
        }
    } else {
        return req.helpers.express.response.getRespByCode(400, req, res, next, {});;
    }
}

exports.init = init;