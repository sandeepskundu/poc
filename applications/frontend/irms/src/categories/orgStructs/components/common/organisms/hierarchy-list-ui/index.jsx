import helpers from 'ui-helpers';
import HierarchyResultList from 'aio-app-ui-orgStructs-molecules/hierarchy-result-list';
import HierarchyFormInputs from 'aio-app-ui-orgStructs-molecules/hierarchy-form-inputs';
import HierarchyFormDrawer from 'aio-app-ui-orgStructs-molecules/hierarchy-form-drawer'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const details = helpers.json.val(props, 'hierarchyData', {});
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');

    const form = () => {
         return (
            <div className='full pd-rl24 pd-t30 bxs'>
                <HierarchyFormInputs {...props} details={details} />
            </div>
        )
    }

    const noResults = () => {
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(action === 'view'){
            if(id){
                return (
                    <div className='full'>
                        <div className='full bxs pd-t20 pd-rl20'>
                            <p className='txt-xl fm-md'>Department childs hierarchy data is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                            {<HierarchyFormDrawer
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
                            <p className='txt-xl fm-md'>Department hierarchy data is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id+'a'}>Lets Start</label>
                            <HierarchyFormDrawer
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
                    <HierarchyResultList {...props} />
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