import helpers from 'ui-helpers';
import Divider from 'aio-global-ui/atoms/divider'
import React, { useEffect, useState } from 'react';

const comp = (props) => {
    const themes = helpers.json.val(props, 'themes', []);
    const colorPairs = helpers.json.val(props, 'colorPairs', []);

   

    const ui = () => {
        if(colorPairs && colorPairs.length > 0){
            return colorPairs.map((item, index) => {
                return (
                    <ul className='full mr-t16 flx grid-wrapper' key={index}>
                        <Divider 
                            size={2}
                            ds={{
                                "theme":{
                                    "colorPairing":{
                                        "default":item
                                    }
                                }
                            }}
                        />
                    </ul>
                )
            })
        }else{
            return <></>
        }
    }

    return <>
        <p className='dis-md mr-b10'>Dividers :</p>
        {ui()}
    </>
}

export default comp;