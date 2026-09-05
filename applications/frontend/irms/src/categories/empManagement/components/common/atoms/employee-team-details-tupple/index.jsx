import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type', {});
    const details = helpers.json.val(props, 'data', {});

    const cls = () => {
        let rval = ['full anim bxs pd-tb6 pd-rl16 bdr-c00103 bdr-1 bdr-wrln bdr-wbn hbg-c00102']
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


    console.log(details);

    const link = () => {
        helpers.url.route.redirect('access.map', {
            params:{
                id:'',
                action:'view',
                type:(type === 'group')?4:9,
                mId:helpers.json.val(details, 'vd.id', '')
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
                        <li className='txt-xs'>{helpers.json.val(details, 'name')}</li>
                        <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {link()}}>Access</li>
                    </ul>
                </div>
            )
        }
    }

    return ui()
}

export default Comp;