import helpers from 'ui-helpers';
import {forwardRef, useRef} from "react";
import Button from 'aio-global-ui/atoms/form/button';

const Comp = forwardRef((dprops, forwardedRef) => {
    const ref = forwardedRef || useRef(null);
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const callbacks = helpers.json.get(props, 'callback', {});
    const buttonList = helpers.json.get(props, 'config.buttons', {});
    const wrapperAttr = helpers.element.jsx.attrs(props?.config?.wrapper || {}, 'flx-vc btn-grp');

    const list = helpers.json.toList(buttonList);

    const btnConfig = (arg, i) => {
        let dt = helpers.json.get(props, 'config.theme.default', {});
        let active = helpers.json.get(arg, 'button.states.active', false);
        let disabled = helpers.json.get(arg, 'button.states.disabled', false);

        if(disabled){
            dt = helpers.json.merge(dt, helpers.json.get(props, 'config.theme.disabled', {}))
        }

        if(!disabled && active){
            dt = helpers.json.merge(dt, helpers.json.get(props, 'config.theme.active', {}))
        }

        return helpers.json.merge(dt, arg);
    }

    const buttonProps = (arg, i) => {
        return {
            callback:callbacks,
            config:btnConfig(arg, i)
        }
    }

    const hldCls = (arg, i) => {
        let rv = ['btn-hldr'];

        if(i === 0 || i === '0'){
            rv.push('first')
        }

        if((list.length-1) === i){
            rv.push('last')
        }

        return rv.join(' ');
    }

     const buttons = () => {
        return list.map((arg, i) => {
            return (
                <li className={hldCls(arg, i)}>
                    <Button {...buttonProps(arg, i)} />
                </li>
            )
        })
    }

    const ui = () => {
        if(list && list.length > 0){
            return (
                <ul {...wrapperAttr}>
                    {buttons()}
                </ul>
            ); 
        }else{
            return <></>
        }
    }

    return ui()
});

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;