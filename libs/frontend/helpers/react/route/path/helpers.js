const json = require('./../../../json');

const siteProps = (sprops) => {
    return sprops || _siteProps_;
}

const pathTillCategory = (sprops) => {
    const rval = []
    const props = siteProps(sprops);
    const prefix = json.val(props, 'appProps.pathPrefix');
    const category = json.val(props, 'flow.category.name');

    if(prefix){
        rval.push(prefix);
    }

    if(category){
        rval.push(category);
    }

    if(rval.length){
        return `/${rval.join('/')}`;
    }else{
        return '/';
    }
}

exports.pathTillCategory = pathTillCategory;