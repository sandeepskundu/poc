import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let blank = helpers.json.val(props, 'blank');

    const blankUi = () => {
        return (
            <>
                <p className='full bxs pd-tb10 pd-rl16 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'><span className='blank'>Officaial Contacts</span></p>
            </>
        )
    }

    const redirect = () => {
        helpers.url.route.redirect('empManagement.updateProfile', {
            params:{
                type:helpers.json.val(props, 'type'),
                action:helpers.json.val(props, 'action'),
                id:helpers.json.val(_siteProps_, 'router.params.id', '')
            }
        })
    }

    const link = () => {
        let t = helpers.json.val(props, 'type', '');
        let a = helpers.json.val(props, 'action', '');
        let l = helpers.json.val(props, 'linkText', '');

        if(l && t && a){
            return <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {redirect()}}>{l}</li>;
        }else{
            return <></>
        }
    }
    
    const ui = () => {
        if(blank){
            return blankUi();
        }else{
            return (
                <ul className='full bxs flx-sb flx-vc pd-tb8 pd-rl16 flx-sb bdr-c00104 bg-c00102'>
                    <li className='txt-sm fm-sb'>{helpers.json.val(props, 'heading')}</li>
                    {link()}
                </ul>
            )
        }
    }

    return ui()
}

export default Comp;