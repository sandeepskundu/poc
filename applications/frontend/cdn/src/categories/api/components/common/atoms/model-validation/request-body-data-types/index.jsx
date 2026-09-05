import React from 'react';
import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let details = helpers.json.val(props, 'validation', {});
    let current = helpers.json.val(props, 'validation.type', {});
    let options = helpers.json.val(props, 'configs.validation.body.type', {});

    const sample = {
        "min":1,
        "max":10,
        "type":"list",
        "required":"optional",
        "message":{
            "error":"Only put method is allowed",
            "success":"Only put method is allowed"
        }
    }

    const onSelect = (e, arg) => {
        let d = helpers.json.copy(details);
        let t = helpers.json.val(arg, 'id');
        let r = helpers.json.val(d, 'required');
            d = {...d, ...{
                min:1,
                max:1
            }};

            d.required = r || 'required';
            d.type = t;
            d.message = {
                "error":"Invalid body data format",
                "success":"Valid data fromat"
            };

            if(props.onChange){
                props.onChange(d);   
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
                    "label":"Select data type",
                }}
            />
        )
    }

    return ui();
}

export default Comp;