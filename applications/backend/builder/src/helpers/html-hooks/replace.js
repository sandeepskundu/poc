const helpers = require('helpers');

const details = async (htm, appConfig, args) => {
    if(args){
        for(const a in args){
            let val = helpers.json.val(args, a);
                htm = htm.replace(new RegExp(a, "g"), val || '');
        }
    }
        
    return htm;
}

exports.details = details;