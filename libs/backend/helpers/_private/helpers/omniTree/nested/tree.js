const build = async (docs, rootId, req, res, next) => {
    const docsmap = new Map();
    const rId = String(rootId);
    const config = req.helpers.json.get(req, 'runtime.model.config', {});
    const model = req.helpers.json.get(req, 'runtime.model.instance', false);

    for (const n of docs) {
        docsmap.set(String(n._id), { ...n, children: [] });
    }

    const root = docsmap.get(rId) || null;

    for (const n of docs) {
        const currentId = String(n._id);
        if (currentId === rId) {
            continue;
        }

        const current = docsmap.get(currentId);
        const parentId = n.mapId ? String(n.mapId) : null;

        if (parentId && docsmap.has(parentId)) {
            docsmap.get(parentId).children.push(current);
        }
    }

    const subtree = async (node, ancestorChain) => {
        node.children = (await Promise.all(node.children.map((child) => subtree(child, [...ancestorChain, node])))).filter(Boolean);
        node = await req.helpers.mongoose.docHelpers.addRuntime(node, config, model, req, res);
        node = model.hydrate(node).toJSON();

        if (node.children && node.children.length === 0) {
            delete node.children;
        }

        return node;
    }

    return await subtree(root, []);
}

exports.build = build;