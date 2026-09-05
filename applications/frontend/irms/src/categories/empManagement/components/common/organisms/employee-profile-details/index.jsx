import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';
import EmployeeProfileTeams from 'aio-app-ui-empManagement-organisms/employee-profile-teams';
import EmployeeAssignedAccess from 'aio-app-ui-empManagement-molecules/employee-assigned-access'
import EmployeeProfileOfficalContacts from 'aio-app-ui-empManagement-atoms/empolyee-profile-official-contacts';
import EmployeeProfilePersonalDetails from 'aio-app-ui-empManagement-molecules/employee-profile-personal-details';
import EmployeeProfileEmployementDetails from 'aio-app-ui-empManagement-molecules/employee-profile-employement-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    console.log(props);
    
    const dvals = {
        blank:true,
        profile:{},
        configs:{}
    }

    const [data, setData] = useState(dvals)
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(data);
            d.profile = helpers.json.val(resp, 'profile', {})
            d.blank = false;
            setData(d);
    }

    if(fristRender){
        appHelpers.store.get([{
            name:'employee.profile.detailsByMapId'
        }], onResp);
    }

    const ui = () => {
        let pd = helpers.json.val(data, 'profile', {})
        let pdl = helpers.json.length(pd);

        if(data.blank || pdl > 0){
            return (
                <>
                    <EmployeeProfileOfficalContacts {...data} />
                    <EmployeeProfilePersonalDetails {...data} />
                    <EmployeeProfileEmployementDetails {...data} />
                    <EmployeeProfileTeams {...data} />
                    <EmployeeAssignedAccess {...data} />
                </>
            )
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>Employee profile details are not found?</p>
                        <p className='full txt-xs mr-tb4'>Please select valid employee from list</p>
                        <span className="link-u ns cp txt-xs" onClick={() => {helpers.url.route.redirect('empManagement.directory', {params:{action:'list'}})}}>View list</span>
                    </div>
                </div>
            )
        }
    }

    return ui();
}

export default Comp;