import helpers from 'ui-helpers';
import {useTextField} from "react-aria";
import SvgIcon from 'aio-global-ui/atoms/icons/svg';
import FontIcon from 'aio-global-ui/atoms/icons/font';
import {useEffect, useRef, useState, forwardRef} from "react";
import {TextField, Input, Label, Text, FieldError} from "react-aria-components";

const Comp = forwardRef((dprops, forwardedRef) => {
	const inputRef = useRef();
	const ref = forwardedRef || useRef(null);
	const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
	const value = helpers.json.get(props, 'value', '');
	const error = helpers.json.get(props, 'error', '');
	const label = helpers.json.get(props, 'label', '');
	const callback = helpers.json.get(props, 'callback', {});
	const dvalue = helpers.json.get(props, 'defaultValue', '');
	const description = helpers.json.get(props, 'description', '');
	const isClearable = helpers.json.get(props, 'clearable', false);
	const debounceDelay = helpers.json.get(props, 'debounceDelay', 500);

	const debounceRef = useRef(null);
	const controlled = (value !== undefined);
	const hasStartedChangeRef = useRef(false);
	const [focused, setFocused] = useState(false);
	const [internalValue, setInternalValue] = useState(dvalue);
	const currentValue = controlled?value:internalValue;
	const [inputType, setInputType] = useState(props.type || 'text')
	const [viewPassword, setVeiwPassword] = useState(false);

	const textFieldProps = useTextField({
		type:props.type,
		value:props.value,
		id:helpers.json.get(props, 'id', ''),
		name:helpers.json.get(props, 'name', ''),
		label:helpers.json.get(props, 'label', ''),
		placeholder:helpers.json.get(props, 'placeholder', '')
	}, ref);

	const handleChange = (nextValue) => {
		if(!hasStartedChangeRef.current){
			callback?.onChangeStart?.(nextValue);
			hasStartedChangeRef.current = true;
		}

		if(!controlled){
			setInternalValue(nextValue);
		}

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
			callback?.onEnter?.(currentValue, event);
			callback?.onChangeEnd?.(currentValue);
			hasStartedChangeRef.current = false;
		}

		callback?.onKeyDown?.(event);
	}

	const handleBlur = (event) => {
		setFocused(false);
		clearTimeout(debounceRef.current);

		if (hasStartedChangeRef.current) {
			callback?.onChangeEnd?.(currentValue);
			hasStartedChangeRef.current = false;
		}

		callback?.onBlur?.(event);
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
		return (isClearable && currentValue && !props.disabled && !props.readonly);
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
		return getTheme(rval, cleanPredefined);
	}

	const wrpProps = () => {
		return {
			className:'full bxs',
			value:currentValue,
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

		if(props.value || currentValue){
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

			if(props.value || currentValue){
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
			value:currentValue,
			onKeyDown:handleKeyDown,
			minLength:helpers.json.get(props, 'minlength', ''),
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
						<div className='bxs pd-tb6 pd-rl8 flx-h'>
							<FontIcon {...iconf} callback={iconCallback()} />
						</div>
					)
				}

				if(itype === 'svg'){
					return (
						<div className='bxs pd-tb6 pd-rl8 flx-h'>
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

	return (
		<TextField {...wrpProps()} onClick={focusInput}>
			<div {...inputWrp()} onClick={holderOnClick}>
				{getLabel()}
				<div className='inpt-ctrlr full flx-vc mr-t4'>
					{icon('left')}
					<Input {...inputProps()} ref={inputRef} className='flx-full input' />
					{clearable()}
					{icon('right')}
				</div>
			</div>
			{errmsg()}
			{desc()}
		</TextField>
	);
});

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;