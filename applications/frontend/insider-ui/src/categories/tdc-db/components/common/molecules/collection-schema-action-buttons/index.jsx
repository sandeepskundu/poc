import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Button from 'aio-global-ui/atoms/form/button';

const SchemaActionButtons = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const updated = helpers.json.val(props, 'updated', {});
    const original = helpers.json.val(props, 'schema', {});
    const modified = helpers.json.val(props, 'modified', {});
    const changed = !helpers.json.is.same(updated, modified);
    const isupdated = !helpers.json.is.same(updated, original); 

    const onChange = (action) => {
        if(props.onChange){

            switch (action) {
                case 'save' :
                    props.onChange({}, [], action)
                break;
                case 'sync' :
                    props.onChange(modified, [], action)
                break;
                case 'revert' :
                    props.onChange(original, [], action);
                break;
                case 'reset' :
                    props.onChange(updated, [], action)
                break;
                default:
                break;
            }
        }
    }

    const button = (type) => {
        switch (type) {
            case 'sync' :
                if(changed){
                    return (
                        <li className='mr-r20'>
                            <Button 
                                label='Sync'
                                buttonDs={{
                                    size:"md",
                                    theme:'000'
                                }}
                                onClick={() => {onChange('sync')}}
                            />
                        </li>
                    )
                }
            break;
            case 'save' :
                if(!changed && isupdated){
                    return (
                        <li className='mr-r20'>
                            <Button 
                                label='Save'
                                buttonDs={{
                                    size:"md",
                                    theme:'000'
                                }}
                                onClick={() => {onChange('save')}}
                            />
                        </li>
                    )
                }
            break;
            case 'revert' :
                if(!changed && isupdated){
                    return (
                        <li className='mr-r20'>
                            <Button 
                                label='Rebase'
                                buttonDs={{
                                    size:"md",
                                    theme:'007'
                                }}
                                onClick={() => {onChange('revert')}}
                            />
                        </li>
                    )
                }
            break;
            case 'reset' :
                if(changed){
                    return (
                        <li className='mr-r20'>
                            <Button 
                                label='Cancel'
                                buttonDs={{
                                    size:"md",
                                    theme:'001'
                                }}
                                onClick={() => {onChange('reset')}}
                            />
                        </li>
                    )
                }
            break;
            default:
                return <></>
            break
        }
    }

    const ui = () => {
        if(changed || isupdated){
            return (
                <div className='full flx-sb bxs'>
                    <div>&nbsp;</div>
                    <ul className='flx-vc'>
                        {button('save')}
                        {button('revert')}
                        {button('sync')}
                        {button('reset')}
                    </ul>
                </div>
            )
        }
        
        return <></>
    }

    return ui();
}

export default SchemaActionButtons;