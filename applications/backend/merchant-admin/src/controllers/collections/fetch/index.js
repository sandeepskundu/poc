module.exports = {
    pagination:{
        meta:{
            get:async (data, config, model, req, res, next) => {
                return await req.helpers.mongoose.actions.types.find.pagination.meta.get(data, config, model, req, res, next);
            }
        },
        options:{
            get:async (config, model, req, res, next) => {
                return await req.helpers.mongoose.actions.types.find.pagination.options.get(config, model, req, res, next);
            }
        }
    }
}