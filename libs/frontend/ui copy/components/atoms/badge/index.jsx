import helpers from 'ui-helpers';
import {forwardRef, useMemo, useRef} from "react";
import SvgIcon from 'aio-global-ui/atoms/icons/svg';
import FontIcon from 'aio-global-ui/atoms/icons/font';
import {useButton, useFocus, mergeProps} from "react-aria";

const Comp = forwardRef((dprops, forwardedRef) => {
    const ref = forwardedRef || useRef(null);
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const dsTheme = (rval) => {
        let rv = helpers.json.merge(rval, {
            ds:{
                theme:props.theme || {},
                predefined:helpers.json.get(props, 'dsTheme', {})
            }
        });

        return rv;
    }

    const wrpConfig = (() => {
        return helpers.element.jsx.getCompThemeDs(dsTheme(helpers.json.get(props, 'config.wrapper', {})), 'badge');
    })();


    const elm = helpers.json.get(wrpConfig, "config.wrapper.markup.element", "div");
    const Element = elm;

    const hasIcon = (type) => {
		let iconf = helpers.json.get(props, `config.icons.${type}`, {});

		if(iconf.type === 'font'){
			return (iconf?.icon?.name)
		}

		if(iconf.type === 'svg'){
			return (iconf?.svg?.src)
		}
	}

    const hasAvatar = (type) => {
		return helpers.json.get(props, `avatar.${type}`, '');
	}

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

    const content = () => {
        const leftIcon = hasIcon('left');
        const rightIcon = hasIcon('right');
        
        if(leftIcon || rightIcon){
            const ctntConfig = helpers.json.get(props, "config.content", {});
            const Elem = helpers.json.get(props, "config.content.markup.element", "div");

            return (
                <Elem {...helpers.element.jsx.attrs(ctntConfig, 'flx-full bxs badge-content')}>
                    {helpers.element.jsx.getChild({content:props.content}, null, props.children, props)}
                </Elem>
            )
        }else{
            return helpers.element.jsx.getChild({content:props.content}, null, props.children, props);
        }
    }

    const avatar = (type) => {
        return hasAvatar(type);
    }

    const ui = () => {
        if(props.children){
            return props.children
        }else{
            return (
                <>
                    {avatar('left')}
                    {icon('left')}
                    {content()}
                    {icon('right')}
                    {avatar('right')}
                </>
            )
        }
    }

    const wrpCls = () => {
        const leftIcon = hasIcon('left');
        const rightIcon = hasIcon('right');
        const leftAvatar = hasAvatar('left');
        const rightAvatar = hasAvatar('right');
        const rval = ['badge flx-vc bxs anim'];
        
            if(leftAvatar || rightAvatar){
                rval.push('has-avatar')
            }

            if(leftAvatar){
                rval.push('has-left-avatar')
            }

            if(rightAvatar){
                rval.push('has-right-avatar')
            }

            if(leftIcon || rightIcon){
                rval.push('has-ico')
            }

            if(leftIcon){
                rval.push('has-left-ico')
            }

            if(rightIcon){
                rval.push('has-right-ico')
            }

        return rval.join(' ');
    }

    return (
        <Element {...helpers.element.jsx.attrs(wrpConfig, wrpCls())}>
            {ui()}
        </Element>
    );
});

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;