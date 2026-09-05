import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';

const DefaultValue = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let label = 'Default value';
    let config = helpers.json.val(props, 'details');
    let sel = helpers.json.val(props, 'selected', []);
    let vtype = helpers.json.val(props, 'details.type');
    let vmap = helpers.json.val(props, 'item.valuemap');
    let value =  helpers.json.val(props, `details.${vmap}`, {});

    const onChange = (val) => {
        let d = {...config};
            value['value'] = val;
            d = helpers.json.set(d, vmap, value, false, false);

            if(props.onChange){
                props.onChange(d, sel);
            }
    }

    const onInputChange = (e) => {
        onChange(helpers.json.val(e, 'target.value', ''))
    }

    const onSelect = (arg, fb) => {
        onChange(helpers.json.val(arg, 'id', fb));
    }

    const options = () => {
        switch (vtype) {
            case 'email' :
            case 'string' :
            case 'stringKey' :
            case 'paragraph' :
                return (
                    <Input
                        label={label}
                        value={value.value || ''}
                        onChange={(e) => {onInputChange(e)}}
                    />
                )
            break;
            case 'number' :
                return (
                    <Input
                        label={label}
                        value={value.value || ''}
                        onChange={(e) => {onInputChange(e)}}
                    />
                )
            break;
            case 'boolean' :
                return (
                    <SelectBox 
                        noBlank={true}
                        selected={helpers.json.val(value, 'value')} 
                        list={helpers.json.val(props, 'configs.boolean.options', {})}
                        selectBoxProps={{
                            "label":label,
                            onSelect:(e, item) => {onSelect(item)}
                        }}
                    />
                )
            break;
            case 'switch' :
                return (
                    <SelectBox 
                        noBlank={true}
                        selected={helpers.json.val(value, 'value')} 
                        list={helpers.json.val(props, 'configs.switch.options', {})}
                        selectBoxProps={{
                            "label":label,
                            onSelect:(e, item) => {onSelect(item)}
                        }}
                    />
                )
            break;
            case 'object':
                return <></>
            break;
            case 'objectId' :
                return <></>
            break;
            default :
                return <></>
            break;
        }
    }

    const ui = () => {
        const vlen = helpers.json.length(value);
        if(vlen && vlen > 0){
            return (
                <div className='full bxs'>
                    {options()}
                </div>
            )
        }else{
            return <></>
        }
    }

    return ui()
}

export default DefaultValue;