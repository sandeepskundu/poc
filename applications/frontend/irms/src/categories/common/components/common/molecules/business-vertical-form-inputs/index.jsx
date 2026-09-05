
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-common-modules';
import Button from 'aio-global-ui/atoms/form/button';
import BusinessVerticalCodeInput from 'aio-app-ui-common-atoms/business-vertical-code-input';
import BusinessVerticalNameInput from 'aio-app-ui-common-atoms/business-vertical-name-input';
import BusinessVerticalHaveChildFlag from 'aio-app-ui-common-atoms/business-vertical-have-childs-flag';
import BusinessVerticalDescriptionInput from 'aio-app-ui-common-atoms/business-vertical-description-input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let iId = helpers.json.val(_siteProps_, 'router.params.id', '');
    let pId = helpers.json.val(_siteProps_, 'router.params.pId', '');
    let buId = helpers.json.val(_siteProps_, 'router.params.buId', '');
    let action = helpers.json.val(_siteProps_, 'router.params.action', '')

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
            dd.data.parentId = pId || buId;
            setDetails(dd)
    }

    const show = () => {
        let dis = helpers.json.is.defined(details.data, {
            'name':true,
            'code':true,
            'description':true
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

    const getData = () => {
        return helpers.json.copy(details.data);
    }

    const create = () => {
        const d = getData();
        const req = {
            request:{
                data:d
            }
        }

        if(iId && action === 'view'){
            if(d.hasChilds){
                mhelper.api.businessVerticalChildCreate.init(req, onResp);
            }else{
                mhelper.api.businessVerticalInfoCreate.init(req, onResp);
            }
        }else{
            if(buId && action === 'view' && d.hasChilds){
                mhelper.api.businessVerticalChildCreate.init(req, onResp);
            }else{
                mhelper.api.businessVerticalRootCreate.init(req, onResp);
            }
        }
    }

    const update = () => {
        const d = getData();
        const req = {
            request:{
                data:d,
                params:{
                    id:helpers.json.val(details, 'data.vd.id', '')
                }
            }
        };

        if(d.parentId === buId){
            mhelper.api.businessVerticalRootUpdate.init(req, onResp);
        }else{
            if(d.hasChilds){
                mhelper.api.businessVerticalChildUpdate.init(req, onResp);
            }else{
                mhelper.api.businessVerticalInfoUpdate.init(req, onResp);
            }
        }
    }

    const save = (type) => {
        switch (type) {
            case 'save':
                if(action === 'update'){
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
                    <BusinessVerticalCodeInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <BusinessVerticalNameInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <BusinessVerticalDescriptionInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <BusinessVerticalHaveChildFlag  {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default Comp;