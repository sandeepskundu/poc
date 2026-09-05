const collection = require('./../collection');

const init = async (doc, req, res, next) => {
    const model = await collection.get(req, res)
    const id = req.helpers.json.val(doc, 'data.vd.id', '')

    if(id && model){
        try {
            await model.findByIdAndDelete(id)
        } catch (err) {

        }
    }
}

exports.init = init