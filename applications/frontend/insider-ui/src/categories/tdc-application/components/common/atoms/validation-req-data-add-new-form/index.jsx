import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';
import Button from 'aio-global-ui/atoms/form/button';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import React, {useEffect, useState, useRef} from 'react';

const AddNewQuery = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const type = helpers.json.val(props, 'type', {});
    const validation = helpers.json.val(props, 'validation', {});
    const map = helpers.json.val(props, 'mapping', []);
    const vkies = helpers.json.copy(validation);

    const [cache, setCache] = useState(id);
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const [virtual, setVirtual] = useState(false);

    const onChange = (checked) => {
        setVirtual(checked)
    }

    const save = (action) => {
        if(action === 'reset'){
            setValue('');
            setValid(false);
            setCache(helpers.random.id(16));
        }else{
            let rval = {};
            let mv = [...map, value];

            if(virtual){
                rval = helpers.json.merge(rval, {
                    virtual:{
                        validation:{
                            map:'',
                            enabled:true
                        }
                    }
                })
            }

            if(props.onAction){
                props.onAction(rval, mv.join('.'), action);
            }
        }
    }

    const onBlur = (e) => {
        let val = helpers.json.val(e, 'target.value', '');

            setValue(val);

            if(vkies[val]){
                setValid(false)
            }else{
                setValid(true)
            }
    }

    const buttons = () => {
        if(valid){
            return (
                <ul className='full grid-wrapper grid-layout-3 bxs pd-t20 flx-vc'>
                    <li className='grid pd-l14 bxs'>
                        <span className='link-u cp txt-sm fl'
                            onClick={() => {
                                save('reset')
                            }}
                        >Reset</span>
                    </li>
                    <li className='grid pd-l14 bxs'>
                        <Button 
                            label='Cancel'
                            buttonDs={{
                                size:"md",
                                theme:'002'
                            }}
                            onClick={() => {
                                save('cancel')
                            }}
                        />
                    </li>
                    <li className='grid pd-l14 bxs'>
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
            )
        }
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                <p className="txt-xxs full pd-b20">{map.join('.')}</p>
                <div className='full bxs'>
                    <Input
                        key={cache}
                        value={value}
                        pattern='json-map-key'
                        label={'Data mapping node'}
                        onBlur={(e) => {onBlur(e)}}
                    />
                </div>
                <div className='full bxs pd-t20'>
                     <Toggle 
                        label='Virtual validation'
                        checked={virtual}
                        onChange={(checked) => {
                            onChange(checked);
                        }}
                    />
                </div>
                {buttons()}
            </div>
        )
    }

    return ui();
}

export default AddNewQuery;