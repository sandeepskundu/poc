import React from 'react';
import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import ValidationReqDataValMap from 'aio-app-ui-api-atoms/validation-req-data-val-map';
import ValidationReqDataValFromOptions from 'aio-app-ui-api-atoms/validation-req-data-val-from-options';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const valuemap = helpers.json.val(props, 'validation.valuemap', {});
    const dv = {
        "map":"",
        "from":"",
        "fallback":{
            "map":"",
            "from":""
        }
    }

    const isSelfDefined = (type, val) => {
        if(type){
            return (helpers.json.val(valuemap, 'selfMapped') === val);
        }else{
            return (helpers.json.val(valuemap, 'selfMapped') === true);
        }
        
    }

    const onChangeCb = (arg) => {
        if(props.onChange){
            props.onChange(arg, 'valuemap', true);
        }
    }

    const onChange = (arg, map) => {
        let d = helpers.json.copy(valuemap || {});
            d = helpers.json.merge(dv, valuemap);
            d = helpers.json.merge(d, arg || {})
            onChangeCb(d);
    }

    const onToggle = (checked, remove) => {
        if(remove){
            onChangeCb({});
        }else{
            onChangeCb({
                selfMapped:checked
            });
        }
    }

    const options = (type, label) => {
        return (
            <div className='full grid-wrapper bxs pd-t30'>
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
            return options('fallback', 'Fallback value');
        }else{
            return <></>
        }
    }

    const details = () => {
        const no = isSelfDefined(true, false);

        if(no){
            return (
                <div className='full bxs'>
                    {options('from', 'Value')}
                    {fallback()}
                </div>
            )
        }else{
            return <></>
        }
    }

    const selfmap = () => {
        return (
            <ul className='full bxs flx-vc pd-t26'>
                <li className='pd-r24'>Data mapping is same as node name?</li>
                <li className='pd-r24'>
                    <Toggle 
                        label={'Yes'}
                        checked={isSelfDefined(true, true)}
                        onChange={(checked) => {
                            onToggle(checked, !checked);
                        }}
                    />
                </li>
                <li className='pd-r24'>
                    <Toggle 
                        label={'No'}
                        checked={isSelfDefined(true, false)}
                        onChange={(checked) => {
                            onToggle(false, !checked);
                        }}
                    />
                </li>
            </ul>
        )
    }

    // 'minlength', 'maxlength', 'lengths', 'regex', 'enums', 'object', 'minvalue', 'maxvalue'

    const ui = () => {
        return (
            <div className='full bxs'>
                {selfmap()}
                {details()}
            </div>
        )
    }

    return ui();
}

export default Comp;