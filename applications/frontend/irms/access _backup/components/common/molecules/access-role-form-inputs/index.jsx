
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-access-modules';
import Button from 'aio-global-ui/atoms/form/button';
import AccessRoleCodeInput from 'aio-app-ui-access-atoms/access-role-code-input';
import AccessRoleNameInput from 'aio-app-ui-access-atoms/access-role-name-input';
import AccessRoleHaveChildFlag from 'aio-app-ui-access-atoms/access-role-have-childs-flag';
import AccessDescriptionInput from 'aio-app-ui-access-atoms/access-role-description-input';
import AccessRoleFromActionsCheckbox from 'aio-app-ui-access-molecules/access-role-from-actions-checkbox';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let dId = helpers.json.val(_siteProps_, 'router.params.id', '');

    const [cache, setCache] = useState(id);

    const d = {
        validation:{},
        data:helpers.json.val(props, 'details', {}),
    }

    const [details, setDetails] = useState(d);
    const [original, setOriginal] = useState(d);

    const onChange = (arg) => {
        let dd = helpers.json.copy(details);
            dd.data = arg;
            setDetails(dd)
    }

    const show = () => {
        const name = helpers.json.val(details.data, 'name', '');
        const code = helpers.json.val(details.data, 'code', '');
        const description = helpers.json.val(details.data, 'description', '');
        const mode = helpers.json.val(_siteProps_, 'router.params.action', '')

        if(mode === 'view'){
            return (name && description && code)
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
        let mode = helpers.json.val(_siteProps_, 'router.params.action', '')

        if(dId && mode === 'view'){
            d.parentId = dId
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

        if(d.hasChilds){
            if(d.parentId){
                mhelper.api.accessRoleCreateChild.init(onResp, req);
            }else{
                mhelper.api.accessRoleCreateRoot.init(onResp, req);
            }
        }else{
            if(d.parentId){
                mhelper.api.accessRoleCreateInfo.init(onResp, req);
            }else{
                mhelper.api.accessRoleCreateRoot.init(onResp, req);
            }
        }
    }

    const update = () => {
        mhelper.api.accessRoleUpdateInfo.init(onResp, {
            request:{
                data:data(),
                params:{
                    id:helpers.json.val(details, 'data.vd.id', '')
                }
            }
        });
    }

    const save = (action) => {
        switch (action) {
            case 'save':
                let mode = helpers.json.val(_siteProps_, 'router.params.action', '')
                if(mode === 'update'){
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
        let childs = helpers.json.val(details, 'data.hasChilds');

        if(!childs){
            return (
                <li className='full pd-b24'>
                    <AccessRoleFromActionsCheckbox {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>
            )
        }else{
            return <></>
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

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <AccessRoleNameInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <AccessRoleCodeInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <AccessDescriptionInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <AccessRoleHaveChildFlag  {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                {actions()}

                {buttons()}
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;