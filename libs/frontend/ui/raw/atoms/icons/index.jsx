import helpers from 'ui-helpers';
import {forwardRef, useRef, createElement} from "react";
import {usePress, useHover, useButton, useFocus, mergeProps} from "react-aria";
    
const Comp = forwardRef((dprops, forwardedRef) => {
    let ref = useRef();
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    let type = helpers.json.get(props, 'config.type', 'font');
    let Elm = helpers.json.get(props, "config.markup.element", "span");

    const callback = helpers.json.get(props, 'callback', {});
    const {buttonProps} = useButton(callback, ref);
    const {pressProps, isPressed} = usePress(callback, ref);
    const {hoverProps, isHovered} = useHover(callback, ref);
    const {focusProps, isFocused} = useFocus(callback, ref);
    const mergedCallback = mergeProps(pressProps, hoverProps, focusProps);
    
    const icocls = () => {
        return helpers.element.jsx.css.icon.get(props.config || {});
    }

    const svgstyle = () => {
        let size = helpers.json.get(props, 'config.svg.size', '24px');
        let rval = helpers.json.merge({}, helpers.json.get(props, 'config.svg.style', {}));

        if(size){
            rval.width = size;
            rval.height = size;
        }

        return rval;
    }

    const addDataAttrIconConfig = (arg) => {
        if(arg.dataAttrIconConfig){
            arg = helpers.json.set(arg, 'dataAttrs.icon-conf', helpers.element.attr.objToString({...(arg.icon || {}), ...{type:type}}));
        }

        return arg;
    }

    const getsvg = (src) => {
        let ds = helpers.element.jsx.ds(props.config || {}, null, '', 'svg-icon', props);

        return (
            <Elm
                {...ds}
                style={svgstyle()}
				{...mergedCallback}
                dangerouslySetInnerHTML={{ __html:helpers.element.svg.sanitize(src, helpers.json.get(props, 'config.svg.svgprops', {}))}}
            />
        )
    }

    const ui = () => {
        if(type === 'font'){
			let dsProps = props.config || {};
                dsProps = addDataAttrIconConfig(dsProps);

			let attrs = helpers.element.jsx.attrs(dsProps, icocls());
			let elm = helpers.json.get(dsProps, 'markup.element', 'div');
                

			return createElement(elm, {...attrs, ...mergedCallback}, helpers.element.jsx.getChild(dsProps, createElement, '', props));
        }else{
            let src = helpers.json.get(props, 'config.svg.src', '');

            if(type === 'svg' && src){
                return getsvg(src)
            }else{
                return <></>
            }
        }
    }

    return ui();
});

export default Comp;