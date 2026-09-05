import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import React, {useEffect, createElement, useMemo} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'scssConfig.hasDesignSystem';

    const onChange = (checked) => {
        let d = helpers.json.copy(props.details)
            d = helpers.json.set(d, map, checked, false, true);

            if(props.onChange){
                props.onChange(d);
            }
    }

    return (
        <div className='full bxs'>
            <Toggle 
                label='Create design system'
                onChange={(checked) => {onChange(checked)}}
                checked={helpers.json.val(props.details, map)}
            />
        </div>
    )
}

export default Comp;