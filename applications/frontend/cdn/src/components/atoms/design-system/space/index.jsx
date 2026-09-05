import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useEffect, createElement, useMemo} from 'react';

const Spaces = (props) => {
    const types = [1, 2, 3, 4]
    
    const id = helpers.random.id(10);
    const vmap = `ds.css.class.${props.type}`;
    const list = helpers.json.val(props, 'dsData.spaces', {});
    const selected =  helpers.json.val(props, `dsProps.${vmap}`, {});

    const heading = (() => {
        if(props.type){
            return props.type[0].toUpperCase() + props.type.slice(1);
        };

        return '';
    })();

    const map = {
        1:'Top',
        2:'Right',
        3:'Bottom',
        4:'Left'
    }

    const label = (i) => {
        return `${map[i]}`
    }

    const onChange = (arg, type) => {
        let index = {
            1:true,
            2:true,
            3:true,
            4:true
        };
        let sel = helpers.json.copy(selected);

        if(arg.id){
            sel[type] = arg.id;
        }else{
            sel[type] = 0;
        }

        for(const a in index){
            if(!sel[a]){
                sel[a] = 0;
            }
        }

        if(props.onChange){
            props.onChange(sel, vmap);
        }
    }

    const getSelected = (i) => {
        return selected[i] || '';
    }

    const ui = () => {
        return types.map((arg, i) => {
            return (
                <div className='full bxs pd-t24 _grid-4' key={id+i}>
                    <SelectBox 
                        list={list}
                        selected={getSelected(arg)} 
                        selectBoxProps={{
                            label:label(arg),
                            onSelect:(element, item, index) => {onChange(item, arg)},
                        }}
                    />
                </div>
            )
        })
    }

    return (
        <div className='full pd-t24'>
            <p className='full fm-sb'>{heading}</p>
            <div className='full bxs _grid-wrapper _grid-layout-4'>
                {ui()}
            </div>
        </div>
        
        
    )
        
}

export default Spaces;