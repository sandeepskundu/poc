const json = require('./../../json');
const string = require('./../../string');

const mobile = (value, elm, props) => {
    let isd = json.val(props, 'isd', 91);
        value = string.remove.nonnumber(value); 

        if(isd === 91 || isd === '91'){
            value = `${value}`.slice(0, 10);
        }else{

        }

    return value;
}

const otp = (value, elm, props) => {
    value = string.remove.nonnumber(value); 
    value = `${value}`.slice(0, 6);

    return value;
}

const validate = (elm, pattern, props) => {
    if(elm && pattern){
        let dvl = '__INPUT_VALUE__IS__NOT_DEFINED__'
        let val = json.val(elm, 'target.value', dvl);

            if(val != dvl){
                switch (pattern) {
                    case 'html-attr':
                        val = helpers.string.remove.other.than.htmlAttr(val);
                    break;
                    case 'number':
                        val = string.remove.nonnumber(val);
                    break;
                    case 'json-map-key':
                        val = helpers.string.remove.other.than.jsonMapKey(val);
                    break;
                    case 'mobile':
                        val = mobile(val, elm, props);
                    break;
                    case 'otp':
                        val = otp(val, elm, props);
                    break;
                    default:
                    break;
                }
            };

            elm.target.value = val || '';
    }       

    return elm;
}

exports.validate = validate;