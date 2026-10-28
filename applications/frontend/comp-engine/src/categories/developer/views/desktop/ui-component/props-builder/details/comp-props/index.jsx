import From from './from';
import Mapping from './mapping';
import helpers from 'ui-helpers';
import Common from './../common';
import Editor from './../../editor';
import {useState, useRef} from 'react';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    
    const rawData = useRef(null);
    const node = props.node || {};
    const templates = props.templates || {};
    const rootNode = helpers.json.get(node, '__.root.__', {});
    const details = helpers.json.get(node, '__.details.__', {});
    const [metas, setMetas] = useState(helpers.json.get(details, 'metaMap', {}));
    const isroot = helpers.json.get(props, 'editorProps.editorConfigs.utils.isRoot');

    const updateMetas = (type, value) => {
        let m = helpers.json.copy(metas);
            m[type].value = value;
            setMetas(m);
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
                            templates.item.meta.item.actions.updateByKey(rootNode.asRootMeta.id, 'value', checked, rootNode.id);
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
                onChange={(value) => {update(helpers.json.get(metas, 'from.id', ''), 'value', value)}}
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
                                [helpers.json.get(metas, 'overwirte.id', '')]:{
                                    value:{}
                                }
                            }, details.id);
                            updateMetas('overwirte', {});
                            updateMetas('mapping', value);
                        }}
                    />
                </div> 
            </div>
        )
    }

    const onDataChange = (arg) => {
        arg = helpers.json.removeDuplicate(arg, rawData.current);
        update(helpers.json.get(metas, 'overwirte.id', ''), 'value', arg);
        updateMetas('overwirte', arg);
    }

    const onRawChange = (arg) => {
        rawData.current = arg;
    }

    const editor = (onChange, overwrite) => {
        let ov = helpers.json.merge(props.editorProps, {
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

    return (
        <div className='full'>
            <div className='hide'>
                {editor(onRawChange)}
            </div>
            <Common {...props} />
            <div className='full bxs pd-rl16'>{asroot(metas.asroot)}</div>
            {compProps()}
            {editor(onDataChange, helpers.json.get(metas, 'overwirte.value', {}))}
        </div>
    );
}

export default Comp;