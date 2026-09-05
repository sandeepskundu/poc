import helpers from 'ui-helpers';
import {createElement} from 'react';
import ListItem from 'aio-global-ui/atoms/list/item';
import ListHeader from 'aio-global-ui/atoms/list/header';

/*--
const _props = {
    childs:{
        "end":"",
        "after":"",
        "start":"",
        "before":"",
        "center":""
    },
    dsTheme:{
        "end":{},
        "after":{},
        "start":{},
        "before":{},
        "center":{},
        "wrapper":{}
    },
    config:{
        "end":{},
        "after":{},
        "start":{},
        "before":{},
        "center":{},
        "wrapper":{}
    },
    callbacks:{
        item:{
            "onBlur":null,
            "onClick":null,
            "onFocus":null,
            "onKeyUp":null,
            "dsTheme":null,
            "onKeyDown":null,
            "onDragStart":null,
            "onMouseDown":null,
            "onPointerUp":null,
            "onPointerDown":null,
            "onPointerEnter":null,
            "onPointerLeave":null,
            "beforeRender":null
        },
        group:{
            "onBlur":null,
            "onClick":null,
            "onFocus":null,
            "onKeyUp":null,
            "dsTheme":null,
            "onKeyDown":null,
            "onDragStart":null,
            "onMouseDown":null,
            "onPointerUp":null,
            "onPointerDown":null,
            "onPointerEnter":null,
            "onPointerLeave":null,
            "beforeRender":null
        }
    }
}--*/


