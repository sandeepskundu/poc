import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const selected =  helpers.json.val(props, `details.appId`, '');
    const options = (() => {
        const rval = {};
        const apps = helpers.json.val(props, 'configs.applications', []);

        if(apps && apps.length > 0){
            for(const a in apps){
                let item = apps[a];
                    rval[a] = {
                        id:item.id,
                        label:item.name
                    }
            }
        };

        return rval;
    })()

    const onChange = (el, arg, i) => {
        if(props.onSelect){
            props.onSelect(arg)
        }
    }

    return (
        <SelectBox 
            list={options}
            noBlank={true}
            selected={selected} 
            selectBoxProps={{
                onSelect:onChange,
                "label":"Selection application",
            }}
        />
    )
}

export default PropTypes;