import Header from './header';
import parser from './parser';
import Details from './details';
import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import JsonBuilder from './../json-builder';
import {useEffect, useState, useRef, useCallback} from "react";

const Comp = () => {
    
    const types = ['any', 'string', 'number', 'boolean', 'object', 'function', 'enum', 'jsx', 'nested', 'compProps', 'predefined'];
    const parserConfigs = {
        sortPath:'__.type',
        _sortOrder:['string', 'jsx', 'boolean', 'object', 'any', 'compProps', 'nested',  'predefined', 'enum',  'number', 'function'],
        sortOrder:['compProps', 'boolean', 'nested',  'predefined', 'object', 'any', 'enum', 'boolean', 'string', 'number', 'function', 'jsx']
    };

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
        setDetails((prev) => {
            return {...prev, ...{
                blank:false,
                cache:helpers.random.key(),
                enums:helpers.json.get(resp, 'enums', {}),
                raw:helpers.json.get(resp, 'propsDetails', {}),
                compTree:helpers.json.get(resp, 'compTree', {}),
                predefined:helpers.json.get(resp, 'predefined', {}),
                data:parser.data.init(helpers.json.get(resp, 'propsDetails.props', {}), parserConfigs)
        }}});
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
        let id = 'c6fdedc3ba1a0486f904e789938c7d7d8'; //'c5c54d4a7b97784bee2e9d7d2f2e8e7dd' //'cf9e5d8c7889089707f6bf27dbf6c1391';
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

    const jsonTreeHeader = (arg, temp) => {
        return arg.template.layout();
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
        return <Header templates={arg} node={props.node} builder={builder} configs={getConfigs()} />
    }

    const itemDetailsLayout = (arg, props) => {
        return <Details templates={arg} node={props.node} builder={builder} configs={getConfigs()} />
    }

    useEffect(() => {
        //console.log(details.data);
    }, [details])

    
    const onChange = useCallback((json, valid) => {
        if(valid){
            setDetails((prev) => {
                let d = helpers.json.copy(prev);
                let p = helpers.json.get(d, 'raw.props', {});
                let pd = helpers.json.deleteAllNestedKeyByVal(json, 'type', 'asEditorObject');
                let dpd = parser.data.init(pd, parserConfigs);

                if(!helpers.json.is.same(p, json)){
                    return {
                        ...prev,
                        data:parser.data.init(pd, parserConfigs)
                    }
                }else{
                    return prev;
                }
            });
        }
    }, []);

    const outputParser = (json, valid) => {
        return helpers.json.removeWrapperKeys(json, {stripKeys:'___blank___', removePrimitive:true});
    }

    const ui = () =>{
        if(details.blank){

        }else{
            return (
                <JsonBuilder
                    builder={builder}
                    data={details.data}
                    cache={details.cache}
                    callbacks={{
                        onChange:onChange,
                        outputParser:outputParser
                    }}
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
                            jsonOutput:jsonOutput,
                            jsonTreeHeader:jsonTreeHeader,
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