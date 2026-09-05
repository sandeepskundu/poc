import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import UiApplicationScssThemeSwitches from 'aio-app-ui-tdc-application-molecules/ui-application-scss-theme-switches';
import UiApplicationScssRuntimeAdditionalDataMap from 'aio-app-ui-tdc-application-molecules/ui-application-scss-runtime-additional-data-map'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'scssConfig';
    const details = props.details;
    
    /*--
        
        appConfig:{
            entries:{},
            alias:{},
            appWebCacheTime:"5d",
        },
        scssConfig:{
            hasTheme:true,
            hasDesignSystem:true,
            additionalData:{
                "$sandeep":"kundu"
            },
            additionalDataMap:{
                $fontsCdnPath:"appConfig.fontsCdnPath",
                $pathPrefix:"appConfig.pathPrefix",
                $imagesCdnPath:"appConfig.imagesCdnPath",
                $assetsCdnPath:"appConfig.assetsCdnPath"
            }
        },

    ---*/

    const onChange = (val, map, reset) => {
        let d = helpers.json.copy(details);
                helpers.json.remove(d, map);
            d = helpers.json.set(d, map, val, false, true);

            if(props.onChange){
                props.onChange(d, reset);
            }
    }

    const ui = () => {
        return (
            <ul className='full bxs bxs'>
                <li className='full pd-tb16 bxs'>
                    <UiApplicationScssThemeSwitches
                        configs={props.configs}
                        expended={props.expended}
                        onExpend={props.onExpend}
                        valuemap={[...props.valuemap]}
                        onChange={(d) => {onChange(d, map, true)}}
                        details={helpers.json.val(props, 'details.scssConfig', {})}
                    />
                </li>
                <li>
                    <UiApplicationScssRuntimeAdditionalDataMap
                        configs={props.configs}
                        expended={props.expended}
                        onExpend={props.onExpend}
                        valuemap={[...props.valuemap]}
                        onChange={(d) => {onChange(d, map, true)}}
                        details={helpers.json.val(props, 'details.scssConfig', {})}
                    />
                </li>
            </ul>
        )
    }

    return ui()
}

export default Comp;