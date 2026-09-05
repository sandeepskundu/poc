import { useState } from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-tdc-cms-modules';
import Button from 'aio-global-ui/atoms/form/button';
import UiTemplateNameInput from 'aio-app-ui-tdc-cms-atoms/ui-template-name-input';
import UiTemplateExposedDetails from 'aio-app-ui-tdc-cms-atoms/ui-template-exposed-input';
import UiTemplateHaveChildsFlag from 'aio-app-ui-tdc-cms-atoms/ui-template-have-childs-flag';
import UiTemplateDescriptionInput from 'aio-app-ui-tdc-cms-atoms/ui-template-description-input';
import UiTemplateDataDetailsInputs from 'aio-app-ui-tdc-cms-molecules/ui-template-data-details-inputs'

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let dId = helpers.json.val(_siteProps_, 'router.params.id', '');

    const [cache, setCache] = useState(id);
    const [details, setDetails] = useState(helpers.json.val(props, 'details', {}));
    const [original, setOriginal] = useState(helpers.json.val(props, 'details', {}));

    const onChange = (arg) => {
        setDetails(arg);
        setCache(helpers.random.id(16));
    }

    const infoDetails = () => {
        if(details.hasChilds){
            return <></>
        }else{
            return (
                <li className='full pd-b24'>
                    <UiTemplateDataDetailsInputs {...props} details={details} key={cache} onChange={onChange} />
                </li>
            )
        }
    }

    const show = () => {
        const name = helpers.json.val(details, 'name', '');
        const value = helpers.json.val(details, 'details.value', '');
        const label = helpers.json.val(details, 'details.label', '');
        const hasChilds = helpers.json.val(details, 'hasChilds', '');
        const description = helpers.json.val(details, 'description', '');
        const mode = helpers.json.val(_siteProps_, 'router.params.action', '');

        if(mode === 'view'){
            if(hasChilds){
                return (name && description)
            }else{
                return (name && description && value && label)
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
        let d = helpers.json.copy(details);
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
                mhelper.api.createChildUiTemplateData.init(onResp, req);
            }else{
                mhelper.api.createRootUiTemplateData.init(onResp, req);
            }
        }else{
            mhelper.api.addUiTemplateDataInfo.init(onResp, req);
        }
    }

    const update = () => {
        mhelper.api.updateCmsDataInfo.init(onResp, {
            request:{
                data:data(),
                params:{
                    id:helpers.json.val(details, 'vd.id', '')
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
                    <UiTemplateNameInput {...props} details={details} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <UiTemplateDescriptionInput {...props} details={details} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <UiTemplateExposedDetails {...props} details={details} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <UiTemplateHaveChildsFlag  {...props} details={details} key={cache} onChange={onChange} />
                </li>

                {infoDetails()}

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;