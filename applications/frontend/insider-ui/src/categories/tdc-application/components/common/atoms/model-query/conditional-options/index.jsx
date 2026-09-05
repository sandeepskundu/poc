import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const LogicalOptions = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const current = (() => {
        let m = helpers.json.val(props, 'map', []);
            m = m.pop(-1);
            return m || '';
    })();

    const options = helpers.json.val(props, 'configs.model.query.conditions', {});

    const onSelect = (e, arg) => {
        if(props.onChange){
            props.onChange(arg);   
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
                    "label":"Select condition",
                }}
            />
        )
    }

    return ui();
}

export default LogicalOptions;