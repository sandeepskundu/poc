import helpers from 'ui-helpers';
import RolesForm from 'aio-app-ui-common-molecules/roles-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const mId = helpers.json.val(props, 'auth.uIds.merchant', '');
    const dpId = helpers.json.val(_siteProps_, 'router.params.dpId');
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    console.log(props);

    const addlink = () => {
        if(action === 'view'){
            return <RolesForm {...props} />
        }
    }

    const departments = () => {
        if(dpId){
            return <span className='cp txt-xs link-u ns pd-l16' onClick={() => {helpers.url.route.redirect('common.departments', {params:{action:'view', mId:mId, id:''}})}}>View departments</span>
        }
    }

    const siblings = () => {
        if(action === 'update' && dpId){
            return <span className='cp txt-xs link-u ns pd-l16' onClick={() => {helpers.url.route.redirect('common.roles', {params:{action:'view', dpId:dpId, id:""}})}}>View siblings</span>
        }
    }

    const heading = () => {
        if(action === 'view'){
            return <div className='txt-md fm-sb'>Roles under {helpers.json.val(props, 'department.name', '')} department</div>
        }else{
            return <div className='txt-md fm-sb'>Role details</div>
        }
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
                {departments()}
                {siblings()}
                {addlink()}
            </ul>
        </div>
    )
}

export default Comp 