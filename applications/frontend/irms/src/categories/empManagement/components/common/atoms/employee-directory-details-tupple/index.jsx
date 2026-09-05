import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let details = helpers.json.val(props, 'data', {});

    const cls = () => {
        let rval = ['full bxs pd-rl16 pd-tb10 full bdr-c00102 bdr-1 bdr-wrln bdr-wtn pd-rl10 anim hbg-c00103']
        let odd = helpers.is.odd(props.index || 0);

        if(odd){
            rval.push('bg-c00101');
        }

        return rval.join(' ');
    }

    const blank = () => {
        return (
            <ul className='full flx-sb flx-vc blank-holder'>
                <li className='txt-sm'><span className='blank'>aio-application-name</span></li>
                <li className='txt-sm'>
                    <ul className='flx-vc'>
                        <li className='mr-l16 link-u ns cp txt-xs'><span className='blank'>View</span></li>
                        <li className='mr-l16 link-u ns cp txt-xs'><span className='blank'>Update</span></li>
                    </ul>
                </li>
            </ul>
        )
    }

    const link = (action) => {
        helpers.url.route.redirect('empManagement.empProfile', {
            params:{
                action:'view',
                id:helpers.json.val(details, 'id', '')
            }
        })
    }

    const ui = () => {
        if(props.blank){
            return (
                <div className={cls()}>
                    {blank()}
                </div>
            )
        }else{
            return (
                <div className={cls()}>
                    <ul className='full grid-wrapper'>
                        <li className='fl txt-sm grid-w3 nowrap three-dot'>{helpers.format.name.full(helpers.json.val(details, 'pI.name', {}))}</li>
                        <li className='txt-sm grid-w3'>{helpers.json.val(details, 'cd.email.id', 'NA')}</li>
                        <li className='txt-sm grid-w3'>{helpers.format.mobile.mask(helpers.json.val(details, 'cd.mobile', {}))}</li>
                        <li className='txt-sm grid grid-w3'>
                            <ul className='flx-vc fr'>
                                <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {link()}}>View</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            )
        }
    }

    return ui()
}

export default Comp;