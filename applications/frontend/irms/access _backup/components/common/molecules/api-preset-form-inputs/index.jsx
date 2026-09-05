
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-access-modules';
import Button from 'aio-global-ui/atoms/form/button';
import ApiPresetCodeInput from 'aio-app-ui-access-atoms/api-preset-code-list';
import ApiPresetNameInput from 'aio-app-ui-access-atoms/api-preset-name-input';
import ApiPresetHaveChildFlag from 'aio-app-ui-access-atoms/api-preset-have-childs-flag';
import ApiPresetDescriptionInput from 'aio-app-ui-access-atoms/api-preset-description-input';
import ApiPresetDepartRoleMappingList from 'aio-app-ui-access-atoms/api-preset-depart-role-mapping-list';
import ApiPresetLinkedListUi from 'aio-app-ui-access-organisms/api-presets-linked-list-ui';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let blank = helpers.json.val(props, 'blank');
    let code = helpers.json.val(props, 'presetData.code')
    let pId = helpers.json.val(props, 'presetData.hashId', '');
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

    const showMapping = () => {
        let code = helpers.json.val(details, 'data.code', '');
        let childs = helpers.json.val(details, 'data.hasChilds', false);

        return ((childs || code === 'ORG-GLOBAL') || dId === '');
    }

    const mappingList = () => {
        if(showMapping()){
            return <></>
        }else{
            return (
                <li className='full'>
                    <ApiPresetDepartRoleMappingList {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>
            )
        }
    }

    const show = () => {
        const name = helpers.json.val(details.data, 'name', '');
        const hasChilds = helpers.json.val(details.data, 'hasChilds', '');
        const description = helpers.json.val(details.data, 'description', '');
        const mode = helpers.json.val(_siteProps_, 'router.params.action', '');
        const dHash = helpers.json.val(details.data, 'departOrRoleHash', '');
        const dHashMapping = helpers.json.val(details.data, 'departOrRoleHashMap', '');

        if(mode === 'view'){
            if(hasChilds || code === 'ORG-GLOBAL'){
                return (name && description)
            }else{
                return (name && description && dHash && dHashMapping);
            }
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
            d.code = code;
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
                mhelper.api.apiPresetCreateChild.init(onResp, req);
            }else{
                mhelper.api.apiPresetCreateRoot.init(onResp, req);
            }
        }else{
            if(d.parentId){
                if(code === 'ORG-GLOBAL'){
                    mhelper.api.apiPresetCreateInfo.init(onResp, req);
                }else{
                    mhelper.api.apiPresetCreateInfoLinkedByRoleOrDepart.init(onResp, req);
                }
            }else{
                mhelper.api.apiPresetCreateRoot.init(onResp, req);
            }
        }
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

        if(d.hasChilds){
            mhelper.api.apiPresetUpdateChild.init(onResp, req);
        }else{
            if(code === 'ORG-GLOBAL'){
                mhelper.api.apiPresetUpdateInfo.init(onResp, req);
            }else{
                mhelper.api.apiPresetUpdateInfoLinkedByRoleOrDepart.init(onResp, req);
            }
        }
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

    const codeList = () => {
        if(dId === ''){
            return (
                <li className='full pd-b24'>
                    <ApiPresetCodeInput {...props} details={details.data} validation={details.validation || {}} key={cache} onChange={onChange} />
                </li>
            )
        }else{
            return <></>
        }
    }

    const linkedPreset = () => {
        let valid = show();
        let hasChilds = helpers.json.val(details, 'data.hasChilds', true);

        if(pId && hasChilds === false && !blank && !valid){
            return <ApiPresetLinkedListUi {...props} />
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs'>
                {codeList()}

                <li className='full pd-b24'>
                    <ApiPresetNameInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <ApiPresetDescriptionInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <ApiPresetHaveChildFlag  {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                {mappingList()}

                {actions()}

                <li className='full bxs'>
                    {linkedPreset()}
                </li>
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;