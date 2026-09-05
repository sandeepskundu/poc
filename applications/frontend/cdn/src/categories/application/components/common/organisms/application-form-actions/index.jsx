import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Button from 'aio-global-ui/atoms/form/button';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const save = (type) => {
        if(props.onAction){
            props.onAction(type);
        }
    }

    const buttons = () => {
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

    const ui = () => {
        return (
            <div className='full bxs flx-sb'>
                <div className='bxs'>&nbsp;</div>
                <div className='bxs'>
                    {buttons()}
                </div>
            </div>
        )
    }

    return ui()
}

export default Comp;