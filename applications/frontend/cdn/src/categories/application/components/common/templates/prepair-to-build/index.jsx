import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-application-modules';
import React, {useState, useRef, useEffect} from 'react';
import UiApplicationDetails from 'aio-app-ui-application-templates/ui-application-details';
import ApplicationFormActions from 'aio-app-ui-application-organisms/application-form-actions';
import ApplicationCommonDetails from 'aio-app-ui-application-organisms/application-common-details';

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