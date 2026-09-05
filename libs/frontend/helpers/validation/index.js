const image = require('./image');
const json = require('./../json');
const message = require('./message');
const dataType = require('./../data');
const dtHelpers = require('./../date');
const DEFAULT_VALUE = '__DEFAULT__INPUT__VALUE';
const PORT_DIVISABLE = 50;

const invalid = (r, arg, type) => {
    return message.invalid(r, arg, type);
};

const valid = (r, arg, type) => {
    return message.valid(r, arg, type);
}

const required = (rval, value, valmap) => {
    const ovalue = json.val(rval, 'originalValue');
    const isnum = json.val(rval, 'validation.checks.number.value');

    if(isnum === 'required'){
        let isvalnum = dataType.type.is(ovalue, 'number');

        if(isvalnum){
            rval = valid(rval, rval, 'required');
            rval = others(rval, value, valmap);   
        }else{
            rval = invalid(rval, rval, 'number');
        }
    }else{
        const isObj = json.val(rval, 'validation.checks.object.value');

        if(isObj === 'required'){
            if(value){
                rval = valid(rval, rval, 'required');
                rval = others(rval, value, valmap);   
            }else{
                rval = invalid(rval, rval, 'required');
            }
        }else{
            const isbool = json.val(rval, 'validation.checks.boolean.value');

            if(isbool === 'required'){
                if(ovalue === false || ovalue === true){
                    rval = valid(rval, rval, 'required');
                    rval = others(rval, value, valmap);
                }else{
                    rval = invalid(rval, rval, 'required');
                }
            }else{
                if((value != '' && value > -1) || value.length > 0){
                    rval = valid(rval, rval, 'required');
                    rval = others(rval, value, valmap);
                }else{
                    rval = invalid(rval, rval, 'required');
                }
            }
        }
    }

    return rval;
};

const number = (rval, value) => {
    let ovalue = json.val(rval, 'originalValue');
    let isvalnum = dataType.type.is(ovalue, 'number');

    if(isvalnum){
        rval = valid(rval, rval, 'number');
    }else{
        rval = invalid(rval, rval, 'number');
    }

    return rval;
}

const optional = (rval, value, valmap) => {
    const isObj = json.val(rval, 'validation.checks.object.value');

    if(isObj === 'required'){
        if(value === ''){
            rval = valid(rval, rval, 'optional');
        }else{
            rval = others(rval, value, valmap);
        }
    }else{
        if((value === '')){
            rval = valid(rval, rval, 'optional');
        }else{
            rval = others(rval, value, valmap);
        }
    }

    return rval;
}

const vObject = (rval, value) => {
    const isArr = dataType.type.isArray(value);
    const isObj = dataType.type.isObject(value);
    if(!isArr && isObj){
        rval = valid(rval, rval, 'object');
    }else{
        rval = invalid(rval, rval, 'object');
    }

    return rval;
}

const boolean = (rval, value) => {
    let ovalue = json.val(rval, 'originalValue');

    if(ovalue === false || ovalue === true){
        rval = valid(rval, rval, 'boolean');
    }else{
        rval = invalid(rval, rval, 'boolean');
    }

    return rval;
}

const mustbe = (rval, value) => {
    const mval = json.val(rval, 'validation.checks.mustbe.value', DEFAULT_VALUE);

    if(mval != DEFAULT_VALUE){
        if(value === mval){
            rval = valid(rval, rval, 'mustbe');
        }else{
            rval = invalid(rval, rval, 'mustbe');
        }
    }else{
        rval = valid(rval, rval, 'mustbe');
    }

    return rval;
}

const minlength = (rval, v) => {
    let ml = json.val(rval, 'validation.checks.minlength.value');

    if((ml > 0) && (v.length < ml)){
        rval = invalid(rval, rval, 'minlength');
    }

    return rval;
}

const maxlength = (rval, v) => {
    let ml = json.val(rval, 'validation.checks.maxlength.value');

    if((ml > 0) && (v.length > ml)){
        rval = invalid(rval, rval, 'maxlength');
    }

    return rval;
}

const enums = (rval, v) => {
    let enums = json.val(rval, 'validation.checks.enums.value');

    if(enums && !enums[v]){
        rval = invalid(rval, rval, 'enums');
    }

    return rval;
}

const regex = (rval, v) => {
    let ovalue = json.val(rval, 'originalValue');
    let regex = json.val(rval, 'validation.checks.regex.value');

    if(regex && regex instanceof RegExp){
        if(!regex.test(ovalue)){
            rval = invalid(rval, rval, 'regex');
        }
    }else{
        if(regex){
            const egxp = new RegExp(regex);
            if(!egxp.test(ovalue)){
                rval = invalid(rval, rval, 'regex');
            }
        }
    }

    return rval;
}

