
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import PaginationSwitch from 'aio-app-ui-tdc-application-atoms/model-pagination/pagination-switch';
import PaginationLimitInput from 'aio-app-ui-tdc-application-atoms/model-pagination/pagination-limit-input';

const ValidationDetailsMapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const onChange = (val, map) => {
        if(map){
            let d = helpers.json.val(props, 'modified', {});
                d = helpers.json.set(d, map, val, false, true);

                if(map === 'enable' && val){
                    d.limit = {
                        "min":1,
                        "max":10,
                        "default":5
                    }
                }else{
                    if(map === 'enable'){
                        delete d.limit;
                    }
                }

                if(props.onChange){
                    props.onChange(d, 'pagination');
                }
        }
    }

    const appList = () => {
        return (
            <li className='grid pd-r10 bxs'>
                <PaginationSwitch
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg) => {onChange(arg, 'enable')}}
                />
            </li>
        )
    }

    const limits = () => {
        let enable = helpers.json.val(props, 'modified.enable');

        if(enable){
            return (
                <>
                    <li className='grid pd-rl10 bxs'>
                        <PaginationLimitInput
                            min={1}
                            label="Minimum"
                            details={props.details}
                            configs={props.configs}
                            modified={props.modified}
                            editable={props.editable}
                            onChange={(arg) => {onChange(arg, 'limit.min')}}
                            max={helpers.json.val(props, 'modified.limit.max')}
                            value={helpers.json.val(props, 'modified.limit.min')}
                        />
                    </li>
                    <li className='grid pd-rl10 bxs'>
                        <PaginationLimitInput
                            min={1}
                            max={10000}
                            label="Maximum"
                            details={props.details}
                            configs={props.configs}
                            modified={props.modified}
                            editable={props.editable}
                            onChange={(arg) => {onChange(arg, 'limit.max')}}
                            value={helpers.json.val(props, 'modified.limit.max')}
                        />
                    </li>
                    <li className='grid pd-rl10 bxs'>
                        <PaginationLimitInput
                            label="Default"
                            details={props.details}
                            configs={props.configs}
                            modified={props.modified}
                            editable={props.editable}
                            min={helpers.json.val(props, 'modified.limit.min')}
                            max={helpers.json.val(props, 'modified.limit.max')}
                            onChange={(arg) => {onChange(arg, 'limit.default')}}
                            value={helpers.json.val(props, 'modified.limit.default')}
                        />
                    </li>
                </>
            )
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs grid-wrapper grid-layout-6 pd-b18 pd-t6 pd-rl10'>
                {appList()}
                {limits()}
            </ul>
        )
    }

    return ui();
}


export default ValidationDetailsMapper;