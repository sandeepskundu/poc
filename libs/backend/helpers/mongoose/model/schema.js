const name = ['m', 'o', 'n', 'g', 'o', 'o', 's', 'e'].join('');
const virtuals = require('./virtuals');
const mdb = process.nodeModules(name);
const mpg = process.nodeModules('mongoose-paginate-v2');

const transform = (rval, doc, virtuls, appConfig) => {
    if(doc && doc.runtime && doc.runtime.req && doc.runtime.req.helpers){
        rval = doc.runtime.req.helpers.mongoose.docHelpers.transform.init(rval, doc, virtuls, appConfig)
    }else{
        for(const a in rval){
            if(a.indexOf('_') === 0){
                delete rval[a];
            }
        }
    }

    return rval;
}

const options = async (name, arg, appConfig, helpers) => {
    const virtuls = await process.aioAppControllers(`${name}/virtuals.js`);
    const vopts = await virtuals.get(virtuls, name, arg, appConfig, helpers, mdb)

    return {
        id:false,
        virtuals:vopts,
        versionKey:false,
        timestamps:{
            createdAt:'_created',
            updatedAt:'_updated'
        },
        toJSON: {
            virtuals:true,
            transform (doc, rval) {
                rval = transform(rval, doc, vopts, appConfig);
            }
        },
    }
}

const schema = async (name, arg, appConfig, helpers) => {
    const sval = helpers.json.val(arg, `schema`, {});
    const svlen = helpers.json.length(sval);

    if(svlen > 0 && arg.model){
        return arg;
    }

    return false
}

const globally = async (schma, config, appConfig, helpers) => {
    schma._deleted = {
        default:0,
        type:mdb.Schema.Types.Number
    }

    schma._deletedAt = {
        type:mdb.Schema.Types.Date
    }

    schma._version = {
        default:0,
        type:mdb.Schema.Types.Number
    }

    schma._prevId = {
        type:mdb.Schema.Types.ObjectId,   
    }

    schma._updatedBy = {
        type:mdb.Schema.Types.ObjectId,   
    }

    schma._createdType = {
        type:mdb.Schema.Types.String, 
    }

    schma._createdBy = {
        type:mdb.Schema.Types.ObjectId,   
    }

    schma._userId = {
        type:mdb.Schema.Types.ObjectId,   
    }

    schma._mapId ={
        type:mdb.Schema.Types.ObjectId, 
    },

    schma._merchantId = {
        type:mdb.Schema.Types.ObjectId,   
    }

    return schma;
}

const parse = async (name, config, appConfig, helpers) => {
    const arg = await schema(name, config, appConfig, helpers);

    if(arg){
        let option = await options(name, config, appConfig, helpers)
        let model = helpers.json.val(arg, 'model');
        let schma = helpers.json.val(arg, 'schema');
            schma = await globally(schma, config, appConfig, helpers)

        let mschema = new mdb.Schema(schma, option);
            mschema.plugin(mpg);


        if(mdb.connection && mdb.connection.models){
            ///delete mdb.connection.models[model];
        }

        return mdb.model(model, mschema);
    }else{
        return false;
    }
    
}

const compile = async (name, schema, appConfig, helpers) => {
    return await parse(name, schema, appConfig, helpers);
}

exports.compile = compile;