import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';

const PropDescription = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const config = helpers.json.val(props, 'details.config');
    const value =  helpers.json.val(props, `details.config.description`);

    const map = () => {
        let sel = helpers.json.val(props, 'selected', []);
        let rsel = [...sel]
            rsel.push('config')
        return rsel;
    }

    const onChange = (e) => {
        let d = helpers.json.copy(config);
            d.description = helpers.json.val(e, 'target.value', '');

        if(props.onChange){
            props.onChange(d, map(), 'description');
        }
    }

    return (
        <Input 
            value={value}
            label="Description"
            onChange={(e) => {onChange(e)}}
        />
    )
}

export default PropDescription;