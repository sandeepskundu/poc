import helpers from 'ui-helpers';
import React, {useEffect, useState} from 'react';
import Drawer from 'aio-global-ui/molecules/slide-drawer';
import CreateControllerForm from 'aio-app-ui-tdc-application-organisms/create-controller-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
   
    const ui = () => {
        return (
            <Drawer 
                id={props.id}
                wrapperDs={{
                    ds:{
                        theme:{
                            colorPairing:{
                                default:"025"
                            }
                        }
                    }
                }}
                contentDs={{
                    theme:{
                        colorPairing:{
                            default:"025"
                        }
                    }
                }}
                closeIconDs = {{
                    theme:{
                        colorPairing:{
                            default:"025"
                        }
                    }
                }}
            >
                <div className='full bxs pd-rl20 pd-t20'>
                    <CreateControllerForm {...props} />
                </div>
            </Drawer>
        )
    }

    return ui();
}

export default Comp;