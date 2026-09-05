const markDelete = async (data, model, docConfig, req, res, next) => {
    return {
        doc:{
            _deleted:1,
            _deletedAt:new Date()
        },
        apiData:req.helpers.json.val(data, 'apiData', {})
    };
}

const parse = async (data, model, docConfig, messages, isList, req, res, next) => {
    let rval = {
        docs:isList?[]:{},
        data:isList?[]:{},
    };

    let dt = req.helpers.json.val(data, 'data', {});
    let dl = req.helpers.data.type.isArray(dt);

    if(isList && dl){
        for(const a in dt){
            rval.docs.push(dt[a].db)
            rval.data.push(await markDelete(dt[a], model, docConfig, req, res, next));
        }
    }else{
        rval.docs = dt.db;
        rval.data = await markDelete(dt, model, docConfig, req, res, next);
    }

    return rval;
}

const deleteDoc = async (arg, doc, model, docConfig, req, res, next) => {
    let item = await req.helpers.json.val(arg, 'doc', {});
        doc = await req.helpers.mongoose.docHelpers.addRuntime(doc, docConfig, model, req, res, next);

        for(const a in item){
            doc[a] = item[a];
        };
                
        await doc.save();

    return {
        signature:req.helpers.json.val(arg, 'apiData.signature')
    };
}

const start = async (data, model, docConfig, messages, isList, req, res, next) => {
    let dt = {};
    let rval = isList?[]:{};
    let d = await parse(data, model, docConfig, messages, isList, req, res, next);
    let rd = await req.helpers.express.response.getRespByCode(200, req, res, next);
        dt.old = isList?[]:{};
        dt.new = isList?[]:{};

    if(isList){
        for(const a in d.data){
            dt.new.push(d.data[a]);
        }
    }else{
        dt.new.push(d.data);
    }

    let docs = req.helpers.json.val(dt, 'new', rval);

    if(isList){
        for(const a in docs){
            rval.push(await deleteDoc(docs[a], d.docs[a], model, docConfig, req, res, next));
        }
    }else{
        rval = await deleteDoc(docs, d.docs, model, docConfig, req, res, next);
    }

    rd.data = rval;

    return rd;
}

exports.start = start;