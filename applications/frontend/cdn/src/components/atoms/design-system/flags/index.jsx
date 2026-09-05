import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import React, {useEffect, createElement, useMemo} from 'react';

const Flags = (props) => {
    const list = [
        {
            "id":"noBorder",
            "label":"No Border Radius"
        }, {
            "id":"rounded",
            "label":"Radius Round"
        }, {
            "id":"disabled",
            "label":"Disabled state"
        }, {
            "id":"isDisplay",
            "label":"Text as heading"
        }, {
            "id":"boxSizing",
            "label":"Box sizing"
        }, {
            "id":"noRadius",
            "label":"Border Radius none"
        }
    ];

    const vmap = 'ds.css.flags'
    const id = helpers.random.id(10);
    const selected = helpers.json.val(props, `dsProps.${vmap}`, {})

    const onChange = (checked, arg) => {
        const sel = {...selected};

        if(checked){
            sel[arg.id] = true;
        }else{
            delete sel[arg.id];
        }
        
        if(props.onChange){
            props.onChange(sel, vmap);
        }
    }

    const isSelected = (arg) => {
        return selected[arg.id];
    }

    const ui = () => {
        return list.map((arg, i) => {
            
            return (
                <div className='full pd-b14' key={id+i}>
                    <Toggle 
                        label={arg.label}
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
        <div className='full bxs'>
            <p className='full pd-b20 fm-sb'>Flags</p>
            {ui()}
        </div>
    )
}

export default Flags;