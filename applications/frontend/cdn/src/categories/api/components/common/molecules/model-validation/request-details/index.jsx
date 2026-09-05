import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';

import RequestBody from 'aio-app-ui-api-molecules/model-validation/request-body';
import RequestMethods from 'aio-app-ui-api-atoms/model-validation/request-methods';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const validation = helpers.json.val(props, 'validation.request', {});
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onChange = (arg, map) => {
        if(props.onChange){
            props.onChange(arg, map);
        }
    }

    const ui = () => {
        return (
            <div className='full'>
                <RequestMethods 
                    validation={validation}
                    details={props.details}
                    configs={props.configs}
                    onChange={(arg) => {
                        onChange(arg, 'request.methods')
                    }}
                />

                <RequestBody 
                    validation={validation}
                    details={props.details}
                    configs={props.configs}
                    onChange={(arg) => {
                        onChange(arg, 'request.body')
                    }}
                />
            </div>
        )
    }

    return ui();
}

export default Comp;