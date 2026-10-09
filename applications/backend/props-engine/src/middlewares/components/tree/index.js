const storybook = process.aioAppConfigs('storybook');

const isvalid = async (node, reqKey, req) => {
    if (req.helpers.data.type.is(node, 'object')){
        return reqKey.every((key) => key in node);
    }else{
        return false;
    }   
};

const buildTree = async (tree, options = {}, req, res, next) => {
    const depth = req.helpers.json.get(options, 'depth', Infinity);
    const ignKey = req.helpers.json.get(options, 'keys.ignored', ['props', 'storybook']);
    const reqKey = req.helpers.json.get(options, 'keys.required', ['props', 'storybook']);
    const ignset = new Set(ignKey);

    const traverse = async (node, curDepth) => {
        if(!req.helpers.data.type.is(node, 'object')){
            return null;
        }

        const childs = {};
        const isCurValid = await isvalid(node, reqKey, req);

        if (curDepth >= depth) {
            return null
        }

        const validChilds = Object.keys(node).filter((k) => !ignset.has(k));
        
        let hasValidDescendants = false;

        for (const key of validChilds) {
            let rv = await traverse(node[key], curDepth + 1);
                if (rv !== null) {
                    childs[key] = rv;
                    hasValidDescendants = true;
                }
        };

        if (hasValidDescendants) {
            if(isCurValid){
                return {
                    index:true,
                    ...childs
                }
            }else{
                return childs
            }
        }

        if(isCurValid){
            return {
                index:true
            }
        }

        return null;
    };

    return await traverse(tree, 0);
};

const details = async (req, res, next) => {
    return await buildTree(storybook, {}, req, res, next);
}

exports.details = details;