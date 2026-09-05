import helpers from 'ui-helpers';
import BusinessUnitFormInputs from 'aio-app-ui-common-molecules/business-unit-form-inputs';
import BusinessUnitResultList from 'aio-app-ui-common-molecules/business-unit-result-list';
import BusinessUnitFormDrawer from 'aio-app-ui-common-molecules/business-unit-from-drawer'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');

    const form = () => {
         return (
            <div className='full pd-rl24 pd-t30 bxs'>
                <BusinessUnitFormInputs {...props} />
            </div>
        )
    }

    const noResults = () => {
         const id = helpers.random.id(12);

        if(action === 'view'){
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>Business units list not found?</p>
                        <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                        <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                        {<BusinessUnitFormDrawer
                            id={id}
                            {...props}
                            details={{}}
                        />}
                    </div>
                </div>
            )
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
                    <BusinessUnitResultList {...props} />
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