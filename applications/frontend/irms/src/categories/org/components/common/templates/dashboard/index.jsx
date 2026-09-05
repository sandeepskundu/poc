import helpers from 'ui-helpers';
import React, {useState, useRef, useEffect} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('org.departments', {params:{action:"view"}})}}>Departments</li>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('org.roles')}}>Roles</li>
            </ul>
        )  
    }

    return ui();
}

export default Comp;