const icon = require('./icon');
const theme = require('./theme');
const input = require('./input');
const button = require('./button');
const {enums} = require('./enums');
const tooltip = require('./tooltip');
const json = require('./../../../json');
const string = require('./../../../string');

const space = (arg, type) => {
    let rv = [];
    let odd = [];
    let even = [];
    let oddmap = {};
    let evenmap = {};
    let typ = type || 'mr'
    let map = json.val(enums, 'spaces');

    for(const a in arg){
        const i = parseInt(a);
        const vl = parseInt(arg[a] || 0);
        
        if(map[vl]){
            if(i % 2 === 0) {
                even.push(vl);
            }else{
                odd.push(vl);
            }

            if(i % 2 === 0) {
                evenmap[vl] = evenmap[vl] || true;
            }else{
                oddmap[vl] = oddmap[vl] || true;
            }

        }else{
            if(i % 2 === 0) {
                if(!evenmap[vl]){
                    even.push(0);
                }
            }else{
                if(!oddmap[vl]){
                    odd.push(0);
                }
            }

            if(i % 2 === 0) {
                evenmap[vl] = evenmap[vl] || true;
            }else{
                oddmap[vl] = oddmap[vl] || true;
            }
        }

        
    }

    const oddlen = json.length(oddmap);
    const evenlen = json.length(evenmap);


    if((oddlen === 1 && evenlen === 1) && (odd[0] != 0 && even[0] != 0) && (odd[0] === even[0])){
        rv.push(`${typ}-${odd[0]}`)
    }else{
        if(oddlen){
            if(oddlen === 1 && odd[0] != 0){
                rv.push(`${typ}-tb${odd[0]}`)
            }else{
                if ((oddlen === 1 && odd[0] != 0) || oddlen > 1) {
                    for(const a in odd){
                        const i = parseInt(odd[a]);
                        if(i != 0){
                            rv.push(`${typ}-${a==0?'t':'b'}${i}`)
                        }else{
                            if(i == 0){
                                rv.push(`${typ}-${a==0?'t':'b'}n`)
                            } 
                        }
                    }
                }
            }
        }
    
        if(evenlen){
            if(evenlen === 1 && even[0] != 0){
                rv.push(`${typ}-rl${even[0]}`)
            }else{
                if ((evenlen === 1 && even[0] != 0) || evenlen > 1) {
                    for(const a in even){
                        const i = parseInt(even[a]);
                        if(i != 0){
                            rv.push(`${typ}-${a==0?'r':'l'}${i}`)
                        }else{
                            if(i == 0){
                                rv.push(`${typ}-${a==0?'r':'l'}n`)
                            } 
                        }
                    }
                }
            }
        }
    }

    return rv.join(' ');
}

const spaces = (arg, flags) => {
    let rv = [];
    let mr = space(json.val(arg, 'margin', {}), 'mr');
    let pd = space(json.val(arg, 'padding', {}), 'pd');

    if(pd){
        rv.push(pd);
    }

    if(mr){
        rv.push(mr);
    }

    return rv.join(' ');
}

const shadow = (name) => {
    let map = json.val(enums, 'global.shadow');

    if(name && map[name]){
        return `shdw-${name}`
    }

    return false;
}

const family = (name) => {
    let map = json.val(enums, 'global.font.family');

    if(name && map[name]){
        return `fm-${name}`
    }

    return false;
}

const getCssEnums = (type, val) => {
    let map = json.val(enums, `global.css.${type}`);

    if(val && map && map[val]){
        return val;
    }

    return false;
}

const animation = (name) => {
    let map = json.val(enums, 'global.animations');

    if(name && map[name]){
        return name
    }

    return false;
}

const fontsize = (arg, flags) => {
    let size = json.val(arg, 'fontsize');
    let map = json.val(enums, 'global.font.size');
    let isDisplay = json.val(flags, 'isDisplay');

    if(size && map[size]){
        if(isDisplay){
            return `dis-${size}`
        }else{
            return `txt-${size}`
        }
    }

    return false;
}

const radius = (arg) => {
    let rv = [];
    let rvcls = [];
    let map = json.val(enums, 'global.radius', {});

    for(const a in arg){
        rv.push(arg[a]);
    }

    if(rv.length === 1){
        if(map[rv[0]]){
            rvcls.push(`bdr-${rv[0]}`);
        }
    }

    if(rv.length === 2){
        if(map[rv[0]] && map[rv[1]] && rv[0] === rv[1]){
            rvcls.push(`bdr-${rv[0]}`);
        }else{
            if(map[rv[0]]){
                rvcls.push(`bdr-t${rv[0]}`);
            }

            if(map[rv[1]]){
                rvcls.push(`bdr-b${rv[1]}`);
            }
        }        
    }

    return rvcls.join(' ');
}

const borderNone = (arg) => {
    const rv = [];
    const _arg = {
        1:true,
        2:true,
        3:true,
        4:true
    }

    if(arg[1] && arg[2] && arg[3] && arg[4]){
        rv.push('bdr-wn')
    }else{
        if(arg[1] && arg[3] ){
            rv.push('bdr-wtbn')
        }else{
            if(arg[1]){
                rv.push('bdr-wtn')
            };

            if(arg[3]){
                rv.push('bdr-wbn')
            }
        }

        if(arg[2] && arg[4] ){
            rv.push('bdr-wrln')
        }else{
            if(arg[2]){
                rv.push('bdr-wrn')
            };

            if(arg[4] ){
                rv.push('bdr-wln')
            }
        }
    }
   
    return rv.join(' ');
}

