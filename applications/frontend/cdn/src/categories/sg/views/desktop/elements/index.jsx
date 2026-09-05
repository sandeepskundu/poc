import React from 'react';

import Image from 'aio-global-ui/atoms/image';
import Comp from './comp';
import Icon from 'aio-global-ui/atoms/icon';
import Tag from './comps/tags';
import Toggle from './comps/toggle';
import Badges from './comps/badges';
import Bubble from './comps/bubbles';
import Buttons from './comps/buttons';
import Divider from './comps/dividers';
import LayerHolders from './comps/layer-holder';
import Indicator from './comps/indicators'
import LinkList from './comps/link-list';
import ButtonGroup from './comps/buttons-group';
import TextLabel from 'aio-global-ui/atoms/text-label';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-global-ui/atoms/form/select-box';
import AvatarWithDetails from 'aio-global-ui/molecules/avatar-with-details';
import Ds from 'aio-app-ui-templates/design-system';
import PropsEditor from 'aio-app-ui-templates/props-editor'
import PropsBuilder from 'aio-app-ui-templates/props-builder'
import LayoutBuilder from 'aio-app-ui-templates/layout-builder'


import Accordion from 'aio-global-ui/molecules/accordion';
import Checkbox from 'aio-global-ui/atoms/form/checkbox';
import SlideDrawer from 'aio-global-ui/molecules/slide-drawer';
import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';

const current = true;
const others = false;

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

const orders = ['toggle', 'linkList', 'buttonGroup', 'buttons', 'badges', 'indicator', 'layer', 'tag', 'divider', 'bubble'];
const colorPairs = ['000', '001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016', '017', '019', '020', '021', '022', '023', '024', '025', '026', '027', '028', '029', '030', '031', '032', '033', '034', '035', '036', '037', '038', '039', '040', '041', '042', '043', '044', '045', '046', '047'];

const map = {
    toggle:() => {
        return <Toggle colorPairs={colorPairs} />
    },

    linkList:() => {
        return <LinkList colorPairs={colorPairs} />
    },
    buttonGroup:() => {
        return <ButtonGroup colorPairs={colorPairs} />
    },

    buttons:() => {
        return <Buttons colorPairs={colorPairs} />
    },

    indicator:() => {
        return <Indicator colorPairs={colorPairs} />
    },

    layer:() => {
        return <LayerHolders colorPairs={colorPairs} />
    },

    tag:() => {
        return <Tag colorPairs={colorPairs} />
    },

    divider:() => {
        return <Divider colorPairs={colorPairs} />
    },

    bubble:() => {
        return <Bubble colorPairs={colorPairs} />
    },

    badges:() => {
        return <Badges colorPairs={colorPairs} />
    }
}

const pschema = {
    compInfo:{
        "cmsDetails":{
            name:'Header'
        },
        "description":"Details description about component."
    },

    config:{
        "ds":{
            type:'object',
            description:"Details description about prop",
            required:{
                ui:true,
                server:true,
                storybook:true
            },
            schema:{
                ui:'',
                server:'',
                storybook:''
            },
            value:{
                default:'',
                map:''
            }
        }
    },

    props:{
        ds:{
            config:{
                validation:{
                    type:'object',
                    description:"Details description about prop",
                    required:{
                        ui:'required',
                        server:'required',
                        storybook:'required'
                    },
                    schema:{
                        ui:'',
                        server:'',
                        storybook:''
                    },
                    value:{
                        type:'',
                        default:'',
                        map:''
                    }
                }
            },
            props:{
                validation:{
                    config:{
                        ds:{
                            type:'design-system',
                            description:"Details description about prop",
                            required:{
                                ui:'required',
                                server:'optional',
                                storybook:'required'
                            },
                            schema:{
                                ui:'',
                                server:'',
                                storybook:''
                            },
                            value:{
                                type:'static',
                                default:'',
                                map:''
                            }
                        },
                        
                        valid:{
                            type:'string',
                            description:"Details description about prop",
                            required:{
                                ui:'required',
                                server:'required',
                                storybook:'optional'
                            },
                            schema:{
                                ui:'',
                                server:'',
                                storybook:''
                            },
                            value:{
                                type:'static',
                                default:'',
                                map:'0.1.2.3'
                            }
                        },
                    },
                    props:{
                        value:'',
                        valid:true,
                        error:false,
                        message:'',
                    }
                }
            }
        }
    }
}

