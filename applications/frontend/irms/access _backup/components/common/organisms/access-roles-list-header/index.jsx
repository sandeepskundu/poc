import helpers from 'ui-helpers';
import AccessRoleForm from 'aio-app-ui-access-molecules/access-role-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'roleData', {});
    const id = helpers.json.val(_siteProps_, 'router.params.id');
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    const addlink = () => {
        if(action === 'view'){
            return <AccessRoleForm {...props} />
        }
    }

    const rootLink = () => {
        if(action === 'view' && id){
            return <span className='cp txt-xs link-u ns mr-l12' onClick={() => {helpers.url.route.redirect('access.roles', {params:{action:'view', id:''}})}}>Back to root</span>
        }
    }

    const parentsLink = () => {
        if(action === 'view' && details.parentId){
            return <span className='cp txt-xs link-u ns  mr-l12' onClick={() => {helpers.url.route.redirect('access.roles', {params:{action:'view', id:details.parentId}})}}>Back to parent</span>
        }
    }

    const siblings = () => {
        if(action === 'update' && id && details.parentId){
            return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('access.roles', {params:{action:'view',id:details.parentId}})}}>View siblings</span>
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
                {rootLink()}
                {parentsLink()}
                {addlink()}
                {siblings()}
            </ul>
        </div>
    )
}

export default Comp 