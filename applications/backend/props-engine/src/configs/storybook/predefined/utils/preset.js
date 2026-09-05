const helpers = process.uiHelpers();
const preset = require('./../ds/preset');

const consts = {
    css:['radius', 'shadow', 'className'],
    font:['font__d__size', 'font__d__family', 'font__d__heading'],
    dimension:['size', 'width', 'height', 'minWidth', 'minHeight', 'image__d__thumbnail'],
    colors:['theme', 'color', 'border', 'pairing', 'background', 'hcolor', 'hborder', 'hpairing', 'hbackground', 'acolor', 'bcolor', 'aborder', 'bborder', 'abackground', 'bbackground', 'hacolor', 'hbcolor', 'haborder', 'hbborder', 'habackground', 'hbbackground']
}

const byName = (rval, name) => {
    if(preset && preset[name]){
        rval = rval || {};
        rval[name] = preset[name];
    }

    return rval;
}

const getByType = (type) => {
    let rval = {};
    let li = helpers.json.get(consts, type, []);

    if(type && li && li.length > 0){
        for(let a in li){
            rval = byName(rval, li[a]);
        }
    }

    return rval;
}

const all = () => {
    let rval = {};

    for(let a in consts){
        rval = helpers.json.merge(rval, getByType(a))
    };

    return rval;
}

const getByList = (li) => {
    let rval = {};

    if(helpers.data.type.is(li, 'list')){
        for(let a in li){
            rval = helpers.json.merge(rval, getByType(li[a]))
        };
    }

    if(helpers.data.type.is(li, 'object')){
        for(let a in li){
            if(li[a]){
                rval = helpers.json.merge(rval, getByType(a));
            }
        }
    }

    if(helpers.data.type.is(li, 'string') && li){
        rval = getByType(li);
    }

    return rval;
}

exports.consts = consts;

exports.all = all;
exports.byName = byName;
exports.getByList = getByList;
exports.getByType = getByType;
exports.css = () => {return getByType('css')};
exports.font = () => {return getByType('font')};
exports.colors = () => {return getByType('colors')};
exports.dimension = () => {return getByType('dimension')};