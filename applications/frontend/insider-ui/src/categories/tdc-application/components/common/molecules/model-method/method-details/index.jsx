import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import MethodOptions from 'aio-app-ui-tdc-application-atoms/model-method/method-options';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'details.method', {});
    const type = helpers.json.val(props, 'validation.body.type', '');

    const onChange = (arg) => {
        let d = helpers.json.val(details);
            d = {...d, ...arg};
            if(props.onChange){
                props.onChange(d);
            }
    }

    const ui = () => {
        return (
            <ul className='grid-wrapper grid-layout-5 pd-tb24'>
                <li className='pd-r20 bxs grid'>
                    <MethodOptions
                        details={props.details}
                        configs={props.configs}
                        onChange={(arg) => {
                            onChange(arg)
                        }}
                    />
                </li>
            </ul>
        )
    }

    return ui();
}

export default Comp;