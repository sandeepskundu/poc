import helpers from 'ui-helpers';
import BusinessVerticalFormDrawer from 'aio-app-ui-common-molecules/business-vertical-from-drawer'

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);

    const labelTxt = () => {
        return '+Add new business vertical'
    }

    const label = () => {
        return (
            <li className='pd-l12 cp txt-xs link-u ns'>
                <label className="link-u ns cp txt-xs link-u ns" htmlFor={id}>{labelTxt()}</label>
            </li>
        )
    }

    const ui = () => {
        return (
            <>
                {label()}
                <BusinessVerticalFormDrawer {...props} details={{}} id={id} />
            </>
        )
    }

    return ui();
}

export default AddNewNode;