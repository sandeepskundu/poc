const extend = async (rval, name, arg, appConfig, helpers, mdb) => {
    return {...rval, ...{
        ts:{
            get(){
                let rv = {};
                let cr = this._created;
                let up = this._updated;

                if(cr){
                    rv.created = cr;
                }

                if(up){
                    rv.updated = up
                }

                return rv;
            }
        },
        'signature':{
            get(){
                let sign = helpers.mongoose.docHelpers.signature.create(this, name, arg, appConfig, helpers, mdb);

                if(sign){
                    return sign;
                }
            }
        },
    }};
}

const get = async (virtuals, name, arg, appConfig, helpers, mdb) => {
    return await extend((virtuals || {}), name, arg, appConfig, helpers, mdb);
}

exports.get = get;