import helpers from 'ui-helpers';
import UiComponentInfoDetailsNameInput from 'aio-app-ui-tdc-interface-kit-atoms/ui-component-info-details-name-input';
import UiComponentInfoDetailsDescriptionInput from 'aio-app-ui-tdc-interface-kit-atoms/ui-component-info-details-description-input';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <UiComponentInfoDetailsNameInput {...props} onChange={props.onChange} />
                </li>
                <li className='full pd-b24'>
                    <UiComponentInfoDetailsDescriptionInput {...props} onChange={props.onChange} />
                </li>
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;