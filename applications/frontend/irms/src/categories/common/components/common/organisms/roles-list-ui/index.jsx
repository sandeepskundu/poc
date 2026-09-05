import helpers from 'ui-helpers';
import RolesResultList from 'aio-app-ui-common-molecules/roles-result-list';
import RolesFormInputs from 'aio-app-ui-common-molecules/roles-form-inputs';
import RolesFormDrawer from 'aio-app-ui-common-molecules/roles-form-drawer'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const id = helpers.random.uuid();
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');

    const form = () => {
         return (
            <div className='full pd-rl24 pd-t30 bxs'>
                <RolesFormInputs {...props} />
            </div>
        )
    }

    const norUi = () => {
        return (
            <div className='full'>
                <div className='full bxs pd-t20 pd-rl20'>
                    <p className='txt-xl fm-md'>Roles data is not found?</p>
                    <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                    <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                    {<RolesFormDrawer
                        id={id}
                        {...props}
                        details={{}}
                    />}
                </div>
            </div>
        )
    }

    const noResults = () => {
        

        if(action === 'view'){
            if(id){
                return norUi();
            }else{
                return norUi()
            }
        }else{
            if(action === 'update'){
                return form();
            }
        }
    }

    const list = () => {
        if(action === 'update' && !blank){
            return form();
        }else{
            if(blank || results.length > 0){
                return (
                    <RolesResultList {...props} />
                )
            }else{
                return noResults();
            }
        }
    }

    const ui = () => {
        return list();
    }

    return ui()
}

export default Comp;