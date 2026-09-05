import helpers from 'ui-helpers';

const urls = {
    create:'/api/tdc-backend/apiSchema/details/v1/method/create',
    update:'/api/tdc-backend/apiSchema/details/v1/method/update/:_id_:'
}

const method = () => {
    let type = helpers.json.val(_siteProps_, 'router.params.type');

    if(type === 'create'){
        return 'post'
    }else{
        return 'put'
    }
}

const url = () => {
    const type = helpers.json.val(_siteProps_, 'router.params.type');

    if(type === 'create'){
        return urls.create;
    }else{
        return urls.update;
    }
}

const refine = (arg) => {
    const type = helpers.json.val(_siteProps_, 'router.params.type');

    if(type === 'create'){
        delete arg.id;
        delete arg.signature;
    }

    const rval = {
        request:{
            data:arg
        }
    }

    if(type === 'create'){
        return rval;
    }else{
        return helpers.json.merge(rval, {
            request:{
                params:{
                    id:helpers.json.val(arg, 'id')
                }
            }
        });
    }
}

const init = (details) => {
    const rq = refine(details);
    const conf = helpers.json.merge({
        request:{
            url:url(),
            method:method()
        },
        onResponse:(resp, arg) => {
            let valid = helpers.json.val(resp, 'valid');

            if(valid){
                let data = helpers.json.val(resp, 'data');
                let type = helpers.json.val(_siteProps_, 'router.params.type');

                if(type === 'update'){
                    window.location.reload();
                }else{
                    helpers.url.route.redirect('tdc-application.method', {
                        params:{
                            mode:'api',
                            type:'update',
                            appId:helpers.json.val(data, 'appId', ''),
                            methodId:helpers.json.val(data, 'hashId', ''),
                            parentId:helpers.json.val(data, 'parentId', '')
                        }
                    });
                }
            }else{
                alert("Opps! We can't perform action on method, pls try again.")
            }
        }
    }, rq);

    helpers.request.ui.init(conf);
}

export default {
    init:init
}