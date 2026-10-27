import Header from './header';
import parser from './parser';
import Details from './details';
import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import JsonBuilder from './../json-builder';
import {useEffect, useState, useRef, useCallback, useMemo} from "react";

const TYPES = ['any', 'string', 'number', 'boolean', 'object', 'function', 'enum', 'jsx', 'nested', 'compProps', 'predefined'];
const PARSER_CONFIGS = {
    sortPath:'__.type',
    sortOrder:['compProps', 'boolean', 'nested', 'predefined', 'object', 'any', 'enum', 'string', 'number', 'function', 'jsx']
};

const reqConfig = (url) => ({
    name:url,
    request: {
        options: {},
        request: {}
    }
});

const Comp = (dprops) => {
    const refreshTimerRef = useRef(null);

    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const [details, setDetails] = useState({
        raw:{},
        data:[],
        enums:{},
        blank:true,
        compTree:{},
        predefined:{},
        cache:helpers.random.key()
    });

    const refresh = useCallback(() => {
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
        }
        refreshTimerRef.current = setTimeout(() => {
            setDetails((prev) => ({...prev, cache: helpers.random.key()}));
        }, 60);
    }, []);

    useEffect(() => {
        return () => {
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
            }
        };
    }, []);

    const builder = useMemo(() => {
        return helpers.json.schema.builder.init('props', {
            utils: {
                keyRegex:null,
                dataType:TYPES,
                dataTypeFlags: {
                    array: [],
                    object: ['nested', 'compProps', 'predefined', 'enum', 'asEditorObject']
                },
                keysmap: {
                    arrayChilds:'sandeep'
                }
            },
            callbacks: {
                onNodeCreate: (arg) => {
                    return parser.data.onCreate(arg);
                },
                onNodeUpdate: (arg, prev) => {
                    return parser.data.onUpdate(arg, prev, PARSER_CONFIGS);
                }
            }
        });
    }, [refresh]);

    const configs = useMemo(() => ({
        types: TYPES,
        enums: details.enums || {},
        compTree: details.compTree || {},
        predefined: details.predefined || {}
    }), [details.enums, details.compTree, details.predefined]);


    const onPropResponse = useCallback((resp) => {
        const propsData = helpers.json.get(resp, 'propsDetails.props', {});
        const parsedData = parser.data.init(propsData, PARSER_CONFIGS);

        setDetails((prev) => ({
            ...prev,
            blank:false,
            data:parsedData,
            cache:helpers.random.key(),
            enums:helpers.json.get(resp, 'enums', {}),
            raw:helpers.json.get(resp, 'propsDetails', {}),
            compTree:helpers.json.get(resp, 'compTree', {}),
            predefined:helpers.json.get(resp, 'predefined', {})
        }));
    }, []);

    const onResp = useCallback((resp) => {
        const id = 'c6fdedc3ba1a0486f904e789938c7d7d8';
        const map = helpers.json.get(resp, `components.${id}`, '');

        appHelpers.store.get(
            [
                {
                    name: 'storybook.components.props.detailsByMap',
                    request: {
                        options: {},
                        request: {
                            data: {
                                map: (map || '').toLowerCase()
                            }
                        }
                    }
                },
                reqConfig('storybook.ds.enums'),
                reqConfig('storybook.ds.predefined'),
                reqConfig('storybook.components.tree')
            ],
            onPropResponse
        );
    }, [onPropResponse]);

    // Initial mount trigger
    const isMountedRef = useRef(false);
    helpers.react.hooks.onmount(isMountedRef, useEffect, () => { appHelpers.store.get([reqConfig('storybook.components.list.map')], onResp)});

    // 4. Optimized onChange callback with single-pass transformation
    const onChange = useCallback((json, valid) => {
        if (!valid) return;

        setDetails((prev) => {
            if (helpers.json.is.same(helpers.json.get(prev, 'raw.props', {}), json)) {
                return prev;
            }

            const strippedJson = helpers.json.deleteAllNestedKeyByVal(json, 'type', 'asEditorObject');
            const transformedTree = parser.data.init(strippedJson, PARSER_CONFIGS);

            return {
                ...prev,
                data: transformedTree
            };
        });
    }, []);

    const outputParser = useCallback((json) => {
        return helpers.json.removeWrapperKeys(json, {
            stripKeys: '___blank___',
            removePrimitive: true
        });
    }, []);

    // 5. Stable layout & template renderers
    const renderLayout = useCallback((arg) => (
        <div className='full bxs grid-wrapper grid-layout-2 pd-20'>
            <div className='grid pd-r10 bxs' key={details.cache}>
                {arg.jsonTree()}
            </div>
            <div className='grid pd-l10 bxs oa'>
                {arg.jsonOutput(details.cache)}
            </div>
        </div>
    ), [details.cache]);

    const nested = (arg, temp) => {
        let type = helpers.json.get(arg, 'props.node.__.type');
        let editing = helpers.json.get(arg, 'props.node.__.editing', false);
        let hideHeader = helpers.json.get(arg, 'props.node.__.hideHeader', false);

        if(type != 'predefined' && (editing)){
            return (
                <div className={hideHeader?'':'full bxs bdr-c00104 bdr-1 bdr-tn bdr-rn bdr-bn'}>
                    {temp(true)}
                </div>
            )
        }
    }

    const jsonTree = useCallback((arg, temp) => (
        <div className='full'>
            {temp.header(arg)}
            {temp.details(arg)}
            {temp.nested(arg)}
        </div>
    ), []);

    const jsonTreeHeader = useCallback((arg) => arg.template.layout(), []);
    const jsonOutput = useCallback((arg) => arg.template(), []);

    const itemHeaderLayout = useCallback((arg, prps) => (
        <Header templates={arg} node={prps.node} builder={builder} configs={configs} utils={props.configs} />
    ), [builder, configs]);

    const itemDetailsLayout = useCallback((arg, prps) => (
        <Details templates={arg} node={prps.node} builder={builder} configs={configs} utils={props.configs} />
    ), [builder, configs]);

    const filterConfigs = useMemo(() => ({
        query: {
            $and: [
                {
                    '__.key': {
                        highlight: true,
                        operator: 'startswith'
                    }
                }
            ]
        },
        configs: {
            highlight: false,
            searchChildren: true,
            childKey: '__.children',
            treeConfig: {
                maxDepth: Infinity,
                keepAncestors: true,
                keepDescendantsOnParentMatch: false
            }
        }
    }), []);

    if (details.blank) {
        return <></>;
    }

    return (
        <JsonBuilder
            builder={builder}
            data={details.data}
            callbacks={{
                onChange,
                outputParser
            }}
            filters={filterConfigs}
            templates={{
                editor: {
                    layout:renderLayout,
                    jsonTree,
                    jsonOutput,
                    jsonTreeHeader
                },
                item: {
                    header: {
                        layout: itemHeaderLayout
                    },
                    details: {
                        layout: itemDetailsLayout
                    },
                    nested:{
                        layout:nested
                    }
                }
            }}
        />
    );
};

export default Comp;
