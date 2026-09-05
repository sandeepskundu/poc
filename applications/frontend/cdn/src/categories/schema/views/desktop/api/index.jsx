import React from 'react';
import Comp from './comp';
import Form from './form';
import Accordion from 'aio-global-ui/molecules/accordion';
import SchemaEditor from 'aio-app-ui-templates/schema-editor';
import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';

const compProps = {
    componentsList:{
        "atoms":{
            accordion:(props) => {
                return <Accordion {...props} />
            }
        }
    },
    componentProps:{
        "form":{
            "kundu":{
                "name":{
                    "value":"ksskskks"
                }
            }
        },
        "appMenuDs":{
            wrapperDs:{
                "css":{
                    "class":{}
                }
            },
            labelDs:{
                "css":{
                    "class":{
                        "family":'sb',
                        "fontsize":'md',
                        "padding":{}
                    },
                    "flags":{
                        "animation":"anim"
                    }
                }
            }
        }
    },
    schema:{
        0:{
            "type":"html", // HTML/JSX
            "name":"div",
            "content":"",
            "propsMap":{
                "attrs":"kundu",
                "dataAttrs":"vedant",
                "ds":"sandeep.kumar.kundu"
            },
            "props":{
                "attrs":{},
                "dataAttrs":{},
                "ds":{
                    "css":{
                        "class":{
                        "padding":{
                            1:32,
                            2:24,
                            3:0,
                            4:24
                        }
                    }
                    }
                },
            },
            "childs":{
                "0":{
                    "type":"html", // HTML/JSX
                    "name":"img",
                    "content":"",
                    "props":{
                        "attrs":{
                            "title":"sandeep kundu",
                            "src":"http://localhost:1300/cdn/statics/images/brand/logo.svg"
                        },
                    }
                },
                "1":{
                    "type":"jsx", // HTML/JSX
                    "name":"atoms.accordion",
                    "content":"",
                    "dataPropsMap":{
                        "validations":"form.kundu"
                    },
                    "dataProps":{
                        list:[
                            {
                                "label":"Applications",
                                "attrs":{},
                                "_childs":{
                                    "component":"",
                                    "details":{

                                    }
                                },
                                content:"This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content."
                            }, {
                                "label":"Link item - 2",
                                "attrs":{},
                                "content":"This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content."
                            }
                        ]
                    },
                    "propsMap":{
                        "labelDs":"appMenuDs.labelDs",
                        "wrapperDs":"appMenuDs.wrapperDs"
                    }
                }
            }
        }
    }
}

const pschema = {
    "collection":{
        "name":"CollectionsSchemas",
        "id":"6738829afbe779c7746626aa",
        "dbId":"6738829afbe779c7746626aa",
        "configs":{
            "d":"s"
        }
    },
    "schema":{
        "details":{
            "type":"nested",
            "schema":{
                "kundu":{
                    "type":"nested",
                    "schema":{
                        "fn":{
                            "type":'string'
                        },
                        "mn":{
                            "type":"nested",
                            "schema":{
                                "k":{
                                    "type":'string'
                                }
                            }
                        }
                    }
                },
                "mapId":{
                    "kundu":"sss",
                    "type":'objectId',
                    "configs":{}
                },
                "name":{
                    "type":'string',
                    "configs":{}
                },
                "type":{
                    "type":'string',
                    "configs":{
                        "mongodb":{
                            //"enum":['CONTROLLER', 'VERSION', 'ACTION', 'METHOD', 'JOB']
                            "enum":{
                                "type":"STATIC"
                            }
                        }
                    }
                }
            }
        }
    }
}

const psConfig = {
    enums:{
        types:{
            0:{
                'id':"STATIC",
                'label':"Static"
            },
            2:{
                'id':'DYNAMIC',
                'label':'Dynamic'
            }
        }
    },
    match:{
        types:{
            0:{
                'id':"STATIC",
                'label':"Static"
            },
            2:{
                'id':'DYNAMIC',
                'label':'Dynamic'
            }
        }
    },
    boolean:{
        options:{
            0:{
                'id':true,
                'label':"True"
            },
            2:{
                'id':false,
                'label':'False'
            }
        }
    },
    switch:{
        options:{
            0:{
                'id':1,
                'label':'Switch on'
            },
            1:{
                'id':0,
                'label':"Switch off"
            },
        }
    },
    schemas:{
        actions:{
            0:{
                "id":"fetch",
                "label":"View"
            },
            1:{
                "id":"update",
                "label":"Update"
            },
            2:{
                "id":"create",
                "label":"Create"
            },
            3:{
                "id":"delete",
                "label":"Delete"
            }
        },
        types:{
            0:{
                "id":"nested",
                "label":"Nested"
            },
            1:{
                "id":"email",
                "label":"Email"
            },
            2:{
                "id":"date",
                "label":"Date"
            },
            3:{
                "id":"object",
                "label":"Object"
            },
            4:{
                "id":"switch",
                "label":"Switch"
            },
            5:{
                "id":"string",
                "label":"String"
            },
            6:{
                'id':"number",
                "label":"Number"
            },
            7:{
                'id':"boolean",
                "label":"Boolean"
            },
            8:{
                'id':"objectId",
                "label":"Object Id"
            },
            9:{
                'id':"paragraph",
                "label":"Paragraph"
            },
            10:{
                "id":"stringKey",
                "label":"String as key"
            }
        }
    }
}

const DESKTOPSRP = (propsny) => {

    const com = () => {
        const t = () => {
            return  <Comp {...compProps} /> ///<></>//helpers.element.jsx.template.create(, , )
        }

        return (
            <>
                <AppPageWithMenu 
                    appMenu={() => {
                        return (
                            <>
                                {/*--t()--*/}
                            </>
                        )
                    }}

                    appRightMenu={() => {
                        return (
                            <></>
                        )
                    }}

                    appPage={() => {
                        return (
                            <>
                                <div className='full bxs'>
                                    <SchemaEditor 
                                        configs={psConfig}
                                    />
                                </div>
                            </>
                        )
                    }}
                />
            </>
        )
    }

    return (
        <>
            <div className='full pd-tb20'>
                {com()}
            </div>
        </>
    )
}

export default DESKTOPSRP;