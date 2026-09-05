import helpers from 'ui-helpers';
import EmployeeProfileHeader from 'aio-app-ui-empManagement-organisms/employee-profile-header';
import EmployeeProfileDetails from 'aio-app-ui-empManagement-organisms/employee-profile-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const action = helpers.json.val(_siteProps_, 'router.params.action', 'noaction')

    const ui = () => {
        switch(action) {
            case 'view':
                return <EmployeeProfileDetails {...props} />
            break;
            default:
                return <p>Action not allowed</p>
        }
    }

    return (
        <>
            <EmployeeProfileHeader />
            {ui()}
        </>
    )
}

export default Comp;