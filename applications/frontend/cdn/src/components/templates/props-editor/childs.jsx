import helpers from 'ui-helpers';
import ChildDetails from './childe-details';
import React, {useEffect, useState, useRef} from 'react';

const ChildItems = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const id = helpers.random.id(10);

    const odevn = (index) => {
        if(index % 2 != 0){
            return 'bg-c00102';
        };

        return ''
    }

    const selected = (name, arg) => {
        let sel = helpers.json.val(props, 'selected', []);
        let rsel = [...sel]
            rsel.push(name)
        return rsel;
    }

    const clss = (i) => {
        let rval = ['full bxs bdr-c00104 bdr-1 bdr-wrln bdr-wbn'];

        let sel = helpers.json.val(props, 'selected', []);

        if(sel.length > 0){
            rval.push('pd-rl4')
        }else{
            rval.push(`pd-rl20 ${odevn(i)}`)
        }

        return rval.join(' ');
    }

    const onChange = (arg, vmap, vt) => {
        if(props.onChange){
            props.onChange(arg, vmap, vt);
        }
    }

    const ui = () => {
        let pl = helpers.json.val(props, 'props', {});
        let li = helpers.json.keys(pl);
            li.sort();

        if(li.length > 0){
            return li.map((name, i) => {
                return (
                    <li className={clss(i)} key={id+i}>
                        <ChildDetails 
                            name={name}
                            data={props.data}
                            details={pl[name]}
                            schema={props.schema}
                            configs={props.configs}
                            collection={props.collection}
                            selected={selected(name, pl[name])}
                            onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                        />
                    </li>
                )
            });
        }else{
            return <></>
        }
        
    }

    return ui();  
}

export default ChildItems;