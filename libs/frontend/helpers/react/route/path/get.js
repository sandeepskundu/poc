const phelpers = require('./helpers');
const url = require('./../../../url')

const pagePath = (page, arg, sprops) => {

    if(page){
        let rurl = '';
        let rval = [];
        let base = phelpers.pathTillCategory(sprops);

        if(base){
            rval.push(base);
        }

        if(page){
            rval.push(page);
        }

        if(rval.length){
            rurl = `/${rval.join('/')}`;
        }else{
            rurl = '/';
        }

        return url.sanitize(rurl);
    }else{
        return '#';
    }
    
}

exports.pagePath = pagePath;