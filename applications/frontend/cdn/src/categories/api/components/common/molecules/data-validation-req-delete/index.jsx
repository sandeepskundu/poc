import helpers from 'ui-helpers';
import React, {useState} from 'react';
import Drawer from 'aio-global-ui/molecules/slide-drawer';
import DeleteForm from 'aio-app-ui-api-atoms/validation-req-data-delete';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const [cache, setCache] = useState(id);

    const onAction = (qury, map, action, reset) => {
        helpers.components.slideDrawer.hide(id);
        if(action === 'cancel'){
            setCache(helpers.random.id(16));
        }else{
            if(props.onChange && action === 'delete'){
                props.onChange(qury, map, reset);
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
                        <DeleteForm
                            {...props}
                            key={cache}
                            onAction={(qury, map, action, reset) => onAction(qury, map, action, reset)}
                        />
                    </div>
                </div>
            </Drawer>
        )
    }

    const label = () => {
        if(props.label){
            return props.label(id);
        }else{
            return (
                <li className='pd-l12 cp txt-xs link-u ns'>
                    <label className="link-u ns cp txt-xs link-u ns" htmlFor={id}>{props.clear?'Clear':'Delete'}</label>
                </li>
            )
        }
    }

    const ui = () => {
        return (
            <>
                {label()}  
                {drawer()}
            </>
        )
    }

    return ui();
}

export default AddNewNode;