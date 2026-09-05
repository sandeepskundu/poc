import helpers from 'ui-helpers';
import React, {useState, useRef, useEffect} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
                sjssjsj
            </ul>
        )  
    }

    return ui();
}

export default Comp;