import From from './from';
import Mapping from './mapping';
import helpers from 'ui-helpers';
import Common from './../common';
import Editor from './../../editor';
import {useState, useRef, useEffect} from 'react';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const getLiveMetaMap = (details) => {
    const metaList = helpers.json.get(details, 'metas', []);

    if (Array.isArray(metaList) && metaList.length > 0) {
        const map = {};

        for (let i = 0; i < metaList.length; i++) {
            const item = metaList[i];

            if (item && item.key) {
                map[item.key] = item;
            }
        }

        return map;
    }

    return helpers.json.copy(helpers.json.get(details, 'metaMap', {}));
};

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    
    const rawData = useRef(null);
    const node = props.node || {};
    const templates = props.templates || {};
    const rootNode = helpers.json.get(node, '__.children.0.__', helpers.json.get(node, '__.root.__', {}));
    const details = helpers.json.get(node, '__.children.0.__.children.0.__', helpers.json.get(node, '__.details.__', {}));
    const [metas, setMetas] = useState(() => getLiveMetaMap(details));

    const mapping = helpers.json.get(metas, 'mapping.value', '');
    const isroot = helpers.json.get(props, 'editorProps.editorConfigs.utils.isRoot');

    useEffect(() => {
        setMetas(getLiveMetaMap(details));
    }, [details.metas]);

    const asRootMeta = (() => {
        const rootMetas = helpers.json.get(rootNode, 'metas', []);
        const found = Array.isArray(rootMetas) ? rootMetas.find((item) => item && item.key === 'asroot') : null;
        return found || helpers.json.get(rootNode, 'asRootMeta', {});
    })();

    const updateMetas = (type, value) => {
        setMetas((prev) => {
            let m = helpers.json.copy(prev);
            if (m[type]) {
                m[type].value = value;
            }
            return m;
        });
    }
    
    const update = (id, field, value) => {
        templates.item.meta.item.actions.updateByKey(id, field, value, details.id)
    }

    const asroot = (arg) => {
        return (
            <Toggle
                label={{
                    text: "Set as root"
                }}
                checkbox={{
                    checked:helpers.json.get(arg, 'value', false)
                }}
                callback={{
                    input: {
                        onChange: (checked, b, c) => {
                            templates.item.meta.item.actions.updateByKey(asRootMeta.id, 'value', checked, rootNode.id);
                        }
                    }
                }}
            />
        )
    }

    const from = () => {
        return (
            <From
                selected={helpers.json.get(metas, 'from.value', '')}
                onChange={(value) => {
                    update(helpers.json.get(metas, 'from.id', ''), 'value', value);
                    updateMetas('from', value);
                }}
            />
        )
    }

    const compProps = () => {
        return (
            <div className='full bxs pd-16'>
                <div className='full bxs pd-t8'>
                    {from()}
                    <Mapping
                        configs={props.configs}
                        data={helpers.json.get(metas, 'mapping', {})} 
                        onChange={(value) => {
                            templates.item.meta.item.actions.updateMetaDetailsByKey({
                                [helpers.json.get(metas, 'mapping.id', '')]:{
                                    value:value 
                                },
                                [helpers.json.get(metas, 'overwrite.id', '')]:{
                                    value:{}
                                }
                            }, details.id);
                            updateMetas('overwrite', {});
                            updateMetas('mapping', value);
                        }}
                    />
                </div> 
            </div>
        )
    }

    const onDataChange = (arg) => {
        arg = helpers.json.removeDuplicate(helpers.json.copy(arg), helpers.json.copy(rawData.current || {}));
        update(helpers.json.get(metas, 'overwrite.id', ''), 'value', arg);
        updateMetas('overwrite', arg);
    }

    const onRawChange = (arg) => {
        rawData.current = helpers.json.copy(arg);
    }

    const editor = (onChange, overwrite) => {
        if(mapping){
            let ov = helpers.json.merge(helpers.json.copy(props.editorProps || {}), {
                editorConfigs:{
                    utils:{
                        isRoot:false
                    },
                    builder: {
                        id:helpers.random.key()
                    },
                    callbacks:{
                        onChange:(arg) => {
                            onChange(arg);
                        }
                    },
                    layoutConfig:{
                        json:{
                            editor:{
                                wrapper:{
                                    ds:{
                                        theme:null,
                                        css:{
                                            class:{
                                                border:null,
                                                radius:null,
                                                padding:null,
                                                margin:{
                                                    1:0,
                                                    2:0,
                                                    3:0
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                editorDetails:{
                    overwrite:overwrite || {},
                    componentMap:helpers.json.get(metas, 'mapping.value', '')
                }
            });

            return <Editor {...ov} key={helpers.json.get(metas, 'mapping.value', '')} />
        }
    }

    return (
        <div className='full'>
            <div className='hide'>
                {editor(onRawChange)}
            </div>
            <Common {...props} />
            <div className='full bxs pd-rl16'>{asroot(asRootMeta)}</div>
            {compProps()}
            {editor(onDataChange, helpers.json.get(metas, 'overwrite.value', {}))}
        </div>
    );
}

export default Comp;