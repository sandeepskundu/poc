import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import UiApplicationWebCacheTime from 'aio-app-ui-application-atoms/ui-application-web-cache-number';
import UiApplicationWebCacheNumberType from 'aio-app-ui-application-atoms/ui-application-web-cache-number-type';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const appConfig = helpers.json.val(props, 'details.appConfig', {});
    const time = helpers.json.val(props, 'details.appConfig.appWebCacheTime', '');
    const alpha = helpers.string.remove.nonalpha(time);
    const number = helpers.string.remove.nonnumber(time);

    const onChange = (val, type) => {
        let rv = [];

        if(type === 'time'){
            rv.push(val);
            rv.push(alpha)
        }else{
            rv.push(number);
            rv.push(val)
        }

        appConfig.appWebCacheTime = rv.join('');

        if(props.onChange){
            props.onChange(appConfig);
        }
    }

    const ui = () => {
        return (
            <div className='full grid-wrapper grid-layout-4 bxs pd-tb20'>
                <li className='grid bxs pd-r20'>
                    <UiApplicationWebCacheTime
                        selected={number}
                        details={props.details}
                        configs={props.configs}
                        onChange={(val) => {onChange(val, 'time')}}
                    />
                </li>
                <li className='grid bxs pd-r20'>
                    <UiApplicationWebCacheNumberType
                        selected={alpha}
                        details={props.details}
                        configs={props.configs}
                        onChange={(val) => {onChange(val, 'type')}}
                    />
                </li>
            </div>
        )
    }

    return ui()
}

export default Comp;