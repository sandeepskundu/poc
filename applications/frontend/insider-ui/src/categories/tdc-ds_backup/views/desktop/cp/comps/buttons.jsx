import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';

const comp = (props) => {
    const colorPairs = helpers.json.val(props, 'colorPairs', []);

    const themes = (theme) => {
        return (
            <ul className='full flx-vc'>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"sm",
                            theme:theme
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"md",
                            theme:theme
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"lg",
                            theme:theme
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"xl",
                            theme:theme
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"xxl",
                            theme:theme
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            theme:theme
                        }}
                        icoButtonDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            theme:theme,
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                    />
                </li>

                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            theme:theme,
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>

                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"md",
                            theme:theme,
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"lg",
                            theme:theme,
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>

                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"md",
                            theme:theme,
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        rightIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"lg",
                            theme:theme,
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        rightIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>

                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"md",
                            theme:theme,
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                        rightIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"lg",
                            theme:theme,
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                        rightIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
            </ul>
        )
    }

    const list = (theme) => {
        return (
            <ul className='full flx-vc'>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"sm",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"md",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"lg",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"xl",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"xxl",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                        icoButtonDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            },
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                    />
                </li>

                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            },
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>

                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"md",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            },
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"lg",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            },
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>

                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"md",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            },
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        rightIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"lg",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            },
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        rightIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>

                <li className='pd-r16 bxs fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"md",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            },
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                        rightIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl fl'>
                    <Button 
                        label={theme}
                        buttonDs={{
                            size:"lg",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            },
                            css:{
                                flags:{
                                    rounded:true
                                }
                            }
                        }}
                        leftIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                        rightIconDs={{
                            "name":"da",
                            "family":"hotels"
                        }}
                    />
                </li>
            </ul>
        )
    }

    const themesList = () => {
        let thms = ['000', '001', '002', '003', '004', '005', '006', '007', '008', '009', '010',];

        return thms.map((item, index) => {
            return (
                <ul className='full mr-t16 flx grid-wrapper' key={index+item}>
                    <li className='full'>
                        {themes(item)}
                    </li>
                    
                </ul>
            )
        })
    }

    const ui = () => {
        if(colorPairs && colorPairs.length > 0){
            return colorPairs.map((item, index) => {
                return (
                    <ul className='full mr-t16 flx grid-wrapper' key={index+item}>
                        <li className='full'>
                            {list(item)}
                        </li>
                        
                    </ul>
                )
            })
        }else{
            return <></>
        }
    }

    return <>
        <p className='dis-md mr-b10'>Buttons :</p>
        {themesList()}
        {ui()}
    </>
}

export default comp;