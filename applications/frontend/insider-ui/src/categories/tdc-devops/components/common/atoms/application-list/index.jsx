import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const current = helpers.json.val(props, 'selected.id');
    const options = helpers.json.val(props, 'configs.application.list', {});

    const onSelect = (e, arg) => {
        if(props.onChange){
            props.onChange(arg);   
        }
    }

    const ui = () => {
        return (
            <SelectBox
                list={options}
                noBlank={true}
                selected={current}
                selectBoxProps={{
                    onSelect:onSelect,
                    label:'Applications',
                }}
            />
        )
    }

    return ui();
}

export default Comp;