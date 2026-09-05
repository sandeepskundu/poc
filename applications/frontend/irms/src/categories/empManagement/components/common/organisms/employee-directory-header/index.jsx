import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.json.val(_siteProps_, 'router.params.id');
    const action = helpers.json.val(_siteProps_, 'router.params.action');


    const rootLink = () => {
        if(action === 'view' && id){
            return <span className='cp txt-xs link-u ns mr-l12' onClick={() => {helpers.url.route.redirect('access.roles', {params:{action:'view', id:''}})}}>Back to root</span>
        }
    }

    const heading = () => {
        return <div className='txt-md fm-sb'>Employee Directory</div>
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
                
            </ul>
        </div>
    )
}

export default Comp 