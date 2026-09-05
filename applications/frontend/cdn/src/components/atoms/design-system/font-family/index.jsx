import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useEffect, createElement, useMemo} from 'react';

const FontFamily = (props) => {
    const vmap =  `ds.css.class.family`;
    const selected =  helpers.json.val(props, `dsProps.${vmap}`);
    const list = helpers.json.val(props, 'dsData.fonts.family', {});

    const onChange = (el, arg, i) => {
        if(props.onChange){
            props.onChange(arg.id, vmap);
        }
    }

    return (
        <SelectBox 
            list={list}
            selected={selected || ''} 
            selectBoxProps={{
                onSelect:onChange,
                "label":"Font Family",
            }}
        />
    )
}

export default FontFamily;