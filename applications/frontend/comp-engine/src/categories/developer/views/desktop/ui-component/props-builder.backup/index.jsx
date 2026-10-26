import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Header from './header';
import parser from './parser';
import Details from './details';
import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import JsonBuilder from './../json-builder';

// 1. Hoist static constants to avoid re-allocation on every render
const TYPES = [
    'any', 'string', 'number', 'boolean', 'object',
    'function', 'enum', 'jsx', 'nested', 'compProps', 'predefined'
];

const PARSER_CONFIGS = {
    sortPath: '__.type',
    sortOrder: [
        'compProps', 'boolean', 'nested', 'predefined',
        'object', 'any', 'enum', 'string', 'number', 'function', 'jsx'
    ]
};

const reqConfig = (url) => ({
    name: url,
    request: {
        options: {},
        request: {}
    }
});

const Comp = () => {
    const refreshTimerRef = useRef(null);

    const [details, setDetails] = useState({
        blank: true,
        data: [],
        cache: helpers.random.key(),
        enums: {},
        compTree: {},
        predefined: {},
        raw: {}
    });

    // Safe debounced refresh helper
    const refresh = useCallback(() => {
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
        }
        refreshTimerRef.current = setTimeout(() => {
            setDetails((prev) => ({
                ...prev,
                cache: helpers.random.key()
            }));
        }, 60);
    }, []);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
            }
        };
    }, []);

    // 2. Stable schema builder instance (Initialized ONCE per lifecycle)
    const builder = useMemo(() => {
        return helpers.json.schema.builder.init('props', {
            utils: {
                keyRegex: null,
                dataType: TYPES,
                dataTypeFlags: {
                    array: [],
                    object: ['nested', 'compProps', 'predefined', 'enum', 'asEditorObject']
                },
                keysmap: {
                    arrayChilds: 'sandeep'
                }
            },
            callbacks: {
                onNodeCreate: (arg) => {
                    if (arg?.__) {
                        arg.__.metas = parser.data.getBaseMetas(arg.__.key, arg.__, {});
                    }
                    return arg;
                },
                onNodeUpdate: (arg, prev) => {
                    if (arg?.__) {
                        arg.__.metas = parser.data.getBaseMetas(arg.__.key, arg.__, {});
                    }
                    refresh();
                    return arg;
                }
            }
        });
    }, [refresh]);

    // 3. Memoized configs passed to node layouts
    const configs = useMemo(() => ({
        types: TYPES,
        enums: details.enums || {},
        compTree: details.compTree || {},
        predefined: details.predefined || {}
    }), [details.enums, details.compTree, details.predefined]);

    // API Data Response Handlers
    const onPropResponse = useCallback((resp) => {
        const propsData = helpers.json.get(resp, 'propsDetails.props', {});
        const parsedData = parser.data.init(propsData, PARSER_CONFIGS);

        setDetails((prev) => ({
            ...prev,
            blank: false,
            cache: helpers.random.key(),
            enums: helpers.json.get(resp, 'enums', {}),
            raw: helpers.json.get(resp, 'propsDetails', {}),
            compTree: helpers.json.get(resp, 'compTree', {}),
            predefined: helpers.json.get(resp, 'predefined', {}),
            data: parsedData
        }));
    }, []);

    const onResp = useCallback((resp) => {
        const id = 'c5c54d4a7b97784bee2e9d7d2f2e8e7dd';
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
    helpers.react.hooks.onmount(isMountedRef, useEffect, () => {
        appHelpers.store.get([reqConfig('storybook.components.list.map')], onResp);
    });

    // 4. Optimized onChange callback with single-pass transformation
    const onChange = useCallback((json, valid) => {
        if (!valid) return;

        setDetails((prev) => {
            const prevProps = helpers.json.get(prev, 'raw.props', {});

            console.log(JSON.stringify(prevProps));

            // If output hasn't functionally changed, prevent re-render
            if (helpers.json.is.same(prevProps, json)) {
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

    const jsonTree = useCallback((arg, temp) => (
        <div className='full'>
            {temp.header(arg)}
            {temp.details(arg)}
            {temp.nested(arg)}
        </div>
    ), []);

    const jsonTreeHeader = useCallback((arg) => arg.template.layout(), []);
    const jsonOutput = useCallback((arg) => arg.template(), []);

    const itemHeaderLayout = useCallback((arg, props) => (
        <Header templates={arg} node={props.node} builder={builder} configs={configs} />
    ), [builder, configs]);

    const itemDetailsLayout = useCallback((arg, props) => (
        <Details templates={arg} node={props.node} builder={builder} configs={configs} />
    ), [builder, configs]);

    // Static filter query configuration
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
                    layout: renderLayout,
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
                    }
                }
            }}
        />
    );
};

export default Comp;
