import React from 'react';
import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = helpers.json.val(props, 'map', '');

    const onChange = (e) => {
        if(props.onChange){
            props.onChange(helpers.json.val(e, 'target.value', ''), map);   
        }
    }

    const ui = () => {
        return (
            <Input
                label='Application inspect at port'
                onChange={(e) => {onChange(e)}}
                value={helpers.json.val(props, `details.${map}`, '')}
            />
        )
    }

    return ui();
}

export default Comp;