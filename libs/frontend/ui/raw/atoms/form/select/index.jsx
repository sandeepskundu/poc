import helpers from 'ui-helpers';
import Badge from 'aio-global-ui/atoms/badge';
import Icon from 'aio-global-raw-ui/atoms/icons';
import Input from 'aio-global-raw-ui/atoms/form/input';
import List from 'aio-global-raw-ui/atoms/list/box/base';
import {useEffect, useRef, useState, forwardRef, createElement} from "react";

const Comp = forwardRef((dprops, pref) => {
	const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
	const ref = pref || useRef(null);
	const rId = `rId${helpers.random.id(24)}`;
	const selKeys = helpers.json.get(props, 'mapping.selected', {});
	const multiple = helpers.json.get(props, 'selection.multiple', false);
	const filterOn = helpers.json.get(props, 'filter.startOn', 'onChange');
	const [open, setOpen] = useState(helpers.json.get(props, 'open', false));

	const normalizeData = (type) => {
		let li = helpers.json.get(props, `data.${type}`, {});

		if(helpers.data.type.is(li, 'object')){
			return li;
		}

		if(helpers.data.type.is(li, 'list')){
			let rv = {};
			for(let a in li){
				rv[a] = li[a];
			}

			return rv;
		}

		return {};
	};

	const selected = normalizeData('selected');

	const [data, setData] = useState({
		selected:selected,
		list:normalizeData('list'),
		disabled:normalizeData('disabled'),
		excluded:normalizeData('excluded')
	});

	const cbArgs = () => {
		return {
			open:open,
			data:data,
			props:props,
		}
	}

	const callbackByMap = (map) => {
		let rv = helpers.json.get(props, map, '');

		if(helpers.data.type.is(rv, 'function')){
			return rv;
		}else{
			return false;
		}
	}

	const resetList = () => {
		let d = helpers.json.copy(data);
			d.list = normalizeData('list');
			setData(d);
	}

	useEffect(() => {
		let ocb = callbackByMap('callback.onOpen');
		let ccb = callbackByMap('callback.onClose');

		if(ocb && open){
			ocb(cbArgs());
		}

		if(ccb && open === false){
			ccb(cbArgs());

			setTimeout(() => {
				resetList();
			}, 0);
		}
	}, [open])

	const dchilds = {
		end:(arg) => {
			if(arg && arg.state === 'selected'){
				return (
					<Icon 
						config={{
							icon:{
								size:"20",
								name:'check'
							}
						}}
					/>
				)
			};
			return ''
		}
	}

	const optionChilds = () => {
		let rval = dchilds;
		let temp = helpers.json.get(props, 'templates.option', {});

		for(let a in temp){
			if(helpers.data.type.is(temp[a], 'function')){
				rval[a] = temp[a];
			}
		}

		return rval;
	}

	 const selhash = (arg, keys) => {
		let rv = [];

		for(let a in keys){
			let v = helpers.json.get(arg, keys[a], rId);
				rv.push(v);
		}

		return helpers.crpt.md5(rv.join(''));
	} 

	const addToSelect = (item) => {
		let rv = {};
		let count = 0;
		let d = helpers.json.copy(data)
		let sl = helpers.json.get(d, 'selected', {});
		let onSelect = callbackByMap('callback.onSelect');
		let max = helpers.json.get(props, 'selection.max', 10);
		let onSelectChange = callbackByMap('callback.onChange.selected');
		let slLen = helpers.json.length(sl);

		if(multiple && slLen > 0 && slLen <= max-1){
			for(let a in sl){
				rv[count] = sl[a];
				count = count+1
			}
		};

		rv[count] = item;
		d.selected = rv;
		setData(d);

		debugger;

		if(onSelect){
			onSelect(rv, cbArgs());
		};

		if(onSelectChange){
			onSelectChange(rv, cbArgs())
		}

		if(!multiple || (multiple && count === max-1)){
			toggle('select', false);
		}
	}

	const removeFromSelected = (item) => {
		let rv = {};
		let count = 0;
		let d = helpers.json.copy(data)
		let sl = helpers.json.get(d, 'selected', {});
		let onRemove = callbackByMap('callback.onRemove');
		let min = helpers.json.get(props, 'selection.min', 0);
		let onSelectChange = callbackByMap('callback.onChange.selected');

		if(helpers.json.length(sl) > 0){
			let ihash = selhash(item, selKeys);
			for(let a in sl){
				if(selhash(sl[a], selKeys) != ihash){
					rv[count] = sl[a];
					count++;
				}
			}
		}

		d.selected = rv;
		setData(d);

		if(onRemove){
			onRemove(rv, cbArgs());
		}

		if(onSelectChange){
			onSelectChange(rv, cbArgs());
		}

		if(count >= min){
			toggle('remove', false);
		}
	}

	const onItemClick = (item, currentState, prevState, props) => {
		if(prevState === 'selected'){
			removeFromSelected(item);
		}else{
			addToSelect(item)
		}
	}

	const optionCallback = () => {
		let cbs = helpers.json.get(props, 'listbox.callbacks.item', {})
			cbs = helpers.json.copy(cbs);
			cbs.wrapper = cbs.wrapper || {};
			cbs.wrapper.onClick = (item, currentState, prevState, props) => {
				let cb = callbackByMap('listbox.callbacks.item.onClick');
					onItemClick(item, currentState, prevState, props)
					if(cb){
						cb(item, currentState, prevState, props);
					}
			};
	
		return cbs;
	}

	const noResultContent = () => {
		let dl = helpers.json.get(data, `list`, {});
		let ol = helpers.json.get(props, `data.list`, {});
		let nr = helpers.json.get(props, 'content.noResult', {});

		if(helpers.data.type.is(ol, 'object')){
			ol = helpers.json.length(ol);
		}

		if(helpers.data.type.is(ol, 'list')){
			ol = ol.length;
		}

		if(helpers.data.type.is(dl, 'object')){
			dl = helpers.json.length(dl);
		}

		if(helpers.data.type.is(dl, 'list')){
			dl = dl.length;
		}

		if(ol === 0){
			return helpers.json.get(nr, 'orginial', '');	
		}

		if(dl === 0){
			return helpers.json.get(nr, 'filtered', '');	
		}

		return helpers.json.get(nr, 'default', '') || 'No results'
	}

	const getListBox = () => {
		let temp = helpers.json.get(props, 'templates.listbox', {});
		let rv = {};
		
		for(let a in temp){
			if(helpers.data.type.is(temp[a], 'function')){
				rv[a] = temp[a];
			}
		}

		rv.noresults = (arg) => {
			let cb = callbackByMap('templates.listbox.noresults');

			if(cb){
				return cb(cbArgs(), arg);
			}else{
				let nrProps = helpers.json.get(props, 'listbox.config.noresults', {});
				return createElement(helpers.json.get(nrProps, "wrapper.markup.element", 'li'), helpers.element.jsx.attrs(nrProps, 'anim'),  noResultContent());
			}
		};
				
		return rv;
	}

	const listProps = () => {
		return helpers.json.merge(helpers.json.get(props, 'listbox', {}), {
			data:data,
			item:{
				childs:optionChilds(),
				callbacks:optionCallback()
			},
			templates:getListBox(),
			switch:helpers.json.get(props, 'switch', {}),
			mapping:helpers.json.get(props, 'mapping', {})
		})
	}

	const autocomplete = () => {
		return (
			<List {...listProps()} />
		)
	}

	const toggle = (eventName, isOpen) => {
		if(isOpen){
			if(helpers.json.get(props, `openOn.${eventName}`, false)){
				setOpen(true);
			}
		}else{
			if(helpers.json.get(props, `closeOn.${eventName}`, false)){
				setTimeout(() => {
					setOpen(false);
				}, 10);
			};
		}
	}

	const onInputClick = (e) => {
		if(helpers.json.get(props, 'openOn.inputToggle', false)){
			setOpen(!open);
		}
		inputCallback(e, 'onClick');
	}

	const onInputFocus = (e) => {
		toggle('focus', true)
		inputCallback(e, 'onBlur');
	}

	const onInputBlur = (e) => {
		toggle('blur', false)
		inputCallback(e, 'onBlur')
	}

	const search = (val) => {
		let d = helpers.json.copy(data);
		let list = helpers.json.get(props, 'data.list', {});
		let afterFilterCallback = callbackByMap('callback.onChange.afterFilter');
		let afterListUpdate = callbackByMap('callback.onChange.afterListUpdate');
		let beforeFilterCallback = callbackByMap('callback.onChange.beforeFilter');

		if(beforeFilterCallback){
			beforeFilterCallback(val, cbArgs());
		}

		if(val){
			let doFilter = callbackByMap('filter.callback.doFilter');

			if(doFilter){
				list = doFilter(list, val, props);
				list = list || [];
			}else{
				list = helpers.plugins.search.init(list, val, helpers.json.get(props, 'filter.logics', {}));
			}

			d.list = list;
		}else{
			d.list = list;
		}

		if(afterFilterCallback){
			afterFilterCallback(val, cbArgs(), list);
		};

		setData(d);

		if(afterListUpdate){
			afterFilterCallback(val, cbArgs());
		}

		toggle('search', true)
	}

	const inputCallback = (arg, type) => {
		let cb = callbackByMap(`input.callback.${type}`);

		if(cb){
			cb(arg);
		}
	}

	const filter = (arg, type) => {
		if(filterOn === type){
			search((type === 'onInput')?helpers.json.get(e, 'target.value', ''):arg);
		};
		inputCallback(arg, type);
	}

	const tagIconsProps = (item) => {
		let rval = helpers.json.get(props, 'multiselect.badge.icons', {});
			rval = helpers.json.merge(rval, {
				right:{
					callback:{
						onClick:() => {
							let cb = callbackByMap(`multiselect.badge.icons.right.callback.onClick`);
							if(cb){cb(arg)}
							removeFromSelected(item);
						}
					}
				}
			});

		return rval;
	}

	const multiSelectList = () => {
		let sl = helpers.json.get(data, 'selected', {});
		let li = helpers.json.toList(sl);
		let node = helpers.json.get(props, 'mapping.value', 'label');
		let cb = callbackByMap(`multiselect.templates.tag`);

		return li.map((item, i) => {
			if(cb){
				return cb(item, i, cbArgs(), removeFromSelected);
			}else{
				return (
					<Badge 
						icons={tagIconsProps(item)}
						content={helpers.json.get(item, node, '')}
						config={helpers.json.get(props, 'multiselect.badge.config', {})}
					/>
				)
			}
			
		})
	}

	const multiSelect = () => {
		if(multiple){
			let sl = helpers.json.get(data, 'selected', {});
			let slLen = helpers.json.length(sl);
			if(slLen > 0){
				let cb = callbackByMap(`multiselect.templates.wrapper`);

				if(cb){
					return cb(cbArgs(), removeFromSelected)
				}else{
					return createElement(helpers.json.get(props, "multiselect.wrapper.markup.element", "ul"), {...helpers.element.jsx.attrs(helpers.json.get(props, "multiselect.wrapper", {}), 'full bxs anim')}, multiSelectList());
				}
			}
		}
	}

	const inputValue = () => {
		if(multiple){
			return '';
		}

		let rval = [];
		let sl = helpers.json.get(data, 'selected', {});
		let node = helpers.json.get(props, 'mapping.value', 'label');
		
		for(let a in sl){
			let val = helpers.json.get(sl[a], node, '');
				rval.push(val);
				break;
		}

		return rval.join(', ')
	}

	const inProps = () => {
		let rval = helpers.json.get(props, 'input', {});
			rval = helpers.json.copy(rval);
			rval.icons = {           
				right:{
					config:{
						icon:{
							name:open?'a-up':'a-down'
						}
					}
				}
            }
			rval.callback = helpers.json.merge(rval.callback || {}, {
				onBlur:onInputBlur,
				onFocus:onInputFocus,
				onClick:onInputClick,
				onInput:(e) => {filter(e, 'onInput')},
				onChange:(e) => {filter(e, 'onChange')},
				onChangeEnd:(e) => {filter(e, 'onChangeEnd')},
				onChangeStart:(e) => {filter(e, 'onChangeStart')}
			});

		return rval;
	}

	const ui =  () => {
		return (
			<>
				<Input
					{...inProps()}
					tags={multiSelect}
					value={inputValue()}
					readonly={!helpers.json.get(props, 'searchable', true)}
					autocomplete={{
						show:open,
						enable:true,
						options:autocomplete,
						positions:helpers.json.get(props, 'position', 'bottom'),
						multiple:{
							palcement:helpers.json.get(props, 'multiselect.placement', 'inside')
						}
					}}
				/>
			</>
		)
	}

	return ui();
});

export default Comp;