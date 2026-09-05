import helpers from 'ui-helpers';
import PermissionsForm from 'aio-app-ui-access-molecules/permissions-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const mId = helpers.json.val(_siteProps_, 'router.params.mId');
    const type = helpers.json.val(_siteProps_, 'router.params.type');
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    const addlink = () => {
        if(action === 'list'){
            return <PermissionsForm {...props} />
        }
    }

    const siblings = () => {
        if(action === 'update' && mId){
            return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('access.map', {params:{action:'view', mId:mId, type:type, id:""}})}}>View siblings</span>
        }
    }

    const heading = () => {
        return <div className='txt-md fm-sb'>Permissions list</div>
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
                {addlink()}
                {siblings()}
            </ul>
        </div>
    )
}

export default Comp 