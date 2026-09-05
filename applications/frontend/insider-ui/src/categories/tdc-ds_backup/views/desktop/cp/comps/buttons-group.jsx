import helpers from 'ui-helpers';
import ButtonGroup from 'aio-global-ui/atoms/form/button-group';

const comp = (props) => {
    const colorPairs = helpers.json.val(props, 'colorPairs', []);

    const themes = (theme) => {
        return (
            <ul className='full flx-vc'>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme
                            },{
                                label:theme
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"sm",
                            "theme":theme,
                            "element":"span"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme
                            },{
                                label:theme
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"md",
                            "theme":theme,
                            "element":"span"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme
                            },{
                                label:theme
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"lg",
                            "theme":theme,
                            "element":"span"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme
                            },{
                                label:theme
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"xl",
                            "theme":theme,
                            "element":"span"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme,
                                leftIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                },
                                rightIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            },{
                                label:theme,
                                leftIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                },
                                rightIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"xxl",
                            "theme":theme,
                            "element":"span"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme,
                                icoButtonDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            },{
                                label:theme,
                                icoButtonDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"sm",
                            "theme":theme,
                            "element":"span"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme,
                                icoButtonDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            },{
                                label:theme,
                                icoButtonDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"md",
                            "theme":theme,
                            "element":"span"
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme,
                                leftIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            },{
                                label:theme,
                                rightIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"sm",
                            "theme":theme,
                            "element":"span"
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
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme
                            },{
                                label:theme
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"sm",
                            "element":"span",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme
                            },{
                                label:theme
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"md",
                            "element":"span",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme
                            },{
                                label:theme
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"lg",
                            "element":"span",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme
                            },{
                                label:theme
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"xl",
                            "element":"span",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme,
                                leftIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                },
                                rightIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            },{
                                label:theme,
                                leftIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                },
                                rightIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"xxl",
                            "element":"span",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme,
                                icoButtonDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            },{
                                label:theme,
                                icoButtonDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"sm",
                            "element":"span",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme,
                                icoButtonDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            },{
                                label:theme,
                                icoButtonDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"md",
                            "element":"span",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
                        }}
                    />
                </li>
                <li className='pd-r16 bxs fl'>
                    <ButtonGroup
                        buttons={[
                            {
                                label:theme,
                                leftIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            },{
                                label:theme,
                                rightIconDs:{
                                    "name":"da",
                                    "family":"hotels"
                                }
                            }
                        ]}
                        buttonDefaultDs={{
                            "size":"sm",
                            "element":"span",
                            theme:{
                                colorPairing:{
                                    default:theme
                                }
                            }
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
        <p className='dis-md mr-b10'>Buttons Group :</p>
        {themesList()}
        {ui()}
    </>
}

export default comp;