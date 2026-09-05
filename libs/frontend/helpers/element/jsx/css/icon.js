const css = require('./index')
const theme = require('./theme');
const {enums} = require('./enums');
const json = require('./../../../json');

const getEnum = (type, val) => {
    let nv = '___NA___';
    let rv = json.get(enums, `icons.${type}.${val}`, nv);

    return (rv != nv)?rv:false;
}

const size = (arg) => {
    const size = json.val(arg, 'size');

    if(size && enums && getEnum('sizes', size)){
       return `ico-${size}`;
    }else{
        return false;
    }
}

const family = (arg) => {
    let n = json.val(arg, 'name');
    let fm = getEnum('family', json.val(arg, 'family'));

    if(n && fm){
       return `ico-${fm}-${n}`;
    }

    return false;
}

const get = (props, cssClass) => {
    const rv = [];
    const map = {
        "name":'',
        'size':'',
        'family':''
    }
    const iprops = json.val(props, 'icon', {});
    const isize = size(iprops);
    const ifamily = family(iprops);

    if(isize){
        rv.push(isize);
    }

    if(ifamily){
        rv.push(ifamily);
    }

    if(cssClass){
        rv.push(cssClass);
    }

    return rv.join(' ');
}

exports.get = get;