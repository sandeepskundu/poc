import helpers from 'ui-helpers';
import storybook from 'app-helpers/storybook';
import TreeList from 'aio-global-raw-ui/atoms/tree-list/box';
import ComponentPropsInput from 'aio-app-ui-developer-organisms/story-props-inputs';
import StoryPropsAddLink from 'aio-app-ui-developer-molecules/story-props-add-link';

const Comp = (props) => {
    //const propdata = storybook.props.tree.build(helpers.json.get(props, 'data.storybook.propTypes.data', {}));
    const tree = props.tree;

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
                        list:tree
                    }}
                    callbacks={{}}
                    templates={{
                        body:{
                            content:(arg, map, single, pos, prop, data) => {
                                let sel = helpers.json.get(helpers.json.get(data, 'selected', {}), map.join('.'), '');

                                if(pos === 'before' && helpers.json.get(arg, 'value.last', false) && sel){
                                    return <ComponentPropsInput item={arg} storybook={props.storybook} />
                                }

                                if(pos === 'after' && sel){
                                    return <StoryPropsAddLink map={map} item={arg} storybook={props} tree={tree} />
                                }
                            }
                        },
                        treeList:{
                            render:(arg, map, index, renderer, iProps) => {
                                if(map && map.length > 0){
                                    return renderer();
                                }else{
                                    return renderer({
                                        callbacks:{
                                            header:{
                                                end:{
                                                    onClick:(a, b, c, d) => {
                                                        console.log(a, b, c, d, arg, map, index);
                                                    }
                                                }
                                            }
                                        },
                                        templates:{
                                            header:{
                                                end:(a, b, c, d) => {
                                                    return <span className='txt-12 fm-rg'>Remove</span>
                                                }
                                            }
                                        }
                                    });
                                }
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