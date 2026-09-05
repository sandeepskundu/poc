import helpers from 'ui-helpers';
import EmployeeDirectoryHeader from 'aio-app-ui-empManagement-organisms/employee-directory-header';
import EmployeeDirectoryResults from 'aio-app-ui-empManagement-organisms/employee-directory-results';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const action = helpers.json.val(_siteProps_, 'router.params.action', 'noaction')

    const ui = () => {
        switch(action) {
            case 'list':
                return <EmployeeDirectoryResults />
            break;
            default:
                return <p>Action not allowed</p>
        }
    }

    return (
        <>
            <EmployeeDirectoryHeader />
            {ui()}
        </>
    )
}

export default Comp;