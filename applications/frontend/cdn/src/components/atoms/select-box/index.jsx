import helpers from 'ui-helpers';
import React, { useEffect, createElement, useMemo} from 'react';
import SelectBox from 'aio-global-ui/atoms/form/select-box';

const ThemeSelectBox = (props) => {
    let sel = {
        "id":"",
        "label":'Select'
    };

    let list = [sel];
    let ot = helpers.data.type.get(options);
    let sv = helpers.json.val(props, 'selected');
    let options = helpers.json.val(props, 'list', {});
    let sbProps = helpers.json.val(props, 'selectBoxProps', {});

    if(props.noBlank){
        sel = false;
        list = [];
    }
    
    for(const a in options){
        const item = options[a];

        if(item && item.id && sv && sv === item.id){
            sel = item;
        }

        list.push(item);
    }

    const ui = () => {
        return (
            <>
                <SelectBox 
                    {...sbProps}
                    selected={sel}
                    options={list}
                />
            </>
        )
    }

    return ui();
}

export default ThemeSelectBox;