import React from 'react';
import helpers from 'ui-helpers';
import Indicator from 'aio-global-ui/atoms/indicator';

const comp = (props) => {
    const colorPairs = helpers.json.val(props, 'colorPairs', []);

    const ui = () => {
        if(colorPairs && colorPairs.length > 0){
            return colorPairs.map((item, index) => {
                return (
                    <ul className='full mr-t16 flx' key={index+item}>
                        <li className='pd-r16 bxs fl'>
                            <Indicator
                                wrapperDs={{
                                    size: 'xs',
                                    contrast:"c00108",
                                    theme: {
                                        colorPairing: {
                                            default: item
                                        }
                                    }
                                }}
                            />
                        </li>
                        <li className='pd-r16 bxs fl'>
                            <Indicator
                                wrapperDs={{
                                    size: 'sm',
                                    contrast:"c00108",
                                    theme: {
                                        colorPairing: {
                                            default: item
                                        }
                                    }
                                }}
                            />
                        </li>
                        <li className='pd-r16 bxs fl'>
                            <Indicator
                                wrapperDs={{
                                    size: 'md',
                                    contrast:"c00108",
                                    theme: {
                                        colorPairing: {
                                            default: item
                                        }
                                    }
                                }}
                            />
                        </li>
                        <li className='pd-r16 bxs fl'>
                            <Indicator
                                wrapperDs={{
                                    size: 'lg',
                                    contrast:"c00108",
                                    theme: {
                                        colorPairing: {
                                            default: item
                                        }
                                    }
                                }}
                            />
                        </li>
                        <li className='pd-r16 bxs fl'>
                            <Indicator
                                wrapperDs={{
                                    size: 'xl',
                                    contrast:"c00108",
                                    theme: {
                                        colorPairing: {
                                            default: item
                                        }
                                    }
                                }}
                            />
                        </li>
                        <li className='pd-r16 bxs fl'>
                            <Indicator
                                wrapperDs={{
                                    size: 'xxl',
                                    contrast:"c00108",
                                    theme: {
                                        colorPairing: {
                                            default: item
                                        }
                                    }
                                }}
                            />
                        </li>
                    </ul>
                )
            })
        }else{
            return <></>
        }
    }

    return <>
        <p className='dis-md mr-b10'>Indicator :</p>
        {ui()}
    </>
}

export default comp;