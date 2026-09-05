import helpers from 'ui-helpers';
import TbuFormDrawer from 'aio-app-ui-common-molecules/tbu-form-drawer'

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);

    const labelTxt = () => {
        return '+Add user'
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
                <TbuFormDrawer {...props} details={{}} id={id} />
            </>
        )
    }

    return ui();
}

export default AddNewNode;