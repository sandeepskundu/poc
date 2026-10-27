import Json from './json';
import Editor from './editor';
import Header from './header';
import Output from './output';
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({
        configs:{
            json:{
                editor:{
                    wrapper:{
                        ds:{
                            theme:{
                                colorPairing:{
                                    default:""
                                },
                                background:{
                                    default:"c00101",
                                },
                                text:{
                                    default:"",
                                },
                                border:{
                                    default:"c00104"
                                },
                            },

                            css:{
                                class:{
                                    radius:{
                                        1:8,
                                        2:8
                                    },
                                    padding:{
                                        1:16,
                                        2:16
                                    },
                                    border:1,
                                }
                            }
                        }
                    }
                }
            }
        },
        content:{
            json:{
                editor:{
                    title:'Schema Field Editor'
                }
            }
        },
    }, dprops, helpers);

    const getTemplate = (map) => {
        let rval =  helpers.json.get(props, map, null);

        if(rval && helpers.data.type.is(rval, 'function')){
            return rval;
        }

        return null;   
    }

    const onChangeCb = getTemplate('callbacks.onChange');
    const outputParserCb = getTemplate('callbacks.outputParser');
    const ntemplate = getTemplate('templates.item.nested.layout');
    const editorTemplate = getTemplate('templates.editor.layout');
    const jsonOutput = getTemplate('templates.editor.jsonOutput');
    const onTreeChange = getTemplate('callbacks.onJsonTreeChange');
    const jsonTreeTemplate = getTemplate('templates.editor.jsonTree');
    const jsonTreeHeaderTemplate = getTemplate('templates.editor.jsonTreeHeader'); 

    const nested = (arg, skipExpandedCheck) => {
        if(ntemplate){
            return ntemplate(arg, arg.__.templates.node.nested);
        };

        return (
            <div className='full bxs bdr-c00104 anim' style={{ borderLeftWidth:"2px", borderLeftStyle:'solid' }}>
                <div className='full bdr-1 bdr-tn bdr-bn bdr-rn bdr-c00104 bxs'>
                    {arg.__.templates.node.nested(skipExpandedCheck)}
                </div>
            </div>
        )
    }

    const header = (arg) => {
        return <Header {...arg} templates={helpers.json.get(props, 'templates.item.header', {})} />
    }

    const details = (arg) => {
        return <Editor {...arg} templates={helpers.json.get(props, 'templates.item.details', {})} />
    }

    const tree = (arg) => {
        if(jsonTreeTemplate){
            return jsonTreeTemplate(arg, {
                nested:nested,
                header:header,
                details:details
            });
        };

        return (
            <div className='full'>
                {header(arg)}
                {details(arg)}
                {nested(arg)}
            </div>
        )
    }

    const treeHeader = (arg) => {
        if(jsonTreeHeaderTemplate){
            return jsonTreeHeaderTemplate(arg);
        }else{
            return arg.template.layout();
        }
    }

    const json = () => {
        return (
            <Json
                {...props}
                data={props.data}
                builder={props.builder}
                templates={{
                    tree:(arg) => {
                        return tree(arg);
                    },
                    header:(arg) => {
                        return treeHeader(arg);
                    }
                }}
            />
        )
    }

    const onChange = (json, valid) => {
        if(onChangeCb){
            onChangeCb(json, valid)
        }
    }

    const outputParser = (json, valid) => {
        if(outputParserCb){
            return outputParserCb(json, valid);
        }else{
            return json;
        }
    }

    const output = () => {
        if(jsonOutput){
            return jsonOutput({
                template:() => {
                    return <Output builder={props.builder} onChange={onChange} outputParser={outputParser}  />;
                }
            })
        }
        return <Output builder={props.builder} onChange={onTreeChange} />
    }

    const ui = () => {
        if (editorTemplate) {
            return editorTemplate({
                jsonTree:json,
                jsonOutput:output
            })
        }
    }

    return ui()
}

export default Comp;