
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-orgStructs-modules';
import Button from 'aio-global-ui/atoms/form/button';
import HierarchyCodeInput from 'aio-app-ui-orgStructs-atoms/hierarchy-code-input';
import HierarchyNameInput from 'aio-app-ui-orgStructs-atoms/hierarchy-name-input';
import HierarchyTypeSelectBox from 'aio-app-ui-orgStructs-atoms/hierarchy-type-select-box';
import HierarchyHaveChildFlag from 'aio-app-ui-orgStructs-atoms/hierarchy-have-childs-flag';
import HierarchyDescriptionInput from 'aio-app-ui-orgStructs-atoms/hierarchy-description-input';

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
        const type = helpers.json.val(details.data, 'type', '');
        const description = helpers.json.val(details.data, 'description', '');
        const mode = helpers.json.val(_siteProps_, 'router.params.action', '')

        if(mode === 'view'){
            return (name && code && description && type);
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
                mhelper.api.hierarchyCreateChild.init(onResp, req);
            }else{
                mhelper.api.hierarchyCreateRoot.init(onResp, req);
            }
        }else{
            if(d.parentId){
                mhelper.api.hierarchyCreateInfo.init(onResp, req);
            }else{
                mhelper.api.hierarchyCreateRoot.init(onResp, req);
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
            mhelper.api.hierarchyUpdateChild.init(onResp, req);
        }else{
            mhelper.api.hierarchyUpdateInfo.init(onResp, req);
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

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <HierarchyTypeSelectBox {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <HierarchyCodeInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <HierarchyNameInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <HierarchyDescriptionInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <HierarchyHaveChildFlag  {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;