import helpers from 'ui-helpers';
import {createElement, useState} from "react";
import Item from 'aio-global-raw-ui/atoms/accordion/item';

const Comp = (dprops) => {
    const id = helpers.random.key();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const mapByType = (type) => {
        let rval = {};
        let li =  helpers.json.get(props, `data.${type}`, {});

        if(li && helpers.data.type.is(li, 'object')){
            for(let a in li){
                if(helpers.data.type.is(a, 'int')){
                    rval[a] = true;
                }
            }
        }

        return rval;
    }

    const [data, setData] = useState({
        selected:mapByType('selected'),
        disabled:mapByType('disabled'),
        excluded:mapByType('excluded')
    });

    const list = (() => {
        let rval = [];
        let li = helpers.json.get(props, 'data.list', {});
        
        if(helpers.data.type.is(li, 'list')){
            return li;
        }

        if(helpers.data.type.is(li, 'object')){
            for(let a in li){
                rval.push(li[a]);
            }
        }

        return rval;
    })();

    const isInList = (index, type) => {
        return helpers.json.get(data, `${type}.${index}`, false)
    }

    const isActive = (arg, index) => {
        return isInList(index, 'selected');
    }

    const isDisabled = (arg, index) => {
        return isInList(index, 'disabled');
    }

    const toggle = (e, active, index, details, parentProps, childProps, elm) => {
        let map = `selected.${index}`;
        let d = helpers.json.copy(data);
        let onToggle = helpers.json.get(props, 'callbacks.onToggle', id);

        if(!props.multiple && active){
            d.selected = {};
        }

        if(active){
            d = helpers.json.set(d, map, true)
        }else{
            helpers.json.remove(d, map)
        }

        setData(d);

        if(onToggle && helpers.data.type.is(onToggle, 'function')){
            onToggle(d, active, props);
        }
    }

    const itemCallback = (arg) => {
        let rval = {};
        let cbs = mergePropsFromData(arg, 'callbacks.item');

        if(helpers.data.type.is(cbs, 'object') && helpers.json.length(cbs) > 0){
            for(let a in cbs){
                rval[a] = (e, active, index, data, parentProps, childProps, elm) => {
                    let cb = cbs[a];

                    if(cb && helpers.data.type.is(cb, 'function')){
                        cb(e, active, index, data, parentProps, childProps, elm);
                    }

                    if(a === 'onToggle'){
                        toggle(e, active, index, data, parentProps, childProps, elm)
                    }
                }
            }
        }

        return rval;
    }

    const mergePropsFromData = (arg, map) => {
        return helpers.json.merge(helpers.json.get(props, map, {}), helpers.json.get(arg, `___.props.${map}`, {}))
    }

    const itemProps = (arg, index) => {
        return {
            data:arg,
            compId:id,
            index:index,
            id:id+''+index,
            active:isActive(arg, index),
            disabled:isDisabled(arg, index),
            body:mergePropsFromData(arg, 'item.body'),
            header:mergePropsFromData(arg, 'item.header'),
            wrapper:mergePropsFromData(arg, 'item.wrapper'),
            callbacks:{
                item:itemCallback(arg),
                header:mergePropsFromData(arg, 'callbacks.header')
            },
            templates:{
                body:mergePropsFromData(arg, 'templates.body'),
                header:mergePropsFromData(arg, 'templates.header')
            },
            mapping:{
                body:mergePropsFromData(arg, 'mapping.body'),
                header:mergePropsFromData(arg, 'mapping.header'),
            },
            theme:{
				body:mergePropsFromData(arg, 'theme.body'),
                header:mergePropsFromData(arg, 'theme.header'),
			}
        }
    }

    const childs = () => {
        if(props.children){
            return props.children;
        }else{
            return list.map((arg, i) => {
                let isexc = isInList(i, 'excluded');

                if(isexc){
                    return <></>
                }else{
                    return (
                        <Item {...itemProps(arg, i)} key={id+i} />
                    )
                }
            })
        }
    }

    const compAttr = (rval) => {
        return helpers.json.set(helpers.json.merge(rval, {
            dataAttrs:{
                'accordion-id':id,
                'comp':'accordion',
                'accordion-config':JSON.stringify({
                    theme:{
                        /*--body:{
                            default:{
                                wrapper:helpers.json.get(props, 'theme.body.default.wrapper', {})
                            },
                            selected:{
                                wrapper:helpers.json.get(props, 'theme.body.selected.wrapper', {})
                            }
                        },--*/
                        header:{
                            default:{
                                end:helpers.json.get(props, 'theme.header.default.end', {}),
                                start:helpers.json.get(props, 'theme.header.default.start', {}),
                                after:helpers.json.get(props, 'theme.header.default.after', {}),
                                before:helpers.json.get(props, 'theme.header.default.before', {}),
                                center:helpers.json.get(props, 'theme.header.default.center', {}),
                                wrapper:helpers.json.get(props, 'theme.header.default.wrapper', {})
                            },
                            selected:{
                                end:helpers.json.get(props, 'theme.header.selected.end', {}),
                                start:helpers.json.get(props, 'theme.header.selected.start', {}),
                                after:helpers.json.get(props, 'theme.header.selected.after', {}),
                                before:helpers.json.get(props, 'theme.header.selected.before', {}),
                                center:helpers.json.get(props, 'theme.header.selected.center', {}),
                                wrapper:helpers.json.get(props, 'theme.header.selected.wrapper', {})
                            }
                        },
                    },
                    multiple:helpers.json.get(props, 'multiple', false)
                })
            }
        }), 'ds.predefined', helpers.json.get(props, 'theme.wrapper', {}));
    }

    const wrapperAttrs = () => {
        return helpers.element.jsx.attrs(compAttr(helpers.json.get(props, 'wrapper', {})), 'full acrdn-wrpr');
    }

    const wrapper = () => {
        return createElement(helpers.json.get(props, 'wrapper.markup.element', 'ul'), wrapperAttrs(), childs())
    }

    const ui = () => {
        if((list && list.length > 0) || props.children){
            return wrapper();
        }else{
            return <></>
        }
    }

    return ui()
}

export default Comp;