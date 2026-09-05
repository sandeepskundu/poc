import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import Drawer from 'aio-global-ui/molecules/slide-drawer';
import AddNewScssData from 'aio-app-ui-application-atoms/ui-application-add-new-scss-data';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const [cache, setCache] = useState(id);

    const onAction = (d, action, name) => {
        helpers.components.slideDrawer.hide(id);
        if(action === 'cancel'){
            setCache(helpers.random.id(16));
        }else{
            if(props.onAction && action === 'save'){
                props.onAction(d, name);
            }
        }
    }

    const drawer = () => {
        return (
            <Drawer 
                id={id}
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
                    <div className='full bxs'>
                        <AddNewScssData
                            key={cache}
                            map={props.map} 
                            data={props.data}
                            onAction={onAction}
                            details={props.details}
                            configs={props.configs}
                        />
                    </div>
                </div>
            </Drawer>
        )
    }

    const ui = (p) => {
        return (
            <>
                <li className='pd-l12 cp txt-xs link-u ns mr-r10'>
                    <label className="link-u ns cp txt-xs link-u ns" htmlFor={id}>+ Add sibling</label>
                </li>
                {drawer()}
            </>
        )
    }

    return ui();
}

export default AddNewNode;