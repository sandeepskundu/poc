const space = (val) => {
    if(val){
        return val.replace(/\s/g, '');
    }

    return val;
}

const multiSpace = (val) => {
    if(val){
        val = val.trim();
    }

    if(val){
        val = val.replace(/\s+/g, " ");
    }

    return val;
}

const nonalpha = (val) => {
    if(val){
        return val.replace(/[^A-Za-z]/gi, '');
    }

    return val;
}

const nonnumber= (val) => {
    if(val){
        return val.replace(/[^0-9]/gi, '');
    }

    return val;
}

const protocol = (val) => {

    if(val){
        val = val.replace(/http:/g, '');
    }

    if(val){
        val = val.replace(/https:/g, '');
    }

    return p;
}


const dot = (val) => {
    if (val) {
        val = val.replace(/\./g, '');
    }

    return val;
}

const hypen = (val) => {
    if (val) {
        val = val.replace(/\-/g, '');
    }

    return val;
}

const percent = (val) => {
    if (val) {
        val = val.replace(/\%/g, '');
    }

    return val;
}

const colon = (val) => {
    if (val) {
        val = val.replace(/\:/g, '');
    }

    return s;
}

const plus = (val) => {
    if (val) {
        val = val.replace(/\+/g, '');
    }

    return val;
}

const comma = (val) => {
    if (val) {
        val = val.replace(/\,/g, '');
    }

    return val;
}

const pipe = (val) => {
    if (val) {
        val = val.replace(/\|/g, '');
    }

    return val;
}

const underscore = (val) => {
    if (val) {
        val = val.replace(/\_/g, '');
    }

    return val;
}

const tag = (val, tag) => {
    let rv = val || '';

    if (!tag) {
        return str;
    }

    let regex = new RegExp('<[/]{0,1}(' + tag + ')[^><]*>', 'ig');

    if (tag && typeof tag != 'string') {
        regex = new RegExp('<[/]{0,1}(' + tag.join('|') + ')[^><]*>', 'ig');
    }

    return rv.replace(regex, '');
}

const scriptTag = (val) => {
    if (val) {
        val = val.replace(/<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g, '');
    }

    return val;
}

const splChar = (val, chrs) => {
    let rval = val || '';

    if (chrs && chrs.length) {
        for (let chr of chrs) {
            rval = rval.replace(new RegExp('\\' + chr, 'gi'), '');
        }
    }

    return rval;
}

const multiline = (val) => {
    if(val){
        return val.replace(/\n{2,}/g, '\n\n')
    }

    return val;
}

const other = {
    than:{
        commaAndNumber:(val) => {
            if(val){
                return val.replace(/[^0-9,.]/gi, '');
            }

            return val;
        },

        jsonMapKey:(val) => {
            if(val){
                return val.replace(/[^A-Za-z_.]/gi, '');
            }

            return val;
        },
        
        nonalphaAndHyphen:(val) => {

            if(val){
                return val.replace(/[^a-zA-Z-]/g, '')
            }

            return val;
        },

        htmlAttr: (val) => {
            if(val){
                return val.replace(/[^A-Za-z-]/gi, '');
            }

            return val;
        }
    }
}

const dupCls = (str) => {
    const words = str.split(' ');
    const seen = new Set();
    const result = [];

    for (let i = words.length - 1; i >= 0; i--) {
        if (!seen.has(words[i])) {
            seen.add(words[i]);
            result.push(words[i]);
        }
    }
  
    return result.reverse().join(' ').trim();
}

exports.tag = tag;
exports.dot = dot;
exports.plus = plus;
exports.pipe = pipe;
exports.other = other;
exports.hypen = hypen;
exports.colon = colon;
exports.comma = comma;
exports.space = space;
exports.dupCls = dupCls;
exports.splChar = splChar;
exports.percent = percent;
exports.protocol = protocol;
exports.nonalpha = nonalpha;
exports.multiline = multiline;
exports.nonnumber = nonnumber;
exports.scriptTag = scriptTag;
exports.underscore = underscore;
exports.multiSpace = multiSpace;