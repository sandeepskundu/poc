
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-common-modules';
import Button from 'aio-global-ui/atoms/form/button';
import SelectBox from 'aio-app-ui-common-atoms/select-box';

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
                dd.data.itemId = helpers.json.val(_siteProps_, 'router.params.mId', '');
            }
            
            setDetails(dd)
    }

    const show = () => {
        let dis = helpers.json.is.defined(details.data, {
            'type':true,
            'userId':true
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
            mhelper.api.ibpUpdate.init({
                request:{
                    data:getData(),
                    params:{
                        id:helpers.json.val(details, 'data.vd.id', '')
                    }
                }
            }, onResp);
        }else{

            mhelper.api.ibpCreate.init({
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

    const employees = () => {
        if(action === 'view'){
            return (
                 <li className='full pd-b24'>
                    <SelectBox 
                        {...props}
                        key={cache}
                        valuemap="userId"
                        onChange={onChange}
                        details={details.data}
                        validation={details.validation}
                        optionmap="employees"
                        selectBoxProps={{
                            label:'User',
                            keyMapping:{
                                label:"cd.email.id",
                                selection:"id"
                            }
                        }}
                    />
                </li>
            )
        }else{
            return <p className='full bxs pd-b24 txt-sm'>Email ID: {helpers.json.val(details, 'data.ud.cd.email.id')}</p>
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs'>
               {employees()}
                <li className='full pd-b24'>
                    <SelectBox 
                        {...props}
                        key={cache}
                        valuemap="type"
                        onChange={onChange}
                        details={details.data}
                        validation={details.validation}
                        optionmap="configs.access.role.type.default"
                        selectBoxProps={{
                            label:'Type',
                            keyMapping:{
                                label:"label",
                                selection:"id"
                            }
                        }}
                    />
                </li>

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default Comp;