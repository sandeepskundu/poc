import { useState } from 'react';
import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';
import mhelper from 'aio-app-ui-tdc-interface-kit-modules';
import UiComponentNameInput from 'aio-app-ui-tdc-interface-kit-atoms/ui-component-name-input';
import UiComponentExposedInput from 'aio-app-ui-tdc-interface-kit-atoms/ui-component-exposed-input';
import UiComponentAtomicOptions from 'aio-app-ui-tdc-interface-kit-atoms/ui-component-atomic-options';
import UiComponentHaveChildFlag from 'aio-app-ui-tdc-interface-kit-atoms/ui-component-have-childs-flag';
import UiComponentPathPrefixInput from 'aio-app-ui-tdc-interface-kit-atoms/ui-component-path-prefix-input';
import UiComponentDescriptionInput from 'aio-app-ui-tdc-interface-kit-atoms/ui-component-description-input';
import UiComponentInfoDetailsInputs from 'aio-app-ui-tdc-interface-kit-molecules/ui-component-info-details-inputs';
import UiComponentHaveAtomicMethodology from 'aio-app-ui-tdc-interface-kit-atoms/ui-component-have-atomic-methodology'

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let parent = helpers.json.val(props, 'componentData', {});
    let dId = helpers.json.val(_siteProps_, 'router.params.id', '');
    let hasAtomicChilds = helpers.json.val(props, 'componentData.hasAtomicChilds', false);

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
                    <UiComponentInfoDetailsInputs {...props} details={details} key={cache} onChange={onChange} />
                </li>
            )
        }
    }

    const show = () => {
        const name = helpers.json.val(details, 'name', '');
        const value = helpers.json.val(details, 'details.name', '');
        const label = helpers.json.val(details, 'details.description', '');
        const hasChilds = helpers.json.val(details, 'hasChilds', '');
        const description = helpers.json.val(details, 'description', '');
        const mode = helpers.json.val(_siteProps_, 'router.params.action', '')

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
                mhelper.api.createChildComponent.init(onResp, req);
            }else{
                mhelper.api.createRootCmsData.init(onResp, req);
            }
        }else{
            mhelper.api.createComponent.init(onResp, req);
        }
    }

    const update = () => {
        mhelper.api.updateComponent.init(onResp, {
            request:{
                data:data(),
                params:{
                    id:helpers.json.val(details, 'vd.id', '')
                }
            }
        });
    }

    const updateAtomic = () => {
        mhelper.api.updateAtomicComponents.init(onResp, {
            request:{
                data:data(),
                params:{
                    id:helpers.json.val(details, 'vd.id', '')
                }
            }
        });
    }

    const createAtomic = () => {
        mhelper.api.createAtomicComponents.init(onResp, {
            request:{
                data:data()
            }
        });
    }

    const save = (action) => {
        switch (action) {
            case 'save':
                let mode = helpers.json.val(_siteProps_, 'router.params.action', '');

                if(hasAtomicChilds){
                    if(mode === 'update'){
                        updateAtomic();
                    }else{
                        createAtomic();
                    }
                }else{
                    if(mode === 'update'){
                        update();
                    }else{
                        create();
                    }
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

    const atomic = () => {
        if(hasAtomicChilds){
            return <li className='full pd-b24'><UiComponentAtomicOptions {...props} details={details} key={cache} onChange={onChange} /></li>
        }else{
            return <li className='full pd-b24'><UiComponentHaveAtomicMethodology {...props} details={details} key={cache} onChange={onChange} /></li>
        }
    }

    const pathPrefix = () => {
        let hasChilds = helpers.json.val(details, 'hasChilds', '');

        if(dId && hasChilds){
            return <li className='full pd-b24'><UiComponentPathPrefixInput {...props} details={details} key={cache} onChange={onChange} /></li>
        }else{
            return <></>    
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <UiComponentNameInput {...props} details={details} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <UiComponentDescriptionInput {...props} details={details} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <UiComponentExposedInput {...props} details={details} key={cache} onChange={onChange} />
                </li>

                {pathPrefix()}

                {atomic()}  

                <li className='full pd-b24'>
                    <UiComponentHaveChildFlag  {...props} details={details} key={cache} onChange={onChange} />
                </li>

                {infoDetails()}

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;