import helpers from 'ui-helpers';
import React, {useState} from 'react';
import Button from 'aio-global-ui/atoms/form/button';
import mhelper from 'aio-app-ui-tdc-backend-modules';
import MasterDataNameInput from 'aio-app-ui-tdc-backend-atoms/master-data-name-input';
import MasterDataExposedDetails from 'aio-app-ui-tdc-backend-atoms/master-data-exposed-input';
import MasterDataHaveChildFlag from 'aio-app-ui-tdc-backend-atoms/master-data-have-childs-flag';
import MasterDataDescriptionInput from 'aio-app-ui-tdc-backend-atoms/master-data-description-input';
import MasterDataInfoDetailsInputs from 'aio-app-ui-tdc-backend-molecules/master-data-info-details-inputs'

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let dId = helpers.json.val(_siteProps_, 'router.params.id', '');

    const [cache, setCache] = useState(id);
    const [details, setDetails] = useState(helpers.json.val(props, 'details', {}));
    const [original, setOriginal] = useState(helpers.json.val(props, 'details', {}));


    const onChange = (arg) => {
        setDetails(arg)
    }

    const infoDetails = () => {
        if(details.hasChilds){
            return <></>
        }else{
            return (
                <li className='full pd-b24'>
                    <MasterDataInfoDetailsInputs {...props} details={details} key={cache} onChange={onChange} />
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
                mhelper.api.createChildMasterData.init(onResp, req);
            }else{
                mhelper.api.createRootMasterData.init(onResp, req);
            }
        }else{
            mhelper.api.addMasterDataInfo.init(onResp, req);
        }
    }

    const update = () => {
        mhelper.api.updateMasterDataInfo.init(onResp, {
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
                    <MasterDataNameInput {...props} details={details} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <MasterDataDescriptionInput {...props} details={details} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <MasterDataExposedDetails {...props} details={details} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <MasterDataHaveChildFlag  {...props} details={details} key={cache} onChange={onChange} />
                </li>

                {infoDetails()}

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;