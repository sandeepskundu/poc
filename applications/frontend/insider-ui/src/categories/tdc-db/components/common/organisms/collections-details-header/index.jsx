import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details =helpers.json.val(props, 'configs.collDetails', {});
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');

    const heading = () => {
       let name = helpers.json.val(details, 'collection.name');

        if(action === 'create' || !name){
            return 'Collection details'
        }else{
            return <><span className='fm-b txt-md'>{name} &nbsp;</span>collection schema</>
        }
    }

    const ui = () => {
        return (
            <div className='full bxs pd-rl16 pd-tb12 flx-sb'>
                <div className='txt-sm fm-sb flx-vc'>{heading()}</div>
                <ul className='flx-vc'>
                    <li class="link-u ns cp txt-xs" onClick={() => {helpers.url.route.redirect('tdc-db.databases', {})}}>View databases</li>
                    <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('tdc-db.collections', {params:{id:helpers.json.val(_siteProps_, 'router.params.dbId')}})}}>View collections</li>
                </ul>
            </div>
        )
    }

    return ui()
}

export default Comp;