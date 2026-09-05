import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';
import Button from 'aio-global-ui/atoms/form/button';
import React, {useEffect, useState, useRef} from 'react';

const AddNewQuery = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const data = helpers.json.val(props, 'data', {});
    const vkies = helpers.json.copy(data);

    const [cache, setCache] = useState(id);
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);

    const save = (action) => {
        if(action === 'reset'){
            setValue('');
            setValid(false);
            setCache(helpers.random.id(16));
        }else{
            let d = helpers.json.copy(data);
                d[value] = '';

                if(props.onAction){
                    props.onAction(d, action, value);
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
        if(valid && value){
            return (
                <ul className='full grid-wrapper grid-layout-3 bxs pd-t20 flx-vc'>
                    <li className='grid pd-l14 bxs'>
                        <span className='link-u cp txt-sm fl' onClick={() => {save('reset')}}>Reset</span>
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
                <p className="txt-xxs full pd-b20">{props.map}</p>
                <div className='full bxs'>
                    <Input
                        key={cache}
                        value={value}
                        pattern='json-map-key'
                        label={'Enter map name'}
                        onBlur={(e) => {onBlur(e)}}
                    />
                </div>
                {buttons()}
            </div>
        )
    }

    return ui();
}

export default AddNewQuery;