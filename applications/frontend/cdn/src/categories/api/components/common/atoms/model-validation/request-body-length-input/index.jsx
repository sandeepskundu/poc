import React from 'react';
import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type');
    const validation = helpers.json.val(props, 'validation', {});

    const onChange = (e) => {
        let d = helpers.json.copy(validation);
        let val = helpers.json.val(e, 'target.value', '');

            if(val){
                val = parseInt(val);
            }

            d[type] = val;

            if(props.onChange){
                props.onChange(d);
            }
    }

    return (
        <div className='full bxs'>
            <Input
                pattern="number"
                label={props.label}
                min={type === 'min'?1:validation.min}
                max={type === 'max'?200:validation.max}
                value={helpers.json.val(validation, type)}
                onChange={(e) => {onChange(e)}}
            />
        </div>
    )
}

export default Comp;