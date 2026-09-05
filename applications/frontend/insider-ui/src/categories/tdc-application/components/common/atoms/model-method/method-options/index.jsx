import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useState, useEffect, useRef} from 'react';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'details.name';
    const details = helpers.json.val(props, 'details.method', {});
    const selected =  helpers.json.val(details, map, '');
    const options = (() => {
        let rval = {};
        let saved = helpers.json.val(props, 'configs.saved.actions', {});
        let actions = helpers.json.val(props, 'configs.validation.actions', {});

        for(const a in actions){
            let n = helpers.json.val(details, map);
            let cn = helpers.json.val(actions[a], 'id');
            if(n === cn || !saved[cn]){
                rval[a] = actions[a];
            }
        }

        return rval;
    })();

    const onSelect = (e, arg) => {
        let d = helpers.json.copy(details);
        let id = helpers.json.val(arg, 'id', '');
        if(props.onChange){
            props.onChange(helpers.json.set(d, map, id, false, false));   
        }
    }

    return (
        <SelectBox 
            list={options}
            noBlank={true}
            selected={selected} 
            selectBoxProps={{
                onSelect:onSelect,
                "label":"Method name",
            }}
        />
    )
}

export default PropTypes;