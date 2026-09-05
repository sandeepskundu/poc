const setval = async (rval, value, oObje, qObj, config, model, item, req, res, next) => {
    let type = await req.helpers.json.val(oObje, 'opType');
    let enable = await req.helpers.json.val(oObje, 'enable');

        if(enable){
            rval['$'+type] = value;
        }

    return rval;
}

const regex = async (rval, value, oObje, qObj, config, model, item, req, res, next) => {
    let type = await req.helpers.json.val(oObje, 'opType');
    let enable = await req.helpers.json.val(oObje, 'enable');
    let mode = await req.helpers.json.val(oObje, 'regexType', 'match');
        type = '$'+type;

    if(enable){
        switch(mode){
            case 'list':
                rval[type] = new RegExp(value, 'i')
            break;
            case 'match':
                rval[type] = new RegExp(value);
            break;
            case 'startsWith':
                rval[type] = new RegExp(`^${value}`);
            break;
            default:
        }
    }

    return rval;
}

const start = async (value, arg, config, model, item, req, res, next) => {
    let rval = {};
    let ops = await req.helpers.json.val(arg, 'operation', {});
    let opsl = await req.helpers.json.length(ops || {});

    /*-- 
        "eq":"",
        "lt":"",
        "lte":"",
        "gt":"",
        "gte":"",
        "regex":{
            "type":"match/list/startsWith"
        }
    ---*/

    if(opsl && opsl > 0) {

        for(const a in ops){
            let item = {...ops[a]};
                item.opType = item.opType || a;

            switch(a) {
                case 'eq':
                    rval = await setval(rval, value, item, arg, config, model, item, req, res, next);
                break;
                case 'lt':
                    rval = await setval(rval, value, item, arg, config, model, item, req, res, next);
                break;
                case 'lte':
                    rval = await setval(rval, value, item, arg, config, model, item, req, res, next);
                break;
                case 'gt':
                    rval = await setval(rval, value, item, arg, config, model, item, req, res, next);
                break;
                case 'gte':
                    rval = await setval(rval, value, item, arg, config, model, item, req, res, next);
                break;
                case 'regex':
                    rval = await regex(rval, value, item, arg, config, model, item, req, res, next);
                break;
                default:
                  // code block
            }
        }   
    }

    return rval;
}

exports.start = start;