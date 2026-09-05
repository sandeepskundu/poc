module.exports = {
    "collection.id":{
        get() {
            return this._id;
        },
        set() {
            
        }
    },
    "collection.dbId":{
        get() {
            return this._dbId;
        },
        set() {
            //return this._dbId;
        }
    }
}