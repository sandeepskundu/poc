import helpers from 'ui-helpers';
import {forwardRef, useMemo, useRef} from "react";
import SvgIcon from 'aio-global-ui/atoms/icons/svg';
import FontIcon from 'aio-global-ui/atoms/icons/font';
import {useButton, useFocus, mergeProps} from "react-aria";

const Comp = forwardRef((dprops, forwardedRef) => {
    const ref = forwardedRef || useRef(null);
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const states = helpers.json.get(props, 'config.button.states', {});
    const elm = helpers.json.get(props, "config.button.markup.element", "button");
    const Element = elm;

    const hover = helpers.json.get(states, 'hover', false);
    const active = helpers.json.get(states, 'active', false);
    const wait = helpers.json.get(states, 'wait.enabled', false);
    const disabled = helpers.json.get(states, 'disabled', false);

    const callbacks = {
        onBlur:(e) => callback(e, 'onBlur'),
        onFocus:(e) => callback(e, 'onFocus'),
        onPress:(e) => callback(e, 'onPress'),
        onClick:(e) => callback(e, 'onClick'),
        onPressUp:(e) => callback(e, 'onPressUp'),
        onPressEnd:(e) => callback(e, 'onPressEnd'),
        onPressStart:(e) => callback(e, 'onPressStart'),
        onPressChange:(e) => callback(e, 'onPressChange')
    }

    const callback = (e, name) => {
        let cb = helpers.json.get(props, `callback.${name}`, false);
        let isfun = helpers.data.type.is(cb, 'function');

        if(isfun){
            cb(e, props);
        }
    }

    const ariaButtonProps = useMemo(() => {
        let rval = helpers.json.get(props, "config.button.ariaProps", {});
            rval = {...rval, ...callbacks}
        return {...rval, elm};
    }, [props, elm]);

    const {focusProps, isFocused} = useFocus({
        onBlur:helpers.json.get(props, 'callback.onBlur', null),
        onFocus:helpers.json.get(props, 'callback.onFocus', null)
    }, ref);

    const {buttonProps, isPressed} = useButton(ariaButtonProps, ref);

    const btnClass = (() => {
        let rv = ['btn anim fm-sb'];

        if(isPressed){
            rv.push('pressed')
        }

        if(disabled || wait){
            rv.push('disabled')
        }

        if(!disabled && !wait && active){
            rv.push('actv')
        }

        if(!disabled && !wait && !active && hover){
            rv.push('hvr');
        }



        return rv.join(' ');
    })();

    const buttonConf = (() => {
        let rval = helpers.json.get(props, 'config.button', {});
            rval = helpers.element.jsx.getCompThemeDs(rval, 'button');

        let theme = helpers.json.get(rval, 'ds.theme.default', {});

        if(disabled){
            theme = helpers.json.merge(theme, helpers.json.get(rval, 'ds.theme.disabled', {}));
        }

        return helpers.json.merge(rval, helpers.json.set({}, 'ds.theme', theme));
    })();

    const mergedProps = mergeProps(buttonProps, focusProps, {...helpers.element.jsx.attrs(buttonConf, btnClass), isPressed, ref});

    const icon = (type) => {
        let iconf = helpers.json.get(props, `config.icons.${type}`, {});

        if(iconf && iconf.type){

            if(iconf.type === 'font'){
                return <FontIcon config={iconf} />
            }

            if(iconf.type === 'svg'){
                return <SvgIcon config={iconf} />
            }
            
        }

        return <></>
    }

    const hasicon = (type) => {
        let iconf = helpers.json.get(props, `config.icons.${type}`, {});

        return (iconf && iconf.type && (iconf.type === 'font' || iconf.type === 'svg'));
    }

    const btnLabel = () => {
        let wait = helpers.json.get(states, 'wait.enabled', false);
        let btn = helpers.json.get(props, 'config.button.content', '');

        if(wait){
            return helpers.element.jsx.content({content:helpers.json.get(states, 'wait.content', btn)}, false, '', props)
        }else{
            return helpers.element.jsx.content({content:btn}, false, '', props)
        }
    }

    const label = () => {
        let cls = [];
        let lbl = btnLabel();
        let lic = hasicon('left');
        let ric = hasicon('right');

        if(lic){
            cls.push('mr-l8')
        }

        if(ric){
            cls.push('mr-r8')
        }

        if(cls.length > 0 && lbl){
            return (
                <span className={`btn-lbl al with-ico ${cls.join(' ')}`}>
                    {btnLabel()}
                </span>
            )
        }else{
            return btnLabel();
        }
    }

    const ui = () => {
        if(props.children){
            return props.children
        }else{
            return (
                <>
                    {icon('left')}
                    {label()}
                    {icon('right')}
                </>
            )
        }
    }

    return (
        <Element {...mergedProps}>
            {ui()}
        </Element>
    );
});

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;