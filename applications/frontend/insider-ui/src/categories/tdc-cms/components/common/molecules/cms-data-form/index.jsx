import helpers from 'ui-helpers';
import MasteDataFormDrawer from 'aio-app-ui-tdc-cms-molecules/cms-data-form-drawer'

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);

    const labelTxt = () => {
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');
        let hasChild = helpers.json.val(props, 'cmsData.hasChilds');

        if(id && hasChild){
            return '+Add new child data'
        }else{
            return '+Add new master data'
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
                <MasteDataFormDrawer {...props} details={{}} id={id} />
            </>
        )
    }

    return ui();
}

export default AddNewNode;