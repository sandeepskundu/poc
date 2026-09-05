import helpers from 'ui-helpers';
import RoleForm from 'aio-app-ui-access-molecules/role-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const mId = helpers.json.val(_siteProps_, 'router.params.mId');
    const type = helpers.json.val(_siteProps_, 'router.params.type');
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    const addlink = () => {
        if(action === 'view'){
            return <RoleForm {...props} />
        }
    }

    const parent = () => {
        let pId = helpers.json.val(props, 'details.mapId', '');

        if(action === 'view' && pId && mId != pId){
            return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('access.role', {params:{action:'view', mId:pId, type:type, id:""}})}}>Back to parent</span>
        }
    }

    const siblings = () => {
        if(action === 'update' && mId){
            return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('access.role', {params:{action:'view', mId:mId, type:type, id:""}})}}>View siblings</span>
        }
    }

    const heading = () => {
        if(action === 'view'){
            return <div className='txt-md fm-sb'>Access roles</div>
        }else{
            return <div className='txt-md fm-sb'>Access role details</div>
        }
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
                {parent()}
                {addlink()}
                {siblings()}
            </ul>
        </div>
    )
}

export default Comp 