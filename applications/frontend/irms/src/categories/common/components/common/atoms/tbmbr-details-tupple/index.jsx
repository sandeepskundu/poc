import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const details = helpers.json.val(props, 'data', {});

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
        return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('common.tbmbr', {params:{action:'update', id:details.vd.id}})}}>Details</li>
    }

    const name = () => {
        let rv = [];
        let map = helpers.json.val(details, 'vd.roles', {});
        let linkwtih = helpers.json.val(details, 'linkwith', '');
            rv.push(linkwtih.toUpperCase());

        for(let a in map){
            let code = helpers.json.val(map[a], 'code', '');

                if(code){
                    rv.push(code);
                }
        }

        return rv.join('.');
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