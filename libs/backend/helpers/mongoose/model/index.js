
const schema = require('./schema');
const schemaTypes = process.aioAppSchema();

exports.compile = async (appConfig, helpers) => {
    let rval = {};
    let len = await helpers.json.length(schemaTypes);

    if(len > 0){
        for(const a in schemaTypes){
            const n = a.toLowerCase();
            rval[n] = await schema.compile(a, schemaTypes[a], appConfig, helpers);
        }
    }

    return rval;
}