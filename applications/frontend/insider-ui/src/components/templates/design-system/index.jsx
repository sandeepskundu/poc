import helpers from 'ui-helpers';
import CssProps from './css-props';
import {useEffect, useState, useRef} from 'react';
import DsAttributes from 'aio-app-ui-templates/design-system-attributes';

const DesignSystem = (props) => {
    const [ds, setDs] = useState(props.dsProps);
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    let options = helpers.json.toList({
        0:{
            id:'element',
            expendMap:'0',
            label:'HTML Element'
        },
        1:{
            id:'dsProps',
            expendMap:'1',
            label:'CSS Props'
        },
        2:{
            id:'attrs',
            expendMap:'2',
            label:'HTML Attrs'
        },
        3:{
            id:'dataAttrs',
            expendMap:'3',
            label:'Data Attrs'
        }
    });

    let parent = helpers.json.val(props, 'valuemap', '');

    useEffect(() => {
        setDs(props.dsProps);
    }, [props.dsProps]);

    const expended = (() => {
        let m = helpers.json.val(props, 'expended.attrs', '');
        return `${parent}.${m}`;
    })();
    
    const getmap = (arg) => {
        return `${parent}.${arg.expendMap}`;
    }
    
    const current = (arg) => {
        if(expended && expended.indexOf(getmap(arg)) === 0){
            return true;
        }else{
            return false;
        }
    }
    
    const doexpend = (map) => {
        if(props.onAttrsExpend){
            props.onAttrsExpend(helpers.string.replace.word(map, `${parent}.`, ''));
        }
    }
    
    const toggle = (arg) => {
        const cur = current(arg);

        if(cur){
            doexpend('');
        }else{
            doexpend(getmap(arg))
        }
    }

    const onAttrsChange = (arg) => {
        let d = helpers.json.copy(ds);

        for(const a in arg){
            delete d[a];
        }

        if(props.onChange){
            props.onChange(helpers.json.merge(d, arg));
        }
    }

    const header = (arg) => {
        const cur = current(arg);

        return (
            <div className='full bxs flx-sb pd-rl10'>
                <ul className='bxs flx-vc flx-sb'>
                    <li className='pd-r10 txt-xs'>
                        <p className='full bxs'>{arg.label}</p>
                    </li>
                </ul>
                <ul className='bxs flx-vc'>
                    <li className='pd-l10 cp txt-xxs link-u ns' onClick={() => {toggle(arg)}}>{cur?'Collapse':'Expend'}</li>
                </ul>
            </div>
        )
    }

    const details = (arg) => {
        const cur = current(arg);

        if(cur){
            switch (arg.id){
                case 'element':
                    return <>Element name</>
                break;
                case 'dsProps':
                    return (
                        <div className='full bxs pd-t8 pd-rl16 pd-b16'>
                            <CssProps 
                                ds={ds}
                                layout={props.layout}
                                onChange={props.onChange}
                                runtimeData={helpers.json.val(props, 'runtimeData', {})}
                            />
                        </div>
                    )
                break;
                case 'attrs':
                    return (
                        <DsAttributes
                            parent={arg}
                            layout={props.layout}
                            expended={props.expended}
                            parentmap={props.valuemap}
                            onExpend={props.onAttrsExpend}
                            onChange={(arg) => {onAttrsChange(arg)}}
                            runtimeData={helpers.json.val(props, 'runtimeData', {})}
                            attrs={{
                                attrs:helpers.json.val(ds, 'attrs', {}),
                                dataAttrs:helpers.json.val(ds, 'dataAttrs', {})
                            }}
                        />
                    )
                break;
                case 'dataAttrs':
                    return (
                        <DsAttributes
                            parent={arg}
                            attrType={arg.id}
                            layout={props.layout}
                            expended={props.expended}
                            parentmap={props.valuemap}
                            onExpend={props.onAttrsExpend}
                            onChange={(arg) => {onAttrsChange(arg)}}
                            runtimeData={helpers.json.val(props, 'runtimeData', {})}
                            attrs={{
                                attrs:helpers.json.val(ds, 'attrs', {}),
                                dataAttrs:helpers.json.val(ds, 'dataAttrs', {})
                            }}
                        />
                    )
                break;
                default:
                    return <></>
            }
        }

        return <></>
    }

    const ui = () => {
        return options.map((arg, i) => {
            const cur = current(arg);
            return (
                <div className={`full bxs bdr-c00104 bdr-1 bdr-wrln bdr-wbn`} key={helpers.random.id(10)}>
                    <div className={`full bxs pd-tb6 hbg-c00102 anim ${cur?'bg-c00102':''}`}>
                        {header(arg)}
                    </div>
                    <div className={`full bxs ${cur?'bg-c00102':''}`}>
                        {details(arg)}
                    </div>
                </div>
            )
        })
    }

    return ui();
}

export default DesignSystem;