import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useEffect, useState, useRef} from 'react';
import Drawer from 'aio-global-ui/molecules/slide-drawer';
import AddNewQueryForm from 'aio-app-ui-api-molecules/model-config/query/add-new-query-form';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);

    const [cache, setCache] = useState(id);

    const onAction = (qury, action) => {
        helpers.components.slideDrawer.hide(id);
        if(action === 'cancel'){
            setCache(helpers.random.id(16));
        }else{
            if(props.onAction && action === 'save'){
                props.onAction(qury, false, false, 'add-new');
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
                        <AddNewQueryForm
                            key={cache}
                            query={{}}
                            map={props.map}
                            type={props.type}
                            details={props.details}
                            configs={props.configs}
                            modified={props.modified}
                            editable={props.editable}
                            queryData={helpers.json.val(props, 'query', {})}
                            onAction={(qury, action) => onAction(qury, action)}
                            //onChange={(arg, map, reset, action) => {onChange(arg, map, reset, action)}}
                        />
                    </div>
                </div>
            </Drawer>
        )
    }

    const ui = (type, qp, valmap) => {
        return (
            <>
                <li className='pd-l12 cp txt-xs link-u ns'>
                    <label className="link-u ns cp txt-xs link-u ns" htmlFor={id}>+ Add</label>
                </li>
                {drawer(type, qp, valmap)}
            </>
        )
    }

    return ui(props.type, props.query, props.mapping);
}

export default AddNewNode;