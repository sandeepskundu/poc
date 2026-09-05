import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useEffect, createElement, useMemo} from 'react';

const FontSize = (props) => {
    const vmap = 'ds.css.class.fontsize';
    const list = helpers.json.val(props, 'dsData.fonts.size', {});
    const selected =  helpers.json.val(props, `dsProps.${vmap}`);

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
                "label":"Font size",
            }}
        />
    )
}

export default FontSize;