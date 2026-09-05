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
    
    const ui = () => {
        if(blank){
            return blankUi();
        }else{
            return (
                <ul className='full bxs grid-wrapper grid-layout-3 txt-sm pd-16 pd-bn'>
                    <li className='grid bxs pd-r20 pd-b16'><span className='fm-sb'>Name: </span>{helpers.format.name.full(helpers.json.val(profile, 'pI.name', {}))}</li>
                    <li className='grid bxs pd-r20 pd-b16'><span className='fm-sb'>Gender: </span>{helpers.json.val(profile, 'pI.gender')}</li>
                    <li className='grid bxs pd-r20 pd-b16'><span className='fm-sb'>Marital status: </span>{helpers.json.val(profile, 'pI.marital')}</li>
                    <li className='grid bxs pd-r20 pd-b16'><span className='fm-sb'>Data of birth: </span>{helpers.date.format(new Date(helpers.json.val(profile, 'pI.dob')), '_yyyy-_m-_d')}</li>
                    <li className='grid bxs pd-r20 pd-b16'><span className='fm-sb'>Country: </span>{helpers.json.val(profile, 'pI.country')}</li>
                </ul>
            )
        }
    }

    return ui()
}

export default Comp;