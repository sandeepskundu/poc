import helpers from 'ui-helpers';
import {forwardRef, useRef} from "react";
import Button from 'aio-global-raw-ui/atoms/form/button';

const Comp = forwardRef((dprops, forwardedRef) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const ref = forwardedRef || useRef(null);
    const callbacks = helpers.json.get(props, 'callback', {});
    const list = helpers.json.toList(helpers.json.get(props, 'list', {}));

    const btnConfig = (arg, i) => {
        let dt = helpers.json.get(props, 'theme.default', {});
        let active = helpers.json.get(arg, 'button.states.active', false);
        let disabled = helpers.json.get(arg, 'button.states.disabled', false);

        if(disabled){
            dt = helpers.json.merge(dt, helpers.json.get(props, 'theme.disabled', {}))
        }

        if(!disabled && active){
            dt = helpers.json.merge(dt, helpers.json.get(props, 'theme.active', {}))
        }

        return helpers.json.merge(dt, arg);
    }

    const buttonCallbacks = (arg, i) => {
        return helpers.json.merge(callbacks, helpers.json.get(arg, 'callback', {}));
    }

    const buttonProps = (arg, i) => {
        return helpers.json.merge(buttonCallbacks(arg, i), btnConfig(arg, i))
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
                <ul {...helpers.element.jsx.attrs(helpers.json.get(props, 'wrapper', {}), 'flx-vc btn-grp')}>
                    {buttons()}
                </ul>
            ); 
        }else{
            return <></>
        }
    }

    return ui()
});

export default Comp;