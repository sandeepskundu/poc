import helpers from 'ui-helpers';
import EmployeeProfilePd from 'aio-app-ui-empManagement-atoms/employee-profile-personal-details';
import EmployeeProfileDetailsSectionHeader from 'aio-app-ui-empManagement-atoms/employee-profile-detail-section-header';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <div className='full bxs'>
                <EmployeeProfileDetailsSectionHeader heading="Personal Information" type='PI' action="update" linkText="Edit"/>
                <EmployeeProfilePd {...props} />
            </div>
        )
    }

    return ui()
}

export default Comp;