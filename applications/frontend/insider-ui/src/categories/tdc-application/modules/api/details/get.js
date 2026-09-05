import helpers from 'ui-helpers';
import defaultConfigs from './configs';

const ui = (rval, props, details) => {
    if(details){
        rval = helpers.json.merge(rval, defaultConfigs.ui);
        rval = helpers.json.merge(rval, details);
    }else{
        rval = helpers.json.merge(rval, defaultConfigs.ui);
    }

    return rval;
}

const api = (rval, props, details) => {
    if(details){
        rval = helpers.json.merge(rval, details);
    }else{
        rval = helpers.json.merge(rval, defaultConfigs.api);
    }

    return rval;
}

const init = (props, callback, details) => {
    let d = helpers.json.copy(defaultConfigs.common);
    let appType = helpers.json.val(details, 'appConfig.category');

    switch (appType) {
        case 'ui':
            d = ui(d, props, details);
        break;
        case 'api':
            d = api(d, props, details);
        break;
        default :
            
    }

    if(callback){
        callback(d);
    }
}

export default {
    init:init
}