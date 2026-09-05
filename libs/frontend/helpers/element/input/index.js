
const minMax = require('./min-max');
const pattern = require('./pattern');

const validate = (elm, props) => {
    if(elm && props){
        elm = minMax.validate(elm, props);
        elm = pattern.validate(elm, props.pattern, props);
    }
    
    return elm;
}

exports.pattern = pattern;
exports.validate = validate;