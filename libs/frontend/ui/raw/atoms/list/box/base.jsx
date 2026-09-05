import helpers from 'ui-helpers';
import {createElement} from 'react';
import BaseItem from 'aio-global-raw-ui/atoms/list/item/base';
import BaseHeaader from 'aio-global-raw-ui/atoms/list/header/base';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    
    const rId = helpers.random.key();
    const defaults = helpers.json.get(props, 'defaults', {});
    const dval = helpers.json.get(props, 'defaults.values', rId);
    const selkey = helpers.json.get(props, 'mapping.selected', {});
    const diskey = helpers.json.get(props, 'mapping.disabled', {});
    const exckey = helpers.json.get(props, 'mapping.excluded', {});
    const lebelKey = helpers.json.get(props, 'mapping.label', 'label');
    const childskey = helpers.json.get(props, 'mapping.childs', 'childs');

    const selhash = (arg, keys) => {
        let rv = [];

        for(let a in keys){
            let v = helpers.json.get(arg, keys[a], rId);
                rv.push(v);
        }

        return helpers.crpt.md5(rv.join(''));
    }

    const getmap = (type, keys) => {
        let rv = {};
        let data = helpers.json.get(props, `data.${type}`, {});

        for(let a in data){
            let item = data[a];

            if(item){
                rv[selhash(item, keys)] = item;
            }
        }

        return rv;
    }

    const selected = getmap('selected', selkey);
    const disabled = getmap('disabled', diskey);
    const excluded = getmap('excluded', exckey);

    const hasInList = (item, hash, type) => {
        if(type === 'selected'){
            return selected[hash];
        }

        if(type === 'excluded'){
            return excluded[hash];
        }

        if(type === 'disabled'){
            return disabled[hash];
        }
    }

    const dataList = (data) => {
        let li = [];
        let sel = [];
        let selF = helpers.json.get(props, 'switch.selectedFirst', false);
        let hideD = helpers.json.get(props, 'switch.hideDisabled', false);
        let isDataList = helpers.data.type.is(data, 'list');
        let isDataObj = helpers.data.type.is(data, 'object');

        if(isDataList || isDataObj){
            for(let a in data){
                if(isDataList || (isDataObj && helpers.data.type.is(a, 'int'))){
                    let item = data[a];
                    let shash = selhash(item, selkey);
                    let inList = hasInList(item, shash, 'selected');
                        item.___ = helpers.json.merge((item.___ || {}),{
                            hash:shash,
                            index:parseInt(a)
                        });

                    if(inList){
                        selF?sel.push(item):li.push(item);
                    }else{
                        inList = hasInList(item, selhash(item, exckey), 'excluded');
                        if(!inList){
                            inList = hasInList(item, selhash(item, diskey), 'disabled');
                            if(hideD && inList){
                            }else{
                                li.push(item);
                            }
                        }
                    }
                }
            }
        }

        return [...sel, ...li];
    };

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

    const templates = (() => {
        let temp = helpers.json.get(props, 'templates', {});
        let rv = {
            noresults:() => {},
            item:(props) => {
                return (
                    <BaseItem {...props} />
                )
            },
            category:(props) => {
                return <BaseHeaader {...props} />
            }
        };

        for(let a in temp){
            if(helpers.data.type.is(temp[a], 'function')){
                rv[a] = temp[a];
            }
        }
        
        return rv;
    })();

    const getTemplateByType = (type) => {
        let rv = helpers.json.get(templates, type, dval);

        if(helpers.data.type.is(rv, 'function')){
            return rv;
        }else{
            return false;
        }
    }

    const isCategoryOrItem = (childs) => {
        if(childs && childs.length > 0){
            return 'category'
        }else{
            return 'item';
        }
    }

    const border = (rval, arg, type, first, last) => {
        const radius = helpers.json.get(props, 'config.wrapper.ds.predefined.radius', dval);

        if(first){
            rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.borderNone.1', true, false, true);
        }

        if(first && last && (radius != dval)){
            rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.1', radius, false, true);
            rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.2', radius, false, true);
        }else{
            if(first && (radius != dval)){
                rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.1', radius, false, true);
                rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.2', 0, false, true);
            }

            if(last && (radius != dval)){
                rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.1', 0, false, true);
                rval = helpers.json.set(rval, 'config.wrapper.ds.css.class.radius.2', radius, false, true);
            }
        }

        return rval;
    }

    const getConfig = (arg, map, first, last, type) => {
        let dprops = helpers.json.get(props, type, {});
        let iprops = helpers.json.get(arg, '___.props', {});
        let rval = helpers.json.merge(dprops, iprops);
        let hash = helpers.json.get(arg, '___.hash', '');
        let disabled = hasInList(arg, hash, 'disabled');
        let selected = hasInList(arg, hash, 'selected');
        
            rval.data = arg;
            rval.disabled = disabled?true:false;
            rval = border(rval, arg, type, first, last);
            rval.state = (selected?'selected':'default');
            rval = helpers.json.set(rval, 'kies.label', lebelKey);

        return rval;
    }

    const mapInternalData = (arg, map, first, last, type) => {
        let hash = helpers.json.get(arg, '___.hash', '');
        let props = helpers.json.get(arg, '___.props', {})
        
            delete arg['___'];
            arg = helpers.json.set(arg, '___.data', arg);
            arg = helpers.json.set(arg, '___.map', map);
            arg = helpers.json.set(arg, '___.last', last);
            arg = helpers.json.set(arg, '___.type', type);
            arg = helpers.json.set(arg, '___.hash', hash);
            arg = helpers.json.set(arg, '___.props', props);
            arg = helpers.json.set(arg, '___.first', first);

        return arg;
    }

    const propByType = (arg, map, first, last, type) => {
        return getConfig(arg, map, first, last, type);
    }

    const noresults = () => {
        let rv = getTemplateByType('noresults');

        if(rv){
            return rv(props);
        }
    }

    const getCategory = (arg, map, first, last) => {
        let type = 'category';
        let rv = getTemplateByType(type);
            arg = mapInternalData(arg, map, first, last, type)

        if(rv){
            return rv(propByType(arg, map, first, last, type));
        }
    }

    const getItem = (arg, map, first, last) => {
        let type = 'item';
        let rv = getTemplateByType(type);
            arg = mapInternalData(arg, map, first, last, type)

        if(rv){
            return rv(propByType(arg, map, first, last, type));
        }
    }

    const getTemplate = (item, map, childs, first, last) => {
        const type = isCategoryOrItem(childs);

        if(type === 'item'){
            return getItem(item, map, first, last)
        }

        if(type === 'category'){
            return getCategory(item, map, first, last)
        }

        return <></>
    }

    const nested = (childs, map) => {
        if(childs && childs.length > 0){
            return listUi(childs, [...map], false);
        }else{
            return <></>
        }
    }

    const listUi = (li, map, first) => {
        return li.map((item, i) => {
            let m = [...map];
            let isFirst = (first && i === 0);
            let isLast = (i === (li.length-1));
            let ikey = helpers.json.get(item, '___.index', '');
            let childs = dataList(helpers.json.get(item, childskey, {}));

            if(ikey || ikey >= -1){
                m.push(`${ikey}`);
            };

            return (
                <>
                    {getTemplate(item, m, childs, isFirst, isLast)}
                    {nested(childs, m)}
                </>
            )
        });
    }

    const options = () => {
        let list = dataList(helpers.json.get(props, 'data.list', {}));

        if(list && list.length > 0){
            return listUi(list, [], true);
        }else{
            return noresults();
        }
    }

    const ui = () => {
        return createElement(helpers.json.get(props, "config.wrapper.markup.element", "ul"), helpers.element.jsx.attrs(helpers.json.get(props, 'config.wrapper', {}), 'anim list-box bdr-1'),  options());
    }

    return ui();
};

export default Comp;