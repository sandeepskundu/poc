import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import React, {useEffect, createElement, useMemo} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const onChange = (checked) => {
        if(props.onChange){
            props.onChange(checked);
        }
    }

    return (
        <div className='full bxs'>
            <Toggle 
                label={props.label}
                checked={props.checked}
                onChange={(checked) => {
                    onChange(checked);
                }}
            />
        </div>
    )
}

export default Comp;