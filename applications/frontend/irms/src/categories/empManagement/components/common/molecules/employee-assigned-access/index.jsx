import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let eby = helpers.json.val(props, 'profile.employement.employedBy', '');

    console.log(props);

    const heading = (type) => {
        if(type === 'group'){
            return 'Group assigned access';
        }else{
            return 'Employer assigned access';
        }
    }

    const link = (type) => {
        helpers.url.route.redirect('access.map', {
            params:{
                id:'',
                action:'view',
                type:(type === 'group')?5:10,
                mId:helpers.json.val(_siteProps_, 'router.params.id', '')
            }
        })
    }

    const header = (type) => {
        return (
            <ul className='full bxs flx-sb flx-vc pd-tb8 pd-rl16 flx-sb bdr-c00104 bg-c00102 bdr-1 bdr-wrln bdr-wbn'>
                <li className='txt-sm fm-sb'>{heading(type)}</li>
                <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {link(type)}}>View access</li>
            </ul>
        )
    }

    const merchant = () => {
        if(eby != 'GROUP'){
            return header('merchant')
        }
    }

    const ui = () => {
        return (
            <>
                {header('group')}
                {merchant()}
            </>
        )
    }

    return ui()
}

export default Comp;