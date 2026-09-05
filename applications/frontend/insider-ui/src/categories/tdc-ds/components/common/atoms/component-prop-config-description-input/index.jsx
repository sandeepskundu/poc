import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';

const PropDescription = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'details.aioDsConfigs.description';
    const details = helpers.json.val(props, 'data', {});

    const onChange = (e) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(e, 'target.value', '');
            d = helpers.json.set(details, map, val);

        if(props.onUpdate){
            props.onUpdate(d);
        }
    }

    return (
        <Input
            label="Description"
            onChange={(e) => {onChange(e)}}
            value={helpers.json.val(details, map)}
        />
    )
}

export default PropDescription;