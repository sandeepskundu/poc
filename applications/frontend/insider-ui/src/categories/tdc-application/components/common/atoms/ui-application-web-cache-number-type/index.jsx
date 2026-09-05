import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const current = helpers.json.val(props, 'selected', '');
    const options = helpers.json.val(props, 'configs.cacheDurType', {}); 

    const onSelect = (e, arg) => {
        const id = helpers.json.val(arg, 'id', '');

        if(props.onChange){
            props.onChange(id);   
        }
    }

    const ui = () => {
        return (
            <SelectBox
                noBlank={true}
                list={options}
                selected={current}
                selectBoxProps={{
                    onSelect:onSelect,
                    label:'Cache unit type',
                }}
            />
        )
    }

    return ui();
}

export default Comp;