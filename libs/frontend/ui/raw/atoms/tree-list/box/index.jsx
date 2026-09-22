import {useState} from 'react';
import helpers from 'ui-helpers';
import Accordion from 'aio-global-raw-ui/atoms/accordion/group';

const Comp = (dprops) => {
    const internalType = '___.___type';
    const random = helpers.random.key();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const mapByType = (type) => {
        let rval = {};
        let li =  helpers.json.get(props, `data.${type}`, {});

        if(li && helpers.data.type.is(li, 'object')){
            for(let a in li){
                if(helpers.data.type.is(a, 'int')){
                    rval[a] = li[a];
                }
            }
        }

        return rval;
    }

    const [cache, setCache] = useState(random);
    const [expended, setExpended] = useState(props.expended)

    const [data, setData] = useState({
        selected:mapByType('selected'),
        disabled:mapByType('disabled'),
        excluded:mapByType('excluded')
    });

    const getChilds = (arg) => {
        let node = helpers.json.get(props, 'mapping.tree.childs', 'childs');
        let childs = helpers.json.get(arg, node, random);

        if(childs && childs != random){
            if(helpers.data.type.is(childs, 'list') && childs.length > 0){
                return childs;
            }

            if(helpers.data.type.is(childs, 'object') && helpers.json.length(childs) > 0){
                return childs;
            }
        }

        return false;
    }

    const hasChilds = (arg) => {
        return getChilds(arg)?true:false;
    }

    const parse = (li, map) => {
        let rval = [];
        
        if(li){
            let islist = helpers.data.type.is(li, 'list');
            let isobj = helpers.data.type.is(li, 'object');

            if(islist || isobj){
                for(let a in li){
                    let item = helpers.json.copy(li[a]);

                    if(helpers.data.type.is(item, 'object') && (islist || (!islist && helpers.data.type.is(a, 'int')))){
                        item = helpers.json.set(item, internalType, (hasChilds(item)?'accordion':'item'))
                    }

                    rval.push(item);
                }
            };
        }
        
        return rval;
    }
    
    const getItemTemplate = (arg, map, index, single, pos) => {
        let body = helpers.json.get(props, 'templates.body.content', '');

        if(helpers.data.type.is(body, 'function')){
            return body(arg, [...map, index], single, pos, props, data || {});
        }else{
            return <></>
        }
    }

    const onToggle = (arg, active, map) => {
        let d = helpers.json.copy(data);
        let m = `selected.${map.join('.')}`;
        let otCb = helpers.json.get(props, 'callbacks.onToggle', null);
        let onOpen = helpers.json.get(props, 'callbacks.onOpen', null);
        let onClose = helpers.json.get(props, 'callbacks.onClose', null);

        if(!helpers.json.get(props, 'multiple', false) && active){
            d.selected = {};
        }

        if(active){
            d = helpers.json.set(d, ['selected', ...map], true);
        }else{
            helpers.json.remove(d, m);
        }

        if(expended){
            setExpended(false);
        }

        setData(d);
        setCache(helpers.random.key());

        if(otCb && helpers.data.type.is(otCb, 'function')){
            otCb(helpers.json.copy(d.selected), props);
        }

        if(active && onOpen && helpers.data.type.is(onOpen, 'function')){
            onOpen(helpers.json.copy(d.selected), props);
        }

        if(!active && onClose && helpers.data.type.is(onClose, 'function')){
            onClose(helpers.json.copy(d.selected), props);
        }
    }

    const isInDataList = (map, type) => {
        let d = helpers.json.copy(data);
        let m = `${type}.${map.join('.')}`;
        let rv = helpers.json.get(d, m, random);

        if(rv != random){
            return rv?true:false;
        }

        return false;
    }

    const getDataListByType = (map, type) => {
        let valid = isInDataList(map, type);

        if(valid || (type === 'selected' && expended)){
            return {
                0:true
            }
        }else{
            return {};
        }
    }

    const getData = (arg, map, index) => {
        return {
            list:{
                0:arg
            },
            selected:getDataListByType([...map, index], 'selected'),
            disabled:getDataListByType([...map, index], 'disabled')
        }
    }

    const accordionProps = (arg, map, index, single) => {
        let rval = helpers.json.copy(props);
            delete rval.data;

        return helpers.json.merge(rval, {
            key:`${cache}${index}`,
            data:getData(arg, map, index),
            templates:{
                body:{
                    content:(item, accordionItemProps, bodyProps) => {
                        return (
                            <>
                                {getItemTemplate(arg, map, index, single, 'before')}
                                {nested(item, accordionItemProps, bodyProps, map, index)}
                                {getItemTemplate(arg, map, index, single, 'after')}
                            </>
                        )
                    }
                }
            },
            callbacks:{
                onToggle:(data, active) => {onToggle(data, active, [...map, index])}
            }
        })
    }

    const nested = (item, accordionItemProps, bodyProps, map, index) => {
        return render(getChilds(item), [...map, index]);
    }

    const render = (list, map) => {
        if(map && ((map.length === 0) || (map.length > 0 && isInDataList([...map], 'selected')) || expended)){
            let li = parse(list, map);
            if(li && li.length > 0){
                
                let rcb = helpers.json.get(props, 'templates.treeList.render', '');

                return li.map((arg, i) => {
                    let type = helpers.json.get(arg, internalType, 'item');

                    if(rcb && helpers.data.type.is(rcb, 'function')){
                        switch (type) {
                            case 'accordion':
                                let iProps = accordionProps(arg, [...map], i);
                                return rcb(arg, [...map], i, (a) => {
                                    return <Accordion {...helpers.json.merge(iProps, a || {})} />
                                }, iProps, type, data)
                            break;
                            case 'item':
                                let iProps1 = accordionProps(arg, [...map], i, true);
                                return rcb(arg, [...map], i, (a) => {
                                    return <Accordion {...helpers.json.merge(iProps1, a || {})} />
                                }, iProps1, type, data)
                            break;
                        }
                    }else{
                        switch (type) {
                            case 'accordion':
                                return <Accordion {...accordionProps(arg, [...map], i)} />
                            break;
                            case 'item':
                                return <Accordion {...accordionProps(arg, [...map], i, true)} />
                            break;
                        }
                    }
                })
            }
        }
        
        return <></>
    };

    return (
        <React.Fragment key={cache}>
            {render(helpers.json.get(props, 'data.list', {}), [])}
        </React.Fragment>
    )
};

export default Comp;