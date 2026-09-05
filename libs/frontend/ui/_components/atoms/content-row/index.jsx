import helpers from 'ui-helpers';
import {useButton} from "react-aria";
import {createElement, useRef, useState, forwardRef} from "react";

const Comp = forwardRef((dprops, ref) => {
	const wrpRef = ref || useRef(null);
	const id = helpers.random.uuid();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

	const callback = (e, type, elm) => {
		let cb = helpers.json.get(props, `callbacks.${type}`);
		let isfun = helpers.data.type.is(cb, 'function');
		if(isfun){cb(e, props)}
	}

	const getCallbacks = () => {
		return {
			onClick:(e) => callback(e, 'onClick')
		}
	}

    const dsTheme = (prop, type) => {
		let cb = helpers.json.get(prop, `callbacks.dsTheme`, null);
		let isfun = helpers.data.type.is(cb, 'function');
		let dds = helpers.json.merge(helpers.json.get(prop, `config.${type}`, {}), {
			ds:{
				predefined:helpers.json.get(prop, `dsTheme.${type}`, {})
			}
		});

		if(isfun){
			return cb(dds, type, prop);
		}else{
			return dds;
		}
    }

	const hasPlaceholders = (prop) => {
		let start = helpers.json.get(prop, 'childs.start', id);
		let before = helpers.json.get(prop, 'childs.before', id);
		let after = helpers.json.get(prop, 'childs.after', id);
		let end = helpers.json.get(prop, 'childs.end', id);

		return ((start && start != id) || (before && before != id) || (after && after != id) || (end && end != id))
	}

	const content = (prop, type, childs) => {
		return helpers.element.jsx.getChild({content:helpers.json.get(prop, `childs.${type}`, '')}, createElement, childs, prop);
	}

	const getChild = (prop, type) => {
		let hs = helpers.json.get(prop, `childs.${type}`, '');

		if(hs){
			return createElement(helpers.json.get(prop, `config.${type}.markup.element`, "div"), helpers.element.jsx.attrs(dsTheme(prop, type), `anim ctnt-row-${type}`), content(prop, type));
		}else{
			return <></>
		}
	}

	const center = (prop) => {
		return createElement(helpers.json.get(prop, "config.center.markup.element", "div"), helpers.element.jsx.attrs(dsTheme(prop, 'center'), 'flx-full anim ctnt-row-center'), content(prop, 'center', prop.children))
	}

	const child = (prop) => {
		let hasOther = hasPlaceholders(prop);

		if(hasOther && !props.children){
			return (
				<>	
					{getChild(prop, 'start')}
					{getChild(prop, 'before')}
					{center(prop)}
					{getChild(prop, 'after')}
					{getChild(prop, 'end')}
				</>
			)
		}else{
			return center(prop);
		}
	}

	const beforeRender = () => {
		let prop = helpers.json.copy(props);
		let beforeRender = helpers.json.get(props, 'callbacks.beforeRender', null);
		let isfun = helpers.data.type.is(beforeRender, 'function');

		if(isfun){
			let rv = beforeRender(prop);
			if(rv){
				prop = rv;
			}
		}

		return prop;
	}

	const ui = () => {
		const prop = beforeRender();
		const ctnt = helpers.json.get(prop, 'childs.center', id);
		if((ctnt && ctnt != id) || prop.children){
			return createElement(helpers.json.get(prop, "config.wrapper.markup.element", "div"), {...helpers.element.jsx.attrs(dsTheme(prop, 'wrapper'), 'flx-d anim'), ...getCallbacks()}, child(prop));
		}

		return <></>
	}

	return ui();
});

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;