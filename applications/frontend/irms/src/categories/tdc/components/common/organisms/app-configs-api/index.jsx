import helpers from 'ui-helpers';
import AppDbDetails from 'aio-app-ui-tdc-molecules/app-db-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const valuemap = () => {
        let rv = [...props.valuemap]
            rv.push('appConfig')

        return rv;
    }

    const ui = () => {
        return (
            <div className='full pd-rl10 bxs'>
                <AppDbDetails {...props} valuemap={valuemap()}
                />
            </div>
        )
    }

    return ui()
}

export default Comp;