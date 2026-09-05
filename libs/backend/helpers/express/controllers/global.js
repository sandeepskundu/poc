const start = async (req, res, next) => {
    const mdb = req.helpers.json.val(req, 'mdb.db');

    if(mdb){
        return await req.helpers.mongoose.actions.initialize(req, res, next);
    }else{

    }
}


exports.start = start;