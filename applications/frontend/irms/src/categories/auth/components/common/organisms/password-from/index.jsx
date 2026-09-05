import {useState} from 'react';
import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';
import mhelper from 'aio-app-ui-auth-modules';
import OtpInput from 'aio-app-ui-auth-atoms/otp-input';
import EmailInput from 'aio-app-ui-auth-atoms/email-input';
import PasswordInput from 'aio-app-ui-auth-atoms/password-input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const action = helpers.json.val(_siteProps_, 'router.params.action', 'reset')

    const d = {
        data:{},
        validation:{}
    }
    
    const [details, setDetails] = useState(d);

    const onChange = (arg) => {
        let dd = helpers.json.copy(details);
            dd.data = arg;
            setDetails(dd);
    };

    const show = () => {
        
        switch(action) {
            case 'reset':
                return helpers.json.val(details.data, 'identifier', '');
            break;
            case 'create':
                let pass = helpers.json.val(details.data, 'password', '');
                let otp = helpers.json.val(details.data, 'otp.email', '');
                let cpass = helpers.json.val(details.data, 'confirmPassowrd', '');
                

                return (pass && cpass && otp);
            break;
            default:
                return helpers.json.val(details.data, 'identifier', '');

        }
    }

    const onResp = (resp) => {
        setDetails(resp);
    }

    const sendOtpApi = () => {
        mhelper.api.sendOtpOnEMailToCreatePassword.init(onResp, {
            request:{
                data:helpers.json.copy(details.data)
            }
        });
    }

    const createPasswordApi = () => {
        mhelper.api.validateEmailOtpToCreatePasswork.init(onResp, {
            request:{
                data:helpers.json.merge(helpers.json.copy(details.data), {
                    trackId:helpers.json.val(_siteProps_, 'router.params.trackId', ''),
                    otp:{
                        token:helpers.json.val(_siteProps_, 'router.params.otpToken', '')
                    }
                })
            }
        });
    }

    const initApi = () => {
        switch(action) {
            case 'reset':
                sendOtpApi();
            break;
            case 'create':
                return createPasswordApi()
            break;
            default:
                sendOtpApi();
        }
    }

    const buttons = () => {
        let valid = show();

        if(valid){
            return (
                <Button 
                    label='Send Otp'
                    buttonDs={{
                        size:"md",
                        theme:'000'
                    }}
                    onClick={() => {initApi()}}
                />
            )
        }else{
            return <></>
        }
    }

    const sendOtpUi = () => {
        return (
            <div className='full bxs'>
                <div className='bxs full pd-b26'>
                    <EmailInput {...details} details={details.data} onChange={onChange} />
                </div>
                <div className='bxs full pd-b26 hide'>
                    <PasswordInput {...details} details={details.data} onChange={onChange} />
                </div>
                <ul className='bxs full flx-sb'>
                    <li >{buttons()}</li>
                </ul>
            </div>
        )
    }

    const createPasswordUi = () => {
        return (
            <div className='full bxs'>
                <div className='bxs full pd-b26'>
                    <PasswordInput {...details} details={details.data} onChange={onChange} />
                </div>
                <div className='bxs full pd-b26'>
                    <PasswordInput {...details} details={details.data} onChange={onChange} label='Confirm Passowrd' mapnode="confirmPassowrd" />
                </div>

                <div className='bxs full pd-b26'>
                    <OtpInput {...details} details={details.data} onChange={onChange} label='Confirm Passowrd' mapnode="otp.email" />
                </div>

                <ul className='bxs full flx-sb'>
                    <li >{buttons()}</li>
                </ul>
            </div>
        )
    }

    const ui = () => {
        switch(action) {
            case 'reset':
                return sendOtpUi()
            break;
            case 'create':
                return createPasswordUi()
            break;
            default:
                return sendOtpUi()
        }
    }

    return ui();
}

export default Comp;