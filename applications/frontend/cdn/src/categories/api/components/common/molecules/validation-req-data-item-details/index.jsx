import React from 'react';
import helpers from 'ui-helpers';
import DeleteLink from 'aio-app-ui-api-molecules/data-validation-req-delete';
import ValidationReqDataValueMap from 'aio-app-ui-api-molecules/validation-req-data-valuemap';
import ValidationReqDataMessages from 'aio-app-ui-api-molecules/validation-req-data-messages';
import ValidationReqDataCheckOptions from 'aio-app-ui-api-atoms/validation-req-data-check-options';
import ValidationReqDataDetailsByType from 'aio-app-ui-api-molecules/validation-req-data-details-by-type';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const mapping = helpers.json.val(props, 'mapping', []);
    const validation = helpers.json.val(props, 'validation', {});
    const amapping = helpers.json.val(props, 'active.mapping', '');
    const ctypes = helpers.json.val(props, 'configs.validation.checks.types', {});

    const expend = (() => {
        let map = [...mapping];
            map = map.join('.');

        if(map && amapping){
            return (amapping.indexOf(map) === 0)
        }else{
            return false;
        }
    })();
 
    const onChange = (arg, map) => {
        if(props.onChange){
            props.onChange(arg, map);
        }
    }

    const toggle = () => {
        if(props.onToggle){
            let map = [...mapping];
            let active = helpers.json.val(props, 'active', {});
                active.mapping = expend?'':map.join('.');
                props.onToggle(active);
        }
    }

    const onDelete = (arg, map, reset) => {
        if(props.onChange){
            props.onChange(arg, map, reset);
        };

        if(props.onToggle){
            let active = helpers.json.val(props, 'active', {});
                active.type = type;
                active.mapping = map;
                props.onToggle(active);
        }
    }

    const dlink = () => {
        return (
            <DeleteLink 
                type={props.type}
                onChange={onDelete}
                active={props.active}
                mapping={[...mapping]}
                details={props.details}
                configs={props.configs}
                validation={validation}
            />
        )
    }

    const header = () => {
        return (
            <div className='full bxs pd-10'>
                <div className='full bxs flx-sb'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{props.node}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        {dlink()}
                        <li className='pd-l10 cp txt-xs link-u ns'>
                            <span onClick={() => toggle()}>{expend?'Collapse':'Expend'}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    const cls = (i) => {
        let rval = ['full']
        let odd = helpers.is.odd(i);

            if(odd){
                rval.push('bg-c00203');
            };

        return rval.join(' ');
    }

    const list = () => {
        if(expend){
            let li = helpers.json.keys(ctypes);
            if(li && li.length > 0){
                return li.map((name, i) => {
                    return (
                        <div className={cls(i)} key={id+i}>
                            <ValidationReqDataDetailsByType
                                type={ctypes[name]}
                                active={props.active}
                                details={props.details}
                                configs={props.configs}
                                onToggle={props.onToggle}
                                onChange={props.onChange}
                                validation={props.validation}
                                mapping={[...mapping, ctypes[name].id]}
                            />
                        </div>  
                    )
                })
            }else{
                return <></>
            }
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <div className='full bxs grid-wrapper'>
                {header()}
                <div className={expend?'full bxs bg-c00202':'full bxs'}>
                    {list()}
                </div>
                
                <div className='grid-w2 hide'>
                    <ValidationReqDataCheckOptions 
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map) => {
                            onChange(arg, map)
                        }}
                    />
                </div>

                <div className='full hide'>
                    <ValidationReqDataMessages 
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map) => {
                            onChange(arg, map)
                        }}
                    />
                    
                    <ValidationReqDataValueMap
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map) => {
                            onChange(arg, map)
                        }}
                    />
                </div>
            </div>
        )
    }

    return ui();
}

export default Comp;