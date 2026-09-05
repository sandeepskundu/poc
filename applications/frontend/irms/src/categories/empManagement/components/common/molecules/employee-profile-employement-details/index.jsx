import helpers from 'ui-helpers';
import EmployeeEmployementDetails from 'aio-app-ui-empManagement-atoms/employee-profile-employement-details';
import EmployeeProfileDetailsSectionHeader from 'aio-app-ui-empManagement-atoms/employee-profile-detail-section-header';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <div className='full bxs'>
                <EmployeeProfileDetailsSectionHeader heading="Employement Details" type='employement' action="update" linkText="Edit"/>
                <EmployeeEmployementDetails {...props} />
            </div>
        )
    }

    return ui()
}

export default Comp;