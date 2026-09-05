import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';

import AddNewLink from 'aio-app-ui-api-molecules/data-validation-req-add-new';
import ValidationReqDataItemDetails from 'aio-app-ui-api-molecules/validation-req-data-item-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const validation = helpers.json.val(props, 'validation', {});
    const list = helpers.json.keys(validation);

    const cls = (i) => {
        let rval = ['full bdr-c00104 bdr-1 bdr-wrln bdr-wbn bxs']
        let odd = helpers.is.odd(i);

            if(odd){
                rval.push('bg-c00103');
            }
        return rval.join(' ')
    }

    const onAddnew = (arg, map, reset) => {
        if(props.onChange){
            props.onChange(arg, map, reset);
        };

        if(props.onToggle){
            let active = helpers.json.val(props, 'active', {});
                active.mapping = map;
                active.type = props.type;
                props.onToggle(active);
        }
    }

    const add = () => {
        return (
            <AddNewLink
                type={props.type}
                onChange={onAddnew}
                active={props.active}
                mapping={[props.type]}
                details={props.details}
                configs={props.configs}
                validation={validation}
            />
        )
    }

    const ui = () => {
        if(list && list.length > 0){
            return list.map((name, i) => {
                return (
                    <div className={cls(i)} key={id+i}>
                        <ValidationReqDataItemDetails
                            node={name}
                            type={props.type}
                            active={props.active}
                            details={props.details}
                            configs={props.configs}
                            onToggle={props.onToggle}
                            onChange={props.onChange}
                            mapping={[props.type, name]}
                            validation={helpers.json.val(validation, name, {})}
                        />
                    </div>
                )
            })
        }

        return (
            <div className='full bxs pd-b20'>
                <p></p>
                <p>{add()}</p>
            </div>
        )
    }

    return ui();
}

export default Comp;