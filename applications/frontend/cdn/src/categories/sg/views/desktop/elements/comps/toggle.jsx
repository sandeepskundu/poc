import React from 'react';
import helpers from 'ui-helpers';
import LayerHolder from 'aio-global-ui/atoms/layer-holder';
import Toggle from 'aio-global-ui/atoms/form/toggle';

const comp = (props) => {

    const themes = helpers.json.val(props, 'colorPairs', []);

    const Label = (th) => {
        return (
            <LayerHolder
                attrs={{}}
                content="Are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.  are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once. are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once."
                dataAttrs={{}}
                layer={th}
                layerDs={{
                    align:'tl',
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
                    enabled: false
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

    const ui = () => {
        if(themes && themes.length > 0){
            return themes.map((item, index) => {
                return (
                    <Toggle
                        label={item}
                        onChange={() => {}}
                        description="Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text"
                        
                    />
                )
            })
        }else{
            return <></>
        }
    }

    const withLabelLayer = () => {
        if(themes && themes.length > 0){
            return themes.map((item, index) => {
                return (
                    <Toggle
                        label={item}
                        onChange={() => {}}
                        labelJsxTemplate={Label()}
                        description="Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text Design system configuration of label description text"
                        
                    />
                )
            })
        }else{
            return <></>
        }
    }

    return (
        <>
            {ui()}
            {withLabelLayer()}
        </>
    )
}

export default comp;