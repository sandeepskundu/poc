import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useEffect, createElement, useMemo} from 'react';

const ShadowSize = (props) => {
    const vmap =  'ds.css.class.shadow';
    const selected =  helpers.json.val(props, `dsProps.${vmap}`);
    const list = helpers.json.val(props, 'dsData.shadow.size', {});

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
                "label":"Shadow size",
            }}
        />
    )
}

export default ShadowSize;