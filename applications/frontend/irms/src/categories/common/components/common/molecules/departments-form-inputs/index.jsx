
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-common-modules';
import Button from 'aio-global-ui/atoms/form/button';
import DetailsInput from 'aio-app-ui-common-atoms/details-input';
import DepartmentHaveChildFlag from 'aio-app-ui-common-atoms/have-childs-flag';



const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [cache, setCache] = useState(helpers.random.id(16));
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    const action = helpers.json.val(_siteProps_, 'router.params.action', '')

    const d = {
        validation:{},
        data:helpers.json.val(props, 'details', {}),
    }

    const [details, setDetails] = useState(d);
    const [original, setOriginal] = useState(d);

    const onChange = (arg) => {
        let dd = helpers.json.copy(details);
            dd.data = arg;

            if(id){
                dd.data.parentId = id;
            }else{
                dd.data.parentId = mId; 
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
        let d = helpers.json.copy(details.data);

        if(action === 'view' && id){
            d.parentId = id;
        }else{
            d.parentId = mId; 
        }

        return d;
    }

    const create = () => {
        const d = getData();
        const req = {
            request:{
                data:d
            }
        }

        if(id && action === 'view'){
            if(d.hasChilds){
                mhelper.api.departmentChildCreate.init(req, onResp);
            }else{
                mhelper.api.departmentInfoCreate.init(req, onResp);
            }
        }else{
            if(action === 'view' && d.hasChilds && id){
                mhelper.api.departmentChildCreate.init(req, onResp);
            }else{
                mhelper.api.departmentRootCreate.init(req, onResp);
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

        if(d.hasChilds){
            mhelper.api.departmentChildUpdate.init(req, onResp);
        }else{
            mhelper.api.departmentInfoUpdate.init(req, onResp);
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
                    <DetailsInput valuemap="code" label="Code"  {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <DetailsInput valuemap="name" label="Name"  {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <DetailsInput valuemap="description" label="Description"  {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <DepartmentHaveChildFlag  {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default Comp;