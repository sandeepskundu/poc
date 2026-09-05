const theme = require('./theme');
const {enums} = require('./enums');
const json = require('./../../../json');
const orders = ['default', 'disabled', 'focus', 'error'];

const size = (props) => {
    const isz = json.val(props, 'size');
    const map = json.val(enums, 'inputSizes', {});

    if(isz && map[isz]){
        return isz;
    }else{
        return 'lg';
    }
}

const parseTheme = (arg, dtheme) => {
    const rval = {};

    for(const a in arg){
        rval[a] = theme.get({
            theme:arg[a]
        })
    }

    return rval;
}

const parse = (arg, props) => {
    let rval = {};
    let dtheme = {};

    for(const a in orders){
        const i = orders[a];

        if(i === 'default'){
            dtheme = arg[i]
        }

        rval[i] = parseTheme(json.merge(dtheme, arg[i] || {}));
    }

    return rval;
}

const getTheme = (props) => {
    const ith = json.val(props, 'theme');
    const map = json.val(enums, 'inputThemes', {});

    if(ith && map[ith]){
        return `th-${ith}`
    }else{
        return parse(ith, props);
    }
}

exports.size = size;
exports.theme = getTheme;