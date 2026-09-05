import helpers from 'ui-helpers';
import * as React from "react";
import {useState, useEffect} from 'react';
import * as ReactDOM from "react-dom/client";
import Drawer from 'aio-global-ui/molecules/slide-drawer';

const PageLayout = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.json.val(10);
    const dump = {
        type:"html", // html|jsx
        name:"div",
        props:{
            className:"sandeep kundu"
        },
        children:{
            0:{
                type:"html",
                name:'h1',
                props:{},
                children:"Welcome!"
            },
            1:{
                type: "html",
                name:'p',
                props: {},
                children: "This is a nested layout."
            },
            2:{
                type: "html",
                name:'section',
                props: {
                    className:"nested-box"
                },
                children:{
                    0:{
                        type: "html",
                        name:'button',
                        children: "Click Me",
                        props: {
                            onClick: "handleClick",
                            
                        }
                    }
                }
            }
        }
    };

    const [data, setData] = useState({
        blank:true,
        details:{},
        configs:{}
    });

    const drawer = () => {
        return (
            <Drawer 
                id={id}
                active={true}
                attrs={{
                    
                }}
                wrapperDs={{
                    ds:{
                        theme:{
                            colorPairing:{
                                default:"025"
                            }
                        }
                    }
                }}
                contentDs={{
                    theme:{
                        colorPairing:{
                            default:"025"
                        }
                    },
                    attrs:{
                        style:{
                            minWidth:'600px'
                        }
                    }
                }}
                closeIconDs = {{
                    theme:{
                        colorPairing:{
                            default:"025"
                        }
                    }
                }}
            >
                <div className='full bxs pd-rl20 pd-t20'>
                    {helpers.element.jsx.template.builder.start(dump, {}, {}, {lib:React, dom:ReactDOM})}
                </div>
            </Drawer>
        )
    }

    const label = () => {
        if(props.label){
            return props.label(id);
        }else{
            return (
                <span><label className="link-u ns cp txt-xs" htmlFor={id} for={id} >Add</label></span>
            )
        }
    }

    const ui = () => {
        return (
            <form>
                {label()}  
                {drawer()}
            </form>
        )
    }

    return (
        <>
            {ui()}
        </>
    )
}

export default PageLayout;