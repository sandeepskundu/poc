const json = require('./../../json');

const validate = (elm, props) => {
    let dvl = '__INPUT_VALUE__IS__NOT_DEFINED__';
    let val = json.val(elm, 'target.value', dvl);
    let max = json.val(props, 'max', dvl);
    let min = json.val(props, 'min', dvl);

    if(max != dvl){
        max = parseInt(max)
    }

    if(min != dvl){
        min = parseInt(min)
    }

    if(val != dvl && max != dvl && min != dvl){
        val = parseInt(val);

        if(min > val){
            val = min
        }

        if(val > max){
            val = max;
        }

        elm.target.value = val;
    }

    return elm;
}

exports.validate = validate;