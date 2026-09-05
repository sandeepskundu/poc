import React from 'react';
import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const required = helpers.json.val(props, 'required', {});

    const resetValue = () => {
        return props.resetValue || '';
    }

    const onToggle = (checked) => {
        let d = helpers.json.copy(required);
            d = helpers.json.set(d, 'value', resetValue(), false, true);
            d = helpers.json.set(d, 'uivalue', resetValue(), false, true);
            d = helpers.json.set(d, 'bothAreSame', checked, false, true);

            if(props.onChange){
                props.onChange(d);
            }
    }

    const ui = () => {
        return (
            <div className='grid-w3 pd-r16'>
                <Toggle
                    label={'UI and API checks are same'}
                    onChange={(checked) => {onToggle(checked)}}
                    checked={helpers.json.val(required, 'bothAreSame')} 
                />
            </div>
        )
    }

    return ui();
}

export default Comp;