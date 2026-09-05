import helpers from 'ui-helpers';
import React, {useState, useRef, useEffect} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const link = (type) => {
        return (
            <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('tdc-application.list', {params:{
                type:type
            }})}}>{`${helpers.string.transform.camelize(type)} applications`}</li>
        )
    }
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
                {link('ui')}
                {link('api')}
            </ul>
        )  
    }

    return ui();
}

export default Comp;