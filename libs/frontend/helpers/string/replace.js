const word = (string, word, replace) => {
    let rval = string || '';
    
    if(typeof rval === 'object'){
        return rval;
    }

    if(typeof word === 'object'){
        for(let a in word){
            rval =  rval.replace(new RegExp(a, 'g'), word[a])
        }
    }else if(rval){
        rval = rval.replace(new RegExp(word, 'g'), replace);
    }else if(rval === '' && replace){
        rval = rval+replace;
    }
    
    return rval;
};
    
const kies = (string, arg) => {
    return word(string, arg, false);	
}

exports.word = word;
exports.kies = kies;