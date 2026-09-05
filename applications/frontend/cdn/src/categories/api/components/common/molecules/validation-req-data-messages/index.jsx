import React from 'react';
import helpers from 'ui-helpers';
import ValidationMessageInput from 'aio-app-ui-api-atoms/validation-req-data-message-input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const check = helpers.json.val(props, 'check', 'default');
    const languages = helpers.json.val(props, 'configs.languages', {});
    const messages = helpers.json.val(props, 'validation.message', {});

    const dm =  {
        "en":{
            "error":{
                "default":"IN",
                "checks":{
                    "regex":"",
                    "enums":"",
                    "minvalue":"",
                    "maxvalue":"",
                    "minlength":"",
                    "maxlength":"",
                    "required":"This field is required."
                }
            }, 
            "success":{
                "default":"IN",
                "checks":{
                    "regex":"",
                    "enums":"",
                    "minvalue":"",
                    "maxvalue":"",
                    "minlength":"",
                    "maxlength":"",
                    "required":"This field is required."
                }
            }
        }
    }

    const onChange = (arg, map) => {
        let d = helpers.json.copy(messages || {});
            d = helpers.json.merge(d, arg || {});

            if(props.onChange){
                props.onChange(arg, 'message');
            }
    }

    const map = (lang, type) => {
        let rv = [lang, type];

        if(check != 'default'){
            rv.push('checks');
        }

        rv.push(check);

        return rv.join('.');
    }

    const options = (type, code, lang) => {
        return (
            <ValidationMessageInput
                messages={messages}
                map={map(code, type)}
                details={props.details}
                configs={props.configs}
                onChange={(arg) => {onChange(arg)}}
                label={helpers.string.transform.camelize(type)+' message'}
            />
        )
    }

    const ui = () => {
        let li = helpers.json.toList(languages);

        if(li && li.length > 0){
            return li.map((arg, i) => {
                const code = helpers.json.val(arg, 'id');
                const lebel = helpers.json.val(arg, 'label');

                return (
                    <div className='full pd-b36 grid-wrapper flx-vc' key={id+i}>
                        <div className='grid-w1 flx-vc'>
                            <p className=''>{lebel}</p>
                        </div>
                        <div className='full grid-wrapper grid-w11'>
                            <div className='grid-w6 pd-r10'>
                                {options('error', code, lebel)}
                            </div>
                            <div className='grid-w6 pd-l16'>
                                {options('success', code, lebel)}
                            </div>
                        </div>
                        
                    </div>
                )
            })
        }
    }

    return (
        <div className='full bxs'>
            {ui()}
        </div>
    );
}

export default Comp;