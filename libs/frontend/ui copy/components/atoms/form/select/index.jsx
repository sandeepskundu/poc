import helpers from 'ui-helpers';
import Icon from 'aio-global-ui/atoms/icons';
import PopOver from 'aio-global-ui/atoms/popover';
import Input from 'aio-global-ui/atoms/form/input';
import ListBox from 'aio-global-ui/atoms/list/box';
import {useEffect, useRef, useState, forwardRef, createElement} from "react";

/*--

const dp = {
	open:true,
	multiple:false,
	searchable:true,
	allowDeselect:true,
	closeOnSelect:true,

	filter:{
		"callback":null,
		"logics":{
			0:{
				"mode":'includes',
				"keys":['label']
			}
		},
		"config":{
			"match":"lowercase"
		}
	},

	selectedIcon:{
		display:true,
	}
	
	keymap:{
		"label":'label',
		"selection":'value',
	},

	content:{
		"noResult":{
			"default":"No selectable items found",
			"orginial":"No selectable items found",
			"filtered":"No results found"
		}
	},

	templates:{
		"list":() => {
			
		},
		"noResult":{
			default:() => {

			},
			orginial:() => {

			},
			filtered:() => {

			}
		},
		"trigger":() => {

		}
	},

	"selectedIcon":{
		"enabled":true,
		"content":null,
		"placement":"end",
		"iconConfig":{
			"type":"font",
			"icon":{
				"size":20,
				"name":"check"
			}
		}
	},

	dropdown:{
		"controls":{
			"arrow":false,
			"mode":"react",
			"toggle":"click",
			"position":"bottom-right"
		}
	},
	
	input:{
		"label":"",
		"name":"",
		"type":"",
		"error":"",
		"eye":false,
		"minLength":2,
		"maxlength":100,
		"description":"",
		"placeholder":"",
		"defaultValue":"",
		"debounceDelay":500,
		"prefix":false,
		"suffix":false,
		"invalid":false,
		"disabled":false,
		"required":false,
		"readonly":false,
		"clearable":true,
	},

	callback:{
		"onOpen":null,
		"onClose":null,
		"onSelect":null,
		"onRemove":null,
		"onChange":{
			"beforeFilter":null,
			"afterFilter":null,
			"afterListUpdate":null
		},
		"input":{
			"onCut":null,
			"onCopy":null,
			"onBlur":null,
			"onEnter":null,
			"onFocus":null,
			"onInput":null,
			"onPaste":null,
			"onSelect":null,
			"onKeyUp":null,
			"onKeyDown":null,
			"onChange":null,
			"onChangeEnd":null,
			"onChangeStart":null,
			"onBeforeInput":null,
			"onCompositionEnd":null,
			"onCompositionStart":null,
			"onCompositionUpdate":null
		},
	},

	dsTheme:{
		"input":{},
		"dropdown":{
			"wrapper":{},
			"content":{
				"radius":"6",
				"shadow":"md",
				"border":"c00104",
				"background":"c00000"
			},
			"noResult":{
				"default":{
					"color":"c00306",
					"font__d__size":"xs"
				},
				"orginial":{},
				"filtered":{}
			}
		},
		"listBox":{
			"boxWrapper":{
				"color":"",
				"border":"",
				"shadow":"",
				"background":""
			},
			"item":{
				"default":{
					"end":{},
					"after":{},
					"start":{},
					"before":{},
					"center":{},
					"wrapper":{
						"background":"c00206"
					}
				},
				"selected":{
					"end":{},
					"after":{},
					"start":{},
					"before":{},
					"center":{},
					"wrapper":{
						"background":"c00306"
					}
				}
			},
		}
	},

	config:{
		"input":{
			"icons":{
				"left":{
					"svg":{},
					"attrs":{},
					"markup":{},
					"type":"font",
					"icon":{
						"name":""
					},
					"ds":{
						"css":{},
						"theme":{
							"filled":{},
							"default":{},
							"invalid":{},
							"focused":{},
							"readonly":{},
							"disabled":{}
						}
					}
				},
				"right":{
					"svg":{},
					"attrs":{},
					"markup":{},
					"type":"font",
					"icon":{
						"name":"da"
					},
					"ds":{
						"css":{},
						"theme":{
							"filled":{},
							"default":{},
							"invalid":{},
							"focused":{},
							"readonly":{},
							"disabled":{}
						}
					}
				},
				"clear":{}
			},
			"description":{
				"attrs":{},
				"markup":{},
				"ds":{
					"css":{},
					"theme":{
						"filled":{},
						"default":{},
						"invalid":{},
						"focused":{},
						"readonly":{},
						"disabled":{}
					}
				}
			},
			"error":{
				"attrs":{},
				"markup":{},
				"ds":{
					"css":{},
					"theme":{
						"filled":{},
						"default":{},
						"invalid":{},
						"focused":{},
						"readonly":{},
						"disabled":{}
					}
				}
			},
			"label":{
				"attrs":{},
				"markup":{},
				"ds":{
					"css":{},
					"theme":{
						"filled":{},
						"default":{},
						"invalid":{},
						"focused":{},
						"readonly":{},
						"disabled":{}
					}
				}
			},
			"input":{
				"attrs":{},
				"markup":{},
				"ds":{
					"css":{},
					"theme":{
						"filled":{},
						"default":{},
						"invalid":{},
						"focused":{},
						"readonly":{},
						"disabled":{}
					}
				}
			},
			"inputWrapper":{
				"attrs":{},
				"markup":{},
				"ds":{
					"css":{},
					"theme":{
						"filled":{},
						"default":{},
						"invalid":{},
						"focused":{},
						"readonly":{},
						"disabled":{}
					}
				}
			},
			"wrapper":{
				"attrs":{},
				"markup":{},
				"ds":{
					"css":{},
					"theme":{
						"filled":{},
						"default":{},
						"invalid":{},
						"ocused":{},
						"readonly":{},
						"disabled":{}
					}
				}
			},
			"asterisk":{
				"attrs":{},
				"markup":{},
				"ds":{
					"css":{},
					"theme":{
						"filled":{},
						"default":{},
						"invalid":{},
						"ocused":{},
						"readonly":{},
						"disabled":{}
					}
				}
			}
		},
		"dropdown":{
			"content":{
				"ds":{
					"css":{
						"class":{
							"padding":{}
						}
					}
				}
			},
			"wrapper":{
				"markup":{
					"element":"div"
				},
				"ds":{
					"css":{
						"class":{
							"padding":{}
						}
					}
				}
			},
			"noResult":{
				"default":{
					"markup":{
						"element":"p"
					},
					"ds":{
						"css":{
							"class":{
								"padding":{
									1:10,
									2:10
								}
							}
						}
					}
				},
				"orginial":{},
				"filtered":{}
			}
		},
		"listBox":{
			"item":{
				"default":{
					"end":{},
					"after":{},
					"start":{},
					"before":{},
					"center":{},
					"wrapper":{}
				}
			},
			"group":{
				"end":{},
				"after":{},
				"start":{},
				"before":{},
				"center":{},
				"wrapper":{}
			},
			"boxWrapper":{
				"markup":{
					"element":'ul'
				},
				"ds":{
					"css":{
						"class":{
							"borderNone":{
								1:true,
								2:true,
								3:true,
								4:true
							}
						}
					}
				}
			}
		}
	},

	option:{
		selected:{
			value:'2',
			label:'Group option one',
		},
		list:{
			0:{
				value:'1',
				type:'group',
				label:'Option one',
				childs:{
					0:{
						value:'2',
						label:'Group option one',
					},
					2:{
						value:'3',
						label:'Group option one',
					}
				}
			},
			1:{
				value:'4',
				label:'Option two',
			},
			2:{
				value:'5',
				label:'Option three'
			}, 
			4:{
				value:'6',
				label:'Option four'
			}
		}
	}
}
---*/

