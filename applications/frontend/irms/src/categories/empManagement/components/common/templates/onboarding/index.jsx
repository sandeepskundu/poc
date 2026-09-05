import helpers from 'ui-helpers';
import OnBoardingHeader from 'aio-app-ui-empManagement-organisms/onboarding-header';
import EmployeeTeamForm from 'aio-app-ui-empManagement-organisms/employee-team-form';
import OnBoardingRegister from 'aio-app-ui-empManagement-organisms/onboarding-register';
import EmployementDetailsForm from 'aio-app-ui-empManagement-organisms/employement-details-form';
import EmployeeProfilePIDetailsForm from 'aio-app-ui-empManagement-organisms/employee-profile-pi-detail-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const type = helpers.json.val(_siteProps_, 'router.params.type', 'notype');
    const action = helpers.json.val(_siteProps_, 'router.params.action', 'noaction');

    const update = () => {
        switch(type) {
            case 'PI':
                return <EmployeeProfilePIDetailsForm {...props} />
            break;
            case 'employement':
                return <EmployementDetailsForm {...props} />
            break;
            case 'group-team':
                return <EmployeeTeamForm {...props} />
            return 
            break;
            default:
                return <p className='full bxs pd-20'>Defined type is not valid</p>
        }
    }

    const ui = () => {
        switch(action) {
            case 'initial':
                return <OnBoardingRegister {...props} />
            break;
            case 'create':
                return update();
            break;
            case 'update':
                return update();
            break;
            default:
                return <p className='full bxs pd-20'>Action not allowed</p>
        }
    }

    return (
        <>
            <OnBoardingHeader {...props} />
            {ui()}
        </>
    )
}

export default Comp;