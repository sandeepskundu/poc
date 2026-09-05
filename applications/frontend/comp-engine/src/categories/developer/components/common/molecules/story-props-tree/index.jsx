import helpers from 'ui-helpers';
import storybook from 'app-helpers/storybook';
import TreeList from 'aio-global-raw-ui/atoms/tree-list/box';
import ComponentPropsInput from 'aio-app-ui-developer-organisms/story-props-inputs';

const Comp = (props) => {
    const propdata = storybook.props.tree.build(helpers.json.get(props, 'data.storybook.propTypes.data', {}), {sortEnable:true});

    const ui = () => {
        if(!props.blank){
            return (
                <TreeList
                    expended={false}
                    multiple={false}
                    mapping={{
                        header:{
                            center:'label'
                        }
                    }}
                    item={{
                        header:{
                            config:{
                                wrapper:{
                                    ds:{
                                        css:{
                                            class:{
                                                family:'md',
                                                fontsize:"sm",
                                                padding:{
                                                    1:8,
                                                    2:4,
                                                    3:8
                                                }
                                            }
                                        }
                                    }
                                },
                                start: {
                                    ds: {
                                        css: {
                                            class: {
                                                margin: {
                                                    "2":6
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            expendIcon:{
                                show:true,
                                config: {
                                    config: {
                                        icon: {
                                            size:"12"
                                        },
                                        ds: {
                                            css: {
                                                class: {
                                                    margin: {
                                                        "1":2
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }}
                    theme={{
                        header: {
                            default:{},
                            disabled:null,
                            selected:{
                                wrapper:{
                                    background:'c00101'
                                }
                            }
                        }
                    }}
                    data={{
                        disabled:{},
                        list:helpers.json.toIndexTree(propdata)
                    }}
                    callbacks={{
                        onToggle:(data) => {}
                    }}
                    templates={{
                        body:{
                            content:(arg, map, single, pos, prop, data) => {
                                if(pos === 'before' && helpers.json.get(arg, 'value', '') && helpers.json.get(helpers.json.get(data, 'selected', {}), map.join('.'), '')){
                                    return <ComponentPropsInput item={arg} storybook={props} />
                                }
                            }
                        },
                        treeList_deleted:{
                            render:(arg, map, index, renderer) => {
                                return renderer();
                            }
                        }
                    }}
                /> 
            )
        }
    };

    return ui()
}

export default Comp;