import Header from './header';
import parser from './parser';
import Details from './details';
import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import JsonBuilder from './../json-builder';
import {useEffect, useState, useRef} from "react";

const Comp = () => {
    const types = ['any', 'string', 'number', 'boolean', 'object', 'function', 'enum', 'jsx', 'nested', 'compProps', 'predefined'];

    const builder = helpers.json.schema.builder.init('props', {
        utils:{
            keyRegex:null,
            dataType:types,
            dataTypeFlags:{
                array:[],
                object:['nested', 'compProps', 'predefined', 'enum', 'asEditorObject']
            },
            keysmap:{
                arrayChilds:'sandeep'
            } 
        },
        callbacks:{
            onNodeCreate:(arg) => {
                arg.__.metas = parser.data.getBaseMetas(arg.__.key, arg.__, {});
                return arg;
            },
            onNodeUpdate:(arg, prev) => {
                arg.__.metas = parser.data.getBaseMetas(arg.__.key, arg.__, {});
                return arg;
            }
        }
    });

    const [details, setDetails] = useState({
        blank:'',
        data:[],
        cache:helpers.random.key()
    })

    const onPropResponse = (resp, arg) => {
        debugger;
        setDetails({
            blank:false,
            cache:helpers.random.key(),
            enums:helpers.json.get(resp, 'enums', {}),
            raw:helpers.json.get(resp, 'propsDetails', {}),
            compTree:helpers.json.get(resp, 'compTree', {}),
            predefined:helpers.json.get(resp, 'predefined', {}),
            data:parser.data.init(helpers.json.get(resp, 'propsDetails.props', {}), {
                sortPath:'__.type',
                _sortOrder:['string', 'jsx', 'boolean', 'object', 'any', 'compProps', 'nested',  'predefined', 'enum',  'number', 'function'],
                sortOrder:['boolean', 'compProps', 'nested',  'predefined', 'object', 'any', 'enum', 'boolean', 'string', 'number', 'function', 'jsx']
            })
        });
    }

    const getConfigs = () => {
        return {
            types:types,
            enums:helpers.json.get(details, 'enums', {}),
            compTree:helpers.json.get(details, 'compTree', {}),
            predefined:helpers.json.get(details, 'predefined', {})
        }
    }

    const reqConfig = (url) => {
        return {
            name:url,
            request:{
                options:{},
                request:{}
            }
        }
    }

    const onResp = (resp, arg) => {
        let id = 'cf9e5d8c7889089707f6bf27dbf6c1391';
        let map = helpers.json.get(resp, `components.${id}`, '');
            appHelpers.store.get([{
                name:'storybook.components.props.detailsByMap',
                request:{
                    options:{},
                    request:{
                        data:{
                            map:map.toLowerCase()
                        }
                    }
                }
            },
            reqConfig('storybook.ds.enums'),
            reqConfig('storybook.ds.predefined'),
            reqConfig('storybook.components.tree')], onPropResponse);
    }

    helpers.react.hooks.onmount(useRef(false), useEffect, () => {
        appHelpers.store.get([reqConfig('storybook.components.list.map')], onResp);
    });

    //const overwirtes = parser.overwrite.map.get(cdata);    

    const propsConfigs = {
        types:types
    }

    const render = (arg) => {
        return (
            <div className='full bxs grid-wrapper grid-layout-2 pd-20'>
                <div className='grid pd-r10 bxs' key={details.cache}>
                    {arg.jsonTree()}
                </div>
                <div className='grid pd-l10 bxs oa'>
                    {arg.jsonOutput(details.cache)}
                </div>
            </div>
        )
    }

    const jsonTree = (arg, temp) => {
        return (
            <div className='full'>
                {temp.header(arg)}
                {temp.details(arg)}
                {temp.nested(arg)}
            </div>
        )
    }

    const jsonOutput = (arg) => {
        return arg.template()
    }

    const itemHeaderLayout = (arg, props) => {
        const nh = helpers.json.get(props, 'node.__.hideHeader', false);
        /*-- arg ===>
        {
            layout:{
                ui:layout
            },
            actions:{
                expend:{
                    ui:expend,
                    show:isObjOrArray,
                    state:node.__.expanded,
                    method:callbacks.expend
                },
                edit:{
                    ui:modify,
                    state:node.__.editing,
                    method:callbacks.edit
                },
                remove:{
                    ui:remove,
                    method:callbacks.remove
                },
                add:{
                    ui:addIcon,
                    show:isObjOrArray,
                    method:callbacks.addNew
                }
            },
            count:{
                ui:childCount,
                show:isObjOrArray,
                text:childCountLabel()
            },
            label:{
                ui:label,
                text:highlight(true),
                highlighter:highlighter,
                error:{
                    ui:error,
                    label:errorLabel(),
                    state:{
                        show:hasError,
                        empty:hasEmptyError,
                        duplicate:hasDuplicateError
                    }
                }
            }
        }

        props = {
            node:node,
            editor:editor
        }

        -----*/

        return <Header templates={arg} node={props.node} builder={builder} configs={getConfigs()} />
    }

    const itemDetailsLayout = (arg, props) => {
        return <Details templates={arg} node={props.node} builder={builder} configs={getConfigs()} />
        /*-- arg ===> 
            {
                layout:{ => 
                    ui:layout
                },
                item:{
                    node:node,
                    key:{
                        ui:key,
                        input:editor.templates.node.key,
                        show:!isType('array', details.parentType)
                    },
                    type:{
                        ui:type,
                        input:editor.templates.node.type
                    },
                    nullable:{
                        input:editor.templates.node.nullable
                    },
                    actions:{
                        edit:editor.callbacks.node.edit,
                        add:editor.callbacks.node.addNew,
                        remove:editor.callbacks.node.delete,
                        expend:editor.callbacks.node.expend,
                        onKeyChange:editor.callbacks.node.keyChange,
                        onTypeChange:editor.callbacks.node.typeChange,
                        toggleMetas:editor.callbacks.node.toggleMetas,
                        validateKeyName:editor.callbacks.node.validateKey,
                        changeValueByKey:editor.callbacks.node.valueChange
                    },
                    meta:{
                        show:showMeta,
                        list:{
                            data:metas,
                            ui:metalist,
                        },
                        item:{
                            ui:metaItem,
                            inputs:{
                                key:{
                                    ui:metaKey,
                                    input:editor.templates.meta.key,
                                },
                                value:{
                                    ui:metaValue,
                                    input:editor.templates.meta.value,
                                }
                            },
                            actions:{
                                remove:{
                                    ui:deleteMeta,
                                    method:editor.callbacks.metas.deleteMeta,
                                },
                                add:editor.callbacks.metas.addNewMeta,
                                validateKey:editor.callbacks.metas.validateKey,
                                updateByKey:editor.callbacks.metas.updateMetaDetailsByKey,
                            }
                        }
                    }
                }
            }
        /*-- arg  

        props = {
            node:node,
            editor:editor
        }

        --*/
    }

    const ui = () =>{
        
        if(details.blank){

        }else{
            return (
                <JsonBuilder
                    data={details.data}
                    builder={builder}
                    filters={{
                        query:{
                            $and:[{
                                '__.key':{
                                    highlight:true,
                                    operator:'startswith',
                                    //value:(query.trim() || '')
                                }
                            }]
                        },
                        configs:{
                            highlight:false,
                            searchChildren:true, // If false, children are ignored and only top-level roots are evaluated
                            childKey:'__.children',  
                            treeConfig:{
                                maxDepth:Infinity,  // Recursion limit cutoff to prevent call-stack overflows
                                keepAncestors:true, // If child matches, preserve and render the parent path to root
                                keepDescendantsOnParentMatch:false // If parent matches, retain all its children unconditionally
                            }
                        }
                    }}
                    templates={{
                        editor:{
                            layout:render,
                            jsonTree:jsonTree,
                            jsonOutput:jsonOutput
                        },
                        item:{
                            header:{
                                layout:itemHeaderLayout,
                            },
                            details:{
                                layout:itemDetailsLayout
                            }
                        }
                    }}
                />
            )
        }
    }

    return ui();
}

export default Comp;