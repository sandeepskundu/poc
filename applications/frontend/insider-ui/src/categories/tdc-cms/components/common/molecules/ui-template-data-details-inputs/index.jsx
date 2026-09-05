import helpers from 'ui-helpers';
import UiTemplatePropsNameOptions from 'aio-app-ui-tdc-cms-atoms/ui-template-props-name-options';
import UiTemplatePropsTypesOptions from 'aio-app-ui-tdc-cms-atoms/ui-template-props-types-options';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <UiTemplatePropsTypesOptions {...props} onChange={props.onChange} />
                </li>
                <li className='full pd-b24'>
                    <UiTemplatePropsNameOptions {...props} onChange={props.onChange} />
                </li>
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;