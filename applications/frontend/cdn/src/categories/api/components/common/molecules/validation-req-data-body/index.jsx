import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';

import ValidationReqDataValueMap from 'aio-app-ui-api-molecules/validation-req-data-valuemap';
import ValidationReqDataMessages from 'aio-app-ui-api-molecules/validation-req-data-messages';
import ValidationReqDataCheckOptions from 'aio-app-ui-api-atoms/validation-req-data-check-options'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const validation = helpers.json.val(props, 'validation', {});

    const onChange = (arg, map) => {
        if(props.onChange){
            props.onChange(arg, map);
        }
    }


    // 'minlength', 'maxlength', 'lengths', 'regex', 'enums', 'object', 'minvalue', 'maxvalue'

    const ui = () => {
        return (
            <div className='full pd-rl20 bxs grid-wrapper'>

                <div className='grid-w2'>
                    <ValidationReqDataCheckOptions 
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map) => {
                            onChange(arg, map)
                        }}
                    />
                </div>

                
                <div className='full hide'>
                    <ValidationReqDataMessages 
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map) => {
                            onChange(arg, map)
                        }}
                    />
                    
                    <ValidationReqDataValueMap
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map) => {
                            onChange(arg, map)
                        }}
                    />
                </div>
            </div>
        )
    }

    return ui();
}

export default Comp;