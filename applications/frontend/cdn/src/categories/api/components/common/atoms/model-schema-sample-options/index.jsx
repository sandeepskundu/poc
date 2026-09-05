import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type', '');
    const map = helpers.json.val(props, 'mapping', []);
    const current = helpers.json.val(props, 'current', '');
    const details = helpers.json.val(props, 'valuemap', {});

    const options = (() => {
        let rv = [];
        let cols = helpers.json.val(props, 'options', {});

        for(const a in cols){
            let iv = {
                id:cols[a].id || a,
                label:cols[a].label || a
            };

            rv.push(iv);
        }

        return rv;
    })();    

    const onSelect = (e, arg) => {
        const vm = [...map];
        const id = helpers.json.val(arg, 'id');

        if(id){
            vm.push(id);
        }

        if(props.onChange){
            props.onChange(vm);   
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
                    label:props.label,
                }}
            />
        )
    }

    return ui();
}

export default Comp;