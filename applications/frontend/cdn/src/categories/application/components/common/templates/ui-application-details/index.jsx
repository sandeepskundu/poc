import helpers from 'ui-helpers';
import React, {useState, useRef, useEffect} from 'react';
import UiApplicationHooks from 'aio-app-ui-application-organisms/ui-application-hooks';
import UiApplicationConfig from 'aio-app-ui-application-organisms/ui-application-configs';
import UiApplicationScssConfigs from 'aio-app-ui-application-organisms/ui-application-scss-configs';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const active = helpers.json.val(props, 'expended', '');

    const options = [
        {
            "id":"appConfig",
            "label":"App configs"
        }, {
            "id":"scssConfig",
            "label":"Scss configs"
        }, {
            "id":"hooks",
            "label":"Hooks"
        }
    ]

    const toggle = (arg, exp) => {
        if(props.onExpend){
            props.onExpend(exp?'':arg.id);
        }
    }

    const expended = (arg) => {
        return (active.indexOf(arg.id) === 0)
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

    const details = (arg) => {
        const type = arg.id;
        const valmap = [type]
        const exp = expended(arg);

        if(exp){
            switch (type) {
                case 'appConfig':
                    return (
                        <UiApplicationConfig
                            valuemap={[...valmap]}
                            details={props.details}
                            configs={props.configs}
                            onChange={props.onChange}
                            expended={props.expended}
                            onExpend={props.onExpend}
                        />
                    )
                break;
                case 'scssConfig':
                    return (
                        <UiApplicationScssConfigs
                            valuemap={[...valmap]}
                            details={props.details}
                            configs={props.configs}
                            onChange={props.onChange}
                            expended={props.expended}
                            onExpend={props.onExpend}
                        />
                    )
                break;
                case 'hooks':
                    return (
                        <UiApplicationHooks
                            valuemap={[...valmap]}
                            details={props.details}
                            configs={props.configs}
                            onChange={props.onChange}
                            expended={props.expended}
                            onExpend={props.onExpend}
                        />
                    )
                break;
                default :
                    return <></>
            }
        }else{
            return <></>
        }
    }

    const list = () => {
        return options.map((arg, i) => {
            return (
                <div className='full bxs pd-rl14' key={id+i}>
                    <div className='bdr-c00104 bdr-1 bdr-wrln bdr-wbn bxs full pd-tb8'>
                        {header(arg)}
                    </div>
                    {details(arg)}
                </div>
            )
        })
    }

    const ui = () => {
        return (
            <div className='full pd-rl10 bxs'>
                <p className='full bxs pd-rl14 pd-t16 txt-md fm-md pd-b16'>UI Application details</p>
                {list()}
            </div>
        )
    }

    return ui();
}

export default Comp;