import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import RequestBody from 'aio-app-ui-tdc-application-molecules/model-validation/request-body';
import RequestMethods from 'aio-app-ui-tdc-application-atoms/model-validation/request-methods';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const parentId = helpers.json.val(props, 'parentId', '');
    const active = helpers.json.val(props, 'expend.validation', '');
    const validation = helpers.json.val(props, 'validation.request', {});

    const onChange = (arg, map) => {
        if(props.onChange){
            props.onChange(arg, map);
        }
    }

    const options = (() => {
        let rval = [];
        let li = helpers.json.val(props, 'configs.validation.serverConfigs.childs');

        for(const a in li){
            rval.push(li[a]);
        }

        return rval;
    })();

    const current = (arg) => {
        if(active){
            return (active.indexOf(`${parentId}.${arg.id}`) === 0)
        }

        return false;
    }

    const expend = (arg) => {
        const cur = current(arg);
        if(props.onExpend){
            if(cur){
                props.onExpend(parentId);
            }else{
                props.onExpend(`${parentId}.${arg.id}`);
            }
        }
    }

    const components = (arg) => {
        if(current(arg)){
            switch (arg.id) {
                case 'request.method':
                    return (
                        <div className='full bxs pd-t16 pd-rl10'>
                            <RequestMethods 
                                validation={validation}
                                details={props.details}
                                configs={props.configs}
                                onChange={(arg) => {
                                    onChange(arg, 'request.methods')
                                }}
                            />
                        </div>
                    )
                break;
                case 'request.body.data':
                    return (
                        <div className='full bxs pd-t20 pd-rl12'>
                            <RequestBody 
                                validation={validation}
                                details={props.details}
                                configs={props.configs}
                                onChange={(arg) => {
                                    onChange(arg, 'request.body')
                                }}
                            />
                        </div>
                    )
                break;
                default:
                    return <></>

            }
        }else {
            return <></>
        }
    }

    const cls = (cur) => {
        let rv = ['full bxs flx-sb pd-10']

        if(cur){
            rv.push('bg-c00102');
        }

        return rv.join(' ');
    }

    const list = () => {
        return options.map((arg, i) => {
            const cur = current(arg);
            return (
                <div className='full bxs full bdr-c00104 bdr-1 bdr-wrln bdr-wbn anim' key={id+i}>
                    <div className={cls(cur)}>
                        <span className='txt-sm fm-md'>{arg.label}</span>
                        <ul className=''>
                            <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {expend(arg)}}>{(cur)?'Collapse':'Expend'}</li>
                        </ul>
                    </div>
                    {components(arg)}
                </div>
            )
        })
    }

    const ui = () => {
        return (
            <div className='full'>
                {list()}
            </div>
        )
    }

    return ui();
}

export default Comp;