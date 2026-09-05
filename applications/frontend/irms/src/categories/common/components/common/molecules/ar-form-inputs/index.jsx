
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-common-modules';
import Button from 'aio-global-ui/atoms/form/button';
import DetailsInput from 'aio-app-ui-common-atoms/details-input';
import HaveChildFlag from 'aio-app-ui-common-atoms/have-childs-flag';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
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

            if(action === 'view'){
                dd.data.mapId = helpers.json.val(_siteProps_, 'router.params.mId', '');
                dd.data.linkFor = helpers.json.val(_siteProps_, 'router.params.linkFor', '')
            }
            
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

    const api = () => {
        if(action === 'update'){
            mhelper.api.accessRoleUpdate.init({
                request:{
                    data:getData(),
                    params:{
                        id:helpers.json.val(details, 'data.vd.id', '')
                    }
                }
            }, onResp);
        }else{
            mhelper.api.accessRoleCreate.init({
                request:{
                    data:getData()
                }
            }, onResp);
        }
    }

    const save = (type) => {
        switch (type) {
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
                    <DetailsInput valuemap="code" label="Code" {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <DetailsInput valuemap="name" label="Name" {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <DetailsInput valuemap="description" label="Description" {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <HaveChildFlag  {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default Comp;