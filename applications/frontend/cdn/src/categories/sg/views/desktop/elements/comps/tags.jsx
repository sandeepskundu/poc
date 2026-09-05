import helpers from 'ui-helpers';
import Tag from 'aio-global-ui/atoms/tag'
import React, { useEffect, useState } from 'react';

const comp = (props) => {
    const colorPairs = helpers.json.val(props, 'colorPairs', []);

   const list = (th) => {

        return (
            <>
                <li className='mr-r10'>
                    <Tag 
                        size='sm'
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='lg'
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='xl'
                        label={th}
                        ds={{
                            "theme":{
                                "colorPairing":{
                                    "default":th
                                }
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='sm'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "noBorder":false,
                                    "disabled":false,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='lg'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "noBorder":false,
                                    "disabled":false,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='xl'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "noBorder":false,
                                    "disabled":false,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>

                <li className='mr-r10'>
                    <Tag 
                        size='sm'
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
                                        "1":8
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "noBorder":false,
                                    "disabled":false,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='lg'
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
                                        "1":8
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "noBorder":false,
                                    "disabled":false,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='xl'
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
                                        "1":8
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "noBorder":false,
                                    "disabled":false,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>

                <li className='mr-r10'>
                    <Tag 
                        size='sm'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "rounded":true,
                                    "noBorder":false,
                                    "disabled":false,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='lg'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "rounded":true,
                                    "noBorder":false,
                                    "disabled":false,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='xl'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "rounded":true,
                                    "noBorder":false,
                                    "disabled":false,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>

                <li className='mr-r10'>
                    <Tag 
                        size='sm'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "rounded":true,
                                    "noBorder":false,
                                    "disabled":true,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='lg'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "rounded":true,
                                    "noBorder":false,
                                    "disabled":true,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='xl'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "rounded":true,
                                    "noBorder":false,
                                    "disabled":true,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>

                <li className='mr-r10'>
                    <Tag 
                        size='sm'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "rounded":true,
                                    "noBorder":true ,
                                    "disabled":true,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='lg'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "rounded":true,
                                    "noBorder":true,
                                    "disabled":true,
                                },
                                "others":""
                            }
                        }}
                    />
                </li>
                <li className='mr-r10'>
                    <Tag 
                        size='xl'
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
                                    },
                                    "border":"",
                                },

                                "flags":{
                                    "rounded":true,
                                    "noBorder":true,
                                    "disabled":true,
                                },
                                "others":""
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
        <p className='dis-md mr-b10'>Tags :</p>
        {ui()}
    </>
}

export default comp;