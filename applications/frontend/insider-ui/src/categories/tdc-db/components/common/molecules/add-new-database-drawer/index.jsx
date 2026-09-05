import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-tdc-db-modules';
import React, {useEffect, useState} from 'react';
import Button from 'aio-global-ui/atoms/form/button';
import Drawer from 'aio-global-ui/molecules/slide-drawer';
import DatabaseNameInput from 'aio-app-ui-tdc-db-atoms/database-name-input';
import DatabaseDescriptionInput from 'aio-app-ui-tdc-db-atoms/database-description-input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const [cache, setCache] = useState(id);
    const [data, setData] = useState({name:''});
    const [showAction, setShowAction] = useState(false);
    const list = helpers.json.val(props, 'details.list', []);

    const hide = () => {
        setShowAction(false)
        setCache(helpers.random.id(16));
        helpers.components.slideDrawer.hide(props.id);
    }

    const onNameChange = (val, map) => {
        const show = true;
        const d = helpers.json.copy(data);
    
        if(val){
            d.name = val;

            if(list.length > 0){
                for(const a in list){
                    let name = helpers.json.val(list[a], 'name', '');

                    if(name.toUpperCase() === val.toUpperCase()){
                        show = false;
                        break;
                    }
                }
            }
        }else{
            show = false;
        }

        setShowAction(show);
        setData(d);
    }

    const onChange = (val, map) => {
        const d = helpers.json.copy(data);
    
        if(val){
            d[map] = val;            
        }else{
            d[map] = '';
        }

        setData(d);
    }

    const onSaveResp = (resp) => {
        const valid = helpers.json.val(resp, 'valid');
        if(valid){
            window.location.reload();
        }else{
            alert('We are unable to create database, pls try again')
        }
    }

    const save = () => {
        mhelper.api.createDatabase.init(onSaveResp, data);
    }

    const actions = () => {
        if(showAction){
            return (
                <div className='full bxs flx-sb'>
                    <div>&nbsp;</div>
                    <ul className='bxs pd-t20 flx-vc'>
                        <li className='pd-l24 bxs'>
                            <Button 
                                label='Cancel'
                                buttonDs={{
                                    size:"md",
                                    theme:'002'
                                }}
                                onClick={() => {hide()}}
                            />
                        </li>
                        <li className='pd-l24 bxs'>
                            <Button 
                                label='Save'
                                buttonDs={{
                                    size:"md",
                                    theme:'000'
                                }}
                                onClick={() => {
                                    save('save')
                                }}
                            />
                        </li>
                    </ul>
                </div>
                
            )
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <Drawer 
                key={cache}
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
                    <div className='full bxs'>
                        <DatabaseNameInput 
                            {...props}
                            onChange={onNameChange}
                        />

                        <div className='full bxs pd-t30'>
                            <DatabaseDescriptionInput 
                                {...props}
                                onChange={(val) => {onChange(val, 'description')}}
                            />
                        </div>
                        {actions()}
                    </div>
                </div>
            </Drawer>
        )
    }

    return ui();
}

export default Comp;