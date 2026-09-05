import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useEffect, createElement, useMemo} from 'react';

const ColorPairing = (props) => {
    const selected =  helpers.json.val(props, `selected`, '');
    const list = helpers.json.val(props, 'dsData.colors.pairing', {});

    const onChange = (item, type) => {
        props.onChange(item);
    }

    const lbln = (arg, type, labl) => {
        if(arg[type]){
            return <p className='full mr-n txt-xs'>{labl} : {arg[type]}</p>
        }

        return <></>
    }

    const label = (arg) => {
        const colors = helpers.json.val(arg, 'colors');

        if(colors){
            return (
                <>
                    {lbln(colors, 'background-color', 'Backgroud Color')}
                    {lbln(colors, 'border-color', 'Border Color')}
                    {lbln(colors, 'color', 'Text Color')}
                </>
            )
        }else{
            return arg.label;
        }
    }

    const option = (item, index, selctd) => {
        return (
            <div className='full flx-sb'>
                <div className='pd-r20'>
                    {label(item)}
                </div>
                {item.id?(
                    <div className={`lyr-mh-50 flx-vc ac bdr-4 bdr-1 cp-${item.id}`}>
                        <span className='full ac'>{item.id}</span>
                    </div>
                ):<></>}
            </div>
        )
    }

    return (
        <SelectBox 
            list={list}
            selected={selected}
            selectBoxProps={{
                optionTemplate:option,
                "label":props.label || 'Color pair',
                onSelect:(element, item, index) => {onChange(item);}
            }}
        />
    )
        
}

export default ColorPairing;