
const json = require('./../../json');
const message = require('./../message');
const dimensions = require('./dimensions');

const extsmap = {
    ".css": "text/css",
    ".html": "text/html",
    ".json": "application/json",
    ".js": "application/javascript",

    ".gif": "image/gif",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",

    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "application/x-font-ttf",
    ".otf": "application/x-font-opentype",

    ".gz": "application/gzip",
    ".zip": "application/zip",
    ".tar": "application/x-tar",
    ".7z": "application/x-7z-compressed",
    ".rar": "application/x-rar-compressed",

    ".csv": "text/csv",
    ".xml": "application/xml",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}

const getAllowed = (valumap) => {
    return json.val(valumap, 'uitls.validation.global.allowedExtensions', extsmap)
}

const getExt = (file) => {
    const name = json.val(file, 'originalname', '')
    const match = name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
    
    return (match?`.${match[1]}`:null);
}

const global = (req, file, cb) => {
    const ext = getExt(file);

    if(ext){
        const extmap = getAllowed({});
        const mime = json.val(file, 'mimetype');

        if(extmap[ext] === mime){
            if(cb){
                cb(null, true);
            }else{
                return true
            }
        }else{
            if(cb){
                cb(null, false)
            }else{
                return false;
            }
        }
    }else{
        if(cb){
            cb(null, false)
        }else{
            return false;
        }
    }
}

const multer = (req, file, cb) => {
    let prefix = json.val(req, 'runtime.validationConfig.request.body.docs.keyPrefix');

    if(prefix){
        let field = json.val(file, 'fieldname');

        if(field && field.indexOf(prefix) === 0){
            global(req, file, cb)
        }else{
            cb(null, false);
        }
    }else{
        cb(null, false)
    }
}

const start = (rval, value, conf, fieldname, valuemap) => {
    let ext = json.val(conf, 'checks.image.mime.ext', '^(.jpeg|.jpg|.gif)$');
    
    if(typeof ext === 'string' && ext){
        let fext = getExt(value);
        let exts = new RegExp(ext, 'i');
        let extmap = getAllowed(valuemap);
        let mime = json.val(value, 'mimetype', '');

        if(exts.test(fext) && extmap[fext] === mime){
            rval = dimensions.start(rval, value, conf, fieldname, valuemap)
        }else{
            rval = message.invalid(rval, rval, 'image.mime.ext');
        }
    }else{
        rval = message.invalid(rval, rval, 'image.mime.ext');
    }

    return rval;
}


exports.start = start;
exports.multer = multer;
exports.getExt = getExt;
exports.global = global;