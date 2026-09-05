import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type', '');
    const details = helpers.json.val(props, 'valuemap', {});

    const map = (() => {
        let rv = [type];

        if(type != 'from'){
            rv.push('from');
        }

        return rv.join('.');
    })();

    const validation = helpers.json.val(props, 'validation', {});
    const checks = helpers.json.val(props, 'validation.checks', {});

    const exclude = helpers.json.keys(checks);
    const current = helpers.json.val(details, map, '');

    const options = (() => {
        let rv = [];
        let cols = helpers.json.val(props, 'configs.validation.checks.types', {});

        for(const a in cols){
            let id = helpers.json.val(cols[a], 'id', '');
            if(id && exclude.indexOf(id) === -1){
                let iv = {
                    id:cols[a].id || a,
                    label:cols[a].label || a
                };

                rv.push(iv);
            }
        }

        return rv;
    })();    

    const onSelect = (e, arg) => {
        let id = helpers.json.val(arg, 'id');
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, map, id);

            if(type != 'from'){
                d = helpers.json.set(d, `${type}.map`, '', false, true);
            }else{
                d.map = '';
            };

            if(props.onChange){
                props.onChange(d);   
            }
    }

    const ui = () => {
        return (
            <SelectBox
                noBlank={false}
                list={options}
                selected={current}
                selectBoxProps={{
                    onSelect:onSelect,
                    label:'Validation type',
                }}
            />
        )
    }

    return ui();
}

export default Comp;