const lengths = (rval, v) => {
    let len = json.val(rval, 'validation.checks.lengths');

    if(len && len.length > 0){
        let vlen = v.length;

        if(vlen && len.indexOf(vlen) > -1){
            rval = valid(rval, rval, 'lengths');
        }else{
            rval = invalid(rval, rval, 'lengths');
        }
    }
    return rval;
}

const mobile = (rval, val, valmap) => {
    let min = 10;
    let max = 10;
    let isd = json.val(val, 'isd');
    if(isd){
        if(isd != '91' && isd != 91){
            min = 7;
            max = 13;
        }
        rval = json.set(rval, 'validation.checks.minlength', min);
        rval = json.set(rval, 'validation.checks.maxlength', max);
        rval = others(rval, json.val(val, 'number'), valmap);
    }else{
        rval = invalid(rval, rval, 'required');
    }
    
    return rval;
}

const url = (rval, value) => {
    const pregex = new RegExp('^[a-zA-Z0-9/]+$');
    const uregex = new RegExp('(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)', 'g');

    if(value){
        if(uregex.test(value)){
            rval = valid(rval, rval, 'url');
        }else{
            if(pregex.test(value)){
                rval = valid(rval, rval, 'url');
            }else{
                rval = invalid(rval, rval, 'url');
            }
        }
    }else{
        rval = valid(rval, rval, 'url');
    }

    return rval;
}

const port = (rval, value) => {
    const preq = json.val(rval, 'validation.checks.port.value');
    const vreq = json.val(rval, 'validation.checks.required.value');

    if(preq === 'required' && vreq === 'required'){
        if(value % PORT_DIVISABLE == 0){
            rval = valid(rval, rval, 'port');
        }else{
            rval = invalid(rval, rval, 'port');
        }
    }

    return rval;
}

const date = (rval, val, valmap) => {
    let value = val;
    let conf = json.val(rval, 'validation.checks.date.value');
    let rconfig = json.val(conf, 'range.details', {});
    let rlen = json.length(rconfig);

    if(val){
        value =  value.split('T')[0]; 
    }

    if(rlen > 0){
        let dt = false;
        let data = json.val(rval, 'dataObject')
        let dtmap = json.val(conf, 'range.datemap', {});
        let dtmaplen = json.length(dtmap);

        if(dtmaplen > 0){
            dt = getvalue(data, {valuemap:dtmap}, json.val(conf, 'range.datemap.map', ''), valmap);
        }

        let rv = dtHelpers.validate.range(value, dtHelpers.range.dob.rangeByConfig(dt, rconfig));

        if(rv){
            return valid(rval, rval, 'date');
        }else{
            return invalid(rval, rval, 'date');
        }
    }else{
        let ranges = json.merge(dtHelpers.range.dob.group(), json.val(valmap, 'dateRange', {}));
        let rangemap = json.val(conf, 'valuemap');
        let date = dtHelpers.format(value, '_yyyy-_m-_d');

        if(date && rangemap){
            let rv = json.valueFromMap({}, ranges, rangemap, DEFAULT_VALUE);

            if(rv != DEFAULT_VALUE){
                conf = rv;
            }
        }

        if(date){
            let rv = dtHelpers.validate.range(date, conf);

            if(rv){
                return valid(rval, rval, 'date');
            }else{
                return invalid(rval, rval, 'date');
            }
        }else{
            return invalid(rval, rval, 'date');
        }
    }
}

const others = (rval, value, valmap) => {
    let checks = json.val(rval, 'validation.checks');
    let orders = ['minlength', 'maxlength', 'lengths', 'regex', 'enums', 'object', 'boolean', 'mustbe', 'url', 'port', 'date', 'number'];

    for(let a in orders){
        let check = orders[a];
        if(checks[check]){
            switch(check) {
                case 'boolean':
                    rval = boolean(rval, value);
                break;
                case 'number':
                    rval = number(rval, value);
                break;
                case 'object':
                    rval = vObject(rval, value);
                break;
                case 'mustbe':
                    rval = mustbe(rval, value);
                break;
                case 'minlength':
                    rval = minlength(rval, value);
                break;
                case 'maxlength':
                    rval = maxlength(rval, value);
                break;
                case 'lengths':
                    rval = lengths(rval, value);
                break;
                case 'regex':
                    rval = regex(rval, value);
                break;
                case 'enums':
                    rval = enums(rval, value);
                break;
                case 'date':
                    rval = date(rval, value, valmap);
                break;
                case 'port':
                    rval = port(rval, value);
                break;
                case 'url':
                    rval = url(rval, value);
                break;
                default:
            }

            if(rval.error){
                break;
            }
        }
    }

    return rval;
}

const validate = (arg, valmap) => {
    let value = json.val(arg, 'value');
    let checks = json.val(arg, 'validation.checks');

    if(checks){
        let check = json.val(checks, 'required.value');

        switch(check) {
            case 'required':
                arg = required(arg, value, valmap);
            break;
            case 'optional':
                arg = optional(arg, value, valmap);
            break;
            case 'mobile':
                arg = mobile(arg, value, valmap);
            break;
            default:
                arg = others(arg, value, valmap);
        }   
    }

    return arg;
}

