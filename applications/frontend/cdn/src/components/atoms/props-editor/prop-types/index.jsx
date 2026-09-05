import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const config = helpers.json.val(props, 'details.config');
    const selected =  helpers.json.val(props, `details.config.type`);
    const options = helpers.json.val(props, 'configs.props.types', {});

    const map = () => {
        let sel = helpers.json.val(props, 'selected', []);
        let rsel = [...sel]
            rsel.push('config')
        return rsel;
    }

    const onChange = (el, arg, i) => {
        let d = helpers.json.copy(config);
            d.type = helpers.json.val(arg, 'id', '');

        if(props.onChange){
            props.onChange(d, map(), 'prop-type');
        }
    }

    return (
        <SelectBox 
            list={options}
            noBlank={true}
            selected={selected || ''} 
            selectBoxProps={{
                onSelect:onChange,
                "label":"Prop type",
            }}
        />
    )
}

export default PropTypes;