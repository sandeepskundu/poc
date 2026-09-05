import helpers from 'ui-helpers';
import EmployersFormDrawer from 'aio-app-ui-org-molecules/employers-form-drawer'

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);

    const labelTxt = () => {
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(id && hasChild){
            return '+Add new employer'
        }else{
            return '+Add new employer'
        }
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
                <EmployersFormDrawer {...props} details={{}} id={id} />
            </>
        )
    }

    return ui();
}

export default AddNewNode;