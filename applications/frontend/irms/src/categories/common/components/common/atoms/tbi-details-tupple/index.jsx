import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let details = helpers.json.val(props, 'data', {});
    let mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    let type = helpers.json.val(_siteProps_, 'router.params.type', '');
    let relation = helpers.json.val(_siteProps_, 'router.params.relation', '')

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

    const updateLink = () => {
        return <li className='mr-l16 link-u ns cp txt-xs hide' onClick={() => {helpers.url.route.redirect('common.tbi', {params:{action:'update', id:details.vd.id}})}}>Details</li>
    }

    const user = () => {
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('common.tbu', {params:{action:'view', relation:relation, type:type, itemId:mId, mId:details.vd.id}})}}>Users</li>
    }

    const rolemap = () => {
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('common.tbmbr', {params:{action:'view', mId:details.vd.id, id:''}})}}>Roles</li>
    }

    const name = () => {
        let map = {
            'viewer':'Reader',
            'editor':'Editor',
            'contributor':'Contributor',
            'manager':'Manager',
            'owner':'Owner',
            'superadmin':'Superadmin',
            'blocked':'Blocked'
        }
        let name = helpers.json.val(details, 'access');

        return map[name]
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
                        <li className='txt-sm '>{name()}</li>
                        <li className='txt-sm'>
                            <ul className='flx-vc'>
                                {rolemap()}
                                {user()}
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