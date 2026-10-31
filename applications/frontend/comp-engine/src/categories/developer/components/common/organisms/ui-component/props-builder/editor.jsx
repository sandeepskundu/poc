import Header from './header';
import parser from './parser';
import Details from './details';
import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import JsonBuilder from 'aio-global-ui/molecules/json-builder';
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const utils = helpers.json.get(props, 'editorConfigs.utils', {});
    const TYPES = helpers.json.get(props, 'editorConfigs.TYPES', []);
    const overwrite = helpers.json.get(props, 'editorDetails.overwrite', {});
    const componentMap = helpers.json.get(props, 'editorDetails.componentMap', '');
    const filterConfigs = helpers.json.get(props, 'editorConfigs.filtersConfig', {});
    const PARSER_CONFIGS = helpers.json.get(props, 'editorConfigs.PARSER_CONFIGS', {});

    const onChangeCb = (() => {
        let cb = helpers.json.get(props, 'editorConfigs.callbacks.onChange', null);

        if(cb && helpers.data.type.is(cb, 'function')){
            return cb;
        };

        return null;
    })()

    const [details, setDetails] = useState({
        raw: {},
        data: [],
        blank: true,
        cache: helpers.random.key()
    });

    const dRef = useRef(details);

    useEffect(() => {
        dRef.current = details;
    }, [details]);

    const builder = useMemo(() => {
        let d = helpers.json.merge(helpers.json.get(props, 'editorConfigs.builder', {}), {
            callbacks: {
                onNodeCreate: (arg) => {
                    return parser.data.onCreate(arg);
                },
                onNodeUpdate: (arg, prev) => {
                    return parser.data.onUpdate(arg, prev, PARSER_CONFIGS);
                }
            }
        });
        return helpers.json.schema.builder.init(d.id, d);
    }, []);

    const configs = useMemo(() => ({
        types:TYPES,
        enums: helpers.json.get(props, 'editorDetails.enums', {}),
        compTree: helpers.json.get(props, 'editorDetails.compTree', {}),
        predefined: helpers.json.get(props, 'editorDetails.predefined', {})
    }), [props.editorDetails.enums, props.editorDetails.compTree, props.editorDetails.predefined]);

    const onPropResponse = useCallback((resp) => {
        let rawDetails = helpers.json.copy(helpers.json.get(resp, 'propsDetails', {}));
        let data = helpers.json.copy(helpers.json.get(rawDetails, 'props', {}));
            data = helpers.json.merge(data, helpers.json.copy(overwrite));
            data = parser.data.init(data, PARSER_CONFIGS);

            setDetails((prev) => ({
                ...prev,
                blank:false,
                data:data,
                raw:rawDetails,
                cache:helpers.random.key()
            }));
    }, []);

    helpers.react.hooks.onmount(useRef(false), useEffect, () => {
        appHelpers.store.get([{
            name: 'storybook.components.props.detailsByMap',
            request: {
                options: {},
                request: {
                    data: {
                        map:componentMap.toLowerCase()
                    }
                }
            }
        }], onPropResponse)
    });

    const onChange = useCallback((json, valid) => {
        if (!valid) {
            return;
        }
    }, []);


    const onOutputChange = (arg) => {
        arg = helpers.json.deleteAllNestedKeyByVal(helpers.json.copy(arg), 'type', 'asEditorObject');
        if (onChangeCb) {
            if(utils.isRoot){
                onChangeCb(arg);
            }else{
                let or = helpers.json.copy(helpers.json.get(dRef, 'current.raw.props', {}));
                let rv = helpers.json.deleteAllNestedKeyByVal(helpers.json.copy(arg), 'type', 'asEditorObject');
                    rv = helpers.json.removeDuplicate(rv, or);
                    onChangeCb(rv);
            }
        }
    };

    const outputParser = (json) => {
        let rval = helpers.json.removeWrapperKeys(json, {stripKeys: '___blank___', removePrimitive: true});
            onOutputChange(rval);
        return rval;
    };

    const layout = (arg) => {
        if(utils.isRoot){
            return (
                <div className='full bxs grid-wrapper grid-layout-2 pd-20'>
                    <div className='grid pd-r8 bxs' key={details.cache}>
                        {arg.jsonTree()}
                    </div>
                    <div className='grid pd-l8 bxs oa'>
                        {arg.jsonOutput(details.cache)}
                    </div>
                </div>
            )
        }else{
            return (
                <div className='full bxs'>
                    <div className='full' key={details.cache}>
                        {arg.jsonTree()}
                    </div>
                    <div className='full hide'>
                        {arg.jsonOutput(details.cache)}
                    </div>
                </div>
            )
        }
    }

    const jsonTreeHeader = (arg) => {
        if(utils.isRoot){
            return arg.template.layout()
        }
    };

    const nested = (arg, temp) => {
        let type = helpers.json.get(arg, 'props.node.__.type');
        let editing = helpers.json.get(arg, 'props.node.__.editing', false);
        let hideHeader = helpers.json.get(arg, 'props.node.__.hideHeader', false);

        if (type != 'predefined' && (editing)) {
            return (
                <div className={hideHeader ? '' : 'full bxs bdr-c00104 bdr-1 bdr-tn bdr-rn bdr-bn'}>
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

    const jsonOutput = useCallback((arg) => arg.template(), []);
    

    const itemHeaderLayout = useCallback((arg, prps) => (
        <Header editorProps={props} templates={arg} node={prps.node} builder={builder} configs={configs} utils={utils} />
    ), [builder, configs]);

    const itemDetailsLayout = useCallback((arg, prps) => (
        <Details editorProps={props} templates={arg} node={prps.node} builder={builder} configs={configs} utils={utils} />
    ), [builder, configs]);

    return (
        <JsonBuilder
            builder={builder}
            data={details.data}
            callbacks={{onChange, outputParser}}
            configs={helpers.json.get(props, 'editorConfigs.layoutConfig', {})}
            filters={filterConfigs}
            templates={{
                editor: {
                    layout,
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
                    nested: {
                        layout: nested
                    }
                }
            }}
        />
    );
};

export default Comp;