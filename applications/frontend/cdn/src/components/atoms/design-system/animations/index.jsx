import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useEffect, createElement, useMemo} from 'react';

const Animation = (props) => {
    const vmap =  'ds.css.flags.animation';
    const selected =  helpers.json.val(props, `dsProps.${vmap}`);
    const list = helpers.json.val(props, 'dsData.animation.type', {});

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
                "label":"Animation Type",
            }}
        />
    )
}

export default Animation;