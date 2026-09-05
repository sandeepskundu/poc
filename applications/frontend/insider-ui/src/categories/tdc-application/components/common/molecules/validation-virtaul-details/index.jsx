import VirtualValidationMap from 'aio-app-ui-tdc-application-atoms/virtual-validation-map';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <div className='full bxs pd-tb10'>
                <VirtualValidationMap 
                    {...props}
                />
            </div>
        )
    }

    return ui();
}

export default Comp;