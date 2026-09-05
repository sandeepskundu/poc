
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-access-modules';
import Button from 'aio-global-ui/atoms/form/button';
import DetailsInput from 'aio-app-ui-access-atoms/details-input';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    const type = helpers.json.val(_siteProps_, 'router.params.type', '');
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');

    const [cache, setCache] = useState(helpers.random.id(16));

    console.log(props);
    
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
        let dis = helpers.json.is.defined(details.data, {
            'name':true,
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

    const data = () => {
        let d = helpers.json.copy(details.data);

        if(action === 'view'){
            d.mapId = mId;
            d.type = type
        }

        return d;
    }

    const api = () => {
        if(action === 'update'){
            mhelper.api.updateMap.init(onResp, {
                request:{
                    data:data(),
                    params:{
                        id:helpers.json.val(details, 'data.vd.id', '')
                    }
                }
            });
        }else{
            mhelper.api.createMap.init(onResp, {
                request:{
                    data:data()
                }
            });
        }
    }
 
    const save = (action) => {
        switch (action) {
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
                    <DetailsInput valuemap="name" label="Name" {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <DetailsInput valuemap="description" label="Description" {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                {buttons()}
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;