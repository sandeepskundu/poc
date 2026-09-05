import{useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-tdc-ds-modules';
import Button from 'aio-global-ui/atoms/form/button';
import DsNameInput from 'aio-app-ui-tdc-ds-atoms/ds-name-input';
import DsCodeInput from 'aio-app-ui-tdc-ds-atoms/ds-code-input';
import DsDescriptionInput from 'aio-app-ui-tdc-ds-atoms/ds-description-input'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.merge({
        name:'',
        code:'',
        description:''
    }, helpers.json.val(props, 'data', {}));

    const [data, setData] = useState(details);

    const onChange = (arg, type) => {
        setData(arg);

        console.log(arg);
    }

    const hide = () => {
        helpers.components.slideDrawer.hide(props.id);
    }

    const onSaveResp = (resp) => {
        const valid = helpers.json.val(resp, 'valid');
        if(valid){
            window.location.reload();
        }else{
            alert(`We are unable to create ${type}, pls try again`)
        }
    }

    const save = () => {
        //mhelper.api.createController.init(onSaveResp, data);
    }

    const showBtn = () => {
        let name = helpers.json.val(data, 'name');
        let code = helpers.json.val(data, 'code');
        let desc = helpers.json.val(data, 'description');

        return (name && code && desc)
    }

    const actions = () => {
        if(showBtn()){
            return (
                <div className='full bxs flx-sb'>
                    <div>&nbsp;</div>
                    <ul className='bxs pd-t20 flx-vc'>
                        <li className='pd-l24 bxs'>
                            <Button 
                                label='Cancel'
                                buttonDs={{
                                    size:"md",
                                    theme:'002'
                                }}
                                onClick={() => {hide()}}
                            />
                        </li>
                        <li className='pd-l24 bxs'>
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
            <div className='full bxs'>
                <div className='full pd-b24'>
                    <DsNameInput
                        {...props}
                        details={data}
                        onChange={(arg) => {onChange(arg, 'name')}}
                    />
                </div>
                <div className='full pd-b24'>
                    <DsCodeInput 
                        {...props}
                        details={data}
                        onChange={(arg) => {onChange(arg, 'code')}}
                    />
                </div>
                <div className='full pd-b24'>
                    <DsDescriptionInput 
                        {...props}
                        details={data}
                        onChange={(arg) => {onChange(arg, 'description')}}
                    />
                </div>
                {actions()}
            </div>
        )
    }

    return ui();
}

export default Comp;