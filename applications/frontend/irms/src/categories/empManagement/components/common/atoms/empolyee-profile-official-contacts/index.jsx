import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let blank = helpers.json.val(props, 'blank');
    let profile = helpers.json.val(props, 'profile', {});

    const blankUi = () => {
        return (
            <>
                <p className='full bxs pd-tb10 pd-rl16 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'><span className='blank'>Officaial Contacts</span></p>
                <ul className='full bxs grid-wrapper grid-layout-3 txt-sm blank-holder'>
                    <li className='grid bxs pd-r20'><span className='fm-sb blank'>Email: xxxxnxnxnxnxnxnxnn</span></li>
                    <li className='grid bxs pd-r20'><span className='fm-sb blank'>Mobile: +0000000000000</span></li>
                </ul>
            </>
        )
    }
    
    const ui = () => {
        if(blank){
            return blankUi();
        }else{
            return (
                <>
                    <p className='full bxs pd-tb8 pd-rl16 flx-sb bdr-c00104 bg-c00102 txt-sm fm-sb'>Official Contacts</p>
                    <ul className='full bxs grid-wrapper grid-layout-3 txt-sm pd-16'>
                        <li className='grid bxs pd-r20'><span className='fm-sb'>Email: </span>{helpers.json.val(profile, 'cd.email.id')}</li>
                        <li className='grid bxs pd-r20'><span className='fm-sb'>Mobile: </span>{helpers.format.mobile.number(helpers.json.val(profile, 'cd.mobile'))}</li>
                    </ul>
                </>
            )
        }
    }

    return ui()
}

export default Comp;