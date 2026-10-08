import Header from './header';
import parser from './helpers';
import Details from './details';
import helpers from 'ui-helpers';
import JsonBuilder from './../json-builder';

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
                arg.__.metas = parser.getBaseMetas(arg.__.key, arg.__, {});
                return arg;
            },
            onNodeUpdate:(arg, prev) => {
                arg.__.metas = parser.getBaseMetas(arg.__.key, arg.__, {});
                return arg;
            }
        }
    });

    const nodedata = parser.init({
        jsx1:null,
        jsx:{
            dvalue:'',
            type:"jsx",
            description:""
        },
        ksksk:{
            dvalue:{},
            type:'object',
            description:''
        },
        boolean:{
            dvalue:true,
            type:'boolean',
            description:''
        },
        enum:{
            type:"enum",
            dvalue:'right',
            description:"",
            ___:{
                enum:{
                    from:'statics',
                    mapping:"slideDrawer.directions",
                    options:'s|a'
                }
            }
        },
        predefined:{
            type:'predefined',
            ___:{
                predefined:{
                    from:'statics',
                    mapping:'ds.preset',
                    overwirte:{
                        theme:null
                    }
                }
            }
        },
        compProps:{
            type:'compProps',
            description:"",
            ___:{
                asroot:true,
                compProps:{
                    from:'statics',
                    mapping:'raw/atoms/icons',
                    overwirte:{
                        config:{
                            a:{
                                a:{
                                    name:'sandeep'
                                }
                            }
                        }
                    }
                }
            }
        },
        compProps1:{
            type:'compProps',
            description:"",
            ___:{
                asroot:true,
                compProps:{
                    from:'statics',
                    mapping:'raw/atoms/icons',
                    overwirte:{
                        config:{
                            a:{
                                a:{
                                    name:'sandeep'
                                }
                            }
                        }
                    }
                }
            }
        },
        any:{
            dvalue:'',
            type:"any",
            description:""
        },
        string:{
            dvalue:'',
            type:"string",
            description:""
        },
        number:{
            dvalue:100,
            type:"number",
            description:""
        },
        function:{
            dvalue:null,
            type:'function',
            description:""
        },
        nested:{
            type:'nested',
            ___:{
                nested:{
                    sandeep:{
                        type:'string',
                    },
                    compProps1:{
            type:'compProps',
            description:"",
            ___:{
                asroot:true,
                compProps:{
                    from:'statics',
                    mapping:'raw/atoms/icons',
                    overwirte:{
                        config:{
                            a:{
                                a:{
                                    name:'sandeep'
                                }
                            }
                        }
                    }
                }
            }
        },
                }
            }
        }
    }, {
        sortPath:'__.type',
        sortOrder:['string', 'jsx', 'boolean', 'object', 'any', 'compProps', 'nested',  'predefined', 'enum',  'number', 'function'],
        _sortOrder:['boolean', 'compProps', 'nested',  'predefined', 'object', 'any', 'enum', 'boolean', 'string', 'number', 'function', 'jsx']
    });

    const data = nodedata || [
        builder.createNode('userIduser', 'number', {
            __:{
                editing:false,
                expanded:true,
                metas:[{
                    id:'sss', key:'sandeep', value:'kundu'     
                }, {
                    id:'ssssls', key:'required', value:false
                }, {
                    id:'lskslksl', key:'description', value:'description text'
                }]
            }}), {
            ...builder.createNode('userConfig', 'object', {
                __:{
                    editing:false,
                    expanded:true,
                    children: [
                        builder.createNode('theme_mode_for_user_userId_', 'string', {
                            __:{
                                editing:true,
                                expanded:false,
                                metas:[{
                                    id:'sss', key:'sandeep', value:'kundu'
                                }, {
                                    id:'ssssls', key:'required', value:false
                                }]
                            }
                        }),
                    ]
                }
            })
        },
    ]

    const propsConfigs = {
        types:types
    }

    const render = (arg) => {
        return (
            <div className='full bxs grid-wrapper grid-layout-2 pd-20'>
                <div className='grid pd-r10 bxs'>
                    {arg.jsonTree()}
                </div>
                <div className='grid pd-l10 bxs oa'>
                    {arg.jsonOutput()}
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

        return <Header templates={arg} node={props.node} builder={builder} configs={propsConfigs} />
    }

    const itemDetailsLayout = (arg, props) => {
        return <Details templates={arg} node={props.node} builder={builder} configs={propsConfigs} />
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

    return (
        <JsonBuilder
            data={data}
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

export default Comp;