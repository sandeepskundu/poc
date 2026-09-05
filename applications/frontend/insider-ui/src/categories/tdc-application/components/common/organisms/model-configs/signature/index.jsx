
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import MergeSwitch from 'aio-app-ui-tdc-application-atoms/model-signature/merge-switch';
import CreationSwitch from 'aio-app-ui-tdc-application-atoms/model-signature/creation-switch';
import CreationNodes from 'aio-app-ui-tdc-application-molecules/model-config/signature/creation-nodes';

const ValidationDetailsMapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const onChange = (val, map, reset) => {
        if(map){
            let d = helpers.json.val(props, 'modified', {});

                if(reset){
                    helpers.json.remove(d, map);
                }
            
                d = helpers.json.set(d, map, val, false, true);

                if(props.onChange){
                    props.onChange(d, 'signature');
                }
        }
    }

    const creationOpts = () => {
        const cr = helpers.json.val(props, 'modified.creation.enable')

        if(cr){
            return (
                <CreationNodes 
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg) => {onChange(arg, 'creation.nodes', true)}}
                    node={helpers.json.val(props, 'modified.creation.nodes', {})}
                />
            )
        }
    }

    const creation = () => {
        return (
            <li className='full bxs'>
                <CreationSwitch
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg) => {onChange(arg, 'creation.enable')}}
                />
                {creationOpts()}
            </li>
        )
    }

    const merge = () => {
        return (
            <li className='full bxs pd-b20'>
                <MergeSwitch
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg) => {onChange(arg, 'merge.enable')}}
                />
            </li>
        )
    }

    const ui = () => {
        return (
            <ul className='full bxs pd-t6 pd-b18 pd-rl12'>
                {merge()}
                {creation()}
            </ul>
        )
    }

    return ui();
}


export default ValidationDetailsMapper;