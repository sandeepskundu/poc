import helpers from 'ui-helpers';
import RoleResultList from 'aio-app-ui-access-molecules/role-results-list';
import RoleFormInputs from 'aio-app-ui-access-molecules/role-form-inputs';
import RoleFormDrawer from 'aio-app-ui-access-molecules/role-form-drawer';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(20);
    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');

    const noResults = () => {
        return (
            <div className='full'>
                <div className='full bxs pd-t20 pd-rl20'>
                    <p className='txt-xl fm-md'>Access roles data is not found?</p>
                    <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                    <label className="link-u ns cp txt-xs" htmlFor={id+'a'}>Lets Start</label>
                    <RoleFormDrawer
                        id={id+'a'}
                        {...props}
                        details={{}}
                    />
                </div>
            </div>
        )
    }

    const ui = () => {
        if(action === 'update'){
            return (
                <div className='full pd-rl24 pd-t30 bxs'>
                    <RoleFormInputs {...props} />
                </div>
            )
        }else{
            if(blank || results.length > 0){
                return (
                    <RoleResultList {...props} />
                )
            }else{
                return noResults();
            }
        }
    }

    return ui()
}

export default Comp;