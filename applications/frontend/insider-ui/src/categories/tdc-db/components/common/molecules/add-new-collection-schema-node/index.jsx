import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SlideDrawer from 'aio-global-ui/molecules/slide-drawer';
import AddSchemaInputs from 'aio-app-ui-tdc-db-atoms/collection-add-schema-inputs';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <SlideDrawer 
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
                <div className='full bxs pd-rl20 pd-t32'>
                    <AddSchemaInputs {...props} />
                </div>
            </SlideDrawer>
        )
    }

    return ui();
}

export default AddNewNode;