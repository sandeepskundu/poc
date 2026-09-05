import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useEffect, createElement, useMemo} from 'react';

const Colors = (props) => {
    const list = helpers.json.val(props, 'dsData.colors.list', {});

    const options = (() => {
        let rv = [];
        for(const a in list){
            let cl = list[a]?.colors;
            if(cl){
                for(const b in cl){
                    rv.push(cl[b]);
                }
            }
        }
        return rv;
    })()

    const onChange = (el, arg, i) => {
        if(props.onChange){
            props.onChange(arg);
        }
    }

    const option = (item, index, selctd) => {
        return (
            <div className='full flx-sb flx-vc'>
                <div className='pd-r20'>{item.label}</div>
                <div className={`lyr-mh-26 flx-vc ac bdr-4 bdr-1 bg-${item.id} bdr-c00103 shdw-sm`}></div>
            </div>
        )
    }

    return (
        <SelectBox 
            list={options}
            selected={props.selected || ''} 
            selectBoxProps={{
                onSelect:onChange,
                optionTemplate:option,
                "label":props.lable || "Color"
            }}
        />
    )
}

export default Colors;