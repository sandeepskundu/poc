import helpers from 'ui-helpers';
import React, {useRef, useEffect} from 'react';
import Button from 'aio-global-ui/atoms/form/button';

const CollectionConfigs = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const original = helpers.json.val(props, 'collection', {});
    const modified = helpers.json.val(props, 'modified', {});
    const changed = !helpers.json.is.same(original, modified);

    const onChange = (action) => {
        if(props.onChange){

            switch (action) {
                case 'reset':
                    props.onChange(original)
                break;
                case 'save':
                case 'fetch':
                    props.onChange(modified, action)
                break;
                default:
                break
            }
        }
    }

    const show = (() => {
        let dbId = helpers.json.val(modified, 'dbId');
        let name = helpers.json.val(modified, 'name');

        return dbId && name && changed;
    })();

    const save = () => {
        let typ = helpers.json.val(modified, 'type');

        if(typ === 'create'){
            return (
                <li className='pd-l20'>
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
        }else{
            return <></>
        }
    }

    const fetch = () => {
        let typ = helpers.json.val(modified, 'type');

        if(typ != 'create'){
            return (
                <li className='pd-l20'>
                    <Button 
                        label='Get Details'
                        buttonDs={{
                            size:"md",
                            theme:'000'
                        }}
                        onClick={() => {onChange('fetch')}}
                    />
                </li>
            )
        }else{
            return <></>
        }
    }

    const ui = () => {
        if(show){
            return (
                <div className='full flx-sb pd-t8 bxs'>
                    <div>&nbsp;</div>
                    <ul className='flx-vc'>
                        {save()}
                        {fetch()}
                        <li className='pd-l20'>
                            <Button 
                                label='Reset'
                                buttonDs={{
                                    size:"md",
                                    theme:'001'
                                }}
                                onClick={() => {onChange('reset')}}
                            />
                        </li>
                    </ul>
                </div>
                
            )
        }else{
            return <></>
        }
        
    }

    return ui();
}

export default CollectionConfigs;