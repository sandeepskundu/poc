import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';

import EmployeeDirectoryResultsList from 'aio-app-ui-empManagement-molecules/employee-directory-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const dvals = {
        blank:true,
        employees:[],
        configs:{}
    }

    const [data, setData] = useState(dvals)
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(data);
            d.employees = helpers.json.val(resp, 'employees', [])
            d.blank = false;
            setData(d);
    }

    if(fristRender){
        appHelpers.store.get([{
            name:'employee.document.listByMerchantId'
        }], onResp);
    }

    const header = () => {

        if(!data.blank){
            return (
                <ul className='full grid-wrapper fm-sb bxs pd-rl16 pd-tb10 bdr-c00102 bdr-1 bdr-wrln bdr-wtn pd-rl10 anim bg-c00102'>
                    <li className='fl txt-sm grid-w3'>Name</li>
                    <li className='fl txt-sm grid-w3'>Email</li>
                    <li className='fl txt-sm grid-w3'>Mobile</li>
                </ul>
            )
        }
        
    }

    const ui = () => {
        if(data.blank || data.employees.length > 0){
            return (
                <>
                    {header()}
                    <EmployeeDirectoryResultsList {...data} />
                </>
               
            )
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>Employee data is not found?</p>
                        <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                        <span className="link-u ns cp txt-xs" onClick={() => {helpers.url.route.redirect('empManagement.onboarding', {params:{action:'initial'}})}}>Lets Start</span>
                    </div>
                </div>
            )
        }
    }

    return ui();
}

export default Comp;