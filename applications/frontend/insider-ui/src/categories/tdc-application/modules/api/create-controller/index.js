import helpers from 'ui-helpers';

const urls = {
    controller:'/api/tdc-backend/apiSchema/details/v1/controller/create',
    others:'/api/tdc-backend/apiSchema/childDetails/v1/controller/create'
}

const url = () => {
    let type = helpers.json.val(_siteProps_, 'router.params.type', '');

    if(type === 'controller'){
        return urls.controller;
    }else{
        return urls.others;
    }
}

const refine = (arg) => {
    let type = helpers.json.val(_siteProps_, 'router.params.type', '');

    if(type === 'controller'){
        delete arg.parentId
    }

    return {
        request:{
            data:arg
        }
    }
}

const init = (callback, details) => {
    if(callback){
        const rq = refine(details);
        const conf = helpers.json.merge({
            request:{
                url:url(),
                method:'post'
            },
            onResponse:(resp, arg) => {
                callback(resp);
            }
        }, rq);

        helpers.request.ui.init(conf);
    }
}

export default {
    init:init
}