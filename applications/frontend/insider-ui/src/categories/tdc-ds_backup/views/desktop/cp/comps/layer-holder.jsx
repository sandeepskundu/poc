import helpers from 'ui-helpers';
import LayerHolder from 'aio-global-ui/atoms/layer-holder';
import React, { useEffect, useState } from 'react';

const comp = (props) => {
    const colorPairs = helpers.json.val(props, 'colorPairs', []);

    const layerHldr = (th, size, pos) => {
        return (
            <LayerHolder
                attrs={{}}
                content="Are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.  are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once."
                dataAttrs={{}}
                layer={th}
                layerDs={{
                    align: pos,
                    attrs: {},
                    css: {},
                    dataAttrs: {},
                    element: 'div',
                    size:30,
                    theme: {
                        colorPairing: {
                            "default":'027'
                        }
                    },
                    css:{
                        class:{
                            radius:{
                                1:4
                            }
                        }
                    }
                }}
                contentDs={{
                    css:{
                        class:{
                            padding:{
                                1:0,
                                2:0,
                                3:0,
                                4:8
                            }
                        }
                    }
                }}
                moreLess={{
                    enabled: true
                }}
                wrapperDs={{
                    css: {
                        class: {
                            shadow:'md',
                            family: 'rg',
                            fontsize: 'md',
                            radius:{
                                1:8
                            },
                            margin: {
                                '1': '0',
                                '2': '0',
                                '3': '0',
                                '4': '0'
                            },
                            padding: {
                                '1':20,
                                '2':20,
                                '3':20,
                                '4':20
                            }
                        },
                        "flags":{
                            "animation":"anim"
                        }
                    },
                    element: 'div',
                    theme: {
                        colorPairing: {
                            default:th,
                            hover:"033"
                        }
                    }
                }}
            />
        )
    }

    const list = (th, size, pos) => {
        return (
            <>
                <li className='pd-r16 bxs grid'>{layerHldr(th, size, pos)}</li>
            </>
        )
    }

   

    const ui = () => {
        if(colorPairs && colorPairs.length > 0){
            return colorPairs.map((item, index) => {
                return (
                    <ul className='full mr-t16 flx grid-wrapper grid-layout-5 flx-sb' key={index+item}>
                        {list(item, 30, 'tl')}
                        {list(item, 30, 'tc')}
                        {list(item, 30, 'rc')}
                        {list(item, 30, 'bc')}
                        {list(item, 30, 'lc')}
                    </ul>
                )
            })
        }else{
            return <></>
        }
    }

    return <>
        <p className='dis-md mr-b10'>Layer Holders :</p>
        {ui()}
    </>
}

export default comp;