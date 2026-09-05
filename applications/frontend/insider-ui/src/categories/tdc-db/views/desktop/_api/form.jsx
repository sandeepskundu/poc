import helpers from 'ui-helpers';
import React, {useState, useEffect, useRef} from 'react';

const FormWrapper = (dprops) => {
    // const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops);

    const props = helpers.element.jsx.props.define({}, dprops);
    
    const childs = props.children;
    const eventBus = new helpers.event.bus();
    const formConfig = helpers.json.val(props, 'formConfig', {});
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const ids = {
        fromId:helpers.json.val(formConfig, 'ids.fromId' , helpers.random.uuid()),
        eventId:helpers.json.val(formConfig, 'ids.fromId' , helpers.random.uuid()),
        storeId:helpers.json.val(formConfig, 'ids.storeId' , helpers.random.uuid()),
        submitId:helpers.json.val(formConfig, 'ids.submitId' , helpers.random.uuid()),
    }

    const fConf = {...formConfig, ...{
        ids:ids,
        validation:{},
        eventBus:{
            dispatch:eventBus.dispatch.bind(eventBus)
        }
    }}    

    const childProps = (() => {
        let rprops = {...props};
        let fconfig = {...fConf};
        let data = helpers.json.val(fconfig, 'data', {});
            delete fconfig.data;
            delete rprops.children;
            return {...{...rprops, ...data}, ...{formConfig:fconfig}};
    })();

    const [cprops, setChildProps] = useState(childProps);

    const url = (rval, details, requestDetails) => {
        let action = helpers.json.val(details, 'action');
        let aconf = helpers.json.val(cprops, 'formConfig.urls', {});
            rval.request = rval.request || {};
            rval.request.url = aconf[action];

        return rval;
    }

    const mergeRequest = (rval, arg, reqD) => {
        rval = helpers.json.merge((rval || {}), (reqD || {}));


        return rval;
    }

    const postOnResponseCallback = (resp, arg1, agr2) => {
        setChildProps({...cprops, ...resp});
    }

    const onResponse = (resp, config) => {
        let callback = helpers.json.val(cprops, 'formConfig.callbacks.onResponse');
        if(callback){
            callback(resp, config, postOnResponseCallback)
        }
    }

    const aconf = (arg) => {
        let action = helpers.json.val(arg, 'action', 'fetch');
        let dconf = helpers.json.val(cprops, 'formConfig.ajaxConfig.default', {});
        let aconf = helpers.json.val(cprops, `formConfig.ajaxConfig.${action}`, {});
        return {...dconf, ...aconf};
    }

    const ajax = (arg) => {
        let reqD = helpers.json.val(arg, 'reqDetails', {});
        let ajx = aconf(arg);;
            ajx = url(ajx, arg, reqD);
            ajx.onResponse = onResponse;
            ajx = mergeRequest(ajx, arg, reqD);
            ajx = helpers.json.merge(ajx, reqD);
            ajx.extra = {
                action:helpers.json.val(arg, 'action')
            };
            helpers.request.ui.init(ajx);
    }

    eventBus.create(fConf.ids.eventId, (data, config) => {
        const action = helpers.json.val(data, 'action');

        switch (action) {
            case 'create':
            case 'fetch':
            case 'update':
                ajax(data)
            break;
            default:
            break;
        };

        
    });

    useEffect(() => {
        if(fristRender){
            ajax({
                action:'fetch'
            });
        }
    }, [props]);

    const ui = () => {
        return React.cloneElement(childs, {...cprops});
    }

    return ui();

}

export default FormWrapper;