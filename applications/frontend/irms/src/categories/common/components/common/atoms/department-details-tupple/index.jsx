import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let details = helpers.json.val(props, 'data', {});
    let id = helpers.json.val(_siteProps_, 'router.params.id', '');

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

    const link = (action, id) => {
        helpers.url.route.redirect('common.departments', {
            params:{
                id:id || '',
                action:action,
                mId:helpers.json.val(_siteProps_, 'router.params.mId', '')
            }
        })
    }

    const roles = () => {
        if(!id && details.hashId && details.hasChilds){
            return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('common.roles', {params:{action:'view', dpId:details.vd.id}})}}>Department Roles</li>
        }else{
            return <></>
        }
    }

    const accessMap = () => {
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('common.rba', {params:{action:"view", linkType:"dep", mId:details.vd.id}})}}>Access Map</li>
    }

    const permissions = () => {
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('common.ibp', {params:{action:"view", mId:details.vd.id}})}}>Permissons</li>
    }

    const team = () => {
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('common.tbi', {params:{action:"view", relation:"departments", type:"user", mId:details.vd.id}})}}>Users team</li>
    }

    const childLink = () => {
        if(details.hasChilds){
            return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {link('view', details.vd.id)}}>Childs</li>
        }else{
            return <></>
        }
    }

    const updateLink = () => {
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {link('update', details.vd.id)}}>Details</li>
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
                                {team()}
                                {permissions()}
                                {accessMap()}
                                {roles()}
                                {childLink()}
                                {updateLink()}
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