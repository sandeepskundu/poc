import helpers from 'ui-helpers';
import Icon from 'aio-global-ui/atoms/0/icons/font';
import Badge from 'aio-global-ui/atoms/0/badge';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const badge = () => {
        debugger;
        let li = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        return [1].map(() => {
            return (
                <div className='_grid pd-b20 pd-r20'>
                    <Badge 
                        dsTheme={{
                            size:'xl',
                            radius:'round',
                            theme:'llslssl'
                        }}
                        content={(p, pp) => {
                            return "Sksaakakks lmcamcpacpmp cppmps"
                        }}
                        theme={{
                            colorPairing:{
                                default:'000',
                                hover:'001'
                            }
                        }}
                        config={{
                            icons:{
                                left:{
                                    "ds":{},
                                    "svg":{},
                                    "attrs":{},
                                    "markup":{},
                                    "type":"font",
                                    "icon":{
                                        "name":"da",
                                        size:50
                                    }
                                },
                                right:{
                                    "ds":{
                                        "theme":{
                                            background:{
                                                default:'c12306'   
                                            }
                                        }
                                    },
                                    "svg":{},
                                    "attrs":{},
                                    "markup":{},
                                    "type":"font",
                                    "icon":{
                                        "name":"da",
                                        size:50
                                    }
                                }
                            },
                            content:{
                                "ds":{
                                    "css":{},
                                    "theme":{
                                        background:{
                                            default:'c12306'   
                                        }
                                    }
                                }
                            },
                            wrapper:{
                                "attrs":{},
                                "markup":{
                                    "element":"p"
                                },
                                "ds":{
                                    "css":{},
                                    "theme":{
                                        colorPairing:{
                                            
                                        }
                                    }
                                }
                            }
                        }}
                    >Sandeep Kundu</Badge>
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