const psConfig = {

    props:{
        boolean:{
            types:{
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
        value:{
            types:{
                0:{
                    'id':"static",
                    'label':"Static"
                },
                2:{
                    'id':'dynamic',
                    'label':'Dynamic'
                }
            }
        },
        required:{
            types:{
                0:{
                    id:'ui',
                    label:"Required on UI"
                },
                1:{
                    id:'server',
                    label:"Required on server"
                },
                3:{
                    id:'storybook',
                    label:"Required for storybook"
                }
            },
            options:{
                0:{
                    id:'required',
                    label:'Required'
                },
                1:{
                    id:'optional',
                    label:'Optional'
                }
            }
        },
        types:{
            1:{
                "id":"string",
                "label":"String"
            }, 
            2:{
                "id":"design-system",
                "label":"Design system"
            },
            3:{
                "id":"extended-design-system",
                "label":"Extended Design system"
            },
            4:{
                "id":"object",
                "label":"Object"
            },
            5:{
                'id':"boolean",
                "label":"Boolean"
            },
            6:{
                'id':"function",
                "label":"Function"
            },
            7:{
                'id':"jsx",
                "label":"JSX element"
            },
            8:{
                'id':"enum",
                "label":"Enums"
            },
            9:{
                'id':"number",
                "label":"Number"
            }
        }
    }
}

const DESKTOPSRP = (propsny) => {

    const com = () => {
        const t = () => {
            return  <Comp {...compProps} /> ///<></>//helpers.element.jsx.template.create(, , )
        }

        if(current){
            return (
                <>
                    <AppPageWithMenu 
                        appMenu={() => {
                            return (
                                <>
                                    {t()}
                                </>
                            )
                        }}
                        appRightMenu={() => {
                            return (
                                <>
                                    <div className='full bxs pd-rl16'>
                                        <Ds dsProps={{
                                            attrs:{},
                                            dataAttrs:{},
                                            ds:{
                                                "theme":{
                                                    "colorPairing":{
                                                        "default":"000",
                                                        "hover":"002",
                                                    },
                                                    "background":{
                                                        "default":"",
                                                        "hover":""
                                                    },
                                                    "text":{
                                                        "default":"",
                                                        "hover":""
                                                    },
                                                    "border":{
                                                        "default":"",
                                                        "hover":""
                                                    },
                                                },
                                                'css':{
                                                    "class":{
                                                        'shadow':'xs', // Done
                                                        'radius_':{ // Done
                                                            "1":'2',
                                                            "2":'4',
                                                            "3":'6',
                                                            "4":'8'
                                                        },
                                                        'padding_':{ // Done
                                                            "1":'12',
                                                            "2":'14',
                                                            "3":'16',
                                                            "4":'18'
                                                        },
                                                        "margin_":{ // Done
                                                            "1":'6',
                                                            "2":'8',
                                                            "3":'10',
                                                            "4":'12'
                                                        },
                                                        'borderNone':{ // Done
                                                            "1":true,
                                                            "3":true
                                                        },
                                                        'family':'', //Done
                                                        'fontsize':'md', // Done
                                                    },
                                                    "flags":{
                                                        'noBorder':true, //done
                                                        'rounded':false, //done
                                                        'disabled':false, //done
                                                        'isDisplay':true, // done
                                                        'boxSizing':false, // done
                                                        'animation':'anim', //Done
                                                        'noRadius':false //done
                                                    },
                                                    'others':'',
                                                }
                                            }
                                        }}/>
                                    </div>
                                </>
                            )
                        }}

                        appPage={() => {
                            return (
                                <>
                                    <div className='full bxs'>
                                        <div className='full'>
                                            <PropsEditor 
                                                configs={psConfig}
                                                schema={pschema}
                                            />
                                        </div>
                                        <div className='full'>
                                            <PropsBuilder />
                                        </div>
                                        <div className='full hide'>
                                            <LayoutBuilder />
                                        </div>
                                        
                                    </div>
                                </>
                            )
                        }}
                    />
                    {/*--<label for="sandeepkunud1">Open</label>
                    <label for="sandeepkunud">Open - 1</label>
                    <SlideDrawer id="sandeepkunud1">
                        <Badges colorPairs={colorPairs} />
                    </SlideDrawer>
                    <SlideDrawer 
                        id="sandeepkunud"
                        direction="left"
                    >
                        <Accordion
                            list={[
                                {
                                    "label":"Link item - 1",
                                    "attrs":{},
                                    "leftIcon":{
                                        "name":"da"
                                    },
                                    contentDs:{},
                                    moreLess:{
                                        "lineClamp":2,
                                    },
                                    content:"This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content."
                                }, {
                                    "label":"Link item - 2",
                                    "attrs":{},
                                    "leftIcon":{
                                        "name":"da"
                                    },
                                    "content":"This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content. This is sample body text and will replace with original content."
                                }
                            ]}
                        />
                        </SlideDrawer>--*/}
                </>
                
            )
        }else{
            return <></>
        }
        
    }

    const ui = () => {
       if(others){
            return orders.map((item, index) => {
                return (
                    <div className='full mr-t40' key={index}>
                        {map[item]?map[item]():<></>}
                    </div>
                )
            })
        }else{
            //return <Comp {...compProps} />
        }
       
        return <></>
    }

    return (
        <>
            {/*--<div className='txt-xs ttip th-000' data-tooltip="Sandeep Kundu"></div>
            <Checkbox 
                checked={true}
                disabled={true}
                label="Sandeep Kundu"
                description="Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text" 
    />--*/}
            <div className='full pd-tb20'>
                {com()}
            </div>
            {ui()}
            {/*88<TextLabel 
                label="Sandeep Kundu"
                leftIcon={{
                    name:"da"
                }}
                rightIcon={{
                    name:"da"
                }}
            />
            <PopupBox
                wrapperDs={{
                    openOnHover:true
                }}
                buttonDs={{
                    "label":"KSKSK",
                    "theme":{
                        colorPairing:{
                            "default":"031",
                            "hover":"032"
                        }
                    },
                    "leftIconDs":{
                        "name":"kundu",
                        "family":"hotels"
                    },
                    "rightIconDs":{
                        "name":"da",
                        "family":"hotels"
                    }
                }}
                content={
                    <AvatarWithDetails 
                        title="Sandeep Kundu"
                        description="sandeepskundu@gmail.com"
                    />
                }
            >
            </PopupBox>00*/}
            
            
        </>
       
    )
    
    /*--
    

    const buttonGroups = () => {
        return themems.map((theme, i) => {
            return (
                <ul className='grid-wrapper mr-b20 flx-vc' key={i}>
                    <li className='gird-3 mr-r20'>
                        <ButtonGroup 
                            size="sm"
                            label={theme} 
                            theme={theme}
                            buttons={[
                                {
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                },{
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                }
                            ]}
                        />
                    </li>
                    <li className='gird-3 mr-r20'>
                        <ButtonGroup 
                            size="md"
                            label={theme} 
                            theme={theme}
                            buttons={[
                                {
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                },{
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                }
                            ]}
                        />
                    </li>
                    <li className='gird-3 mr-r20'>
                        <ButtonGroup 
                            size="lg"
                            label={theme} 
                            theme={theme}
                            buttons={[
                                {
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                },{
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                }
                            ]}
                        />
                    </li>
                    <li className='gird-3 mr-r20'>
                        <ButtonGroup 
                            size="xl"
                            label={theme} 
                            theme={theme}
                            buttons={[
                                {
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                },{
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                }
                            ]}
                        />
                    </li>
                    <li className='gird-3 mr-r20'>
                        <ButtonGroup 
                            size="xxl"
                            label={theme} 
                            theme={theme}
                            buttons={[
                                {
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                },{
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                }
                            ]}
                        />
                    </li>
                    <li className='gird-3 mr-r20'>
                        <ButtonGroup 
                            size="xxl"
                            label={theme} 
                            theme={theme}
                            buttons={[
                                {
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    theme:'001',
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                },{
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                }
                            ]}
                        />
                    </li>
                    <li className='gird-3 mr-r20'>
                        <ButtonGroup 
                            size="xxl"
                            label={theme} 
                            theme={theme}
                            buttons={[
                                {
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    iconButton:"hotels-da",
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                },{
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:false,
                                    attrs:{kundu:'sandeep'},
                                    iconButton:"hotels-da",
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                }
                            ]}
                        />
                    </li>
                    <li className='gird-3 mr-r20'>
                        <ButtonGroup 
                            size="xxl"
                            label={theme} 
                            theme={theme}
                            buttons={[
                                {
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:true,
                                    attrs:{kundu:'sandeep'},
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                },{
                                    removeShadow:false,
                                    label:theme,
                                    element:'span',
                                    roundButton:false,
                                    disabled:true,
                                    attrs:{kundu:'sandeep'},
                                    iconButton:"hotels-da",
                                    dataAttrs:{ga:"id", 'data-k':"kundu"}
                                }
                            ]}
                        />
                    </li>
                </ul>
            )
        });
    }

    const avatars = () => {
        return (
            <>
                <Avatar 
                    size="xs"
                    theme="000"
                    contrastBorder="c00204"
                    initals="SK"
                />
                <Avatar 
                    size="sm"
                    theme="001"
                    initals="SK"
                />
                <Avatar 
                    size="md"
                    theme="003"
                    initals="SK"
                />
                <Avatar 
                    size="lg"
                    theme="028"
                    shadow={'xxl'}
                    initals="SK"
                />
                <Avatar 
                    size="xl"
                    theme="005"
                    initals="SK"
                />
                <Avatar 
                    size="xxl"
                    shadow="xs"
                    theme="006"
                    initals="SK"
                />
                <Avatar 
                    size="xs"
                    theme="000"
                    contrastBorder="c00204"
                    icon="hotels-da"
                />
                <Avatar 
                    size="sm"
                    theme="002"
                    icon="hotels-da"
                />
                <Avatar 
                    size="md"
                    theme="003"
                    icon="hotels-da"
                />
                <Avatar 
                    size="lg"
                    theme="004"
                    icon="hotels-da"
                />
                <Avatar 
                    size="xl"
                    theme="005"
                    icon="hotels-da"
                />
                <Avatar 
                    size="xxl"
                    shadow="xs"
                    theme="006"
                    icon="hotels-da"
                    contrastBorder="c00204"
                />

                <Avatar 
                    size="xs"
                    contrastBorder="c00204"
                    image="/cdn/statics/images/avatar.jpg"
                />
                <Avatar 
                    size="sm"
                    image="/cdn/statics/images/avatar.jpg"
                />
                <Avatar 
                    size="md"
                    image="/cdn/statics/images/avatar.jpg"
                />
                <Avatar 
                    size="lg"
                    image="/cdn/statics/images/avatar.jpg"
                />
                <Avatar 
                    size="xl"
                    image="/cdn/statics/images/avatar.jpg"
                />
                <Avatar 
                    size="xxl"
                    shadow="xs"
                    contrastBorder="c00204"
                    image="/cdn/statics/images/avatar.jpg"
                />
                <Avatar 
                    size="p72"
                    shadow="xs"
                    contrastBorder="c00204"
                    image="/cdn/statics/images/avatar.jpg"
                />
                <Avatar 
                    size="p96"
                    shadow="xs"
                    contrastBorder="c00204"
                    image="/cdn/statics/images/avatar.jpg"
                />
                <Avatar 
                    size="p160"
                    shadow="xs"
                    contrastBorder="c00204"
                    image="/cdn/statics/images/avatar.jpg"
                />
            </>
            
        )
    }

    return (
        <Container background="_c00001">

            <Comp />


            <Divider className="mr-t160" />
            <AvatarDetails />
            <PopupBox
                actionButtonLable="Account"
                popupBorderRadius={8}
                popupShadow="lg"
            />

            <div className='pop-wrpr hver-open' data-component="popup-box" id={helpers.random.id()}>
                <input type="checkbox" className='pop-actn-inpt' id={'kundus'} />
                <label className='pop-lb' htmlFor="kundus">Labl</label>
                <div className='pop-body cp-025 bdr-1 bdr-8 pd-10 anim aln-from-right'>
                    <p>Sandeep</p>
                    <p>Mandee</p>
                </div>
            </div>

            <LayerHolder 
                layer={<Badge 
                theme='002'
                size="sm"
                label="kundu"
            ></Badge>}
                layerAlignFrom="tc"
                layerSize={60}
                isContentReadMoreLess
                holderElementBorderRadius={8}
                holderElementColorParing="005"
                layerSpaceFromContent="pd-t20"
                layerSpaceFromHolder="pd-20"
                contentReadMoreLabel="Read More"
                contentReadLessLabel="Read Less"
                content="This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content.  This is sample body text and this will get replaced with orignial content.  This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. "
            />

            <div class="pr mr-r10 bg-c00203" style={{width:"50px", height:"50px", margin:"200px"}}>
                <div className='lyr bg-c00206 aln-lc'></div>
            </div>

            <TextLabel
            
                content="This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content.  This is sample body text and this will get replaced with orignial content.  This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. "
            />

            <Text 
            isReadMoreLess={true}
            readMoreLabel="more"
            readLessLabel="less"
            content="This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content." />
            
            <div className='rd-mor-lss full'>
                <input type="checkbox" className='rd-mor-lss-chbx' id='readMoreLess' ></input>
                <div className='rd-mor-lss-ctnt lc-4'>
                    <p>This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. This is sample body text and this will get replaced with orignial content. </p>
                </div>
                <label className="rd-mor-lss-lbl cp" htmlFor='readMoreLess' aria-label="information-banner" data-more-label="read more" data-less-label="read less"></label>
            </div>

            {avatars()}
            {buttonGroups()}

            
                <ButtonGroup 
                    size="xxl"
                    label={'000'} 
                    theme={'000'}
                    buttons={[
                        {
                            removeShadow:false,
                            label:'000',
                            element:'span',
                            roundButton:false,
                            disabled:true,
                            attrs:{kundu:'sandeep'},
                            dataAttrs:{ga:"id", 'data-k':"kundu"}
                        }, {
                            removeShadow:false,
                            label:'000',
                            element:'span',
                            roundButton:false,
                            disabled:true,
                            attrs:{kundu:'sandeep'},
                            iconButton:"hotels-da",
                            dataAttrs:{ga:"id", 'data-k':"kundu"}
                        }
                    ]}
                />
            </Badge>
        </Container>
    )--*/
}

export default DESKTOPSRP;