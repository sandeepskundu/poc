import helpers from 'ui-helpers';
import CmsDataInfoDetailsValueInput from 'aio-app-ui-tdc-cms-atoms/cms-data-info-details-value-input';
import CmsDataInfoDetailsLabelInput from 'aio-app-ui-tdc-cms-atoms/cms-data-info-details-label-input';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <CmsDataInfoDetailsValueInput {...props} onChange={props.onChange} />
                </li>
                <li className='full pd-b24'>
                    <CmsDataInfoDetailsLabelInput {...props} onChange={props.onChange} />
                </li>
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;