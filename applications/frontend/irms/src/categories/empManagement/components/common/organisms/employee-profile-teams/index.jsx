import helpers from 'ui-helpers';
import EmployeeTeamList from 'aio-app-ui-empManagement-molecules/employee-teams-list';
import EmployeeProfileDetailsSectionHeader from 'aio-app-ui-empManagement-atoms/employee-profile-detail-section-header';;

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);
    let eby = helpers.json.val(props, 'profile.employement.employedBy', '');

    const list = (type) => {
        return <EmployeeTeamList {...props} type={type} />
    }

    const merchant = () => {
        if(eby != 'GROUP'){
            return (
                <div className='full bxs'>
                    <EmployeeProfileDetailsSectionHeader heading="Employer teams" type='employer-team' action="update" linkText="+Add team"/>
                    {list('merchant')}
                </div>
            )
        }
    }

    const ui = () => {
        return (
            <>
                 <div className='full bxs'>
                    <EmployeeProfileDetailsSectionHeader heading="Group teams" type='group-team' action="update" linkText="+Add team"/>
                    {list('group')}
                </div>
                {merchant()}
            </>
        )
    }

    return ui()
}

export default Comp;