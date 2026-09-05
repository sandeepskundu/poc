import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import Drawer from 'aio-global-ui/molecules/slide-drawer';
import SchemaValuemap from 'aio-app-ui-tdc-application-molecules/model-schema-valuemap';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const [cache, setCache] = useState(id);
    const [details, setDetails] = useState({});
    const old = helpers.json.val(props, 'modified.details', {});

    const onChange = (arg,  map, type) => {
        const m = map.join('.');

        if(old[m]){
            setDetails({});
        }else{
            setDetails(arg);
        }
    }

    const showActions = () => {
        const dl = helpers.json.length(details);
        return (dl && dl > 0);
    }

    const onAction = (mapping, type) => {
        switch (type) {
            case 'reset':
            break;
            case 'cancel':
                helpers.components.slideDrawer.hide(id);
            break;
            case 'save':
                helpers.components.slideDrawer.hide(id);
                if(props.onChange){
                    props.onChange({...details}, mapping, 'parent')
                }
            break;
            default:

        }

        setDetails({});
        setCache(helpers.random.id(16));
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
                    <SchemaValuemap
                        
                        map={[]}
                        new={true}
                        key={cache}
                        onChange={onChange}
                        onAction={onAction}
                        details={props.details}
                        configs={props.configs}
                        showActions={showActions()}
                        modified={{details:{...details}}}
                    />
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
                    <label className="link-u ns cp txt-xs link-u ns" htmlFor={id}>+ Add sibling</label>
                </li>
            )
        }
    }

    const ui = (type, qp, valmap) => {
        return (
            <>
                {label()}  
                {drawer(type, qp, valmap)}
            </>
        )
    }

    return ui(props.type, props.query, props.mapping);
}

export default AddNewNode;