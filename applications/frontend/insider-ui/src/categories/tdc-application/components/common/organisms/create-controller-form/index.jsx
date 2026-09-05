import helpers from 'ui-helpers';
import React, {useEffect, useState} from 'react';
import Button from 'aio-global-ui/atoms/form/button';
import mhelper from 'aio-app-ui-tdc-application-modules';
import ControllerNameInput from 'aio-app-ui-tdc-application-atoms/controller-name-input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let list = helpers.json.val(props, 'details.data.results', []);
    let app = helpers.json.val(props, 'details.data.appDetails', {});
    let type = helpers.json.val(_siteProps_, 'router.params.type', '');
    let details = {
        name:'',
        type:type,
        appId:helpers.json.val(app, 'vd.id', ''),
        dbId:helpers.json.val(app, 'appConfig.dbConfigs.dbId', ''),
        parentId:helpers.json.val(_siteProps_, 'router.params.parentId', '')
    }

    const [data, setData] = useState(details);

    const hide = () => {
        setShowAction(false)
        setCache(helpers.random.id(16));
        helpers.components.slideDrawer.hide(props.id);
    }

    const isvalid = (val, map) => {
        let rval = true;

        if(map === 'name'){
            if(list.length > 0){
                for(const a in list){
                    let v = val.toUpperCase();
                    let n = helpers.json.val(list[a], 'name', '');
                        n = n.toUpperCase();

                    if(v === n){
                        rval = false;
                        break;
                    }
                }
            }else{
                if(!val){
                    rval = false;
                }
            }
        }

        return rval;
    }

    const onChange = (val, map) => {
        let valid = isvalid(val, map)
        let d = helpers.json.copy(details);

        if(valid){
            d = helpers.json.set(d, map, val, false, true);
            details = d;
            setData(d);
        }
    }

    const onSaveResp = (resp) => {
        const valid = helpers.json.val(resp, 'valid');
        if(valid){
            window.location.reload();
        }else{
            alert(`We are unable to create ${type}, pls try again`)
        }
    }

    const save = () => {
        mhelper.api.createController.init(onSaveResp, data);
    }

    const showBtn = () => {
        let dbId = helpers.json.val(data, 'dbId');
        let name = helpers.json.val(data, 'name');
        let type = helpers.json.val(data, 'type');
        let appId = helpers.json.val(data, 'appId');
        let parentId = helpers.json.val(data, 'parentId');

        if(dbId && type && appId && name){
            if(type != 'controller'){
                if(parentId){
                    return true;
                }else{
                    return false;
                }
            }else{
                return true;
            }
        }else{
            return false;
        }
    }

    const actions = () => {
        if(showBtn()){
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
            <div className='full bxs'>
                <div className='full pd-b24'>
                    <ControllerNameInput
                        {...props}
                        details={data}
                        onChange={(val) => {onChange(val, 'name')}}
                    />
                </div>
                {actions()}
            </div>
        )
    }

    return ui();
}

export default Comp;