import helpers from 'ui-helpers';
import TreeList from 'aio-global-raw-ui/atoms/tree-list/box';

const Comp = (props) => {
    return (
        <TreeList 
            {...helpers.json.merge({
                expended:false,
                multiple:false,
                mapping:{
                    header:{
                        center:'label'
                    }
                },
                templates:{
                    body:null
                },
                item:{
                    header:{
                        config:{
                            wrapper:{
                                ds:{
                                    css:{
                                        class:{
                                            family:'md',
                                            fontsize: "sm",
                                                padding: {
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
                            },
                        },
                        expendIcon:{
                            show:true,
                            config: {
                                config: {
                                    icon: {
                                        size: "12",
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
                },
                theme:{
                    header: {
                        default:{},
                        selected:{
                            wrapper:{
                                background:'c00101'
                            }
                        },
                        disabled:null
                    }
                },
                data:{},
                callbacks:{
                    header:{
                        wrapper:null
                    }
                }
            }, props || {})}
        />
    )
}

export default Comp;