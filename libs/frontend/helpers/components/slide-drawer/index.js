const elem = require('./../../element');


const toggle = (id) => {
    let elm = elem.get.byId(id);

    if(elm){
        elm.checked = !elm.checked;
    }
}

const hide = (id) => {
    let elm = elem.get.byId(id);

    if(elm){
        elm.checked = false;
    }
}

const show = (id) => {
    let elm = elem.get.byId(id);

    if(elm){
        elm.checked = false;
    }
}

const isActive = (id) => {
    let elm = elem.get.byId(id);

    if(elm){
        return elm.checked;
    }

    return false;
}

exports.show = show;
exports.hide = hide;
exports.toggle = toggle;
exports.isActive = isActive;