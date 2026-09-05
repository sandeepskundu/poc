
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-access-modules';
import Button from 'aio-global-ui/atoms/form/button';
import ApiLinkedPresetNameInput from 'aio-app-ui-access-atoms/api-linked-preset-name-input';
import ApiLinkedPresetRoleMappingList from 'aio-app-ui-access-atoms/api-linked-preset-role-mapping-list';
import ApiLinkedPresetDescriptionInput from 'aio-app-ui-access-atoms/api-linked-preset-description-input';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let dId = helpers.json.val(_siteProps_, 'router.params.id', '');

    const [cache, setCache] = useState(id);

    const d = {
        validation:{
            body:{}
        },
        data:helpers.json.val(props, 'details', {}),
    }

    const [details, setDetails] = useState(d);
    const [original, setOriginal] = useState(d);

    const onChange = (arg) => {
        let dd = helpers.json.copy(details);
            dd.data = arg;
            setDetails(dd);
            setCache(helpers.random.id(10));
    };

    const show = () => {
        const name = helpers.json.val(details.data, 'name', '');
        const roleHash = helpers.json.val(details.data, 'roleHash', '');
        const roleHashMap = helpers.json.val(details.data, 'roleHashMap', '');
        const description = helpers.json.val(details.data, 'description', '');
        const lpId = helpers.json.val(_siteProps_, 'router.params.linkedPresetId', '');

        if(!lpId){
            return (name && description && roleHash && roleHashMap);
        }else{
            return !helpers.json.is.same(original, details);
        }
    }

    const onResp = (resp) => {
        setDetails(resp);
        setOriginal(resp);
        setCache(helpers.random.id(10));
    }

    const data = () => {
        let d = helpers.json.copy(details.data);
        let lpId = helpers.json.val(_siteProps_, 'router.params.linkedPresetId', '');

        if(dId && !lpId){
            d.presetHash = dId
        }

        return d;
    }

    const create = () => {
        const d = data();
        const req = {
            request:{
                data:d
            }
        }

        mhelper.api.apiLinkedPresetCreate.init(onResp, req);
    }

    const update = () => {
        const d = data();
        const req = {
            request:{
                data:d,
                params:{
                    id:helpers.json.val(details, 'data.vd.id', '')
                }
            }
        };

        mhelper.api.apiLinkedPresetUpdate.init(onResp, req);
    }

    const save = (action) => {
        switch (action) {
            case 'save':
                let lpId = helpers.json.val(_siteProps_, 'router.params.linkedPresetId', '');

                if(lpId){
                    update();
                }else{
                    create();
                }
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

    const actions = () => {
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
        return (
            <li className='full'>
                <ApiLinkedPresetRoleMappingList {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
            </li>
        )
    }

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <ApiLinkedPresetNameInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <ApiLinkedPresetDescriptionInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                {mappingList()}

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;