import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const ValidationActions = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const options = helpers.json.val(props, 'configs.controller.routes', {});

    const modified =  helpers.json.val(props, 'modified', {});
    const selected =  helpers.json.val(props, 'modified.modify', '');

    const onChange = (el, arg, i) => {
        let d = {...modified, ...{
            job:"",
            method:"",
            action:"",
            version:"",
            controller:"",
            modify:helpers.json.val(arg, 'id', '')
        }};

        if(props.onChange){
            props.onChange(d);
        }
    }

    return (
        <SelectBox 
            list={options}
            noBlank={true}
            selected={selected} 
            selectBoxProps={{
                onSelect:onChange,
                "label":"Action",
            }}
        />
    )
}

export default ValidationActions;