const Comp = forwardRef((dprops, pref) => {
	const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
	const ref = pref || useRef(null);
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
		open:helpers.json.get(props, 'open', false),
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

	const inputConfig = () => {
		let conf = helpers.json.get(props, 'config.input', {});

		if(state.open){
			conf = helpers.json.set(conf, 'icons.right.icon.name', 'a-down r-180d')
		}else{
			conf = helpers.json.set(conf, 'icons.right.icon.name', 'a-down')
		}

		return conf;
	}

	const inputText = () => {
		return (
			<Input
				value={state.value}
				callback={callbacks()}
				config={inputConfig()}
				name={helpers.json.get(props, 'input.name', '')}
				eye={helpers.json.get(props, 'input.eye', false)}
				label={helpers.json.get(props, 'input.label', '')}
				error={helpers.json.get(props, 'input.error', '')}
				type={helpers.json.get(props, 'input.type', 'text')}
				prefix={helpers.json.get(props, 'input.prefix', null)}
				suffix={helpers.json.get(props, 'input.suffix', null)}
				dsTheme={helpers.json.get(props, 'dsTheme.input', {})}
				readonly={!helpers.json.get(props, 'searchable', false)}
				invalid={helpers.json.get(props, 'input.invalid', false)}
				minLength={helpers.json.get(props, 'input.minLength', 1)}
				clearable={helpers.json.get(props, 'input.clearable', '')}
				maxlength={helpers.json.get(props, 'input.maxlength', 100)}
				disabled={helpers.json.get(props, 'input.disabled', false)}
				required={helpers.json.get(props, 'input.required', false)}
				description={helpers.json.get(props, 'input.description', '')}
				placeholder={helpers.json.get(props, 'input.placeholder', '')}
				defaultValue={helpers.json.get(props, 'input.defaultValue', '')}
				debounceDelay={helpers.json.get(props, 'input.debounceDelay', 500)}
			/>
		)
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

	const dsThemeByState = (type, state, elem) => {
		let map = `listBox.${type}.${state}.${elem}`;

		return helpers.json.merge(helpers.json.get(props, `config.${map}`, {}), {
			ds:{
				predefined:helpers.json.get(props, `dsTheme.${map}`, {})
			}
		});
	}

	const isSelected = (item) => {
		let rval = false;
		let sel = selected;
		let selkey = helpers.json.get(props, 'keymap.selection', 'value');

		if(helpers.data.type.is(sel, 'object')){
			let sId = helpers.json.get(sel, selkey, '');
			let iId = helpers.json.get(item, selkey, '');

			return (iId && sId && (iId === sId));
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

	const itemDsTheme = (dds, elem, arg, type) => {
		let details = helpers.json.get(arg, '_details', {});
		let d = helpers.json.get(details, 'data', {});
		let m = helpers.json.get(details, 'map', []);
		let ds = dsThemeByState(type, 'default', elem);
		let selected = helpers.json.get(d, '_selected', false);

		if(selected){
			ds = helpers.json.merge(ds, dsThemeByState(type, 'selected', elem))
		}

		return helpers.json.merge(dds, ds);
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
					<Icon 
						config={helpers.json.merge({
							"type":"font",
							"icon":{
								"size":20,
								"name":"check"
							}
						}, helpers.json.get(props, 'selectedIcon.iconConfig', {}))}
					/>
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

	const beforeOptionRender = (arg) => {
		let details = helpers.json.get(arg, '_details.data', {});
		let selected = isSelected(details);
			arg = helpers.json.set(arg, '_details.data._selected', selected, false, true);

			if(selected){
				arg = selectedIcon(arg);
			}

		return arg;
	}

	const listBoxConfig = () => {
		let rval = {
			callbacks:{
				"item":{
					onClick:itemClick,
					dsTheme:(dds, type, prps) => {
						return itemDsTheme(dds, type, prps, 'item')
					},
					beforeRender:(arg) => {
						return beforeOptionRender(arg);
					}
				}
			},
			config:{
				listBox:{
					boxWrapper:helpers.json.get(props, 'config.listBox.boxWrapper', {})
				}
			},
			dsTheme:helpers.json.merge(helpers.json.get(props, 'dsTheme.listBox', {}), helpers.element.jsx.props.assign({}, props, {
				'dsTheme.dropdown.content.color':'boxWrapper.color',
				'dsTheme.dropdown.content.hcolor':'boxWrapper.hcolor',
				'dsTheme.dropdown.content.radius':'boxWrapper.radius',
				'dsTheme.dropdown.content.background':'boxWrapper.background',
				'dsTheme.dropdown.content.hbackground':'boxWrapper.hbackground'
			}))
		}

		return rval;
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

	const noResultDs = (type) => {
		let dds = helpers.json.get(props, 'dsTheme.dropdown.noResult.default', {});
		let dconf = helpers.json.get(props, 'config.dropdown.noResult.default', {});
		let tds = helpers.json.get(props, `dsTheme.dropdown.noResult.${type}`, {});
		let tconf = helpers.json.get(props, `config.dropdown.noResult.${type}`, {});
		return helpers.json.merge(helpers.json.merge(dconf, tconf), {
			ds:{
				predefined:helpers.json.merge(dds, tds)
			}
		});
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
				let ds = noResultDs(type);
				return createElement(helpers.json.get(ds, 'markup.element', 'p'), helpers.element.jsx.attrs(ds, 'full bxs'), getContent(`noResult.${type}`))
			}
		}
	}

	const listBoxUi = () => {
		return (
			<ListBox 
				data={options}
				{...listBoxConfig()}
			/>
		)
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

			debugger;

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
			dsTheme:helpers.json.get(props, 'dsTheme.dropdown', {}),
			templates:{
				trigger:trigger,
				content:content
			}
		});

		rval.ref = ref;

		return rval;
	}

	const ui = () => {
		return (
			<PopOver {...popoverProps()} />
		)
	}
	
	return ui();
});

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;