import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const addnew = () => {
        helpers.url.route.redirect('tdc-db.collectionDetails', {
            params:{
                id:'x',
                action:'create',
                dbId:helpers.json.val(_siteProps_, 'router.params.dbId')
            }
        })
    }

    const ui = () => {
        return (
            <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn'>
                <div className='txt-md fm-sb'>Colltions list</div>
                <ul className='flx-vc'>
                    <li class="link-u ns cp txt-xs" onClick={() => {helpers.url.route.redirect('tdc-db.databases', {})}}>View other databases</li>
                    <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {addnew()}}>+ Add new collection</li>
                </ul>
            </div>
        )
    }

    return ui()
}

export default Comp;