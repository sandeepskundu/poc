const css = require('./index')
const theme = require('./theme');
const {enums} = require('./enums');
const json = require('./../../../json');

const gets = (props, cssClass) => {
    const rval = []
    const bth = json.val(props, 'theme');
    const map = json.val(enums, 'buttonThemes', {})

    if(map && bth && map[bth]){
        rval.push(`th-${bth}`) 
    }else{
        const thm = theme.get(props);

        if(thm){
            rval.push(thm);
        }
    }

    if(cssClass){
        rval.push(cssClass);
    }

    return css.get(props, rval.join(' '), true);
}

exports.get = gets;