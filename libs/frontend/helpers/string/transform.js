const remove = require('./remove');
const replace = require('./replace');

const paragraph = (val) => {
    if(val){
        val = val.replace(/\s\s+/g, ' ')
    }

    if(val){
        val = val.trim();
    }
    
    return val;
}

const jsonKeyMap = (val) => {
    if(val){
        val = replace.word(val, '__d__', '.')
    }

    if(val){
        val = val.replace(/\.+/g, ".");
    }

    if(val){
        val = val.replace(/^\.|\.$/g, "");
    }
    
    return val;
}

const to = {
    jsonKeyMap:jsonKeyMap,
    paragraph:paragraph,
    number:remove.nonnumber,
    alphabet:remove.nonalpha,
}

const uppercase = (val) => {
    if(val){
        return val.toUpperCase();
    }

    return val;
}

const lowercase = (val) => {
    if(val){
        return val.toLowerCase();
    }

    return val;
}

const camelize = (val) => {
    if(val){
        val = val.replace(/\s\s+/g, ' ')
    }

    if(val){
        let rv = [];
            val.split(' ').map((arg) => {
                rv.push(arg.charAt(0).toUpperCase() + arg.slice(1))
            });

        return rv.join(' ')
    }

    return val;
}

exports.to = to;
exports.camelize = camelize;
exports.lowercase = lowercase;
exports.uppercase = uppercase;