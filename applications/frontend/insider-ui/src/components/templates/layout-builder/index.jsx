import ChildItems from './childs';
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';

const lschema = {
    "0":{
        "type":"html", // HTML/JSX
        "name":"div",
        "content":{
            map:'',
            value:'Header html'
        },
        "cmsDetails":{
            id:"",
            name:'Header'
        },
        "props":{
            "map":{
                "attrs":"kundu",
                "dataAttrs":"vedant",
                "ds":"sandeep.kumar.kundu"
            },
            "data":{
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
            }
        },
    },
    "1":{
        "type":"html", // HTML/JSX
        "name":"div",
        "content":{
            map:'',
            value:'Body html'
        },
        "cmsDetails":{
            id:"",
            name:'Body'
        },
        "props":{
            "map":{
                "attrs":"kundu",
                "dataAttrs":"vedant",
                "ds":"sandeep.kumar.kundu"
            },
            "data":{
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
            }
        },
        "childs":{}
    },
    "2":{
        "type":"html", // HTML/JSX
        "name":"div",
        "content":{
            map:'',
            value:''
        },
        "cmsDetails":{
            id:"",
            name:'Footer'
        },
        "props":{
            "map":{
                "attrs":"kundu",
                "dataAttrs":"vedant",
                "ds":"sandeep.kumar.kundu"
            },
            "data":{
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
            }
        },
        "childs":{
            0:{
                "type":"html", // HTML/JSX
                "name":"div",
                "content":{
                    map:'',
                    value:''
                },
                "cmsDetails":{
                    id:"",
                    name:'Footer > 0'
                },
                "childs":{
                    0:{
                        "type":"html", // HTML/JSX
                        "name":"div",
                        "content":{
                            map:'',
                            value:'Footer > 0 > 0'
                        },
                        "cmsDetails":{
                            id:"",
                            name:'Footer > 0 > 0' 
                        },
                    },
                    1:{
                        "type":"html", // HTML/JSX
                        "name":"div",
                        "content":{
                            map:'',
                            value:'Footer > 0 > 1'
                        },
                        "cmsDetails":{
                            id:"",
                            name:'Footer > 0 > 1' 
                        },
                    },
                    2:{
                        "type":"html", // HTML/JSX
                        "name":"div",
                        "content":{
                            map:'',
                            value:'Footer > 0 > 2'
                        },
                        "cmsDetails":{
                            id:"",
                            name:'Footer > 0 > 2' 
                        },
                    },
                    3:{
                        "type":"html", // HTML/JSX
                        "name":"div",
                        "content":{
                            map:'',
                            value:'Footer > 0 > 3'
                        },
                        "cmsDetails":{
                            id:"",
                            name:'Footer > 0 > 3' 
                        },
                    },
                    4:{
                        "type":"html", // HTML/JSX
                        "name":"div",
                        "content":{
                            map:'',
                            value:'Footer > 0 > 4'
                        },
                        "cmsDetails":{
                            id:"",
                            name:'Footer > 0 > 4' 
                        },
                    }
                }
            }
        }
    }
}

const LayoutBuilder = (dprops) => {
    const props = helpers.element.jsx.props.define({
        data:{},
        compProps:{},
        layout:lschema,
    }, dprops);

    const [selected, setSelected] = useState([]);
    const [layout, setLayout] = useState(props.layout || {});
    const [modified, setModified] = useState(props.layout || {});
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    useEffect(() => {
        if(fristRender){
            setLayout(props.layout);
            setModified(props.layout);
        }
    }, [props.layout]);

    useEffect(() => {
        console.log(modified);
    }, [modified])

    const list = () => {
        const rv = [];
        const li = helpers.json.length(layout);
        if(li > 0){
            for(const a in layout){
                let item = layout[a]
                    rv.push(item);
            }
        };

        return rv;
    }

    const onChildView = (arg, index) => {
        let sel = [...selected];
            sel.push(index);
            setSelected(sel);
            setLayout(arg.childs || {});
    }

    const onViewParent = (arg) => {
        if(arg && arg.length > 0){
            let map = arg.join('.');
            let ld = helpers.json.val(modified, `${map}.childs`, {});
                setLayout(ld);
                setSelected(arg);
        }else{
            setSelected([]);
            setLayout(modified || {});
        }
    }

    const onEditProps = (props, selmap, type) => {
        let d = helpers.json.copy(modified);

        if(selmap && selmap.length > 0){
            let m = [];

                if(type){
                    for(const a in selmap){
                        m.push(selmap[a]);
                        if(a === selmap.length-1){
                        m.push(type);
                        }else{
                            m.push('childs');
                        }
                    }
                }

                d = helpers.json.set(d, m.join('.'), props, false, false);

                setModified(d || {});
                setLayout(props || {});
        }else{
            setLayout(props || {});
            setModified(props || {});
        }
    }

    return (
        <>
            <ChildItems
                list={list()}
                layout={layout}
                data={props.data}
                selected={selected}
                compList={props.compList}
                compProps={props.compProps}
                onViewParent={(arg) => {onViewParent(arg)}}
                onChildView={(arg, index) => {onChildView(arg, index)}}
                onEditProps={(arg, selctd, type) => {onEditProps(arg, selctd, type)}}
            />
        </>
    )
}

export default LayoutBuilder;