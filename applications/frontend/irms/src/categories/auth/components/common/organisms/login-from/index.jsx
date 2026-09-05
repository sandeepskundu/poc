import {useState} from 'react';
import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';
import mhelper from 'aio-app-ui-auth-modules';
import EmailInput from 'aio-app-ui-auth-atoms/email-input';
import PasswordInput from 'aio-app-ui-auth-atoms/password-input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

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
        const password = helpers.json.val(details.data, 'password', '');
        const identifier = helpers.json.val(details.data, 'identifier', '');
        
        return (identifier && password);
    }

    const onResp = (resp) => {
        setDetails(resp);
    }

    const create = () => {
        mhelper.api.loginWithEmailAndPassword.init(onResp, {
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
            <div className='full bxs'>
                <div className='bxs full pd-b26'>
                    <EmailInput {...details} details={details.data} onChange={onChange} />
                </div>
                <div className='bxs full pd-b26'>
                    <PasswordInput {...details} details={details.data} onChange={onChange} />
                </div>
                <ul className='bxs full flx-sb'>
                    <li>Forgot password</li>
                    <li >{buttons()}</li>
                    
                </ul>
            </div>
        )
    }

    return ui();
}

export default Comp;