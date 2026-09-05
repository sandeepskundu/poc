import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const addnew = () => {
        helpers.url.route.redirect('tdc-application.details', {
            params:{
                action:'create'
            }
        })
    }

    const ui = () => {
        return (
            <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00103'>
                <div className='txt-md fm-sb'>Applications list</div>
                <ul className='flx-vc'>
                    <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {addnew()}}>+ Create new application</li>
                </ul>
            </div>
        )
    }

    return ui()
}

export default Comp;