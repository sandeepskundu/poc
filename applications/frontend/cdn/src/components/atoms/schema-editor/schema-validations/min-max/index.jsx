import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';

const MinMaxValidation = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    let config = helpers.json.val(props, 'details');
    let sel = helpers.json.val(props, 'selected', []);
    let vmap = helpers.json.val(props, 'item.valuemap');
    let value =  helpers.json.val(props, `details.${vmap}`, {});

    const onChange = (e, type) => {
        let d = {...config};
        let val = helpers.json.val(e, 'target.value', '');

            if(type === 'value'){
                val = helpers.string.transform.to.number(val);
            }

            if(type === 'message'){ 
                val = helpers.string.transform.to.paragraph(val);
            }

            value[type] = val;
            e.target.value = val;
            d = helpers.json.set(d, vmap, value, false, false)

            if(props.onChange){
                props.onChange(d, sel);
            }
    }

    const ui = () => {
        const vl = helpers.json.length(value);

        if(vl && vl > 0){
            return (
                <div className='full bxs grid-wrapper'>
                    <div className='grid-w3 pd-r10'>
                        <Input 
                            onChange={(e) => {onChange(e, 'value')}}
                            value={helpers.json.val(value, 'value')}
                            label={helpers.json.val(props, 'item.label')}
                        />
                    </div>
                    <div className='grid-w9 pd-l10'>
                        <Input 
                            label="Error message"
                            value={helpers.json.val(value, 'message')}
                            onChange={(e) => {onChange(e, 'message')}}
                        />
                    </div>
                </div>
                
            )
        }else{
            return <></>
        }
    }

    return ui();
}

export default MinMaxValidation;