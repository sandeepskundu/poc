import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import React, {useEffect, createElement, useMemo} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = props.details || {};

    const onChange = (checked) => {
        let d = helpers.json.copy(details)
            d.hasDesignSystem = checked;
        
        if(props.onChange){
            props.onChange(d);
        }
    }

    return (
        <div className='full bxs'>
            <Toggle 
                label='Create design system'
                checked={details.hasDesignSystem}
                onChange={(checked) => {
                    onChange(checked);
                }}
            />
        </div>
    )
}

export default Comp;