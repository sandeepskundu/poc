import helpers from 'ui-helpers';
import {useTextField} from "react-aria";
import {TextField, Input} from "react-aria-components";
import SvgIcon from 'aio-global-raw-ui/atoms/icons/svg';
import FontIcon from 'aio-global-raw-ui/atoms/icons/font';
import {useEffect, useRef, useState, forwardRef} from "react";

const Comp = forwardRef((dprops, forwardedRef) => {
	const inputRef = useRef();
	const ref = forwardedRef || useRef(null);
	const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

	const debounceRef = useRef(null);
	const rId = helpers.random.key();
	const hasStartedChangeRef = useRef(false);
	const [focused, setFocused] = useState(false);
	const error = helpers.json.get(props, 'error', '');
	const label = helpers.json.get(props, 'label', '');
	const [viewPassword, setVeiwPassword] = useState(false);
	const callback = helpers.json.get(props, 'callback', {});
	const description = helpers.json.get(props, 'description', '');
	const isClearable = helpers.json.get(props, 'clearable', false);
	const [inputType, setInputType] = useState(props.type || 'text');
	const debounceDelay = helpers.json.get(props, 'debounceDelay', 500);
	const [internalValue, setInternalValue] = useState(helpers.json.get(props, 'value', helpers.json.get(props, 'defaultValue', '')));

	useEffect(() => {
		setInternalValue(helpers.json.get(props, 'value', helpers.json.get(props, 'defaultValue', '')));
	}, [props.value]);

	const textFieldProps = useTextField({
		type:props.type,
		value:internalValue,
		id:helpers.json.get(props, 'id', ''),
		name:helpers.json.get(props, 'name', ''),
		label:helpers.json.get(props, 'label', ''),
		placeholder:helpers.json.get(props, 'placeholder', '')
	}, ref);

	const handleChange = (nextValue) => {
		if(!hasStartedChangeRef.current){
			callback?.onChangeStart?.(nextValue);
			hasStartedChangeRef.current = true;
		};

		setInternalValue(nextValue);
		callback?.onChange?.(nextValue);
		clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			callback?.onChangeEnd?.(nextValue);
			hasStartedChangeRef.current = false;
		}, debounceDelay);
	}

	const handleClear = () => {
		handleChange("");
	}

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			callback?.onEnter?.(internalValue, event);
			callback?.onChangeEnd?.(internalValue);
			hasStartedChangeRef.current = false;
		}

		callback?.onKeyDown?.(event);
	}

	const handleBlur = (event) => {
		setTimeout(() => {
			setFocused(false);
			clearTimeout(debounceRef.current);
			if(hasStartedChangeRef.current){
				callback?.onChangeEnd?.(internalValue);
				hasStartedChangeRef.current = false;
			};
			callback?.onBlur?.(event);
		}, 10);
	}

	useEffect(() => {
		return () => {
			clearTimeout(debounceRef.current);
		};
	}, []);

	const isRequired = () => {
		let req = helpers.json.get(props, 'required', '');

		if(req){
			let attrs = helpers.element.jsx.attrs(predefinedDs(helpers.json.get(props, 'config.asterisk', {}), true), 'astrik');
			return <span {...attrs}>*</span>
		}
	}

	const labelProps = () => {
		let lbp = helpers.json.get(textFieldProps, 'labelProps', {})
		let rval = predefinedDs(helpers.json.get(props, 'config.label', {}), true);
		return helpers.json.merge(lbp, helpers.element.jsx.attrs(rval, 'inpt-lbl'));
	}

	const getLabel = () => {
		if(label){
			return (
				<label {...labelProps()}>
					<div className='inpt-lbl-txt'>
						{label}
						{isRequired()}
					</div>

				</label>
			)
		}else{
			return <></>
		}
	}

	const onFocus = (e) => {
		setFocused(true);
		callback?.onFocus?.(e);
	}

	const showClear = () => {
		return (isClearable && internalValue && !props.disabled && !props.readonly);
	}

	const hasIcon = (type) => {
		let iconf = helpers.json.get(props, `config.icons.${type}`, {});

		if(iconf.type === 'font'){
			return (iconf?.icon?.name)
		}

		if(iconf.type === 'svg'){
			return (iconf?.svg?.src)
		}
	}

	const predefinedDs = (rval, cleanPredefined) => {
		return getTheme(JSON.parse(JSON.stringify(rval)), cleanPredefined);
	}

	const wrpProps = () => {
		return {
			value:internalValue,
			className:'full bxs',
			onChange:handleChange,
			isInvalid:helpers.json.get(props, 'invalid', false),
			isDisabled:helpers.json.get(props, 'disabled', false),
			isReadOnly:helpers.json.get(props, 'readonly', false),
			isRequired:helpers.json.get(props, 'required', false),
		};
	}

	const getTheme = (rval, cleanPredefined) => {
		let theme = helpers.json.get(rval, 'ds.theme.default', {});
		let predefined = helpers.json.get(rval, 'ds.predefined.default', {})

		if(props.value || internalValue){
			theme = helpers.json.merge(theme, helpers.json.get(rval, 'ds.theme.filled', {}));
			predefined = helpers.json.merge(predefined, helpers.json.get(rval, 'ds.predefined.filled', {}));
		}

		if(props.disabled){
			theme = helpers.json.merge(theme, helpers.json.get(rval, 'ds.theme.disabled', {}));
			predefined = helpers.json.merge(predefined, helpers.json.get(rval, 'ds.predefined.disabled', {}));
		}

		if(focused && !props.disabled && !props.readonly){
			theme = helpers.json.merge(theme, helpers.json.get(rval, 'ds.theme.focused', {}));
			predefined = helpers.json.merge(predefined, helpers.json.get(rval, 'ds.predefined.focused', {}));
		}

		if(props.invalid && !props.disabled){
			theme = helpers.json.merge(theme, helpers.json.get(rval, 'ds.theme.invalid', {}));
			predefined = helpers.json.merge(predefined, helpers.json.get(rval, 'ds.predefined.invalid', {}));
		}

		if(props.readonly && !props.disabled ){
			theme = helpers.json.merge(theme, helpers.json.get(rval, 'ds.theme.readonly', {}));
			predefined = helpers.json.merge(predefined, helpers.json.get(rval, 'ds.predefined.readonly', {}));
		}

		helpers.json.remove(rval, 'ds.theme');
		helpers.json.remove(rval, 'ds.predefined');
		rval = helpers.json.merge(rval, helpers.json.set({}, 'ds.theme', theme));
		rval = helpers.json.merge(rval, helpers.json.set({}, 'ds.predefined', predefined));

		return helpers.element.jsx.getCompThemeDs(rval, 'input');
	}

	const inputWrp = () => {
		let sclear = showClear();
		let leftIcon = hasIcon('left')
		let rightIcon = hasIcon('right');
		let prefix = helpers.json.get(props, 'prefix', false);
		let suffix = helpers.json.get(props, 'suffix', false);
		let cls = ['inpt-wrpr inpt-holder inpt full flx-vc anim'];
		let rval = predefinedDs(helpers.json.get(props, 'config.wrapper', {}));

			if(props.value || internalValue){
				cls.push('filled');
			}

			if(sclear){
				cls.push('clearable');
			}

			if(leftIcon){
				cls.push('has-left-icon')
			}

			if(rightIcon){
				cls.push('has-right-icon')
			}

			if(focused && !props.disabled && !props.readonly){
				cls.push('focused');
			}

			if(props.invalid){
				cls.push('invalid')
			}

			if(props.required){
				cls.push('required')
			}

			if(props.readonly){
				cls.push('readonly')
			}

			if(props.disabled){
				cls.push('disabled');
			}

			if(prefix && !suffix){
				cls.push('bdr-rln')
			}

			if(suffix && !prefix){
				cls.push('bdr-rrn')
			}

			if(prefix && suffix){
				cls.push('bdr-flat')
			}

		return helpers.element.jsx.attrs(rval, cls.join(' '));
	}

	const clearable = () => {
		if(showClear()){
			return (
				<FontIcon
					{...helpers.json.get(props, `icons.clear`, {})}
					callback={{
						onClick:handleClear
					}}
				/>
			)
		}else{
			return <></>
		}
	}

	const inputProps = () => {
		let rval = helpers.json.get(textFieldProps, 'inputProps', {});
		let remove = ['onChange', 'onChangeEnd', 'onChangeStart', 'onEnter'];
			rval = helpers.json.merge(rval, callback);

		for(let a in remove){
			delete rval[remove[a]];
		}

		return helpers.json.merge(rval, {
			type:inputType,
			onFocus:onFocus,
			onBlur:handleBlur,
			value:internalValue,
			onKeyDown:handleKeyDown,
			minLength:helpers.json.get(props, 'minLength', ''),
			maxLength:helpers.json.get(props, 'maxLength', ''),
			isInvalid:helpers.json.get(props, 'invalid', false),
			disabled:helpers.json.get(props, 'disabled', false),
			readOnly:helpers.json.get(props, 'readonly', false),
			required:helpers.json.get(props, 'required', false),
		})
	}

	const focusInput = () => {
		setTimeout(() => {
			inputRef.current.focus()
		}, 0)
	}

	const iconCallback = () => {
		return {
			onClick:focusInput
		}
	}

	const holderOnClick = (e) => {
		focusInput();

		if(callback && callback.onClick){
			callback?.onClick(e);
		}
	}

	const eyeIcon = (iconf, name) => {
		return (
			<div className='bxs pd-tb6 pd-rl8 flx-h'>
				<FontIcon 
					{...helpers.json.merge(iconf, {
						config:{
							type:'font',
							icon:{
								name:name || 'eye-off'
							}}
						})
					}
					callback={{
						onClick:() => {
							if(!props.readonly && !props.disabled){
								if(viewPassword){
									setInputType(props.type || 'text')
								}else{
									setInputType('text');
								}
								setVeiwPassword(!viewPassword)
							}
						}
					}} 
				/>
			</div>
		)
	}

	const icon = (type) => {
		let iconf = predefinedDs(helpers.json.get(props, `icons.${type}`, {}));
		let itype = helpers.json.get(iconf, 'config.type');
		let iname = helpers.json.get(iconf, 'config.icon.name');

		if(iname){
			if(type === 'right' && props.type === 'password' && props.eye){
				if(viewPassword){
					return eyeIcon(iconf, 'eye');
				}else{
					return eyeIcon(iconf, 'eye-off');
				}
			}else{
				if(itype === 'font'){
					return (
						<div className={`bxs pd-tb6 flx-h ${(type === 'right')?'pd-r8':'pd-l8'}`}>
							<FontIcon {...iconf} callback={iconCallback()} />
						</div>
					)
				}

				if(itype === 'svg'){
					return (
						<div className={`bxs pd-tb6 flx-h ${(type === 'right')?'pd-r8':'pd-l8'}`}>
							<SvgIcon {...iconf} callback={iconCallback()} />
						</div>
					)
				}
			}
		}

		return <></>
	}

	const desc = () => {
		if(description){
			let rval = predefinedDs(helpers.json.get(props, 'config.description', {}));
			return (
				<p {...helpers.element.jsx.attrs(rval, 'full bxs mr-t6 txt-12')}>{description}</p>
			)
		}else{
			return <></>
		}
	}

	const errmsg = () => {
		if(error && props.invalid){
			let cls = ['inpt'];
			let rval = predefinedDs(helpers.json.get(props, 'config.error', {}));
			let wrpr = predefinedDs(helpers.json.get(props, 'config.wrapper', {}));
			let theme = helpers.json.get(wrpr, 'ds.predefined.theme', '');

			if(theme){
				rval = helpers.json.set(rval, 'ds.predefined.theme', theme);
			}

			if(props.invalid){
				cls.push('invalid')
			}

			return (
				<div {...helpers.element.jsx.attrs(rval, cls.join(' '))}>
					<p className='full bxs mr-t8 txt-12 inpt-err'>{error}</p>
				</div>
			)
		}else{
			return <></>
		}
	}

	const autoComplete = () => {
		let Content = helpers.json.get(props, 'autocomplete.options', '');
		let fun = helpers.data.type.isFunction(Content);

		if(fun){
			return Content(internalValue, props)
		}else{
			let isJsx = helpers.data.type.isJsx(Content);
			if(isJsx){
				return React.createElement(React.Fragment, null, Content);
			}else{
				return `${Content}`;
			}
		}
	}

	const options = () => {
		let show = helpers.json.get(props, 'autocomplete.show', false);
		let has = helpers.json.get(props, 'autocomplete.options', rId);
		let enable = helpers.json.get(props, 'autocomplete.enable', false);
		let pos = helpers.json.get(props, 'autocomplete.positions', 'top');

		if((enable && has != rId) && (focused === 'delete' || show)){
			return (
				<div className={`inpt-opts pos-${pos}`}>
					{autoComplete()}
				</div>
			)
		}
	}

	const tags = (place) => {
		if(props.tags && place === helpers.json.get(props, 'autocomplete.multiple.palcement', 'bottom')){
			return props.tags(props);
		}
	}

	return (
		<>
			<TextField {...wrpProps()}>
				<div className='full inpt-autocomplete' onClick={() => {}}>
					{tags('top')}
					<div {...inputWrp()} onClick={holderOnClick}>
						{tags('inside')}
						{getLabel()}
						<div className='inpt-ctrlr full flx-vc'>
							{icon('left')}
							<Input {...inputProps()} ref={inputRef} className='flx-full input' />
							{clearable()}
							{icon('right')}
						</div>
					</div>
					{options()}
				</div>
				{errmsg()}
				{tags('bottom')}
				{desc()}
			</TextField>
		</>
	);
});

export default Comp;