import helpers from 'ui-helpers';
import {useCheckbox} from 'react-aria';
import {useToggleState} from 'react-stately';
import {forwardRef, createElement, useRef} from "react";
import LayerHolder from 'aio-global-ui/atoms/layer-holder';

const Comp = forwardRef((dprops, forwardedRef) => {
    const ref = forwardedRef || useRef(null);
    const rId = `rId${helpers.random.id(24)}`;
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops);

    const getRid = (type) => { return `${rId}${type}`}
    const mode = helpers.json.get(props, 'mode', 'checkbox');
    const inputId = helpers.json.get(props, 'checkbox.id', getRid('id'));
    const lblElm = helpers.json.get(props, 'mapping.labelElement', 'wrapper');

    const state = useToggleState({
        isRequired:helpers.json.get(props, 'checkbox.required', false),
        defaultSelected:helpers.json.get(props, 'checkbox.checked', false),
        onChange:(a, b, c) => {
            console.log(a, b, c)
        }
    });

    const checkbox = useCheckbox({
        id:inputId,
        form:helpers.json.get(props, 'checkbox.form', getRid('form')),
        name:helpers.json.get(props, 'checkbox.name', getRid('name')),
        isInvalid:helpers.json.get(props, 'checkbox.invalid', false),
        isDisabled:helpers.json.get(props, 'checkbox.disabled', false),
        isReadOnly:helpers.json.get(props, 'checkbox.readonly', false),
        isRequired:helpers.json.get(props, 'checkbox.required', false),
    }, state, ref);

    const invalid = helpers.json.get(checkbox, 'isInvalid', false);
    const checked = helpers.json.get(checkbox, 'isSelected', false);
    const disabled = helpers.json.get(checkbox, 'isDisabled', false);

    const getTheme = (type) => {
        let rval = helpers.json.get(props, `theme.default.${type}`, {});

        if(checked){
            rval = helpers.json.merge(rval, helpers.json.get(props, `theme.checked.${type}`, {}));
        }

        if(disabled){
            rval = helpers.json.merge(rval, helpers.json.get(props, `theme.disabled.${type}`, {}));
        }

        if(invalid && !disabled){
            rval = helpers.json.merge(rval, helpers.json.get(props, `theme.invalid.${type}`, {}));
        }

        return helpers.json.set({}, 'ds', rval);
    }

    const attrs = (dsmap, type, css, atype) => {
        let rval = helpers.json.get(props, dsmap, {});
            rval = helpers.json.merge(rval, getTheme(type));

        return helpers.element.jsx.attrs(rval, css, atype);
    }

    const checkboxui = () => {

        if(mode === 'radio'){
            return (
                <span className='rdio-wrpr'>
                    <input {...checkbox.inputProps} ref={ref}/>
                    <span {...attrs('checkbox.ds', 'checkbox', 'rdio-inpt bdr-1 inpt')}></span>
                </span>
            )
        }

        if(mode === 'toggle'){
            return (
                <span className='tgl-wrpr'>
                    <input {...checkbox.inputProps} ref={ref}/>
                    <span {...attrs('checkbox.ds', 'checkbox', 'tgl-trck bdr-1 inpt')}></span>
                </span>
            )
        }

        return (
            <span className='chkbx-wrpr chkbx'>
                <input {...checkbox.inputProps} ref={ref}/>
                <span {...attrs('checkbox.ds', 'checkbox', 'inpt chkbx-inpt bdr-1')}></span>
            </span>
        )
    }

    const labelProps = () => {
        return {
            markup:{
                element:'label'
            },
            attrs:{
                htmlFor:inputId
            },
            events:helpers.json.get(checkbox, 'labelProps', {})
        }
    }

    const textByType = (type) => {
        const Lbl = helpers.json.get(props, `${type}.text`, rId);
        const jsx = helpers.data.type.is(Lbl, 'jsx');
        const str = helpers.data.type.is(Lbl, 'jsx');
        const fun = helpers.data.type.is(Lbl, 'function');

        if(fun){
            return Lbl(checkbox, props);
        }

        if(jsx){
            return React.createElement(React.Fragment, null, Lbl);
        }

        if(Lbl && Lbl != rId){
            let lblP = helpers.json.get(props, `${type}.config`, {});

            if(lblElm === type){
                lblP = helpers.json.merge(lblP, labelProps());
            };

            return createElement(helpers.json.get(lblP, 'markup.element', 'p'), helpers.element.jsx.attrs(helpers.json.merge(lblP, getTheme(type)), 'bxs full'), `${Lbl}`);
        }else{
            return <></>
        } 
    }

    const error = () => {
        if(invalid && !disabled){
            return textByType('error');
        }
    }

    const content = () => {
        if(props.children){
            return props.children;
        }else{
            let desc = helpers.json.get(props, 'description.text', '');

            if(desc){
                return (
                    <>
                        {textByType('label')}
                        {textByType('description')}
                        {error()}
                    </>
                )
            }else{
                return (
                    <>
                        {textByType('label')}
                        {error()}
                    </>
                )
            }
        }
    }

    const mapHolderTheme = (rval) => {
		let cmap = 'config';
		let conf = helpers.json.get(rval, cmap, {});

		for(let a in conf){
			let rds = helpers.json.set({}, `${cmap}.${a}`, getTheme(`holder.${a}`));
				rval = helpers.json.merge(rval, rds);
		}

		return rval;
	}

    const holderConf = () => {
        let map = {
            layer:true,
            content:true,
            wrapper:true,
            container:true,
        };
        let rval = helpers.json.get(props, 'holder', {});
        let lblProps = helpers.json.set({}, `config.${lblElm}`, labelProps());
            rval = helpers.json.merge(rval, {
                templates:{
                    content:content,
                    layer:checkboxui
                }
            });

        if(lblElm === 'wrapper'){
            rval.wrap = true;
        }

        if(map[lblElm]){
            return mapHolderTheme(helpers.json.merge(rval, lblProps));
        }else{
            return mapHolderTheme(rval);
        }
    }

    const ui = () => {
        return <LayerHolder {...holderConf()} />
    }

    return ui();
});

export default Comp;