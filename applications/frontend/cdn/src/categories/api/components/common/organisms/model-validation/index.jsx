import helpers from 'ui-helpers';
import React from 'react';
import RequestDataValidation from 'aio-app-ui-api-templates/validation-request-data';
import RequestDetails from 'aio-app-ui-api-molecules/model-validation/request-details';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const validation = helpers.json.val(props, 'details.validation', {});

    const onChange = (arg, map, reset) => {
        let d = helpers.json.copy(validation);
                helpers.json.remove(d, map);
            d = helpers.json.set(d, map, arg);

            if(props.onChange){
                props.onChange(d, 'validation');
            }
    }

    const ui = () => {
        return (
            <div className='full'>
                <div className='full mr-b20'>
                    <RequestDetails 
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map, reset) => {onChange(arg, map, reset)}}
                    />
                </div>

                <RequestDataValidation 
                    details={props.details}
                    configs={props.configs}
                    validation={validation}
                    onChange={(arg, map, reset) => {onChange(arg, map, reset)}}
                />
            </div>
        )
    }

    return ui();
}

export default Comp;