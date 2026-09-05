import helpers from 'ui-helpers';
import {createElement} from 'react';
import ListItem from 'aio-global-ui/atoms/list/item';
import ListHeader from 'aio-global-ui/atoms/list/header';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const data = helpers.json.get(props, 'data', {});
    const list = helpers.json.keys(data || {});
    const defaults = helpers.json.get(props, 'defaults', {});
    const dval = helpers.json.get(props, 'defaults.values', '');
    const typeKey = helpers.json.get(props, 'mapping.keys.type', 'type');

    const templates = (() => {
        return helpers.json.merge({
            noresults:() => {},
            item:(arg, map, first, last) => {
                return (
                    <ListItem {...getProps(arg, map, first, last)} />
                )
            },
            header:(arg, map, first, last) => {
                return <ListHeader {...getProps(arg, map, first, last)} />
            }
        }, helpers.json.get(props, 'templates', {}))
    })();

    const border = (rval, arg, type, first, last) => {
        const radius = helpers.json.get(props, 'config.wrapper.ds.predefined.radius', dval);

        if(first){
            rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.borderNone.1', true, false, true);

            if(radius != dval){
                rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.1', radius, false, true);
                rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.2', 0, false, true);
            }
        }

        if(last){
            rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.borderNone.3', true, false, true);

            if(radius != dval){
                rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.1', 0, false, true);
                rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.2', radius, false, true);
            }
        }

        return rval;
    }

    const getConfig = (arg, type, first, last) => {
        const iprops = helpers.json.get(arg, 'rprops', {});
        const dprops = helpers.json.get(props, `config.${type}`, {});
        const rval = border(helpers.json.merge(dprops, iprops), arg, type, first, last);

        return rval.config || {};
    }

    const getCallback = (config, item, type, first, last) => {
        const pcb = helpers.json.get(props, `callbacks.${type}`, {});
        const ipcb = helpers.json.get(config, `callbacks.${type}`, {});
        return helpers.json.merge(pcb, ipcb);
    }

    const childContent = (config, item, ctype, itype, first, last) => {
        const c = helpers.json.get(config, `childs.${ctype}`, dval);

        if(c && c != dval){
            return dval;
        }else{
            const dmap = helpers.json.get(props, `mapping`, {});
            const cmap = helpers.json.get(config, `mapping`, {});
            const mapping = helpers.json.merge(dmap, cmap);
            const keymap = helpers.json.get(mapping, `${itype}.${ctype}`, '');

            if(keymap){
                return helpers.json.get(item, keymap, dval);
            }else{
                return dval;
            }
        }
    }

    const getChilds = (config, item, type, first, last) => {
        const rval = {};
        const ichilds = helpers.json.get(config, 'childs', {});
        const childs = helpers.json.get(defaults, `childs.${type}`, {});

        for(const a in childs){
            let val = helpers.json.get(ichilds, a, dval);

            if(val && val != dval){
                rval[a] = val;
            }else{
                val = childContent(config, item, a, type, first, last);

                if(val && val != dval){
                    rval[a] = val;
                }
            }
        }

        return rval;
    }

    const getProps = (arg, map, first, last) => {
        let type = helpers.json.get(arg, typeKey, 'item');
        let pconfig = getConfig(arg, type, first, last);

        return {
            _details:{
                map:map,
                data:arg,
                last:last,
                first:first,
            },
            config:pconfig,
            childs:getChilds(pconfig, arg, type, first, last),
            callbacks:getCallback(pconfig, arg, type, first, last)
        }
    };

    const noresults = () => {
    
    }

    const nested = (clist, childs, map) => {
        if(clist && clist.length > 0){
            return getList(clist, childs, [...map], false);
        }else{
            return <></>
        }
    }

    const content = (item, map, childs, clist, first, last) => {
        let type = helpers.json.get(item, typeKey, 'item');
        let template = helpers.json.get(templates, type, dval);
        let isFun = helpers.data.type.is(template, 'function');

        if(isFun){
            return template(item, map, first, (last && clist.length === 0));
        }else{
            return <></>
        }
    }

    const getList = (li, data, map, first) => {
        return li.map((key, i) => {
            let m = [...map];
                m.push(key);

            let item = helpers.json.get(data, key);
            let childs = helpers.json.get(item, 'childs', {});
            let clist = helpers.json.keys(childs || {});

            return (
                <>
                    {content(item, m, childs, clist, (first && i === 0), (i === (li.length-1)))}
                    {nested(clist, childs, map)}
                </>
            )
        });
    }

    const options = () => {
        if(list && list.length > 0){
            return getList(list, data, [], true);
        }else{
            return noresults();
        }
    }

    const ui = () => {
        return createElement(helpers.json.get(props, "config.wrapper.markup.element", "ul"), helpers.element.jsx.attrs(helpers.json.get(props, 'config.wrapper', {}), 'anim list-box bdr-1'),  options());
    }

    return ui();
};

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;