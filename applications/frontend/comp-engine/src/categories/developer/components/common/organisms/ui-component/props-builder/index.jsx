import Editor from './editor';
import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

const TYPES = ['any', 'string', 'number', 'boolean', 'object', 'function', 'enum', 'jsx', 'nested', 'compProps', 'predefined'];
const PARSER_CONFIGS = {
    sortPath: '__.type',
    sortOrder: ['compProps', 'boolean', 'nested', 'predefined', 'object', 'any', 'enum', 'string', 'number', 'function', 'jsx']
};

const reqConfig = (url) => ({
    name: url,
    request: {
        options: {},
        request: {}
    }
});

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const compHash = helpers.json.get(_siteProps_, 'router.params.hash', '');

    const [details, setDetails] = useState({
        enums: {},
        blank: true,
        compTree: {},
        predefined: {}
    });

    const onPropResponse = useCallback((resp, compList) => {
        setDetails((prev) => ({
            ...prev,
            blank: false,
            compListMap: compList.components || {},
            enums: helpers.json.get(resp, 'enums', {}),
            compTree: helpers.json.get(resp, 'compTree', {}),
            predefined: helpers.json.get(resp, 'predefined', {}),
            componentMap: helpers.json.get(compList, `components.${compHash}`, '')
        }));
    }, []);

    const onResp = useCallback((resp) => {
        appHelpers.store.get([reqConfig('storybook.ds.enums'), reqConfig('storybook.ds.predefined'), reqConfig('storybook.components.tree')], (res) => {
            onPropResponse(res, resp)
        });
    }, [onPropResponse]);

    helpers.react.hooks.onmount(useRef(false), useEffect, () => { appHelpers.store.get([reqConfig('storybook.components.list.map')], onResp) });

    if (details.blank) {
        return <></>
    }

    const editor = () => {
        return (
            <Editor
                editorDetails={details}
                editorConfigs={{
                    TYPES: TYPES,
                    PARSER_CONFIGS: PARSER_CONFIGS,
                    utils: {
                        isRoot: true,
                        hasRawCompiler: false
                    },
                    callbacks: {
                        onChange: (arg) => {
                            console.log(arg);
                        }
                    },
                    builder: {
                        id: helpers.random.key(),
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
                        }
                    },
                    filtersConfig: {
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
                    }
                }}
            />
        );
    }

    return (
        <>
            {editor()}
        </>
    )
    
};

export default Comp;
