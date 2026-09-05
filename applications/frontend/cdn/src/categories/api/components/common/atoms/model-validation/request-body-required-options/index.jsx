import React from 'react';
import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let details = helpers.json.val(props, 'validation', {});
    let current = helpers.json.val(props, 'validation.required', '');
    let options = helpers.json.val(props, 'configs.validation.body.requireOptions', {});

    const onSelect = (e, arg) => {
        let d = helpers.json.copy(details);
        let t = helpers.json.val(arg, 'id');

            d.required = t;

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
                    "label":"Body requirement",
                }}
            />
        )
    }

    return ui();
}

export default Comp;