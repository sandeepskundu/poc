const {enums} = require('./enums');
const json = require('./../../../json');
const string = require('./../../../string');

const get = (props) => {
    let rv = [];
    /*--
        const props = {
            "theme":{
                "colorPairing":{
                    "default":"",
                    "hover":"",
                },
                "background":{
                    "default":"",
                    "hover":"",
                },
                "text":{
                    "default":"",
                    "hover":"",
                },
                "border":{
                    "default":"",
                    "hover":"",
                },
            }
        };
    --*/

    const th = json.val(props, 'theme');

    if(th){
        const cp = json.val(th, 'colorPairing.default');
        const hcp = json.val(th, 'colorPairing.hover');
        const hbg = json.val(th, 'background.hover');
        const bg = json.val(th, 'background.default');
        const htxt = json.val(th, 'text.hover');
        const txt = json.val(th, 'text.default');
        const hbdr = json.val(th, 'border.hover');
        const bdr = json.val(th, 'border.default');
        const colors = json.val(enums, 'global.color', {});

        if(cp){
            rv.push(`cp-${cp}`);
        }else{
            if(bg && enums && colors[bg]){
                rv.push(`bg-${bg}`);
            }

            if(txt && enums && colors[txt]){
                rv.push(`txt-${txt}`);
            }

            if(bdr && enums && colors[bdr]){
                rv.push(`bdr-${bdr}`);
            }
        }

        if(hcp){
            rv.push(`hcp-${hcp}`);
        }else{
            if(hbg && enums && colors[hbg]){
                rv.push(`hbg-${hbg}`);
            }

            if(htxt && enums && colors[htxt]){
                rv.push(`htxt-${htxt}`);
            }

            if(hbdr && enums && colors[hbdr]){
                rv.push(`hbdr-${hbdr}`);
            }
        }
    }

    return rv.join(' ');
    
}

const resetmap = {
    radius:{
        css:{
            class:{
                radius:null
            }
        }
    },
    size:{
        css:{
            class:{
                padding:null,
                fontsize:null
            }
        }
    },
    theme:{
        theme:null
    }
}

const reset = (rval, type, val) => {
    if(type && val && resetmap[type]){
        rval = json.merge(rval, resetmap[type]);
    }else{
        let map = {
            'color':'text.default',
            'hcolor':'text.hover',
            'border':'border.default',
            'hborder':'border.hover',
            'background':'background.default',
            'hbackground':'background.hover',
            'pairing':'colorPairing.default',
            'hpairing':'colorPairing.hover'
        }

        if(map[type]){
            json.set(rval, map[type], null, false, true)
        }
    }

    return rval;
}

const color = (cenums, name, val) => {
    return json.get(enums, `global.color.${val}`, false);
}

const pairing = (cenums, name, val) => {
    return json.get(enums, `global.pairing.${val}`, false);
}

const heights = (cenums, name, val) => {
    return json.get(enums, `global.height.${val}`, false);
}

const globals = (cenums, name, val) => {
    let map = `${name}.${val}`;

    return json.get(enums, `global.${map}`, json.get(cenums, map, false));
}

const byComp = (props, compname) => {
    let compEnums = json.get(enums, compname, json.get(enums, `global.${compname}`, false));

    if(compEnums){
        let rval = {};
        let gmap = {
            'size':true,
            'radius':true,
            'shadow':true,
        };
        let pd = json.get(props, 'ds.predefined', {});

        for(let a in pd){
            let val = pd[a];
            let valid = false;
            let key = string.transform.to.jsonKeyMap(a);

            switch(a){
                case 'width':
                    valid = heights(compEnums, key, val);
                break;
                case 'height':
                    valid = heights(compEnums, key, val);
                break;
                case 'minWidth':
                    valid = heights(compEnums, key, val);
                break;
                case 'minHeight':
                    valid = heights(compEnums, key, val);
                break;
                case 'color':
                    valid = color(compEnums, key, val);
                break;
                case 'border':
                    valid = color(compEnums, key, val);
                break;
                case 'background':
                    valid = color(compEnums, key, val);
                break;
                case 'hcolor':
                    valid = color(compEnums, key, val);
                break;
                case 'hborder':
                    valid = color(compEnums, key, val);
                break;
                case 'hbackground':
                    valid = color(compEnums, key, val);
                break;
                case 'pairing':
                    valid = pairing(compEnums, key, val);
                break;
                case 'hpairing':
                    valid = pairing(compEnums, key, val);
                break;
                case 'acolor':
                    valid = color(compEnums, key, val);
                break;
                case 'aborder':
                    valid = color(compEnums, key, val);
                break;
                case 'abackground':
                    valid = color(compEnums, key, val);
                break;
                case 'bcolor':
                    valid = color(compEnums, key, val);
                break;
                case 'bborder':
                    valid = color(compEnums, key, val);
                break;
                case 'bbackground':
                    valid = color(compEnums, key, val);
                break;
                case 'hacolor':
                    valid = color(compEnums, key, val);
                break;
                case 'haborder':
                    valid = color(compEnums, key, val);
                break;
                case 'habackground':
                    valid = color(compEnums, key, val);
                break;
                case 'hbcolor':
                    valid = color(compEnums, key, val);
                break;
                case 'hbborder':
                    valid = color(compEnums, key, val);
                break;
                case 'hbbackground':
                    valid = color(compEnums, key, val);
                break;
                default :
                    if(gmap[a]){
                        valid = globals(compEnums, key, val);
                    }else{
                        valid = json.get(compEnums, `${key}.${val}`, false)
                    }
            }

            if(valid){
                rval = reset(rval, a, val);
            }else{
                json.remove(props, `ds.predefined.${key}`)
            }
        }

        props = json.merge(props, {ds:rval});
    }

    return props;
}

exports.get = get;
exports.byComp = byComp;