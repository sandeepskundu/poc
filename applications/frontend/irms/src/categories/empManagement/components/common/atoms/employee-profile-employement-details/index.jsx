import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let blank = helpers.json.val(props, 'blank');
    let profile = helpers.json.val(props, 'profile', {});

    const blankUi = () => {
        return (
            <ul className='full bxs grid-wrapper grid-layout-3 txt-sm blank-holder'>
                <li className='grid bxs pd-r20'><span className='fm-sb blank'>Email: xxxxnxnxnxnxnxnxnn</span></li>
                <li className='grid bxs pd-r20'><span className='fm-sb blank'>Mobile: +0000000000000</span></li>
            </ul>
        )
    }

    const employer = () => {
        let eby = helpers.json.val(profile, 'employement.employedBy', '');

        if(eby && eby != 'GROUP'){
            return <li className='grid-w2 bxs pd-r20 pd-b16'><span className='fm-sb'>Employer: </span>{helpers.json.val(profile, 'employement.employer.name', 'NA')}</li>
        }
    }
    
    const ui = () => {
        if(blank){
            return blankUi();
        }else{
            return (
                <ul className='full bax grid-wrapper pd-16 pd-bn txt-sm'>
                    <li className='grid-w2 bxs pd-r20 pd-b16'><span className='fm-sb'>Employement at: </span>{helpers.json.val(profile, 'employement.employedBy', 'NA')}</li>
                    <li className='grid-w2 bxs pd-r20 pd-b16'><span className='fm-sb'>Employement Type: </span>{helpers.json.val(profile, 'employement.type', 'NA')}</li>
                    <li className='grid-w2 bxs pd-r20 pd-b16'><span className='fm-sb'>Employement Status: </span>{helpers.json.val(profile, 'employement.status', 'NA')}</li>
                    <li className='grid-w2 bxs pd-r20 pd-b16'><span className='fm-sb'>Designation: </span>{helpers.json.val(profile, 'employement.designation.name', 'NA')}</li>
                    <li className='grid-w2 bxs pd-r20 pd-b16'><span className='fm-sb'>Work Mode: </span>{helpers.json.val(profile, 'employement.workMode', 'NA')}</li>
                    {employer()}
                    <li className='full bxs'>
                        <ul className='full bxs grid-wrapper'>
                            <li className='grid-w2 bxs pd-r20 pd-b16'><span className='fm-sb'>Business Unit: </span>{helpers.json.val(profile, 'employement.bu.name', 'NA')}</li>
                            <li className='grid-w10 bxs pd-r20 pd-b16'><span className='fm-sb'>Business Vertical: </span>{helpers.format.obj.join(helpers.json.val(profile, 'employement.bv', {}), 'name', false, ' > ')}</li>
                        </ul>
                    </li>
                    <li className='full bxs'>
                        <ul className='full bxs grid-wrapper'>
                            <li className='grid-w2 bxs pd-r20 pd-b16'><span className='fm-sb'>Office: </span>{helpers.json.val(profile, 'employement.location.name', 'NA')}</li>
                            <li className='grid-w10 bxs pd-r20 pd-b16'><span className='fm-sb'>Department: </span>{helpers.format.obj.join(helpers.json.val(profile, 'employement.department', {}), 'name', false, ' > ')}</li>
                        </ul>
                    </li>
                </ul>
            )
        }
    }

    return ui()
}

export default Comp;