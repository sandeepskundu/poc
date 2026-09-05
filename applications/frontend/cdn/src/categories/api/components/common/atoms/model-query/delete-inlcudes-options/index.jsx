import React from 'react';
import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comps = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const conf = helpers.json.val(props, 'modified.hidden.configs.columns');
    const options = helpers.json.val(props, 'configs.model.query.deleteIncludeOptions', {});
    const enable = helpers.json.val(props, 'modified.hidden.configs.columns.deleted.enable');
    const current = helpers.json.val(props, 'modified.hidden.configs.columns.deleted.includes');

    const onSelect = (e, arg) => {
        let d = helpers.json.copy(conf);
        let pId = helpers.json.val(props, 'parent.id');

            d[pId] = d[pId] || {};
            d[pId].includes = helpers.json.val(arg, 'id');

            if(props.onChange){
                props.onChange(d, props.parent);   
            }
    }

    const ui = () => {
        if(enable){
            return (
                <SelectBox
                    noBlank={true}
                    list={options}
                    selected={current}
                    selectBoxProps={{
                        onSelect:onSelect,
                        "label":"Include option",
                    }}
                />
            )
        }else{
            return <></>
        }
    }

    return ui();
}

export default Comps;