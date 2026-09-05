import helpers from 'ui-helpers';
import {forwardRef} from "react";
import Icon from 'aio-global-raw-ui/atoms/icons';
import Row from 'aio-global-raw-ui/atoms/content-row';

const Comp = forwardRef((dprops, ref) => {
	const id = helpers.random.uuid();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

	const icoConfig = () => {
		let rval = helpers.json.get(props, 'expendIcon.config', {});
		let icons = helpers.json.get(props, `expendIcon.names`, {});
		let show = helpers.json.get(props, 'expendIcon.show', false);
		let state = helpers.json.get(props, 'expendIcon.state', 'default');
		let type = helpers.json.get(props, 'expendIcon.config.config.type', 'font');

		if(state === 'default' || state === 'selected'){
			let ico = helpers.json.get(props, `expendIcon.names.${state}`, '');
			if(ico){
				if(type === 'font'){
					rval = helpers.json.merge(rval, helpers.json.set({}, `config.icon.name`, (show?ico:id)));
				}

				if(type === 'svg'){
					rval = helpers.json.merge(rval, helpers.json.set({}, `config.svg.src`, (show?ico:id)));
				}

				rval = helpers.json.set(rval, 'config.dataAttrs.accordion-icon', JSON.stringify({
					icons:icons
				}))
			};
		}

		return rval;
	}

	const expendIcon = () => {

		return (
			<Icon {...icoConfig()} />
		)
	}

	const icon = () => {
		let exc = helpers.json.get(props, 'expendIcon.exclude', false);

		if(exc){
			return {};
		};

		return helpers.json.set({}, `childs.${helpers.json.get(props, 'expendIcon.placement', 'start')}`,  expendIcon());
	}

	const ui = () => {
		return (
			<Row {...helpers.json.merge(helpers.json.copy(props), icon())} />
		)
	}

	return ui();
});

export default Comp;