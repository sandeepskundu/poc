import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import mhelpers from 'aio-app-ui-tdc-db-modules';
import SelectBox from 'aio-app-ui-atoms/select-box';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const selected =  helpers.json.val(props, `details.type`, '');
    const options = helpers.json.val(props, 'configs.schemas.types', {});

    const onChange = (el, arg, i) => {
        let dv = mhelpers.enums.get.defaultValue(arg);
            mhelpers.schema.update(dv, props);
    }

    return (
        <SelectBox 
            list={options}
            noBlank={true}
            selected={selected} 
            selectBoxProps={{
                onSelect:onChange,
                "label":"Schema type",
            }}
        />
    )
}

export default PropTypes;