import helpers from 'ui-helpers';
import AddCmsDataForm from 'aio-app-ui-tdc-cms-molecules/cms-data-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'cmsData', {});
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    const addlink = () => {
        if(action === 'view'){
            return <AddCmsDataForm {...props} />
        }
    }

    const rootLink = () => {
        if(action === 'view'){
            return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('tdc-cms.cmsDataList', {params:{action:'view', id:''}})}}>Back to base</span>
        }
    }

    const siblings = () => {
        if(action === 'update' && details.hashId){
            return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('tdc-cms.cmsDataList', {params:{action:'view',id:details.parentId}})}}>View siblings</span>
        }
    }

    const heading = () => {
        if(action === 'view'){
            return <div className='txt-md fm-sb'>CMS data list</div>
        }else{
            return <div className='txt-md fm-sb'>CMS data details</div>
        }
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
                {rootLink()}
                {addlink()}
                {siblings()}
            </ul>
        </div>
    )
}

export default Comp 