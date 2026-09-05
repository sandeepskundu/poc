const toRemPorps = {
    'font-size':true,
    'line-height':true,
    'margin-top':true,
    'margin-right':true,
    'margin-bottom':true,
    'margin-left':true,
    'padding-top':true,
    'padding-right':true,
    'padding-bottom':true,
    'padding-left':true,
}

exports.toRem = (name, val) => {
    if(name && toRemPorps[name]){
        try { 
            return `rem(${parseInt(val)})`
        } catch (error) {
            return val;
        }
    }else{
        return val;
    }
}