const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    props = helpers.json.merge(props, {
        data:{},
        templates:{}
    });

    const id = helpers.random.id(10);
    const rn = helpers.random.number();
    const data = helpers.json.get(props, 'data', {});
    const list = helpers.json.keys(data || {});
    const dval = `r${id}${rn}`;

    const defaults = (() => {
        return helpers.json.merge({
            mapping:{
                keys:{
                    "type":'type'
                },
                "group":{
                    "end":"",
                    "after":"",
                    "start":"",
                    "before":"",
                    "center":"label",
                },
                "item":{
                    "end":"",
                    "after":"",
                    "start":"",
                    "before":"",
                    "center":"label",
                }
            },
            childs:{
                "item":{
                    "end":dval,
                    "after":dval,
                    "start":dval,
                    "before":dval,
                    "center":dval
                },
                "group":{
                    "end":dval,
                    "after":dval,
                    "start":dval,
                    "before":dval,
                    "center":dval
                }
            },
            dsTheme:{
                "boxWrapper":{
                    "radius":"6",
                    "shadow":"md",
                    "border":"c00104",
                    "background":"c00000",
                },
                "item":{
                    "end":{},
                    "after":{},
                    "start":{},
                    "before":{},
                    "center":{},
                    "wrapper":{
                        "hbackground":"c00101"
                    }
                },
                "group":{
                    "end":{},
                    "after":{},
                    "start":{},
                    "before":{},
                    "center":{},
                    "wrapper":{
                        "background":"c00102"
                    }
                }
            },
            config:{
                "item":{
                    "end":{},
                    "after":{},
                    "start":{},
                    "before":{},
                    "center":{},
                    "wrapper":{
                        "markup":{
                            "element":'a'
                        }
                    }
                },
                "group":{
                    "end":{},
                    "after":{},
                    "start":{},
                    "before":{},
                    "center":{},
                    "wrapper":{
                        "markup":{
                            "element":'div'
                        }
                    }
                },
                "boxWrapper":{
                    "markup":{
                        "element":'ul'
                    },
                    "ds":{
                        "css":{
                            "class":{
                                "borderNone":{
                                    1:false,
                                    2:false,
                                    3:true,
                                    4:false
                                }
                            }
                        }
                    }
                }
            }
        }, helpers.json.get(props, 'defaults', {}))
    })();

    const typeKey = helpers.json.get(defaults, 'mapping.keys.type', 'type');

    const getRadius = (rval, arg, itemProps, confType, type, first, last) => {
        if((confType === 'config' && type != 'boxWrapper')){
            let boxConfig = getConfigByType({}, {}, 'dsTheme', 'boxWrapper', first, last);
            let radius = helpers.json.get(boxConfig, 'radius', '');
            if(radius){
                if(last){
                    rval = helpers.json.set(rval, 'wrapper.ds.css.class.radius', {1:0, 2:radius})
                }

                if(first){
                    rval = helpers.json.set(rval, 'wrapper.ds.css.class.radius', {1:radius, 2:0})
                }
            }
        }

        return rval;
    }

    const borderColor = (rval, arg, itemProps, confType, type, first, last) => {
        if((confType === 'dsTheme' && type != 'boxWrapper' && (type === 'item' || type === 'group'))){
            let boxConfig = getConfigByType({}, {}, 'dsTheme', 'boxWrapper', first, last);
            let border = helpers.json.get(boxConfig, 'border', '');
            let hborder = helpers.json.get(boxConfig, 'hborder', '');
            let iborder = helpers.json.get(rval, 'wrapper.border', '');
            let ihborder = helpers.json.get(rval, 'wrapper.hborder', '');

            if(border && !iborder){
                rval = helpers.json.set(rval, 'wrapper.border', border)                
            }

            if(hborder && !ihborder){
                rval = helpers.json.set(rval, 'wrapper.hborder', hborder)                
            }
        }

        return rval;
    }

    const getConfigByType = (arg, itemProps, confType, type, first, last) => {
        let iprops = helpers.json.get(itemProps, confType, {}); // Get props from item data itself.
        let pprops = helpers.json.get(props, `${confType}.${type}`, {}); // Get props from passed from parents components
        let dprops = helpers.json.get(defaults, `${confType}.${type}`, {}); // Get props from defaults props hardcoded with this component.
        let rval = helpers.json.merge(dprops, pprops);
            rval = getRadius(rval, arg, itemProps, confType, type, first, last);
            rval = borderColor(rval, arg, itemProps, confType, type, first, last)

        return helpers.json.merge(rval, iprops);
    }

    const getContent = (arg, itemProps, confType, type, name) => {
        let map = getConfigByType(arg, itemProps, 'mapping', type);
        let key = helpers.json.get(map, name, 'label');
        let val = helpers.json.get(arg, key, dval);

        if(val != dval){
            return val;
        }
    }

    const getChilds = (arg, itemProps, confType, type) => {
        let rval = {};
        let childs = getConfigByType(arg, itemProps, confType, type);

        for(let a in childs){
            let val = helpers.json.get(childs, a, dval);

            if(val != dval){
                rval[a] = val;
            }else{
                rval[a] = getContent(arg, itemProps, confType, type, a);
            }
        }

        return rval;
    }

    const getProps = (arg, map, first, last) => {
        let iprops = helpers.json.get(arg, 'props', {});
        let type = helpers.json.get(arg, typeKey, 'item');

        return {
            _details:{
                map:map,
                data:arg,
                last:last,
                first:first,
            },
            childs:getChilds(arg, iprops, 'childs', type),
            config:getConfigByType(arg, iprops, 'config', type, first, last),
            dsTheme:getConfigByType(arg, iprops, 'dsTheme', type, first, last),
            callbacks:helpers.json.merge(helpers.json.get(props, `callbacks.${type}`, {}), helpers.json.get(iprops, `callbacks.${type}`, {}))
        }
    }

    const templates = (() => {
        return helpers.json.merge({
            item:(arg, map, first, last) => {
                return (
                    <ListItem {...getProps(arg, map, first, last)} />
                )
            },
            group:(arg, map, first, last) => {
                return <ListHeader {...getProps(arg, map, first, last)} />
            },
            noresults:() => {

            }
        }, helpers.json.get(props, 'templates', {}))
    })()

    const noresults = () => {

    }

    const nested = (clist, childs, map) => {
        if(clist && clist.length > 0){
            return getList(clist, childs, [...map], false, false);
        }else{
            return <></>
        }
    }

    const content = (item, map, first, last) => {
        let type = helpers.json.get(item, typeKey, 'item');
        let template = helpers.json.get(templates, type, dval);
        let isFun = helpers.data.type.is(template, 'function');
        let childs = helpers.json.get(item, 'childs', {});
        let clist = helpers.json.keys(childs || {});

        if(isFun){
            return (
                <>
                    {template(item, map, first, (last && clist.length === 0))}
                    {nested(clist, childs, map)}
                </>
            )
        }else{
            return <></>
        }
    }

    const getList = (li, data, map, first) => {
        return li.map((key, i) => {
            let m = [...map];
            let item = helpers.json.get(data, key);
                m.push(key);

            return (
                <li className='full bxs' key={`dval${i}${m.join('')}`}>
                    {content(item, m, (first && i === 0), (i === (li.length-1)))}
                </li>
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

    const mergeDs = (map, type) => {
        if(type === 'ds'){
            return helpers.element.jsx.props.merge.ds(props, map, defaults);
        }else{
            return helpers.element.jsx.props.merge.predefined(props, map, defaults);
        }
    }

    const dsTheme = (arg, type) => {
        return helpers.json.merge(helpers.json.get(arg, `config`, {}), {
            ds:{
                predefined:helpers.json.get(arg, `dsTheme`, {})
            }
        });
    }

    const ui = () => {
        let wrp = {
            dsTheme:mergeDs('boxWrapper'),
            config:mergeDs('boxWrapper', 'ds')
        }
        return createElement('ul', helpers.element.jsx.attrs(dsTheme(wrp), `anim list-box bdr-1`),  options());;
    }


    return ui();
};

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;