const parse = (props, excludeTheme) => {
    const rv = [];
    const thm = theme.get(props);
    const css = json.val(props, 'css');

    if(css){
        const clss = json.val(css, 'class');
        const flags = json.val(css, 'flags');
        const others = json.val(css, 'others');
        const noRadius = json.val(flags, 'noRadius');

        if(clss){
            const spc = spaces(clss, flags);
            const fs = fontsize(clss, flags);
            const fmly = family(json.val(clss, 'family'));
            const shdw = shadow(json.val(clss, 'shadow'));
            const rdis = radius(json.val(clss, 'radius', {}));
            const noBdr = borderNone(json.val(clss, 'borderNone', {}));
            const cursr = getCssEnums('cursor', json.val(clss, 'cursor'));
            const border = getCssEnums('border', json.val(clss, 'border'));

            if(border){
                rv.push(`bdr-${border}`)
            }

            if(shdw){
                rv.push(shdw)
            }

            if(cursr){
                rv.push(cursr);
            }

            if(!noRadius && rdis){
                rv.push(rdis)
            }

            if(fmly){
                rv.push(fmly)
            }

            if(fs){
                rv.push(fs)
            }

            if(spc){
                rv.push(spc);
            }

            if(noBdr){
                rv.push(noBdr);
            }
        }

        if(flags){
            const bxs = json.val(flags, 'boxSizing');
            const round = json.val(flags, 'rounded');
            const disabled = json.val(flags, 'disabled');
            const noborder = json.val(flags, 'noBorder');
            const anim = animation(json.val(flags, 'animation'));
            

            if(round){
                rv.push('bdr-round');
            }

            if(disabled){
                rv.push('disabled');
            }

            if(noborder){
                rv.push(`bdr-n`)
            }

            if(bxs){
                rv.push(`bxs`)
            }

            if(noRadius){
                rv.push('bdr-rn');
            }

            if(anim){
                rv.push(anim);
            }
        }

        if(others){
            rv.push(others);
        }
    }

    if(thm && !excludeTheme){
        rv.push(thm);
    }

    return rv.join(' ')
}

const get = (props, cssClass, excludeTheme) => {
    /*--const props = {
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
        },
        'css':{
            "class":{
                "cursor":'
                'shadow':'',
                'radius':{
                    "1":'',
                    "2":'',
                    "3":'',
                    "4":''
                },
                'padding':{
                    "1":'',
                    "2":'',
                    "3":'',
                    "4":''
                },
                "margin":{
                    "1":'',
                    "2":'',
                    "3":'',
                    "4":''
                },
                'border':'',
                'family':'',
                'fontsize':''
            },
            "flags":{
                'animation':'',
                'noBorder':true,
                'rounded':false,
                'disabled':false,
                'isDisplay':true,
                'boxSizing':false,
                
            },
            'others':'',
        }
    }--*/

    /*--window.jsdls =  window.jsdls || 0;
    window.jsdls++

    console.log(window.jsdls)--*/


    const rv = [parse(props, excludeTheme)];

    if(cssClass){
        rv.push(cssClass);
    }

    return rv.join(' ').trim();   
}

const mapping = (props, map, fallback) => {
    let rval = {};
    let dfb = {
        css:{
            'class':{
                'radius':{
                    "1":0,
                    "2":0,
                    "3":0,
                    "4":0
                },
                'padding':{
                    "1":0,
                    "2":0,
                    "3":0,
                    "4":0
                },
                "margin":{
                    "1":0,
                    "2":0,
                    "3":0,
                    "4":0
                },
            }
        }
    }

    let fb = json.merge(dfb, fallback || {});

    if(map){
        for(const a in map){
            const vmap = `${map[a] || 'ds'}.${a}`;
            const val = json.val(props, vmap, json.val(fb, a));
            if(val != null){
                rval = json.set(rval, a, val, false, true)
            } 
        }
    }

    return rval;
}

const byMap = (props, cssClass, map, fallback) => {
    const rval = [];
    const _map = {
        'theme.colorPairing.hover':'ds',
        'theme.colorPairing.default':'ds',
        'theme.background.hover':'ds',
        'theme.background.default':'ds',
        'theme.border.hover':'ds',
        'theme.border.default':'ds',
        'theme.text.hover':'ds',
        'theme.text.default':'ds',

        'css.class.shadow':'ds',
        'css.class.radius.1':'ds',
        'css.class.radius.2':'ds',
        'css.class.radius.3':'ds',
        'css.class.radius.4':'ds',
        'css.class.padding.1':'ds',
        'css.class.padding.2':'ds',
        'css.class.padding.3':'ds',
        'css.class.padding.4':'ds',
        'css.class.margin.1':'ds',
        'css.class.margin.2':'ds',
        'css.class.margin.3':'ds',
        'css.class.margin.4':'ds',
        'css.class.border':'ds',
        'css.class.family':'ds',
        'css.class.fontsize':'ds',
        'css.flags.noBorder':'ds',
        'css.flags.rounded':'ds',
        'css.flags.disabled':'ds',
        'css.flags.isDisplay':'ds',
        'css.others':'ds'
    }

    const rprops = mapping(props, map, fallback);
    const css = get(rprops);

    if(css){
        rval.push(css);
    }

    if(cssClass){
        rval.push(cssClass);
    }

    return string.remove.dupCls(rval.join(' ').trim());
}

const getConfByMap = (arg, mapConfig, valAsItIs) => {
    let rval = {};
    let map = mapConfig || {};

    for(const a in map){
        const val = json.val(arg, map[a]);

        if(val != null){
            rval = json.set(rval, a, val, false, valAsItIs)
        }
    }

    return rval;
}

const themeByComponent = (props, compname) => {
    return theme.byComp(props, compname);
}

exports.get = get;
exports.icon = icon;
exports.byMap = byMap;
exports.input = input;
exports.button = button;
exports.tooltip = tooltip;
exports.getConfByMap = getConfByMap;
exports.themeByComponent = themeByComponent;