import helpers from 'ui-helpers';
import {createElement} from 'react';
import ContentRow from 'aio-global-ui/atoms/content-row';

/*--
const _props = {
    childs:{
        "end":"",
        "after":"",
        "start":"",
        "before":"",
        "center":""
    },
    dsTheme:{
        "end":{},
        "after":{},
        "start":{},
        "before":{},
        "center":{},
        "wrapper":{}
    },
    config:{
        "end":{},
        "after":{},
        "start":{},
        "before":{},
        "center":{},
        "wrapper":{}
    },
    callbacks:{
        onBlur:null,
        onClick:null,
        onFocus:null,
        onKeyUp:null,
        dsTheme:null,
        onKeyDown:null,
        onDragStart:null,
        onMouseDown:null,
        onPointerUp:null,
        onPointerDown:null,
        onPointerEnter:null,
        onPointerLeave:null,
        "beforeRender":null
	}
}--*/

const Comp = (dprops) => {
	const id = helpers.random.uuid();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const defaults = (() => {
        return helpers.json.merge({
            dsTheme:{
                wrapper:{
                    font__d__size:'sm',
                    className:'item-list bdr-1 bxs',
                }
            },
            config:{
                "center":{},
                "wrapper":{
                    "markup":{
                        "element":"li"
                    },
                    "ds":{
                        "css":{
                            "class":{
                                "borderNone":{
                                    1:true,
                                    2:true,
                                    3:false,
                                    4:true
                                },
                                "padding":{
                                    1:8,
                                    2:8
                                }
                            }
                        }
                    }
                },
                "start":{
                    "ds":{
                        "css":{
                            "class":{
                                "padding":{
                                    1:0,
                                    2:8,
                                    3:0,
                                    4:0
                                }
                            }
                        }
                    }
                },
                "before":{
                    "ds":{
                        "css":{
                            "class":{
                                "padding":{
                                    1:0,
                                    2:8,
                                    3:0,
                                    4:0
                                }
                            }
                        }
                    }
                },
                "center":{
                    "ds":{
                        "css":{
                            "class":{
                                "padding":{}
                            }
                        }
                    }
                },
                "after":{
                    "ds":{
                        "css":{
                            "class":{
                                "padding":{
                                    1:0,
                                    2:0,
                                    3:0,
                                    4:8
                                }
                            }
                        }
                    }
                },
                "end":{
                    "ds":{
                        "css":{
                            "class":{
                                "padding":{
                                    1:0,
                                    2:0,
                                    3:0,
                                    4:8
                                }
                            }
                        }
                    }
                },
            }
        }, helpers.json.get(props, 'defaults', {}))
    })();

    const mergeDs = (map, type) => {
        if(type === 'ds'){
            return helpers.element.jsx.props.merge.ds(props, map, defaults);
        }else{
            return helpers.element.jsx.props.merge.predefined(props, map, defaults);
        }
    }

    const ui = () => {
        if(props.children){
            return props.children;
        }else{
            
            return (
                <ContentRow
                    childs={{...props.childs}}
                    _details={helpers.json.get(props, '_details', {})}
                    callbacks={helpers.json.get(props, 'callbacks', {})}
                    dsTheme={{
                        end:mergeDs('end'),
                        after:mergeDs('after'),
                        start:mergeDs('start'),
                        center:mergeDs('center'),
                        before:mergeDs('before'),
                        wrapper:mergeDs('wrapper'),
                    }}
                    config={{
                        end:mergeDs('end', 'ds'),
                        start:mergeDs('start', 'ds'),
                        after:mergeDs('after', 'ds'),
                        center:mergeDs('center', 'ds'),
                        before:mergeDs('before', 'ds'),
                        wrapper:mergeDs('wrapper', 'ds')
                    }}
                />
            )
        }
    }

    return ui();
};

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;