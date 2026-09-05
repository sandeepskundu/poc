
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-access-modules';
import Button from 'aio-global-ui/atoms/form/button';
import SelectBox from 'aio-app-ui-access-atoms/select-box';
import DetailsInput from 'aio-app-ui-access-atoms/details-input';
import RolesMappingList from 'aio-app-ui-access-atoms/roles-mapping-list'


const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const pId = helpers.json.val(props, 'parent.vd.id', '');
    const pType = helpers.json.val(props, 'parent.type', '');
    const page = helpers.json.val(_siteProps_, 'router.view.page', '');
    const cate = helpers.json.val(_siteProps_, 'router.view.category', '');
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');

    const [cache, setCache] = useState(helpers.random.id(16));
    
    const d = {
        validation:{},
        data:helpers.json.val(props, 'details', {}),
    }

    const [details, setDetails] = useState(d);
    const [original, setOriginal] = useState(d);

    const onChange = (arg) => {
        let dd = helpers.json.copy(details);
            arg = helpers.json.set(arg, 'mapId', pId, false, true);
            arg = helpers.json.set(arg, 'type', pType, false, true);
            dd.data = arg;
            console.log(props);
            console.log(arg);
            setDetails(dd)
    }

    const show = () => {
        let dis = helpers.json.is.defined(details.data, {
            'name':true,
            'type':true,
            'roleMapping':true,
            'description':true,
            'actions.fetch':true,
            'actions.create':true,
            'actions.update':true,
            'actions.remove':true 
        });

        if(action === 'update' && dis){
            return !helpers.json.is.same(details.data, original.data);
        }

        return dis;
    }

    const onResp = (resp) => {
        setDetails(resp);
        setOriginal(resp);
        setCache(helpers.random.id(10));
    }

    const data = () => {
        return helpers.json.copy(details.data);
    }

    const api = () => {
        if(action === 'update' && page === 'preset' && cate === 'access'){
            mhelper.api.updatePreset.init(onResp, {
                request:{
                    data:data(),
                    params:{
                        id:helpers.json.val(details, 'data.vd.id', '')
                    }
                }
            });
        }else{
            mhelper.api.createPreset.init(onResp, {
                request:{
                    data:data()
                }
            });
        }
    }
 
    const save = (action) => {
        switch (action) {
            case 'save':
                api();
            break;
            case 'reset':
                setDetails(original);
                setCache(helpers.random.id(10));
            break;
            case 'cancel':
            break;
        }
    }

    const reset = () => {
        let c = helpers.json.is.same(original, details);

        if(!c){
            return (
                <li className='pd-l30 bxs'>
                    <Button 
                        label='Reset'
                        buttonDs={{
                            size:"md",
                            theme:'002'
                        }}
                        onClick={() => {
                            save('reset')
                        }}
                    />
                </li>
            )
        }
    }

    const buttons = () => {
        let valid = show();

        if(valid){
            return (
                <div className='full flx-sb bxs'>
                    <div>&nbsp;</div>
                    <ul className='bxs flx-vc'>
                        <li className='pd-l30 bxs'><span className='link-u cp txt-sm fl' onClick={() => {save('cancel')}}>Cancel</span></li>
                        {reset()}
                        <li className='pd-l30 bxs'>
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

    const mappingList = () => {
        let dis = helpers.json.is.defined(details.data, {
            'name':true,
            'type':true,
            'description':true
        });
        if(dis){
            return (
                <li className='full bxs'>
                    <RolesMappingList {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>
            )
        }
    }

    const actionList = () => {
        let li = helpers.json.val(props, 'configs.access.actions.types.all', []);

        return li.map((item, id) => {
            return  (
                <li className='full pd-b24 bxs'>
                    <SelectBox 
                        {...props}
                        key={cache}
                        valuemap={`actions.${item.id}`}
                        onChange={onChange}
                        details={details.data}
                        validation={details.validation}
                        optionmap="configs.access.actions.permission.type.all"
                        selectBoxProps={{
                            label:item.label
                        }}
                    />
                </li>
            )
        })
    }

    const actionsUi = () => {
        let dis = helpers.json.is.defined(details.data, {
            'name':true,
            'type':true,
            'roleMapping':true,
            'description':true
        });

        if(dis){
            return (
                <li className='full pd-b24'>
                    <p className='full bxs pd-b24 b'>Actions</p>
                    <ul className='full bxs'>
                        {actionList()}
                    </ul>
                </li>
            )
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24 hide'>
                    <DetailsInput valuemap="code" label="Code" {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <DetailsInput valuemap="name" label="Name" {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <DetailsInput valuemap="description" label="Description" {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24 hide'>
                    <SelectBox 
                        {...props}
                        key={cache}
                        valuemap="type"
                        onChange={onChange}
                        details={details.data}
                        validation={details.validation}
                        optionmap="configs.access.map.types.all"
                        selectBoxProps={{
                            label:"Type"
                        }}
                    />
                </li>

                {mappingList()}

                {actionsUi()}

                {buttons()}
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;