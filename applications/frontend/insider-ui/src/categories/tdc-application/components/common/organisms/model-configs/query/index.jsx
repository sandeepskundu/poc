
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import HiddenSwitch from 'aio-app-ui-tdc-application-atoms/model-query/hidden-switch';
import RuntimeSwitch from 'aio-app-ui-tdc-application-atoms/model-query/runtime-switch';
import HiddenColumns from 'aio-app-ui-tdc-application-molecules/model-config/query/hidden-columns';
import RuntimeConfigs from 'aio-app-ui-tdc-application-molecules/model-config/query/runtime-configs';

const ModelQuery = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const onChange = (val, map, reset) => {
        if(map){
            let d = helpers.json.val(props, 'modified', {});

            if(reset){
                helpers.json.remove(d, map);
            }
        
            d = helpers.json.set(d, map, val, false, true);

            if(props.onChange){
                props.onChange(d, 'query');
            }
        }
    }

    const runtimeOpts = () => {
        const cr = helpers.json.val(props, 'modified.runtime.enable')

        if(cr){
            return (
                <div className='full bxs pd-t20'>
                    <RuntimeConfigs
                        {...props}
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {onChange(arg, 'runtime.configs', true)}}
                        query={helpers.json.val(props, 'modified.runtime.configs', {})}
                    />
                </div>
            )
        }
    }

    const runtime = () => {
        return (
            <li className='full bxs pd-b6'>
                <RuntimeSwitch
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg) => {
                        if(!arg){
                            let d = helpers.json.val(props, 'modified', {});
                                //helpers.json.remove(d, 'runtime.configs');
                                d = helpers.json.set(d, 'runtime.enable', false, false, true);
                                onChange(d.runtime, 'runtime');
                        }else{
                            onChange(arg, 'runtime.enable');
                        }
                    }}
                />
                {runtimeOpts()}
            </li>
        )
    }

    const hiddenOpts = () => {
        const on = helpers.json.val(props, 'modified.hidden.enable');
        if(on){
            return (
                <HiddenColumns 
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg, item) => {
                        if(!arg){
                            let d = helpers.json.val(props, 'modified', {});
                                helpers.json.remove(d, 'hidden.configs.columns');
                                d = helpers.json.set(d, 'hidden.enable', false, false, true);
                                onChange(d.hidden, 'hidden', true);
                        }else{
                            onChange(arg, 'hidden.configs.columns', true);
                        }
                    }}
                />
            )
        }
    }

    const hidden = () => {
        return (
            <li className='full bxs pd-b16'>
                <HiddenSwitch
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg) => {
                        if(!arg){
                            let d = helpers.json.val(props, 'modified', {});
                                helpers.json.remove(d, 'hidden.configs.columns');
                                d = helpers.json.set(d, 'hidden.enable', false, false, true);
                                onChange(d.hidden, 'hidden', true);
                        }else{
                            onChange(arg, 'hidden.enable');
                        }
                    }}
                />
                {hiddenOpts()}
            </li>
        )
    }

    const ui = () => {
        return (
            <>
                <ul className='full bxs'>
                    {hidden()}
                    {runtime()}
                </ul>
            </>
        )
    }

    return ui();
}


export default ModelQuery;