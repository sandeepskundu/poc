const access = require('./../access');

const getParents = async (req, res, mapId, mode = 'write',  options = { checkPermission: false }) => {
    let cache = {};
    let model = req.helpers.json.get(req, 'runtime.model.instance', false)
    let modelName = req.helpers.json.get(req, 'runtime.model.config.name', '');
    let checkPermission = req.helpers.json.get(options, 'checkPermission', false);

    if (checkPermission && await access.isvalid(req, res, mapId, mode)) {
        return {
            valid:true
        };
    }
  
    let chain = [];

    if (!cache[mapId]) {
        const [result] = await model.aggregate([
            {
                $match: {
                    _id:new req.mdb.db.Types.ObjectId(mapId)
                }
            }, {
                $graphLookup: {
                    maxDepth:25,
                    as:'parents',
                    startWith:'$mapId',
                    from:`${modelName}s`,
                    connectToField:'_id',
                    depthField:'stepsUp',
                    connectFromField:'mapId'
                }
            }, {
                $addFields: {
                    parents: {
                        $sortArray:{
                            input:'$parents',
                            sortBy:{
                                stepsUp: -1
                            }
                        }
                    }
                }
            }, {
                $unset: 'parents.stepsUp'
            }
        ]);

        if (result) {
            const {parents = [], ...currentNode} = result;
            chain = [...parents, currentNode];
        };


        if(chain && chain.length > 0){
            return {
                valid:true,
                data:chain
            }
        }else{
            return {
                valid:false
            }
        }
    }
}

exports.getParents = getParents;