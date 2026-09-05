import helpers from 'ui-helpers';
import TeamForm from 'aio-app-ui-common-molecules/team-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    const type = helpers.json.val(_siteProps_, 'router.params.type', '')
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    const addlink = () => {
        if(action === 'view'){
            return <TeamForm {...props} />
        }else{
             if(action === 'update'){
                return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('common.team', {params:{action:'view', type:type, mId:mId, id:""}})}}>View list</span>
            }
        }
    }

    const heading = () => {
        if(action === 'view'){
            return <div className='txt-md fm-sb'>Team list</div>
        }else{
            return <div className='txt-md fm-sb'>Team details</div>
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