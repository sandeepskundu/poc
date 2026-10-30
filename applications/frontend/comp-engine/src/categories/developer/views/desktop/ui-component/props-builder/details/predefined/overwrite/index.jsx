import {useMemo} from 'react';
import parser from './parser';
import Header from './header';
import Details from './details';
import helpers from 'ui-helpers';
import JsonBuilder from './../../../../json-builder';

const types = ['any', 'string', 'number', 'boolean', 'object', 'function', 'enum', 'jsx', 'nested', 'predefined'];
const sortOrder = ['boolean', 'nested', 'object', 'any', 'enum', 'boolean', 'string', 'number', 'function', 'jsx', 'predefined'];

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const id = useMemo(() => helpers.random.key(), []);
    const builder = useMemo(() => helpers.json.schema.builder.init(id, {
        id:id,
        utils:{
            keyRegex:null,
            dataType:types,
            dataTypeFlags:{
                array:[],
                object:['nested', '_enum', 'predefined', 'asEditorObject']
            },
            keysmap:{} 
        },
        callbacks:{
            onNodeCreate:(arg) => {
                return arg;
            },
            onNodeUpdate:(arg, prev) => {
                return arg;
            }
        }
    }), [id]);

    const pdmap = (() => {
        let map = helpers.json.get(props, 'mapping', '');
            map = map.replace(/.index$/, '');
            map = map.split('.');
            map.push('index');
        return map.join('.');          
    })();

    const predefined = useMemo(() => {
        return helpers.json.copy(helpers.json.get(props, `configs.predefined.${pdmap}`, {}));
    }, [props.configs, pdmap]);

    const data = useMemo(() => {
        let baseCopy = helpers.json.copy(predefined);
        let overwriteCopy = helpers.json.copy(helpers.json.get(props, 'data.value', {}));
        let merged = helpers.json.merge(baseCopy, overwriteCopy);

        return parser.init(merged, {
            sortPath:'__.type',
            uitls:props.configs,
            sortOrder:sortOrder
        });
    }, [predefined]);

    const getConfigs = () => {
        return {
            types:types,
            enums:helpers.json.get(props, 'configs.enums', {}),
            compTree:helpers.json.get(props, 'configs.compTree', {}),
            predefined:helpers.json.get(props, 'configs.predefined', {})
        }
    }

    const itemHeaderLayout = (arg, props) => {
        return <Header templates={arg} node={props.node} builder={builder} configs={getConfigs()} />
    }

    const itemDetailsLayout = (arg, props) => {
        return <Details templates={arg} node={props.node} builder={builder} configs={getConfigs()} />
    }

    const jsonTree = (arg, temp) => {
        return (
            <div className='full bxs'>
                {temp.header(arg)}
                {temp.details(arg)}
                {temp.nested(arg)}
            </div>
        )
    }

    const header = (arg) => {
        return <h3 className="bxs txt-xs fm-md flx-full pd-rl10 pd-tb8 bg-c00103">Overwrite</h3>
    }

    const render = (arg) => {
        return (
            <div className='full bxs'>
                {arg.jsonTree()}
                <div className="full hide">
                     {arg.jsonOutput()}
                </div>
            </div>
        )
    }

    return (
        <JsonBuilder
            data={data}
            builder={builder}
            templates={{
                editor:{
                    layout:render,
                    jsonTree:jsonTree,
                    jsonTreeHeader:header,
                    //jsonOutput:jsonOutput
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
            callbacks={{
                onJsonTreeChange:(json, valid) => {
                    let basePredefined = helpers.json.copy(predefined);
                    let d = helpers.json.deleteAllNestedKeyByVal(helpers.json.copy(json), 'type', 'asEditorObject');
                        d = helpers.json.removeWrapperKeys(d, {stripKeys:'___blank___', removePrimitive:true});
                        if (d && d.___ && basePredefined && basePredefined.___) {
                            helpers.json.removeDuplicate(d.___, basePredefined.___);
                        }
                        props.onChange(helpers.json.removeDuplicate(d, basePredefined));
                }
            }}
            configs={{
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
            }}
        />
    )
}

export default Comp;