import helpers from 'ui-helpers';
import AccessRoleResultsList from 'aio-app-ui-access-molecules/access-roles-results-list';
import AccessRoleFormInputs from 'aio-app-ui-access-molecules/access-role-form-inputs';
import AccessRoleFormDrawer from 'aio-app-ui-access-molecules/access-role-form-drawer';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const details = helpers.json.val(props, 'roleData', {})

    const noResults = () => {
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');
        let action = helpers.json.val(_siteProps_, 'router.params.action', '');
        if(action === 'view'){
            if(id){
                return (
                    <div className='full'>
                        <div className='full bxs pd-t20 pd-rl20'>
                            <p className='txt-xl fm-md'>Child roles data is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                            {<AccessRoleFormDrawer
                                id={id}
                                {...props}
                                details={{}}
                            />}
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className='full'>
                        <div className='full bxs pd-t20 pd-rl20'>
                            <p className='txt-xl fm-md'>Access roles data is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id+'a'}>Lets Start</label>
                            <AccessRoleFormDrawer
                                id={id+'a'}
                                {...props}
                                details={{}}
                            />
                        </div>
                    </div>
                )
            }
        }else{
            if(action === 'update'){
                return (
                    <div className='full pd-rl24 pd-t30 bxs'>
                        <AccessRoleFormInputs {...props} details={details} />
                    </div>
                )
            }
        }
    }

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <AccessRoleResultsList {...props} />
            )
        }else{
            return noResults();
        }
    }

    return ui()
}

export default Comp;