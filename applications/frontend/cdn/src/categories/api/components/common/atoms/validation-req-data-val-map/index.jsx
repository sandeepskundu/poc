import React from 'react';
import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type', '');
    const details = helpers.json.val(props, 'valuemap', {});

    const value = (() => {
        if(type != 'from'){
            return helpers.json.val(props, `valuemap.${type}.map`, '');
        }else{
            return helpers.json.val(props, `valuemap.map`, '');
        }
    })()

    const onChange = (e) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(e, 'target.value', '');
        
            if(type != 'from'){
                d = helpers.json.set(d, `${type}.map`, val, false, true);
            }else{
                d.map = val;
            };

            if(props.onChange){
                props.onChange(d);   
            }
    }

    const ui = () => {
        return (
            <Input
                value={value}
                max={props.max}
                min={props.min}
                label={props.label}
                onChange={(e) => {onChange(e)}}
            />
        )
    }

    return ui();
}

export default Comp;