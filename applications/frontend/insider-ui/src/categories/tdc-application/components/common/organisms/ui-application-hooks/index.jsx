import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import UiApplicationHooksByType from 'aio-app-ui-tdc-application-molecules/ui-application-hooks-by-type';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = props.details;
    const id = helpers.random.id(10);
    const active = helpers.json.val(props, 'expended', '');

    const options = [
        {
            "id":"appCreateTimeHooks",
            "label":"App create time hooks",
            "prefix":'_____APP__CREATE__TIME__HOOKS'
        }, {
            "id":"webpackCompileTimeHooks",
            "label":"Webpack compile time hooks",
            "prefix":'_____WEBPACK__COMPILE__TIME__HOOKS'
        }, {
            "id":"serverSideHooks",
            "label":"Server side hooks",
            "prefix":'_____SERVER__SIDE__HOOKS'
        }
    ]

    const onChange = (val, map, reset) => {
        let d = helpers.json.copy(details);
                helpers.json.remove(d, map);
            d = helpers.json.set(d, map, val, false, true);

            if(props.onChange){
                props.onChange(d, reset);
            }
    }

    const valmap = (arg) => {
        let vlmap = [...props.valuemap];
            vlmap.push(arg.id || '');

        return vlmap.join('.')
    }

    const toggle = (name, exp) => {
        if(props.onExpend){
            if(exp){
                props.onExpend('');
            }else{
                props.onExpend(valmap(name));
            }
        }
    }

    const expended = (arg) => {
        return active.indexOf(valmap(arg)) === 0
    }

    const header = (arg) => {
        const exp = expended(arg);

        return (
            <div className='full bxs flx-sb'>
                <ul className='bxs flx-vc flx-sb'>
                    <li className='pd-r10 txt-sm'>{arg.label}</li>
                </ul>
                <ul className='bxs flx-vc'>
                    <li className='pd-r10 cp txt-xs link-u ns' onClick={() => {toggle(arg, exp)}}>{exp?'Collapse':'Expend'}</li>
                </ul>
            </div>
        )
    }

    const valuemap = (arg) => {
        let rv = [...props.valuemap];
            rv.push(arg.id);
        
        return rv;
    }

    const detailsui = (arg) => {
        const exp = expended(arg);

        if(exp){
            return (
                <UiApplicationHooksByType
                    parent={arg}
                    onChange={onChange}
                    details={props.details}
                    configs={props.configs}
                    valuemap={valuemap(arg)}
                    expended={props.expended}
                    onExpend={props.onExpend}
                />
            )
        }else{
            return <></>
        }
    }

    const list = () => {
        return options.map((arg, i) => {
            return (
                <div className='full bxs' key={id+i}>
                    <div className='bdr-c00104 bdr-1 bdr-wrln bdr-wbn bxs full pd-tb8'>
                        {header(arg)}
                    </div>
                    {detailsui(arg)}
                </div>
            )
        })
    }

    const ui = () => {
        return (
            <div className='full pd-rl10 bxs'>
                {list()}
            </div>
        )
    }

    return ui()
}

export default Comp;