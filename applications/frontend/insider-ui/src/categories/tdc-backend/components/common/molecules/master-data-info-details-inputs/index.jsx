import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import MasterDataInfoDetailsValueInput from 'aio-app-ui-tdc-backend-atoms/master-data-info-details-value-input';
import MasterDataInfoDetailsLabelInput from 'aio-app-ui-tdc-backend-atoms/master-data-info-details-label-input';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <MasterDataInfoDetailsValueInput {...props} onChange={props.onChange} />
                </li>
                <li className='full pd-b24'>
                    <MasterDataInfoDetailsLabelInput {...props} onChange={props.onChange} />
                </li>
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;