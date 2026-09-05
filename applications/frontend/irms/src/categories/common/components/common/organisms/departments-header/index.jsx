import helpers from 'ui-helpers';
import DepartmentForm from 'aio-app-ui-common-molecules/departments-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'details', {});
    const id = helpers.json.val(_siteProps_, 'router.params.id');
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    const addlink = () => {
        if(action === 'view'){
            return <DepartmentForm {...props} />
        }
    } 

    const redirect = (arg) => {
        helpers.url.route.redirect('common.departments', arg)
    }

    const siblings = () => {
        if(action === 'update' && id && details.parentId){
            return <span className='cp txt-xs link-u ns' onClick={() => {redirect({
                params:{
                    mId:mId,
                    action:'view',
                    id:(details.parentId === mId)?'':details.parentId
                }
            })}}>View siblings</span>
        }
    }

    const heading = () => {
        if(action === 'view'){
            return <div className='txt-md fm-sb'>Departments List</div>
        }else{
            return <div className='txt-md fm-sb'>Department details</div>
        }
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