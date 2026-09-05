import helpers from 'ui-helpers';
import {createElement} from "react";
import Body from 'aio-global-raw-ui/atoms/accordion/body';
import Heading from 'aio-global-raw-ui/atoms/accordion/heading';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const iconId = helpers.random.key();
    const compId = helpers.json.get(props, 'compId', '');
    const active = helpers.json.get(props, 'active', false);
    const disabled = helpers.json.get(props, 'disabled', false);
    const toggler = helpers.json.get(props, 'header.toggleElement', 'wrapper');

    const headerExpendIcon = () => {
        return helpers.json.merge(helpers.json.get(props, 'header.expendIcon', {}), {
            config:{
                config:{
                    attrs:{
                        id:iconId
                    }
                }
            },
            state:active?'selected':'default'
        })
    }

    const mapHeadingChilds = () => {
        let rval = {};
        let childs = helpers.json.get(props, 'templates.header', {});

        if(childs && helpers.data.type.is(childs, 'object')){
            for(let a in childs){
                if(helpers.data.type.is(childs[a], 'function')){
                    rval[a] = (e, prop, elm) => {
                        return childs[a](e, props.data, props, prop, elm);
                    }
                }else{
                    let map = helpers.json.get(props, 'mapping.header', {});
    
                    if(map && helpers.data.type.is(map, 'object')){
                        for(let a in map){
                            let val = helpers.json.get(props, `data.${map[a]}`, iconId);

                            if(val != '' && val != iconId){
                                rval[a] = `${val}`
                            }
                        }
                    }
                }
            }
        }

        return rval;
    }

    const mergeThemeByType = (rval, type, map) => {
        if(props.disabled){
            return helpers.json.set(rval || {}, 'ds.predefined', helpers.json.get(props, `theme.${type}.disabled.${map}`, {}));
        }else{
            rval = helpers.json.set(rval || {}, 'ds.predefined', helpers.json.get(props, `theme.${type}.default.${map}`, {}));

            if(props.active){
                return helpers.json.set(rval || {}, 'ds.predefined', helpers.json.get(props, `theme.${type}.selected.${map}`, {}));
            }

            return rval;
        }
    }

    const headerDsConfig = () => {
        let dAttr = helpers.json.get(rval, `${toggler}.dataAttrs`, {});
        let rval = helpers.json.merge(helpers.json.get(props, 'header.config', {}), {
            wrapper:{
                ds:{
                    css:{
                        others:'acrdn-ihead-lbl pr bxs'
                    }
                }
            }
        });

        for(let a in rval){
            if(a != 'wrapper'){
                rval[a] = mergeThemeByType(helpers.json.copy(rval[a]), 'header', a);
                rval[a] = helpers.json.set(rval[a], `dataAttrs.accordion-header-${a}`, iconId);
            }
        };

        return helpers.json.set(helpers.json.set(rval, `${toggler}.ds.css.class.cursor`, 'cp'), `${toggler}.dataAttrs`, helpers.json.merge(dAttr, {
            'accordion-toggle':compId,
            'accordion-details':JSON.stringify({
                compId:compId,
                iconId:iconId,
                headerId:iconId,
                disabled:disabled,
            })
        }));
    }

    const initIcallback = (e, prop, elm, type) => {
        let cb = helpers.json.get(props, `callbacks.item.${type}`, '');

        if(helpers.data.type.is(cb, 'function')){
            cb(e, !active, props.index, props.data, props, prop, elm)
        }
    }

    const itemCallbacks = (e, prop, elm) => {
        if(!disabled){
            if(active){
                initIcallback(e, prop, elm, 'onClose');
            }else{
                initIcallback(e, prop, elm, 'onOpen')
            }
            initIcallback(e, prop, elm, 'onToggle')
        }
    }

    const headingCallbacks = () => {
        let oC = (e, prop, elm) => {
            if(helpers.data.type.is(onClick, 'function')){
                onClick(e, props.data, props, prop, elm);
            }
            itemCallbacks(e, prop, elm)
        }
        let rval = helpers.json.get(props, 'callbacks.header', {});
        let onClick = helpers.json.get(rval, `${toggler}.onClick`, '');
            rval = rval || {};
            rval[toggler] = rval[toggler] || {};
            rval[toggler].onClick = oC;

        return rval;
    }

    const getHeadingProps = () => {
        return {
            config:headerDsConfig(),
            childs:mapHeadingChilds(),
            callbacks:headingCallbacks(),
            expendIcon:headerExpendIcon(),
        }
    }

    const wrprClass = () => {
        let rval = ['full acrdn-ihead pr bxs'];

        if(active){
            rval.push('active');
        }

        if(disabled){
            rval.push('disabled');
        }

        return rval.join(' ');
    }

    const headWrapperProps = () => {
        return helpers.element.jsx.attrs(mergeThemeByType(helpers.json.merge(helpers.json.get(props, 'header.wrapper', {}), {
            dataAttrs:{
                'accordion-header-wrapper':iconId
            }
        }), 'header', 'wrapper'), wrprClass())
    }

    const getBodyContent = () => {
        let cb = helpers.json.get(props, 'templates.body.content', iconId);

        if(cb != '' && cb != iconId && helpers.data.type.is(cb, 'function')){
            return (prop) => {
                return cb(props.data, props, prop);
            }
        }

        let map = helpers.json.get(props, 'mapping.body.content', iconId);
        let val = helpers.json.get(props, `data.${map}`, iconId);

        if(val != '' && val != iconId){
            return `${val}`;
        }

        return '';
    }

    const getBodyProps = () => {
        return helpers.json.merge(helpers.json.get(props, 'body.description', {}), {
            content:getBodyContent()
        });
    }

    const bodyWrapperProps = () => {
        return helpers.element.jsx.attrs(helpers.json.merge(mergeThemeByType(helpers.json.get(props, 'body.wrapper', {}), 'body', 'wrapper'), {
            dataAttrs:{
                'accordion-body-wrapper':iconId
            }
        }), 'full bxs');
    }

    const childs = () => {
        return (
            <>
                {createElement(helpers.json.get(props, `header.wrapper.markup.element`, "div"), {...headWrapperProps()}, <Heading {...getHeadingProps()} />)}
                <div className='full acrdn-ctent anim'>
                    {createElement(helpers.json.get(props, `body.wrapper.markup.element`, "div"), {...bodyWrapperProps()}, <Body {...getBodyProps()} />)}
                </div>
            </>
        )
    }

    const itemWrapperProps = () => {
        return helpers.element.jsx.attrs(helpers.json.get(props, 'wrapper', {}), 'full anim acrdn-item');
    }

    const ui = () => {
        return createElement(helpers.json.get(props, `wrapper.markup.element`, "li"), {...itemWrapperProps()}, childs());
    }

    return ui()
}

export default Comp;