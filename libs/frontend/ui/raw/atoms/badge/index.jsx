import helpers from 'ui-helpers';
import {forwardRef, createElement} from "react";
import Aavatar from 'aio-global-raw-ui/atoms/avatar';
import SvgIcon from 'aio-global-raw-ui/atoms/icons/svg';
import FontIcon from 'aio-global-raw-ui/atoms/icons/font';

const Comp = forwardRef((dprops, forwardedRef) => {
    const rId = 'rId'+helpers.random.id(10);
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const wrpConfig = helpers.json.get(props, 'config.wrapper', {});

    const hasIcon = (type) => {
		let iconf = helpers.json.get(props, `icons.${type}.config`, {});

		if(iconf.type === 'font'){
			return (iconf?.icon?.name)
		}

		if(iconf.type === 'svg'){
			return (iconf?.svg?.src)
		}
	}

    const icon = (type) => {
        let iconf = helpers.json.get(props, `icons.${type}.config`, {});
        let callback = helpers.json.get(props, `icons.${type}.callback`, {});

        if(iconf && iconf.type){
            if(iconf.type === 'font'){
                return <FontIcon config={iconf} callback={callback} />
            }

            if(iconf.type === 'svg'){
                return <SvgIcon config={iconf} callback={callback} />
            }
        }

        return <></>
    }

    const content = () => {
        const leftIcon = hasIcon('left');
        const rightIcon = hasIcon('right');
        const hasContent = helpers.json.get(props, 'content', rId);

        if((leftIcon || rightIcon) && (hasContent && hasContent != rId)){
            return createElement(helpers.json.get(props, "config.content.markup.element", "div"), helpers.element.jsx.attrs(helpers.json.get(props, "config.content", {}), 'flx-full bxs badge-content'), helpers.element.jsx.getChild({content:props.content}, null, props.children, props));
        }else{
            return helpers.element.jsx.getChild({content:props.content}, null, props.children, props);
        }
    }

    const hasAvatar = (type) => {
		return helpers.json.get(props, `avatars.${type}.enable`, '');
	}

    const avatar = (type) => {
        let has = hasAvatar(type);

        if(has){
            return <Aavatar {...helpers.json.get(props, `avatars.${type}`, {})} />
        }else{
            return <></>
        }
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

    return createElement(helpers.json.get(wrpConfig, "markup.element", "div"), helpers.element.jsx.attrs(wrpConfig, wrpCls()), ui());
});

export default Comp;