import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import mhelpers from 'aio-app-ui-schema-modules';
import SelectBox from 'aio-app-ui-atoms/select-box';

const SchemaActions = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const options = helpers.json.val(props, 'configs.schemas.actions', {});

    const modified =  helpers.json.val(props, 'modified', {});
    const selected =  helpers.json.val(props, 'modified.type', '');

    const onChange = (el, arg, i) => {
        let d = {...modified, ...{
            id:'',
            dbId:'',
            name:''
        }};
        
        d.type = helpers.json.val(arg, 'id', '');

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

export default SchemaActions;