const {enums} = require('./enums');
const json = require('./../../../json');
const random = require('./../../../random');
const string = require('./../../../string');
const dtype = require('./../../../data/type');

const rId = random.id(20);

const ds = (rval, conf) => {
    let d = json.get(conf, 'ds', {});
    let isObj = dtype.is(d, 'object');

    if(d && isObj && json.length(d) > 0){
        try {
            rval['data-tip-ds'] = JSON.stringify({ds:d});
        }catch (error) {

        }
    }

    return rval;
}

const tigger = (rval, conf) => {
    let trg = json.get(conf, 'tigger', rId);

    if(trg && trg != rId){
        rval['data-tip-tigger'] = trg;
    }

    return ds(rval, conf);
}

const position = (rval, conf) => {
    let pos = json.get(conf, 'position', rId);

    if(pos && pos != rId){
        rval['data-tip-position'] = pos;
    }

    return tigger(rval, conf);
}

const background = (rval, conf) => {
    let bg = json.get(conf, 'background', rId);

    if(bg && bg != rId){
        rval['data-tip-background'] = bg;
    }
    
    return position(rval, conf);
}

const color = (rval, conf) => {
    let clr = json.get(conf, 'color', rId);

    if(clr && clr != rId){
        rval['data-tip-color'] = clr;
    }
    
    return background(rval, conf);
}

const get = (props) => {
    /*--props.tooltip = {
        tigger:'focus',
        color:'c10000',
        position:'bottom',
        _background:'c00206',
        content:'sandeep Kundu',
        ds: {
            predefined: {
                color:'c10000',
                background: 'c00206' 
            },
            css:{
                class: {}
            }
        }
    }--*/

    let conf = json.get(props, 'tooltip', {});
    let isObj = dtype.is(conf, 'object');

    if(isObj && json.length(conf) > 0){
        let has = json.get(props, 'tooltip.content', rId);

        if(has != rId){
            return color({
                'data-tip-html':has
            }, conf);
        }
    }

    return {};
}


exports.get = get;