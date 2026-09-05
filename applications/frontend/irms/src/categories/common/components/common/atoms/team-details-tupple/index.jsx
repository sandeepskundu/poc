import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const details = helpers.json.val(props, 'data', {});
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    const type = helpers.json.val(_siteProps_, 'router.params.type', '')

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

    const getType = () => {
        if(type === 1 || type === '1'){
            return 4
        }else{
            return 9;
        }
    }

    const updateLink = () => {
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('common.team', {params:{action:'update', mId:mId, type:type, id:details.vd.id}})}}>Details</li>
    }

    const accessMap = () => {
        return <li className='mr-l16 link-u ns cp txt-xs'onClick={() => {helpers.url.route.redirect('access.map', {params:{action:"view", type:getType(), mId:details.vd.id}})}}>Access map</li>
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
                                {accessMap()}
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