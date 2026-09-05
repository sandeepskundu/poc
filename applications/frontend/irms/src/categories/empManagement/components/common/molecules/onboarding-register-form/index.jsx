import {useState} from 'react';
import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';
import mhelper from 'aio-app-ui-empManagement-modules';
import EmailInput from 'aio-app-ui-empManagement-atoms/email-input';
import MobileInput from 'aio-app-ui-empManagement-atoms/mobile-input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const d = {
        validation:{},
        data:helpers.json.val(props, 'details', {
            mobile:{
                number:88264209
            }
        }),
    }
    
    const [details, setDetails] = useState(d);
    const [original, setOriginal] = useState(d); 

    const onChange = (arg) => {
        let dd = helpers.json.copy(details);
            dd.data = helpers.json.merge({
                mobile:{
                    isd:91,
                    iso2:"IN",
                    iso3:"IND"
                }
            }, arg);
            setDetails(dd);
            //setCache(helpers.random.id(10));
    };

    const show = () => {
        const email = helpers.json.val(details.data, 'email.id', '');
        const mobile = helpers.json.val(details.data, 'mobile.number', '');
        
        return (email && mobile);
    }

    const onResp = (resp) => {
        setDetails(resp);
    }

    const create = () => {
        mhelper.api.createEmployeeAccount.init(onResp, {
            request:{
                data:helpers.json.copy(details.data)
            }
        });
    }

    const buttons = () => {
        let valid = show();

        if(valid){
            return (
                <Button 
                    label='Save'
                    buttonDs={{
                        size:"md",
                        theme:'000'
                    }}
                    onClick={() => {create()}}
                />
            )
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs pd-tb24 grid-wrapper grid-layout-3'>
                <li className='bxs grid pd-r20'><EmailInput {...details} details={details.data} onChange={onChange} /></li>
                <li className='bxs grid pd-r20'><MobileInput {...details} details={details.data} onChange={onChange} /></li>
                <li className='bxs grid pd-r20'>{buttons()}</li>
            </ul>
        )
    }

    return ui();
}

export default Comp;