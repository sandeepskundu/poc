import React from 'react';
import helpers from 'ui-helpers';
import AddNewLink from 'aio-app-ui-api-molecules/data-validation-req-add-new';
import AddNewDelete from 'aio-app-ui-api-molecules/data-validation-req-delete';
import ValidationReqDataDetails from 'aio-app-ui-api-organisms/validation-req-data-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type', '')
    const validation = helpers.json.val(props, 'validation', {});
    const vlen = helpers.json.length(validation);

    const expend = (() => {
        let exp = helpers.json.val(props, 'active.type', '');
            return (exp && type && exp === type);
    })();

    const toggle = () => {
        if(props.onToggle){
            let active = helpers.json.val(props, 'active', {});
                active.mapping = '';
                active.type = expend?'':type;
                props.onToggle(active);
        }
    }

    const onAddnew = (arg, map, reset) => {
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

    const add = () => {
        if(vlen > 0){
            return (
                <AddNewLink
                    type={type}
                    mapping={[type]}
                    onChange={onAddnew}
                    active={props.active}
                    details={props.details}
                    configs={props.configs}
                    validation={validation}
                />
            )
        }
    }

    const dlink = () => {
        if(vlen > 0){
            return (
                <AddNewDelete 
                    type={type}
                    mapping={[type]}
                    onChange={onAddnew}
                    active={props.active}
                    details={props.details}
                    configs={props.configs}
                    validation={validation}
                />
            )
        }
    }

    const header = () => {
        return (
            <div className='full bxs pd-tb10'>
                <div className='full bxs flx-sb'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{helpers.string.transform.camelize(type)}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        {dlink()}
                        {add()}
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => toggle()}>{expend?'Collapse':'Expend'}</span></li>
                    </ul>
                </div>
            </div>
        )
    }

    const dui = () => {
        switch (type) {
            case 'body':
            case 'query':
            case 'params':
                return (
                    <ValidationReqDataDetails 
                        type={type}
                        active={props.active}
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onToggle={props.onToggle}
                        onChange={props.onChange}
                    />
                )
            break;
            default :
                return <></>
        }
    }

    const details = () => {
        if(expend){
            return (
                <div className='full bxs'>
                    {dui()}
                </div>
            )
        }

        return <></>
    }

    const ui = () => {
        return (
            <div className='full bdr-c00104 bdr-1 bdr-wrln bdr-wbn pd-rl10 bxs'>
                {header()}
                {details()}
            </div>
        )
    }

    return ui();
}

export default Comp;