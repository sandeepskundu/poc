import React from 'react';
import helpers from 'ui-helpers';
import ValidationReqDataValMap from 'aio-app-ui-api-atoms/validation-req-data-val-map';
import ValidationReqDataValFromOptions from 'aio-app-ui-api-atoms/validation-req-data-val-from-options';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const valuemap = helpers.json.val(props, 'valMapDetails', {});
    const valuemapnode = helpers.json.val(props, 'valueMapNode', 'valuemap');
    const dv = {
        "map":"",
        "from":"",
        "fallback":{
            "map":"",
            "from":""
        }
    }

    const onChangeCb = (arg) => {
        if(props.onChange){
            props.onChange(arg, valuemapnode, true);
        }
    }

    const onChange = (arg, map) => {
        let d = helpers.json.copy(valuemap || {});
            d = helpers.json.merge(dv, valuemap);
            d = helpers.json.merge(d, arg || {})
            onChangeCb(d);
    }

    const options = (type, label) => {
        return (
            <div className='full grid-wrapper bxs'>
                <div className='grid-w3 bxs pd-r20'>
                    <ValidationReqDataValFromOptions
                        type={type}
                        label={label+' from'}
                        valuemap={valuemap}
                        details={props.details}
                        configs={props.configs}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </div>
                <div className='grid-w9 bxs'>
                    <ValidationReqDataValMap 
                        type={type}
                        label={label+' map'}
                        valuemap={valuemap}
                        details={props.details}
                        configs={props.configs}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </div>
            </div>
        )
    }

    const fallback = () => {
        let m = helpers.json.val(valuemap, 'map', '');
        let f = helpers.json.val(valuemap, 'from', '');

        if(f && m){
            return (
                <div className='full bxs pd-t30'>
                    {options('fallback', 'Fallback value')}
                </div>
            );
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                {options('from', 'Value')}
                {fallback()}
            </div>
        )
    }

    return ui();
}

export default Comp;