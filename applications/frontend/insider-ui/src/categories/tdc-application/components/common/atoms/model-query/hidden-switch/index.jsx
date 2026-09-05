import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import React, {useEffect, createElement, useMemo} from 'react';

const MergeSwitch = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const onChange = (checked) => {
        if(props.onChange){
            props.onChange(checked);
        }
    }

    const enabled = () => {
        return helpers.json.val(props, 'modified.hidden.enable');
    }

    return (
        <div className='full bxs'>
            <Toggle 
                label={'Hidden Query'}
                checked={enabled()}
                onChange={(checked) => {
                    onChange(checked);
                }}
            />
        </div>
    )
}

export default MergeSwitch;