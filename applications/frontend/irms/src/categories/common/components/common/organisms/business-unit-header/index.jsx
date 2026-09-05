import helpers from 'ui-helpers';
import BusinessUnitForm from 'aio-app-ui-common-molecules/business-unit-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const eId = helpers.json.val(_siteProps_, 'router.params.eId', '')
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    const addlink = () => {
        if(action === 'view'){
            return <BusinessUnitForm {...props} />
        }else{
             if(action === 'update'){
                return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('common.bu', {params:{action:'view', eId:eId, id:""}})}}>View list</span>
            }
        }
    }

    const heading = () => {
        if(action === 'view'){
            return <div className='txt-md fm-sb'>Business units list</div>
        }else{
            return <div className='txt-md fm-sb'>Business unit details</div>
        }
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
                {addlink()}
            </ul>
        </div>
    )
}

export default Comp 