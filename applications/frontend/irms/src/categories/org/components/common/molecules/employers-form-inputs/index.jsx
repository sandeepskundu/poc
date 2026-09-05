
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-org-modules';
import Button from 'aio-global-ui/atoms/form/button';
import EmployersCodeInput from 'aio-app-ui-org-atoms/employers-code-input';
import EmployersNameInput from 'aio-app-ui-org-atoms/employers-name-input';
import EmployersDescriptionInput from 'aio-app-ui-org-atoms/employers-description-input';

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

    const create = () => {
        const req = {
            request:{
                data:helpers.json.copy(details.data)
            }
        }
        mhelper.api.employerCreate.init(req, onResp);
    }

    const update = () => {
        const req = {
            request:{
                data:helpers.json.copy(details.data),
                params:{
                    id:helpers.json.val(details, 'data.vd.id', '')
                }
            }
        };
        mhelper.api.employerUpdate.init(req, onResp);
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
                    <EmployersCodeInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <EmployersNameInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                <li className='full pd-b24'>
                    <EmployersDescriptionInput {...props} details={details.data} validation={details.validation} key={cache} onChange={onChange} />
                </li>

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default Comp;