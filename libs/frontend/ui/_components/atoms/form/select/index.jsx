import helpers from 'ui-helpers';
import Icon from 'aio-global-ui/atoms/icons';
import PopOver from 'aio-global-ui/atoms/popover';
import Input from 'aio-global-ui/atoms/form/input';
import ListBox from 'aio-global-ui/atoms/list/box';
import {useEffect, useRef, useState, forwardRef, createElement} from "react";

const Comp = forwardRef((dprops, pref) => {
	const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
	const ref = pref || useRef(null);
	const rId = `rId${helpers.random.id(24)}`;
	const [selected, setSelected] = useState(helpers.json.get(props, 'option.selected', {}))

	const getvalue = () => {
		let multi = helpers.json.get(props, 'multiple', false);
		if(multi){
			return '';
		}else{
			return helpers.json.get(selected, helpers.json.get(props, 'keymap.label', 'label'), helpers.json.get(props, 'input.value', ''));
		}
	}

	const [state, setState] = useState({
		value:getvalue(),
		open:helpers.json.get(props, 'open', false)
	});

	useEffect(() => {
		updateState('value', getvalue());
	}, [selected]);

	useEffect(() => {
		toggleCallbacks();
	}, [state])

	useEffect(() => {
		document.addEventListener("mousedown", outside);
		return () => {
			document.removeEventListener("mousedown", outside);
		};
	}, []);

	const toggleCallbacks = () => {
		let open = helpers.json.get(state, 'open', false);
		let onopen = helpers.json.get(props, 'callback.onOpen', null);
		let onclose = helpers.json.get(props, 'callback.onClose', null);

		if(open && onopen && helpers.data.type.is(onopen, 'function')){
			onopen();
		}

		if(!open && onclose && helpers.data.type.is(onclose, 'function')){
			onclose();
		}
	}

	const outside = (e) => {
		if(ref.current && !ref.current.contains(event.target)){
			closeOptions()
		}
	}

	const getOptions = () => {
		let rval = {};
		let list = helpers.json.get(props, 'option.list', {});

		if(helpers.data.type.is(list, 'list') && list.length > 0){
			for(let a in list){
				rval[a] = list[a];
			}
		}else{
			if(helpers.data.type.is(list, 'object')){
				rval = list;
			}
		}

		return rval;
	};

	const [options, setOptions] = useState(getOptions());

	const updateState = (key, val) => {
		setState((prev) => ({...prev, [key]:val}));
	}

	const isVaildTemplate = (map) => {
		let temp = helpers.json.get(props, `templates.${map}`, '');

		if(helpers.data.type.is(temp, 'function')){
			return temp;
		}else{
			return false;
		}
	}

	const getContent = (map) => {
		let msg = helpers.json.get(props, `content.${map}`, '');

		if(helpers.data.type.is(msg, 'string')){
			return msg;
		}else{
			return '';
		}
	}

	const toggle = (val) => {
		if(typeof val != 'undefined'){
			updateState('open', val);
		}else{
			updateState('open', !state.open);
		}
	}

	const closeOptions = () => {
		updateState('open', false);
	}

	const onBlur = (e) => {
		//closeOptions();
		setOptions(getOptions());
	}

	const onFocus = (e) => {
		const t = helpers.json.get(props, 'behavior.toggle');
		if(t){
			toggle();
		}else{
			updateState('open', true);
		}
	}

	const changeCallback = (val, type, list) => {
		let cb = helpers.json.get(props, `callback.onChange.${type}`);

		if(cb && helpers.data.type.is(cb, 'function')){
			cb(val, list, selected);
		}
	}

	const onChangeEnd = (val) => {
		let list = getOptions();

		updateState('value', val || '');
		changeCallback(val, 'beforeFilter', list);

		if(val){
			let fcb = helpers.json.get(props, 'filter.callback', {});

			if(fcb && helpers.data.type.is(fcb, 'function')){
				list = fcb(list, selected);
				changeCallback(val, 'afterFilter', list);
				setOptions(list);
			}else{
				let logic = helpers.json.get(props, 'filter.logics', {});
				let config = helpers.json.get(props, 'filter.config', {});
					list = helpers.plugins.search.init(list, val, logic, config);
					changeCallback(val, 'afterFilter', list);
					setOptions(list);
			}
		}else{
			setOptions(list);
		}

		changeCallback(val, 'afterListUpdate', list);
	};

	const callbacks = () => {
		return helpers.json.merge(helpers.json.get(props, 'callback.input', {}), {
			onBlur:onBlur,
			onFocus:onFocus,
			onChange:onChangeEnd,
		})
	}

	const toggleIcon = (rval) => {
		if(state.open){
			rval = helpers.json.set(rval, 'icons.right.config.icon.name', 'a-down r-180d')
		}else{
			rval = helpers.json.set(rval, 'icons.right.config.icon.name', 'a-down')
		}

		return rval;
	}

	const inputText = () => {
		let iprops = helpers.json.get(props, 'input', {});
			iprops = helpers.json.merge(iprops, {
				value:state.value,
				callback:callbacks(),
				readonly:!helpers.json.get(props, 'searchable', false)
			});
			iprops = toggleIcon(iprops);

		return <Input {...iprops} />
	}

	const trigger = () => {
		let Trgr = helpers.json.get(props, 'templates.trigger', '');

		if(Trgr && helpers.data.type.is(Trgr, 'function')){
			return Trgr(toggle, props, selected);
		}

		if(Trgr && helpers.data.type.is(Trgr, 'jsx')){
			return React.createElement('div', {onClick:toggle, className:'bxs flx-full'}, Trgr);
		}

		if(Trgr && helpers.data.type.is(Trgr, 'string')){
			return React.createElement('div', {onClick:toggle, className:'bxs flx-full'}, Trgr);
		}
		
		return inputText();
	}

	const isSelected = (item) => {
		let rval = false;
		let sel = selected;
		let selkey = helpers.json.get(props, 'keymap.selection', 'value');

		if(helpers.data.type.is(sel, 'object')){
			let sId = helpers.json.get(sel, selkey, rId);
			let iId = helpers.json.get(item, selkey, rId);

			return ((iId != rId) && (sId != rId) && (iId === sId));
		}else{
			if(sel && sel.length > 0){
				for(let a in sel){
					let iId = helpers.json.get(item, selkey, '');
					let sId = helpers.json.get(sel[a], selkey, '');

					if(iId && sId && (iId === sId)){
						rval = true;
						break;
					}
				}
			}
		}

		return rval;
	}

	const onSelect = (sel) => {
		let os = helpers.json.get(props, 'callback.onSelect', null);

		if(os){
			os(sel);
		}
	}

	const onRemove = (sel) => {
		let or = helpers.json.get(props, 'callback.onRemove', null);

		if(or){
			or(sel);
		}
	}

	const remove = (item) => {
		let sel = selected;
		let multi = helpers.json.get(props, 'multiple', false);
		let selkey = helpers.json.get(props, 'keymap.selection', 'value');

		if(helpers.data.type.is(sel, 'object')){
			let sId = helpers.json.get(sel, selkey, '');
			let iId = helpers.json.get(item, selkey, '');

			if(iId && sId && (iId === sId)){
				setSelected(null);
				onRemove(null);
			};
		}else{
			if(sel && sel.length > 0){
				let nl = [];
				for(let a in sel){
					let iId = helpers.json.get(item, selkey, '');
					let sId = helpers.json.get(sel[a], selkey, '');

					if(iId && sId && (iId === sId)){
						
					}else{
						nl.push(sel[a]);
					}
				}

				setSelected(nl);
				onRemove(nl);
			}
		}
	}

	const itemClick = (e, arg) => {
		let details = helpers.json.get(arg, '_details.data', {});
		let multi = helpers.json.get(props, 'multiple', false);
		let issel = isSelected(details);
		let allowDeselect = helpers.json.get(props, 'allowDeselect', false);
		let closeOnSelect = helpers.json.get(props, 'closeOnSelect', false);

		if(issel && allowDeselect){
			remove(details);
		}else{
			if(multi){
				let s = [...selected]
					s.push(details);
					setSelected(s);
					onSelect(s);
			}else{
				setSelected(details);
				onSelect(details);
			}

			if(closeOnSelect){
				closeOptions();
			}
		}
	}

	const selectedIcon = (arg) => {
		let enabled = helpers.json.get(props, 'selectedIcon.enabled', false);

		if(enabled){
			let placement = helpers.json.get(props, 'selectedIcon.placement', 'end');

			const dico = () => {
				return (
					<Icon {...helpers.json.get(props, 'selectedIcon', {})}/>
				)
			}

			const ui = (arg) => {
				let Ctnt = helpers.json.get(props, 'selectedIcon.content', null);

				if(Ctnt && helpers.data.type.is(Ctnt, 'function')){
					return Ctnt(arg, helpers.json.get(props, 'selectedIcon', {}))
				}

				if(Ctnt && helpers.data.type.is(Ctnt, 'jsx')){
					return React.createElement(React.Fragment, null, Ctnt);
				}

				if(Ctnt && helpers.data.type.is(Ctnt, 'string')){
					return React.createElement(React.Fragment, null, Ctnt);
				}

				return dico();
			}

			arg = helpers.json.set(arg, `childs.${placement}`, ui, false, true);
		}

		return arg;
	}

	const beforeOptionRender = (arg, type) => {
		if(type === 'item'){
			let details = helpers.json.get(arg, '_details.data', {});
			let selected = isSelected(details);
				arg = helpers.json.set(arg, '_details.data._selected', selected, false, true);

			if(selected){
				arg = helpers.json.merge(selectedIcon(arg), helpers.json.get(props, 'listbox.selected.config.item', {}));
			}
		}

		return arg;
	}

	const hasResults = (original) => {
		let li = original?getOptions():options;

		if(helpers.data.type.is(li, 'object')){
			let oll = helpers.json.length(li || {});

			return (oll > 0)
		}

		if(helpers.data.type.is(li, 'list')){
			return (li && li.length > 0);
		}
	}

	const hasNoResults = () => {
		let fl = hasResults();
		let ol = hasResults(true);

		if(fl && ol){
			return false;
		}else{
			if(!ol){
				return 'orginial'
			}else{
				if(!fl){
					return 'filtered'
				}
			}
		}
	}

	const noResults = (type) => {
		let r = isVaildTemplate(`noResult.${type}`);

		if(r){
			return r(type, props)
		}else{
			let dr = isVaildTemplate(`noResult.default`);

			if(dr){
				return dr(type, props)
			}else{
				return createElement(helpers.json.get(props, 'noresult.markup.element', 'p'), helpers.element.jsx.attrs(helpers.json.get(props, 'noresult', {}), 'full bxs'), getContent(`noResult.${type}`))
			}
		}
	}

	const listboxConf = () => {
		return helpers.json.merge(helpers.json.get(props, 'listbox.default', {}), {
			callbacks:{
				item:{
					onClick:itemClick,
					beforeRender:(arg) => {
						return beforeOptionRender(arg, 'item');
					}
				},
				header:{
					onClick:null,
					beforeRender:(arg) => {
						return beforeOptionRender(arg, 'header');
					}
				}
			}
		});
	}

	const listBoxUi = () => {
		return <ListBox {...listboxConf()} data={options} />
	}

	const getContentProps = () => {
		return {
			compProps:props,
			localState:{
				state:state,
				options:options,
				selected:selected
			}
		}
	}

	const content = () => {
		let noresults = hasNoResults();

		if(noresults){
			return noResults(noresults)
		}else{
			let Temp = helpers.json.get(props, 'templates.list', null);

			if(Temp && helpers.data.type.is(Temp, 'function')){
				return Temp(getContentProps());
			}

			if(Temp && helpers.data.type.is(Temp, 'jsx')){
				return <Temp {...getContentProps()} />
			}

			return listBoxUi();
		}
	}

	const popoverProps = () => {
		let rval = helpers.json.merge(helpers.json.get(props, 'dropdown', {}), {
			controls:{
				open:state.open
			},
			config:helpers.json.get(props, 'config.dropdown', {}),
			templates:{
				trigger:trigger,
				content:content
			}
		});

		rval.ref = ref;

		return rval;
	}

	const ui = () => {
		return <PopOver {...popoverProps()} />
	}
	
	return ui();
});

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;