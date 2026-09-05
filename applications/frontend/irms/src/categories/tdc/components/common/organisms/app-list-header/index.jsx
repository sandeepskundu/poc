import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(_siteProps_, 'router.params.type', '')

    const create = () => {
        return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('tdc.app-details-form', {params:{type:type, id:""}})}}>Create new app</span>
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'>
            <div className='txt-md fm-sb'>Application list</div>
            <ul className='flx-vc'>
                {create()}
            </ul>
        </div>
    )
}

export default Comp 