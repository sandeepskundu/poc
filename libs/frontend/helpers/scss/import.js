const add = (rv, file) => {
    if(file){
        file = file.replace(new RegExp('.scss', "g"), '');
        if(file){
            if(rv){
                return `${rv}\n@import "${file}";`
            }else{
                return `@import "${file}";`
            }
        }
    }

    return rv;
}

exports.add = add;