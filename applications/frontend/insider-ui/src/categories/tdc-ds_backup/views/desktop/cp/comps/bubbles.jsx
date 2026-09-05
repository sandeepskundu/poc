import helpers from 'ui-helpers';
import Bubble from 'aio-global-ui/atoms/bubble'
import React, { useEffect, useState } from 'react';

const comp = (props) => {

    const themes = helpers.json.val(props, 'themes', []);
    const colorPairs = helpers.json.val(props, 'colorPairs', []);

    const ds = () => {

    }

    const list = (th) => {
        return (
            <>
                <li className='gird-1 mr-r4'>
                     <Bubble 
                        size="xl"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":4
                                    }
                                }
                            }
                        }}
                    />
                </li>
                <li className='gird-1 mr-r4'>
                    <Bubble 
                        size="lg"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":4
                                    }
                                }
                            }
                        }}
                    />
                </li>
                <li className='gird-1 mr-r4'>
                    <Bubble 
                        size="sm"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":4
                                    }
                                }
                            }
                        }}
                    />
                </li>
                
                <li className='gird-1 mr-r4'>
                     <Bubble 
                        size="xl"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":2
                                    }
                                }
                            }
                        }}
                    />
                </li>
                <li className='gird-1 mr-r4'>
                    <Bubble 
                        size="lg"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":2
                                    }
                                }
                            }
                        }}
                    />
                </li>
                <li className='gird-1 mr-r4'>
                    <Bubble 
                        size="sm"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":2
                                    }
                                }
                            }
                        }}
                    />
                </li>

                <li className='gird-1 mr-r4'>
                     <Bubble 
                        size="xl"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":4
                                    }
                                },
                                'flags':{
                                    'rounded':true
                                }
                            }
                        }}
                    />
                </li>
                <li className='gird-1 mr-r4'>
                    <Bubble 
                        size="lg"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":4
                                    }
                                },
                                'flags':{
                                    'rounded':true
                                }
                            },
                        }}
                    />
                </li>
                <li className='gird-1 mr-r4'>
                    <Bubble 
                        size="sm"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":4
                                    }
                                },
                                'flags':{
                                    'rounded':true
                                }
                            }
                        }}
                    />
                </li>

                <li className='gird-1 mr-r4'>
                     <Bubble 
                        size="xl"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":4
                                    }
                                },
                                'flags':{
                                    'rounded':true,
                                    'disabled':true
                                }
                            }
                        }}
                    />
                </li>
                <li className='gird-1 mr-r4'>
                    <Bubble 
                        size="lg"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":4
                                    }
                                },
                                'flags':{
                                    'rounded':true,
                                    'disabled':true
                                }
                            },
                        }}
                    />
                </li>
                <li className='gird-1 mr-r4'>
                    <Bubble 
                        size="sm"
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            },
                            "css":{
                                "class":{
                                    "shadow":"",
                                    "radius":{
                                        "1":4
                                    }
                                },
                                'flags':{
                                    'rounded':true,
                                    'disabled':true
                                }
                            }
                        }}
                    />
                </li>
            </>
        )
    }

    const ui = () => {
        if(colorPairs && colorPairs.length > 0){
            return colorPairs.map((item, index) => {
                return (
                    <ul className='full mr-t16 flx grid-wrapper' key={index}>
                        {list(item)}
                    </ul>
                )
            })
        }else{
            return <></>
        }
    }

    return <>
        <p className='dis-md mr-b10'>Bubbles :</p>
        {ui()}
    </>
}

export default comp;