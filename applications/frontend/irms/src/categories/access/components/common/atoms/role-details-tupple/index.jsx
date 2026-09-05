import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'data', {});
    const mId = helpers.json.val(_siteProps_, 'router.params.mId');
    const type = helpers.json.val(_siteProps_, 'router.params.type');

    const cls = () => {
        let rval = ['full bxs pd-rl16 pd-tb10 full bdr-c00104 bdr-1 bdr-wrln bdr-wtn pd-rl10 anim hbg-c00103']
        let odd = helpers.is.odd(props.index || 0);

        if(odd){
            rval.push('bg-c00102');
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

    const redirect = (params) => {
        helpers.url.route.redirect('access.role', {params:params})
    }

    const childs = () => {
        if(details.hasChilds){
            return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {redirect({mId:details.vd.id, type:type, action:'view', id:''})}}>View childs</li>
        }
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
                        <li className='txt-sm '><span className='fm-sb hide'>Name : </span>{helpers.json.val(details, 'name')}</li>
                        <li className='txt-sm'>
                            <ul className='flx-vc'>
                                {childs()}
                                <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {redirect({mId:mId, type:type, action:'update', id:details.vd.id})}}>Update</li>
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