import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const options = (() => {
        let rv = [];
        let cols = helpers.json.val(props, 'configs.validation.checks.required', {});

        for(const a in cols){
            rv.push({
                id:cols[a].id || a,
                label:cols[a].label || a
            });
        }

        return rv;
    })();    

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
                selected={props.selected || ''}
                selectBoxProps={{
                    onSelect:onSelect,
                    label:props.label,
                }}
            />
        )
    }

    return ui();
}

export default Comp;