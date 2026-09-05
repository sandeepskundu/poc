import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'data', {});
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

    const link = (action) => {
        helpers.url.route.redirect('tdc.app-details-form', {
            params:{
                type:type,
                id:details.vd.id
            }
        })
    }

    const permission = (type) => {
        helpers.url.route.redirect('access.permissions', {
            params:{
                type:type,
                code:'app',
                action:'list',
                pId:details.vd.id,
            }
        })
    }

    const updateLink = () => {
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {link('update')}}>View details</li>
    }

    const managers = () => {
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {permission('manager')}}>Manager</li>
    }

    const contributors = () => {
        let contri = helpers.json.val(details, 'permissions.access.contributor', '')
        return (contri?<li className='mr-l16 link-u ns cp txt-xs' onClick={() => {permission('member')}}>Contributor</li>:<></>)
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
                        <li className='txt-sm '><span className='fm-sb hide'>Name : </span>{helpers.json.val(details, 'appName')}</li>
                        <li className='txt-sm'>
                            <ul className='flx-vc'>
                                {managers()}
                                {contributors()}
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