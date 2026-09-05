import React from 'react';
import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const onChange = (e) => {
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.remove.nonnumber(val);

            if(props.onChange){
                props.onChange(val);
            }
    }

    const ui = () => {
        return (
            <Input
                pattern="number"
                label='Cache unit'
                value={props.selected}
                onChange={(e) => {onChange(e)}}
            />
        )
    }

    return ui();
}

export default Comp;