import helpers from 'ui-helpers';
import React, {useState} from 'react';
import Button from 'aio-global-ui/atoms/form/button';

const AddNewQuery = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type', '');
    const map = helpers.json.val(props, 'mapping', []);
    const validation = helpers.json.val(props, 'validation', {});

    const message = (rval) => {
        let msg = helpers.json.val(rval, 'message', {});

        for(const a in msg){
            for(const b in msg[a]){
                let m = [a, b];

                if(type != 'default'){
                    m.push('checks');
                }

                m.push(type);

                helpers.json.remove(msg, m.join('.'));
            }
        }

        helpers.json.remove(rval, 'message');
        
        return helpers.json.set(rval, 'message', msg);
    }

    const clear = () => {
        let rval = helpers.json.copy(validation);

        if(type === 'default'){
            rval.valuemap = {};
        }else{
            let vm = `checks.${type}`;
                helpers.json.remove(rval, vm);
        }

        rval = message(rval);
        map.pop();

        if(props.onChange){
            props.onChange(rval, map.join('.'), true);
        }
    }

    const save = (action) => {
        let mv = [...map];

        if(props.clear && action === 'delete'){
            clear();
        }else{
            if(map && map.length > 1){
                if(props.onAction){
                    props.onAction(false, mv.join('.'), action, true);
                }
            }else{
                if(props.onAction){
                    props.onAction({}, mv.join('.'), action, true);
                }
            }
        }
    }    

    const buttons = () => {
        return (
            <ul className='full grid-wrapper grid-layout-3 bxs flx-vc'>
                <li className='grid pd-l14 bxs'>&nbsp;</li>
                <li className='grid pd-r14 bxs'>
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
                        label='Delete'
                        buttonDs={{
                            size:"md",
                            theme:'000'
                        }}
                        onClick={() => {
                            save('delete')
                        }}
                    />
                </li>
            </ul>
        )
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                <p className='full bxs txt-md full pd-b8'>Are you sure you want to {props.clear?'clear':'delete'} below validation node?</p>
                <p className="txt-xxs full pd-b20 b">{map.join('.')}</p>
                {buttons()}
            </div>
        )
    }

    return ui();
}

export default AddNewQuery;