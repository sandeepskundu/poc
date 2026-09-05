import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';

const MinMaxValidation = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let config = helpers.json.val(props, 'details');
    let sel = helpers.json.val(props, 'selected', []);
    let vmap = helpers.json.val(props, 'item.valuemap');
    let value =  helpers.json.val(props, `details.${vmap}`, {});

    const onChange = (e) => {
        let d = {...config};
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.transform.to.paragraph(val);

            value.message = val;
            d = helpers.json.set(d, vmap, value, false, false)

        if(props.onChange){
            props.onChange(d, sel);
        }
    }

    const ui = () => {
        const vl = helpers.json.length(value);
        
        if(vl && vl > 0){
            return (
                <div className='full bxs'>
                    <Input
                        label="Error message"
                        onChange={(e) => {onChange(e)}}
                        value={helpers.json.val(value, 'message')}
                    />
                </div>
            )
        }else{
            return <></>
        }
    }

    return ui()
}

export default MinMaxValidation;