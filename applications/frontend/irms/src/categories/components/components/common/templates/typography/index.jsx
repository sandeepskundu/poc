import helpers from 'ui-helpers';
import H1 from 'aio-global-ui/atoms/0/typography/heading/h1';
import H2 from 'aio-global-ui/atoms/0/typography/heading/h2';
import H3 from 'aio-global-ui/atoms/0/typography/heading/h3';
import H4 from 'aio-global-ui/atoms/0/typography/heading/h4';
import H5 from 'aio-global-ui/atoms/0/typography/heading/h5';
import H6 from 'aio-global-ui/atoms/0/typography/heading/h6';
import Heading from 'aio-global-ui/atoms/0/typography/heading';

import Text from 'aio-global-ui/atoms/0/typography/text';
import Description from 'aio-global-ui/atoms/0/typography/text/description';

import Button from 'aio-global-ui/atoms/0/form/button';
import Icon from 'aio-global-ui/atoms/0/icons';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const headings = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 hide'>
                <li className='full pd-b32'>
                    <Heading config={{content:"Default Heading"}}/>
                </li>
                <li className='full pd-b32'>
                    <H1 config={{content:"Heading - 1"}}/>
                </li>
                <li className='full pd-b32'>
                    <H2 config={{content:"Heading - 2"}}/>
                </li>
                <li className='full pd-b32'>
                    <H3 config={{content:"Heading - 3"}}/>
                </li>
                <li className='full pd-b32'>
                    <H4 config={{content:"Heading - 4"}}/>
                </li>
                <li className='full pd-b32'>
                    <H5 config={{content:"Heading - 5"}}/>
                </li>
                <li className='full pd-b32'>
                    <H6 config={{content:"Heading - 6"}}/>
                </li>
            </ul>
        )
    }

    const T = () => {
        return 'This is simple body text ldkdkdk ksksskk skssk kssksk kssksk This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk,This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk. This is simple body text ldkdkdk ksksskk skssk kssksk kssksk This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk,This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk. This is simple body text ldkdkdk ksksskk skssk kssksk kssksk This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk,This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk'
    }

    const text = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 hide'>
                <li className='full pd-b32'>
                    <Text size="md" text={{content:"This is simple body text ldkdkdk ksksskk skssk kssksk kssksk "}}></Text>
                </li>
                <li>
                    <Description text={{content:<T />}} toggle={{
                        enabled:true
                    }}/>
                </li>
                <li className='full pd-b32'>
                    <H1 config={{content:"Heading - 1"}}/>
                </li>
                <li className='full pd-b32'>
                    <H2 config={{content:"Heading - 2"}}/>
                </li>
                <li className='full pd-b32'>
                    <H3 config={{content:"Heading - 3"}}/>
                </li>
                <li className='full pd-b32'>
                    <H4 config={{content:"Heading - 4"}}/>
                </li>
                <li className='full pd-b32'>
                    <H5 config={{content:"Heading - 5"}}/>
                </li>
                <li className='full pd-b32'>
                    <H6 config={{content:"Heading - 6"}}/>
                </li>
            </ul>
        )
    }


    const ico = {
            svg:{
                'src':'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.695 5.057a1.04 1.04 0 0 0-.567.459c-.091.156-.108.23-.108.484 0 .256.016.328.111.489.125.213.318.375.539.454.223.08 18.437.08 18.66 0 .221-.079.414-.241.539-.454.095-.161.111-.233.111-.489 0-.254-.017-.328-.108-.484a1.02 1.02 0 0 0-.582-.461c-.263-.079-18.343-.077-18.595.002m0 6a1.04 1.04 0 0 0-.567.459c-.091.156-.108.23-.108.484 0 .256.016.328.111.489.125.213.318.375.539.454.223.08 18.437.08 18.66 0 .221-.079.414-.241.539-.454.095-.161.111-.233.111-.489 0-.254-.017-.328-.108-.484a1.02 1.02 0 0 0-.582-.461c-.263-.079-18.343-.077-18.595.002m0 6a1.04 1.04 0 0 0-.567.459c-.091.156-.108.23-.108.484 0 .256.016.328.111.489.125.213.318.375.539.454.223.08 18.437.08 18.66 0 .221-.079.414-.241.539-.454.095-.161.111-.233.111-.489 0-.254-.017-.328-.108-.484a1.02 1.02 0 0 0-.582-.461c-.263-.079-18.343-.077-18.595.002" fill-rule="evenodd" fill="#000"/></svg>',
                'size':'160px',
                'style':{
                    
                }
            },
            type:'font', //'font', //'svg',
            icon:{
                name:'da',
                size:'24',
                family:'g',
            },

            markup: {
                element:"a"
            },
            attrs: {
                title: "sandeep",
                href:"/sandeep"
            },
            ds: {
                theme:{
                    background:{},
                    text:{}
                },
                css: {
                    class:{},
                    flags:{}
                }
            }
        }

    const button = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24'>
                <li className='full pd-b32 txt-c11107'>
                    <Icon />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'010',
                                    radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'010',
                                    radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'009',
                                    radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'008',
                                    radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'007',
                                    _radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'006',
                                    _radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'005',
                                    _radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'004',
                                    _radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'003',
                                    _radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'002',
                                    _radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'001',
                                    _radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                    <Button config={{
                        button:{
                            states:{
                                disabled:false
                            },
                            ds:{
                                predefined:{
                                    size:'sm',
                                    theme:'000',
                                    _radius:'round'
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:ico
                        }
                    }} />
                </li>
            </ul>
        )
    }
    
    const ui = () => {
        return (
            <div className='full'>
                {/*--text()--*/}
                {/*--headings()--*/}
                {button()}
            </div>
        )  
    }

    return ui();
}

export default Comp;