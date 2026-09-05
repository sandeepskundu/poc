const token = require('./token');
const model = require('./model');
const query = require('./query');
const actions = require('./actions');
const validate = require('./validate');
const dHelpers = require('./doc-helpers');
const connection = require('./connection');

exports.token = token;
exports.query = query;
exports.actions = actions;
exports.validate = validate;
exports.docHelpers = dHelpers;
exports.connection = connection;

exports.initialize = async (appConfig, helpers) => {
    //let mdb = await connection.init(appConfig, helpers);
    //let models = await model.compile(appConfig, helpers);

    return {
        //db:mdb,
        //models:mdb?models:false
    }
}