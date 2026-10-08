import helpers from 'ui-helpers';
import JsonBuilder from './';

const Comp = () => {

    /**
        * Initializes the Schema Builder instance and registers it within the internal memory cache.
        * 
        * @description
        * This is the primary entry point for configuring the Schema Builder utility. It instantiates the 
        * builder with the provided configuration, caches it by the specified `instanceName`, and returns 
        * the singleton instance.
        * 
        * To ensure maximum reliability and ease of maintenance, this utility strictly utilizes plain, 
        * standard non-class functional exports rather than dynamic class constructors.
        * 
        * ### Caching & Singleton Behavior
        * - If an instance with the given `instanceName` already exists in memory, the **previously 
        *   initialized instance is returned** instead of creating a new one. This prevents duplicate 
        *   configurations and maintains a single source of truth.
        * - If no instance exists under that name, a new instance is created, cached, and returned.
        * 
        * @example
        * // Initializing a new builder instance named 'props'
        * const builderInstance = schema.builder.init('props', {
        *   utils: {
        *     // RegExp to validate allowed characters/format for schema keys
        *     keyRegex: /^[a-zA-Z_][a-zA-Z0-9_]*$/, 
        * 
        *     // All supported data types available within the editor
        *     dataType: [
        *       'any', 'array', 'string', 'number', 'boolean', 'object', 
        *       'function', 'enum', 'jsx', 'nested', 'compProps', 'predefined'
        *     ],
        * 
        *     // Maps custom or alternate data types to their base structural types
        *     dataTypeFlags: {
        *       array: ['array', 'list'],   // Types treated as arrays (e.g., list, collection)
        *       object: ['object', 'shape'] // Types treated as objects (e.g., nested, shape)
        *     },
        * 
        *     // Maps internal schema keys to custom property names
        *     keysmap: {
        *       arrayChilds: 'sandeep'      // Identifies which property holds child nodes (default: 'childs')
        *     }
        *   },
        *   callbacks: {
        *     // Invoked immediately after a new schema node is created
        *     onNodeCreate: (node) => {
        *       console.log('Node Created:', node);
        *       return node;
        *     },
        * 
        *     // Invoked immediately after an existing schema node is updated
        *     onNodeUpdate: (updatedNode, previousNode) => {
        *       console.log('Node Updated from:', previousNode, 'to:', updatedNode);
        *       return updatedNode;
        *     }
        *   }
        * });
        * 
        * // Retrieving the already-cached 'props' instance elsewhere in your app
        * const sameInstance = schema.builder.init('props', {}); 
        * console.log(builderInstance === sameInstance); // true
        * 
        * @param {string} instanceName - The unique identifier used to register and cache the builder instance in memory.
        * @param {Object} config - The configuration object used to customize and scale the Schema Builder.
        * @param {Object} [config.utils] - Utility configurations including validation and data-type mapping.
        * @param {RegExp|null} [config.utils.keyRegex=null] - Regular expression used to validate schema node keys.
        * @param {string[]} [config.utils.dataType] - List of all allowable data types in the schema editor.
        * @param {Object} [config.utils.dataTypeFlags] - Flag mappings to identify structural behaviors of custom types.
        * @param {string[]} [config.utils.dataTypeFlags.array] - Custom types that should behave structurally as arrays.
        * @param {string[]} [config.utils.dataTypeFlags.object] - Custom types that should behave structurally as objects.
        * @param {Object} [config.utils.keysmap] - Property key mapping rules.
        * @param {string} [config.utils.keysmap.arrayChilds='childs'] - Property key used to identify child nodes.
        * @param {Object} [config.utils.callbacks] - Event interceptor callbacks.
        * @param {Function} [config.utils.callbacks.onNodeCreate] - Callback triggered upon node creation. Receives the new node.
        * @param {Function} [config.utils.callbacks.onNodeUpdate] - Callback triggered upon node updates. Receives `(updatedNode, previousNode)`.
        * @returns {Object} The cached or newly initialized Schema Builder instance containing all pre-built functionalities.
    */

    const builder = helpers.json.schema.builder.init('props', {
        utils:{
            keyRegex:null,
            dataType:['any', 'array', 'string', 'number', 'boolean', 'object', 'function', 'enum', 'jsx', 'nested', 'compProps', 'predefined'],
            dataTypeFlags:{
                array:['array'],
                object:['object']
            },
            keysmap:{
                arrayChilds:'sandeep'
            } 
        },
        callbacks:{
            onNodeCreate:(arg) => {
                return arg;
            },
            onNodeUpdate:(arg, prev) => {
                return arg;
            }
        }
    });

    const data = [
        builder.createNode('userIduser', 'number', {
            __:{
                editing:false,
                expanded:true,
                metas:[{
                    id:'sss', key:'sandeep', value:'kundu'     
                }, {
                    id:'ssssls', key:'required', value:false
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

    const render = (arg) => {
        return (
            <div className='full bxs grid-wrapper grid-layout-2 pd-20'>
                <div className='grid pd-r10 bxs'>
                    {arg.jsonTree()}
                </div>
                <div className='grid pd-l10 bxs'>
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
        return arg.layout.ui();
    }

    const itemDetailsLayout = (arg, props) => {
        return arg.layout.ui();

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