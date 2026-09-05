import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let details = helpers.json.val(props, 'data', {});

    const cls = () => {
        let rval = ['full bxs pd-rl16 pd-tb10 full bdr-c00104 bdr-1 bdr-wrln bdr-wtn pd-rl10 anim hbg-c00103']
        let odd = helpers.is.odd(props.index || 0);

        if(odd){
            rval.push('bg-c00102');
        }else{
            
        }

        return rval.join(' ');
    }

    const blank = () => {
        return (
            <ul className='full flx-sb flx-vc blank-holder'>
                <li className='txt-sm'><span className='blank'>aio-application-name</span></li>
                <li className='txt-sm'>
                    <ul className='flx-vc'>
                        <li className='mr-l16'><span className='blank'>Update</span></li>
                        <li className='mr-l16'><span className='blank'>view</span></li>
                    </ul>
                </li>
            </ul>
        )
    }

    const dlink = (action) => {
        helpers.url.route.redirect('tdc-ds.ds-details', {
            params:{
                dsId:details.hId
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
                    <ul className='full flx-sb flx-vc'>
                        <li className='txt-sm '><span className='fm-sb hide'>Name : </span>{helpers.json.val(details, 'code')}</li>
                        <li className='txt-sm'>
                            <ul className='flx-vc'>
                                <li className='mr-l16 link-u hide' onClick={() => {update('update')}}>Update</li>
                                <li className='mr-l16 link-u' onClick={() => {dlink()}}>Details</li>
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