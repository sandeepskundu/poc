import helpers from 'ui-helpers';
import {useTextField} from "react-aria";
import {TextField, TextArea} from "react-aria-components";
import {useEffect, useRef, useState, forwardRef} from "react";

const Comp = forwardRef((dprops, forwardedRef) => {
	const textRef = useRef();
	const ref = forwardedRef || useRef(null);
	const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

	const debounceRef = useRef(null);
	const rId = helpers.random.key();
	const hasStartedChangeRef = useRef(false);
	const [focused, setFocused] = useState(false);
	const error = helpers.json.get(props, 'error', '');
	const label = helpers.json.get(props, 'label', '');
	const callback = helpers.json.get(props, 'callback', {});
	const description = helpers.json.get(props, 'description', '');
	const debounceDelay = helpers.json.get(props, 'debounceDelay', 500);
	const [internalValue, setInternalValue] = useState(helpers.json.get(props, 'value', helpers.json.get(props, 'defaultValue', '')));

	useEffect(() => {
		if (!textRef.current){
			return;
		}else{
			let mh = helpers.json.get(props, 'maxAutoHeight', false);
			let th = helpers.json.get(textRef, 'current.scrollHeight', 0);
			let ch = helpers.json.get(textRef, 'current.clientHeight', 0);
			if(mh && mh > 0 && th && ch && th >= ch){
				textRef.current.style.height = "auto";
				textRef.current.style.height = `${(mh > th)?th:mh}px`;
			}
		}
	}, [internalValue]);

	const textFieldProps = useTextField({
		value:internalValue,
		inputElementType: "textarea",
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
		if(helpers.json.get(props, 'required', '')){
			return <span {...helpers.element.jsx.attrs(predefinedDs(helpers.json.get(props, 'config.asterisk', {}), true), 'astrik')}>*</span>
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
		let cls = ['inpt-wrpr inpt-holder inpt full flx-vc anim'];
		let rval = predefinedDs(helpers.json.get(props, 'config.wrapper', {}));

			if(props.value || internalValue){
				cls.push('filled');
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

		return helpers.element.jsx.attrs(rval, cls.join(' '));
	}

	const inputProps = () => {
		let rval = helpers.json.get(textFieldProps, 'inputProps', {});
		let remove = ['onChange', 'onChangeEnd', 'onChangeStart', 'onEnter'];
			rval = helpers.json.merge(rval, callback);

		for(let a in remove){
			delete rval[remove[a]];
		}

		return helpers.json.merge(rval, {
			onFocus:onFocus,
			onBlur:handleBlur,
			value:internalValue,
			onKeyDown:handleKeyDown,
			minLength:helpers.json.get(props, 'minLength', ''),
			maxLength:helpers.json.get(props, 'maxLength', ''),
			isInvalid:helpers.json.get(props, 'invalid', false),
			disabled:helpers.json.get(props, 'disabled', false),
			readOnly:helpers.json.get(props, 'readonly', false),
			required:helpers.json.get(props, 'required', false)
		})
	}

	const focusInput = () => {
		setTimeout(() => {
			textRef.current.focus()
		}, 0)
	}

	const holderOnClick = (e) => {
		focusInput();

		if(callback && callback.onClick){
			callback?.onClick(e);
		}
	}

	const charleft = (() => {
		let rv = '';
		let dval = '__LEFT__/__MAXLENGTH__';
		let min = helpers.json.get(props, 'minLength', '');
		let max = helpers.json.get(props, 'maxLength', '');
		let scl = helpers.json.get(props, 'characterCount.enable', false);
		let temp = helpers.json.get(props, 'characterCount.template', dval);

		if(!helpers.data.type.is(temp, 'string')){
			temp = dval;
		}

		if(scl && max > 0){
			rv = helpers.string.replace.kies(temp, {
				'__MAXLENGTH__':max,
				'__MINLENGTH__':min || 0,
				'__LEFT__':max - internalValue.length
			})
		}

		return rv || '';
	})();

	const desc = () => {
		if(description || charleft){
			let rval = predefinedDs(helpers.json.get(props, 'config.description', {}));

			return (
				<p {...helpers.element.jsx.attrs(rval, 'full bxs mr-t6 txt-12 flx-sb')}>
					<span className='flx-full'>{description}</span>
					{charleft?<span {...helpers.element.jsx.attrs(predefinedDs(helpers.json.get(props, 'config.charCounter', {})), 'pd-l16')}>{charleft}</span>:<></>}
				</p>
			)
		}

		return <></>
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

	return (
		<TextField {...wrpProps()} onClick={focusInput}>
			<div {...inputWrp()} onClick={holderOnClick}>
				{getLabel()}
				<div className='inpt-ctrlr full flx-vc'>
					<TextArea {...inputProps()} ref={textRef} className='flx-full input inpt bdr-n fm-rg mr-t8 txt-sm' />
				</div>
			</div>
			{errmsg()}
			{desc()}
		</TextField>
	);
});

export default Comp;