const check = (arg, value, valmap, data) => {
    /*--let a = {
        value:'v',
        valid:true,
        message:'',
        error:false,
        validation:{
            checks:{
                regex:'',
                enums:'',
                minlength:3,
                maxlength:1,
                required:'required',
            },
            message:{
                error:{
                    default:'IN',
                    checks:{
                        required:'This field is required.'
                    }
                }
            }
        }
    }--*/
    
    return validate({
        valid:true,
        message:'',
        error:false,
        validation:arg,
        dataObject:data,
        value:value || '',
        originalValue:value
    }, valmap);
}

const getvalue = (data, config, node, valmap) => {
    const vm = json.val(config, 'valuemap');

    /*--
        "valuemap":{
            "map":"body-item", body-item|auth|body|query|params|headers|cookies|envs|marchent|appConfig
            "from":"env",
            "fallback":{
                "map":"",
                "from":"env"
            }
        }
    ---*/

    if(vm){
        let vmc = '___VM___V___';
        let map = json.val(vm, 'map');
        let from = json.val(vm, 'from');

        let fbvm = json.val(vm, 'fallback', vmc);
        let fbmap = json.val(fbvm, 'map');
        let fbfrom = json.val(fbvm, 'from');

        if(map){
            if(from != 'body-item'){
                let v = json.val(valmap, `${from}.${map}`, vmc);
                
                if(v != vmc){
                    return v;
                }else{
                    if(fbfrom && fbmap){
                        if(fbfrom != 'body-item'){
                            let fbv = json.val(valmap, `${fbfrom}.${fbmap}`, vmc);
                    
                            if(fbv != vmc){  
                                return fbv;
                            } 
                        }else{
                            let ifbv = json.val(data, fbmap, vmc);
                    
                            if(ifbv != vmc){  
                                return ifbv;
                            } 
                        }
                    }else{
                        if(fbvm != vmc){
                            return fbvm;
                        }
                    }
                }
            }else{
                return json.val(data, map);
            }
        }
    }

    return json.val(data, node);
}

const hasDocs = (valid, index) => {
    const docs = json.val(valid, 'docs');

    if(typeof index === 'number' && index > -1){
        return (json.length(docs || {}) > 0);
    }else{
        return (docs && docs.length > 0);
    }
}

const mergeDateRanges = (valuemap, dateRanges) => {
    return json.merge(valuemap || {}, {
        dateRange:dateRanges || {}
    })
}

const start = (data, config, valuemap, index, dateRanges) => {
    let valmap = mergeDateRanges(valuemap, dateRanges)
    let rval = {
        valid:true,
        validation:{}
    };

    for(let a in config){
        let valid = {
            valid:true
        }
        let item = config[a];
        let isimg = json.val(item, 'checks.image', DEFAULT_VALUE);

        if(isimg != DEFAULT_VALUE){
            valid = image.validate(config[a], a, data, valmap, index);
        }else{
            valid = check(config[a], getvalue(data, config[a], a, valmap), valmap, data);
        }
       
        delete valid.validation;
        delete valid.dataObject;
        delete valid.originalValue;

        if(rval.valid && valid.valid === false){
            rval.valid = false;
        }

        if(a.indexOf('_') === 0){
            a = a.slice(1);
            valid.isPrivate = true;
            delete valid.value;
        }

        if(isimg != DEFAULT_VALUE){
            if(hasDocs(valid, index)){
                rval.docs = json.merge(rval.docs || {}, valid.docs);
            }

            delete valid.docs;
        }

        rval.validation = json.set(rval.validation, a, valid, false, true)
    }

    return rval;
}

const body = (data, config, valmap, dateRanges) => {
    const isArr = dataType.type.isArray(data);
    let rval = {
        docs:{},
        valid:true,
        validation:isArr?[]:{}
    };

    if(isArr){
        for(const a in data){
            const valid = start(data[a], config, valmap, parseInt(a), dateRanges);

            if(rval.valid && valid.valid === false){
                rval.valid = false;
            }

            if(hasDocs(valid, parseInt(a))){
                rval.docs = json.merge(rval.docs || {}, valid.docs);
                delete valid.docs;
            }

            rval.validation.push(json.val(valid, 'validation'));
        }
        return rval;
    }else{
        return start(data, config, valmap, null, dateRanges);
    }
}

exports.image = image;

exports.query = (data, config, valmap, dateRanges) => {
    return start(data, config, valmap, null, dateRanges);
}

exports.params = (data, config, valmap, dateRanges) => {
    return start(data, config, valmap, null, dateRanges);
}

exports.body = (data, config, valmap, dateRanges) => {
    return body(data, config, valmap, dateRanges);
}