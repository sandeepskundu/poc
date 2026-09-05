import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'category';
    const details = helpers.json.val(props, 'details');
    const selected = helpers.json.val(props, 'details.category', '');

    const options = (() => {
        let rv = [];
        let cols = helpers.json.val(props, 'configs.applicationTypes', {});

        for(const a in cols){
            rv.push({
                id:cols[a].id || a,
                label:cols[a].label || a
            });
        };

        return rv;
    })();    

    const onSelect = (e, arg) => {
        const d = helpers.json.copy(details);
        const id = helpers.json.val(arg, 'id', '');
        if(props.onChange){
            props.onChange(helpers.json.merge(d, {
                category:id,
                appConfig:{
                    category:id,
                    applicationType:id,
                }
            }));   
        }
    }

    const ui = () => {
        return (
            <SelectBox
                noBlank={true}
                list={options}
                selected={selected}
                selectBoxProps={{
                    onSelect:onSelect,
                    label:'Application category',
                }}
            />
        )
    }

    return ui();
}

export default Comp;