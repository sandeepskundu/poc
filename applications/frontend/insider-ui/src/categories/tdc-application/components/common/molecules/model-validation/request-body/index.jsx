import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import RequestBodyDataType from 'aio-app-ui-tdc-application-atoms/model-validation/request-body-data-types';
import RequestBodyLengthInput from 'aio-app-ui-tdc-application-atoms/model-validation/request-body-length-input';
import RequestBodyRequired from 'aio-app-ui-tdc-application-atoms/model-validation/request-body-required-options';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'validation.body', {});
    const type = helpers.json.val(props, 'validation.body.type', '');

    const onChange = (arg) => {
        let d = helpers.json.val(details);
            d = {...d, ...arg};
            if(props.onChange){
                props.onChange(d);
            }
    }

    const minMax = () => {
        if(type === 'list'){
            return (
                <li className='bxs grid-wrapper grid-layout-2 grid-w3'>
                    <div className='grid pd-r10 bxs'>
                        <RequestBodyLengthInput
                            type="min"
                            label="Minimum"
                            validation={details}
                            details={props.details}
                            configs={props.configs}
                            onChange={(arg) => {onChange(arg)}}
                        />
                    </div>
                    <div className='grid pd-l10 bxs'>
                        <RequestBodyLengthInput
                            type="max"
                            label="Maximum"
                            validation={details}
                            details={props.details}
                            configs={props.configs}
                            onChange={(arg) => {onChange(arg)}}
                        />
                    </div>
                </li>
            )
        }
    }

    const ui = () => {
        return (
            <ul className='grid-wrapper pd-b18'>
                <li className='pd-r20 bxs grid-w2'>
                    <RequestBodyRequired 
                        validation={details}
                        details={props.details}
                        configs={props.configs}
                        onChange={(arg) => {
                            onChange(arg)
                        }}
                    />
                </li>
                <li className='pd-r20 bxs grid-w2'>
                    <RequestBodyDataType 
                        validation={details}
                        details={props.details}
                        configs={props.configs}
                        onChange={(arg) => {
                            onChange(arg)
                        }}
                    />
                </li>
                {minMax()}
            </ul>
        )
    }

    return ui();
}

export default Comp;