import helpers from 'ui-helpers';
import ComponentPropDetailsNameInput from 'aio-app-ui-tdc-ds-atoms/component-prop-details-name-input';
import ComponentPropDetailsDescriptionInput from 'aio-app-ui-tdc-ds-atoms/component-prop-details-description-input'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    return (
        <div className='full bxs pd-rl20 grid-wrapper'>
            <div className='grid-w2 bxs pd-tb24'>
                <ComponentPropDetailsNameInput {...props} />
            </div>
            <div className='grid-w10 bxs pd-tb24 pd-l24'>
                <ComponentPropDetailsDescriptionInput {...props} />
            </div>
        </div>
    )
};

export default Comp;