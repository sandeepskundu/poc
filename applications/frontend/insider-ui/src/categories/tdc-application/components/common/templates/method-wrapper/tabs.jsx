import propTypes from 'prop-types';
import helpers from 'ui-helpers';
import {createElement, useMemo} from 'react';

const Tabs = (dprops) => {
    const props = helpers.element.jsx.props.define({
        state:{
            current:1
        },
        layout:{
            size:'', 
            tabPos:'top', // top|bottom left|right 
            "type":"_vertical", //horizontal|vertical
            "grids":{
                tabs:2,
                content:10
            }
        },
        tabs:{
            0:{
                "label":'Tab 1',
                "labelDs":{
                    "attrs":{
                        href:"kundu"
                    },
                },
                "content":'Tab 1 content',
                "contentDs":{
                    "attrs":{
                        href:"kundu"
                    },
                }
            },
            1:{
                "label":'Tab 2',
                "content":'Tab 2 content'
            }
        },
        dSystems:{
            tabsListHolder:{},
            holder:{
                "markup":{
                    "element":"div",
                    "class":"facebook",
                },
                "attrs":{
                    href:"kundu"
                },
                "dataAttrs":{},
                "ds":{
                    "theme":{
                        "colorPairing":{
                            "hover":"002"
                        },
                        "background":{
                            "default":"c00000"
                        },
                        "border":{
                            "default":"c00000"
                        }
                    },
                    "css":{
                        "class":{
                            "shadow":"xs",
                            "fontsize":"md",
                            "borderNone":{
                                "1":true,
                                "3":true
                            },
                            "radius":{
                                "1":"2",
                                "2":"4",
                                "3":"6",
                                "4":"8"
                            },
                            "padding":{
                                "1":"12",
                                "2":"14",
                                "3":"16",
                                "4":"18"
                            },
                            "margin":{
                                "1":"6",
                                "2":"8",
                                "3":"10",
                                "4":"12"
                            }
                        },
                        "flags":{
                            "noBorder":true,
                            "isDisplay":true,
                            "animation":"anim"
                        }
                    }
                }
            },
            tabsListItem:{
                "ds":{
                    "theme":{
                        "colorPairing":{
                            "hover":"004"
                        },
                        "background":{
                            "default":"c00000"
                        },
                        "border":{
                            "default":"c00000"
                        }
                    },
                }
            }
        }
    }, dprops);

    const size = {
        "xxs":{

        },
        "xs":{

        },
        "sm":{

        },
        "md":{

        },
        "lg":{

        },
        "xl":{

        }
    }

    const defaultDsProps = {
        holder:{
            dataAttrs:{
                'data-ui-comp-id':id,
                'data-ui-comp':'tabs'
            }
        },
        tabsListHolder:{
            "markup":{
                "element":"ul",
            },
            dataAttrs:{
                'data-ui-comp':'tab-list-holder',
            }
        },
        tabsListItem:{
            "markup":{
                "element":"li",
            },
            dataAttrs:{
                'data-ui-comp':'tab-list-item',
            }
        },
        tabsItem:{
            "markup":{
                "element":"label",
            },
            dataAttrs:{
                'data-ui-comp':'tab-item',
            }
        },
        tabsContentListHolder:{
            "markup":{
                "element":"ul",
            },
            dataAttrs:{
                'data-ui-comp':'tab-content-list-holder',
            }
        },
        tabsContentItem:{
            "markup":{
                "element":"div",
            },
            dataAttrs:{
                'data-ui-comp':'tab-content-item',
            }
        }
    }

    const defaultLayoutType = 'horizontal';
    const id = `tB${helpers.random.id(12)}`;
    const tabs = helpers.json.toList(helpers.json.val(props, 'tabs', {}));

    const checkboxId = (i) => {
        return `${id}${i}`
    }

    const label = (item, index) => {
        if(item.label){
            const Comp = item.label;
            const type = helpers.data.type.get(item.label);
            switch(type) {
                case 'function':
                  return item.label(item, index);
                break;
                case 'string':
                    return item.label;
                break;
                default:
                    return <Comp data={item} index={index} />
            }
        }else{
            return helpers.json.val(item, 'label', '');
        }
    }

    const tabItemLabel = (item, index) => {
        let dp = defaultDsProps.tabsItem;
        let ids = helpers.json.val(item, 'labelDs', {});
        let pdp = helpers.json.val(props, 'dSystems.tabsItem', {});
        let dprp = helpers.json.merge({...dp, ...{
                attrs:{
                    'htmlFor':checkboxId(index),
                }
            }}, helpers.json.merge(pdp, ids));

        return helpers.element.jsx.ds(dprp, createElement, label(item, index), 'cp anim tab-lbl');
    }

    const tabItemCls = (item, index) => {
        const rval = ['bxs'];
        const type = helpers.json.val(props, 'layout.type', defaultLayoutType);

        if(type === 'vertical'){
            rval.push('full')
        }

        return rval.join(' ');
    }

    const tabItem = (item, index) => {
        let dp = defaultDsProps.tabsListItem;
        let pdp = helpers.json.val(props, 'dSystems.tabsListItem', {});
        let dprp = helpers.json.merge(dp, pdp);

            return helpers.element.jsx.ds(dprp, createElement, tabItemLabel(item, index), tabItemCls());
    }

    const tabsList = () => {
        return tabs.map((arg, inde) => {
            return tabItem(arg, inde)
        })
    }

    const tabsListHolderCls = () => {
        const rval = ['bxs'];
        const type = helpers.json.val(props, 'layout.type', defaultLayoutType);

        if(type === 'vertical'){
            const gw = helpers.json.val(props, 'layout.grids.tabs', 3);
            rval.push('grid-w'+gw)
        }else{
            rval.push('full flx-vc')
        }

        return rval.join(' ');
    }

    const tabsListHolder = () => {
        let dp = defaultDsProps.tabsListHolder;
        let pdp = helpers.json.val(props, 'dSystems.tabsListHolder', {});
        let dprp = helpers.json.merge(dp, pdp);
        return helpers.element.jsx.ds(dprp, createElement, tabsList(), tabsListHolderCls());
    }

    const content = (item, index) => {
        if(item.content){
            const Comp = item.content;
            const type = helpers.data.type.get(item.content);
            switch(type) {
                case 'function':
                  return item.content(item, index);
                break;
                case 'string':
                    return item.content;
                break;
                default:
                    return <Comp data={item} index={index} />
            }
        }else{
            return helpers.json.val(item, 'content', '');
        }
    }

    const tabsContentItem = (item, index) => {
        let dp = defaultDsProps.tabsContentItem;
        let ids = helpers.json.val(item, 'contentDs', {});
        let pdp = helpers.json.val(props, 'dSystems.tabsContentItem', {});
        let dprp = helpers.json.merge(dp, helpers.json.merge(pdp, ids));

        return helpers.element.jsx.ds(dprp, createElement, content(item, index), 'tab-ctnt-holder full bxs');
    }

    const tabsContent = () => {
        return tabs.map((arg, index) => {
            return (
                <li className='full bxs anim' key={id+index}>
                    <input type="radio" id={checkboxId(index)} name={id} className='tab-ctnt-switch' />
                    {tabsContentItem(arg, index)}
                </li>  
            )
        })
    }

    const tabsContentHolderCls = () => {
        const rval = ['bxs tab-ctnt-list'];
        const type = helpers.json.val(props, 'layout.type', defaultLayoutType);

        if(type === 'vertical'){
            const gw = helpers.json.val(props, 'layout.grids.content', 9);

            rval.push('grid-w'+gw)
        }else{
            rval.push('full')
        }

        return rval.join(' ');
    }

    const tabsContentHolder = () => {
        let dp = defaultDsProps.tabsContentListHolder;
        let pdp = helpers.json.val(props, 'dSystems.tabsContentListHolder', {});
        let dps = helpers.json.merge(dp, pdp);

        return helpers.element.jsx.ds(dps, createElement, tabsContent(), tabsContentHolderCls());
    }

    const tabsui = () => {
        return (
            <>
                {tabsListHolder()}
                {tabsContentHolder()}
            </>
        )
    }

    const wrapperCls = () => {
        const rval = ['full bxs'];
        const type = helpers.json.val(props, 'layout.type', defaultLayoutType);

        if(type != defaultLayoutType){
            rval.push('grid-wrapper')
        }

        return rval.join(' ');
    }

    const wrapper = () => {
        let dp = defaultDsProps.holder;
        let pdp = helpers.json.val(props, 'dSystems.holder', {});
        let dprp = helpers.json.merge({...dp, ...{
            attrs:{
                'data-ui-comp-id':id,
            }
        }}, pdp);

        return helpers.element.jsx.ds(dprp, createElement, tabsui(), wrapperCls());
    }

    const ui = () => {
        if(tabs && tabs.length > 0){
            return wrapper();
        }else{
            return <></>
        }
    }

    return ui();
}

export default Tabs;