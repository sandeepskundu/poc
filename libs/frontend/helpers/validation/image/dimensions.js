const mime = require('./mime');
const json = require('./../../json');
const message = require('./../message');
const {imageSize} = require('node-modules/image-size');

const allowedExts = {
    ".svg":true,
    ".gif":true,
    ".png":true,
    ".jpg":true,
    ".jpeg":true,
    ".webp":true,
}

const getAllowed = (valumap) => {
    return json.val(valumap, 'uitls.validation.global.dimensionsCheckExtensions', allowedExts)
}

const numvalue = (conf, map, fallback, float) => {
    let value = json.val(conf, map);
    let parsed = parseInt(value);

    if(float){
        parsed = parseFloat(value)
    }

    if(isNaN(parsed)){
        return fallback;
    }else{
        return parsed;
    }
}

const maxvalue = (value) => {
    if(value > -1){
        return value;
    }else{
        return 10000;
    }
}

const minvalue = (value) => {
    if(value > 0){
        return value;
    }else{
        return 1;
    }
}

const ratio = (rval, value, conf, fieldname) => {
    let width = json.val(value, 'dimensions.width', 1);
    let height = json.val(value, 'dimensions.height', 1);
    let rwidth = numvalue(conf, 'checks.image.dimensions.ratio.width', null);
    let rheight = numvalue(conf, 'checks.image.dimensions.ratio.height', null);
    let tolerance = numvalue(conf, 'checks.image.dimensions.ratio.tolerance', 0, true);

    if(rwidth && rheight){
        let iratio = width/height;
        let cration = rwidth/rheight;
        let min = cration * (1 - tolerance);
        let max = cration * (1 + tolerance);
        let valid = (iratio >= min && iratio <= max);

        if(valid){
            return message.valid(rval, rval, 'image.dimensions.ratio');
        }else{
            return message.invalid(rval, rval, 'image.dimensions.ratio');
        }
    }else{
        return rval;
    }
};

const height = (rval, value, conf, fieldname) => {
    let height = json.val(value, 'dimensions.height', 0);
    let max = numvalue(conf, 'checks.image.dimensions.height.max', null);
    let min = numvalue(conf, 'checks.image.dimensions.height.min', null);
        min = minvalue(min);
        max = maxvalue(max);

    if(min > -1 && height >= min){
        rval = message.valid(rval, rval, 'image.dimensions.height.min');
    }else{
        rval = message.invalid(rval, rval, 'image.dimensions.height.min');
    }

    if(rval.valid){
        if(max > -1 && height <= max){
            rval = message.valid(rval, rval, 'image.dimensions.height.max');
        }else{
            if(max){
                rval = message.invalid(rval, rval, 'image.dimensions.height.max');
            }
        }
    }

    if(rval.valid){
        return ratio(rval, value, conf, fieldname);
    }else{
        return rval;
    }
}

const width = (rval, value, conf, fieldname) => {
    let width = json.val(value, 'dimensions.width', 0);
    let max = numvalue(conf, 'checks.image.dimensions.width.max', null);
    let min = numvalue(conf, 'checks.image.dimensions.width.min', null);
        min = minvalue(min);
        max = maxvalue(max);

    if(min > -1 && width >= min){
        rval = message.valid(rval, rval, 'image.dimensions.width.min');
    }else{
        rval = message.invalid(rval, rval, 'image.dimensions.width.min');
    }

    if(rval.valid){
        if(max > -1 && width <= max){
            rval = message.valid(rval, rval, 'image.dimensions.width.max');
        }else{
            if(max){
                rval = message.invalid(rval, rval, 'image.dimensions.width.max');
            }
        }
    }

    if(rval.valid){
        return height(rval, value, conf, fieldname);
    }else{
        return rval;
    }
}

const dimensions = (value) => {
    let rval = imageSize(value.buffer);
    let width = json.val(rval, 'width', 0);
    let height = json.val(rval, 'height', 0);
        rval.aspectRatio = (width/height);

    return rval;
}

const start = (rval, value, conf, fieldname, valuemap) => {
    const allowed = getAllowed(valuemap);

    if(allowed[mime.getExt(value)]){
        let drval = json.copy(rval);
            value.dimensions = dimensions(value);
            drval = width(drval, value, conf, fieldname);
     
        if(rval.valid && !drval.valid){
            rval = drval;
        }

        if(!drval.valid){
            rval.message = json.val(drval, 'message', '');
        }
    }

    return rval;
}

exports.start = start;