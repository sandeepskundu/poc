import helpers from 'ui-helpers';
import ListBox from 'aio-global-ui/atoms/0/list/box';

import PopOver from 'aio-global-ui/atoms/0/popover';
import Select from 'aio-global-ui/atoms/0/form/select';
import Layer from 'aio-global-ui/atoms/0/layer-holder';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const T = (p) => {
        debugger;
        return <><span onClick={() => {p.onClick()}}>{helpers.json.get(p, 'selected.label', 'Sandeep Kundu')}</span></>
    }

    const badge = () => {
        return [1].map(() => {
            return (
                <div className='grid pd-b20 pd-r20 mr-t40'>

                    <div className='full pd-20'>
                        <Layer />
                    </div>

                    <div className='full pd-10'>
                        <Select
                            templates={{
                                _trigger:(toggle, props, selected) => {
                                    return <T onClick={toggle} selected={selected}/>
                                },
                                noResult:{
                                    _orginial:() => {
                                        return <p>Please provide valid options list to display</p>
                                    },
                                    _default:"No match",
                                    _filtered:() => {
                                        return <p>Please provide valid options list to display</p>
                                    }
                                },
                                list:(arg) => {
                                    return <T {...arg} />
                                }
                            }}
                            filter={{
                                _callback:(options, selected) => {
                                    return options;
                                }
                            }}
                            callback={{
                                "onOpen":null,
                                "onClose":null,
                                "onSelect":null,
                                "onRemove":null,
                                "onChange":{
                                    "beforeFilter":null,
                                    "afterListUpdate":null
                                }
                            }}
                            input={{
                                label:"",
                                invalid:true,
                                placeholder:"Kundu",
                                error:"Please select a valid option before proceeding",
                                description:"This is simple body text"
                            }}
                            selectedIcon={{
                                enabled:true,
                                placement:'end',
                                content:'',
                                iconConfig:{
                                    "icon":{
                                        "size":20,
                                    }
                                }
                            }}
                            dsTheme={{
                                dropdown:{
                                    "wrapper":{},
                                    "content":{
                                        "radius":"8",
                                        "shadow":"md",
                                        "border":"c00104",
                                        "background":"c00000"
                                    }
                                }
                            }}
                            dropdown={{
                                controls:{
                                    open:false,
                                    arrow:false,
                                    mode:'react',
                                    toggle:'click',
                                    position:'bottom-center'
                                }
                            }}
                            option={{
                                selected:{
                                    value:'4',
                                    label:'Group option one',
                                },
                                list:{
                                    1:{
                                        value:'4',
                                        label:'Option two',
                                    },
                                    2:{
                                        value:'5',
                                        label:'Option three'
                                    }, 
                                    4:{
                                        value:'6',
                                        label:'Option four'
                                    }
                                }
                            }}
                        />
                    </div>

                    <div className='full pd-10'>
                        <PopOver />
                    </div>

                    <div className='full pd-10'>
                        <PopOver />
                    </div>

                    <ListBox
                        dsTheme={{
                            boxWrapper:{
                                "color":"c11007",
                                "background":"c00305"
                            }
                        }}
                        
                        data={{
                            0:{
                                type:'item',
                                label:'Item one',
                                props:{
                                    dsTheme:{
                                        center:{
                                            color:"c12306"
                                        }
                                    }
                                }
                            },
                            1:{
                                type:'item',
                                label:'Item one',
                                props:{
                                    dsTheme:{
                                        center:{
                                            color:'c00208'
                                        }
                                    }
                                }
                            }, 
                            2:{
                                props:{},
                                type:'group',
                                label:'Item one',
                                childs:{
                                    0:{
                                        type:'item',
                                        label:'Item one',
                                    },
                                    1:{
                                        type:'item',
                                        label:'Item one',
                                    },
                                    2:{
                                        type:'item',
                                        label:'Item one',
                                    },
                                    3:{
                                        type:'item',
                                        label:'Item one',
                                    }
                                }
                            }
                        }}
                    />
                </div>
            )
        })
    }
    
    const ui = () => {
        return (
            <div className='full pd-t60 grid-wrapper grid-layout-6'>
                {badge()}
            </div>
        )  
    }

    return ui();
}

export default Comp;