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

const express = (rval, props, details) => {
    if(details){
        rval = helpers.json.merge(rval, details);
    }else{
        rval = helpers.json.merge(rval, defaultConfigs.express);
    }

    return rval;
}

const init = (props, callback, details) => {
    let d = helpers.json.copy(defaultConfigs.common);
    let appType = helpers.json.val(details, 'appConfig.applicationType');

    switch (appType) {
        case 'ui':
            d = ui(d, props, details);
        break;
        case 'express':
            d = express(d, props, details);
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