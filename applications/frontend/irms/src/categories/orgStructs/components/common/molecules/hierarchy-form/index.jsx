import helpers from 'ui-helpers';
import HierarchyFormDrawer from 'aio-app-ui-orgStructs-molecules/hierarchy-form-drawer'

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);

    const labelTxt = () => {
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');
        let hasChild = helpers.json.val(props, 'masterData.hasChilds');

        if(id && hasChild){
            return '+Add new hierarchy'
        }else{
            return '+Add new hierarchy'
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
                <HierarchyFormDrawer {...props} details={{}} id={id} />
            </>
        )
    }

    return ui();
}

export default AddNewNode;