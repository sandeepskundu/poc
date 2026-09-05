import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import React, {useEffect, createElement, useMemo} from 'react';

const BorderNone = (props) => {
    const types = [1, 2, 3, 4]
    const map = {
        1:'Top',
        2:'Right',
        3:'Bottom',
        4:'Left'
    }

    const id = helpers.random.id(10);
    const vmap = 'ds.css.class.borderNone';
    const selected = helpers.json.val(props, `dsProps.${vmap}`, {})

    const onChange = (checked, item) => {
        const sel = helpers.json.copy(selected);

        if(checked){
            sel[item] = true;
        }else{
            delete sel[item];
        }
        
        if(props.onChange){
            props.onChange(sel, vmap);
        }
    }

    const isSelected = (i) => {
        return selected[i];
    }

    const label = (i) => {
        return map[i]
    }

    const ui = () => {
        return types.map((arg, i) => {
            
            return (
                <div className='full bxs pd-b14' key={id+i}>
                    <Toggle 
                        label={label(arg)}
                        checked={isSelected(arg)}
                        onChange={(checked, prop) => {
                            onChange(checked, arg);
                        }}
                    />
                </div>
            )
        })
    }

    return (
        <div className='full'>
            <p className='full pd-b20 fm-sb'>Border none</p>
            <div className='full'>
                {ui()}
            </div>
        </div>
    )
}

export default BorderNone;