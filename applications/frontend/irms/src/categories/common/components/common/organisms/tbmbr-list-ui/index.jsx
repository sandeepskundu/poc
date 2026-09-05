import helpers from 'ui-helpers';
import TbmbrResultList from 'aio-app-ui-common-molecules/tbmbr-result-list';
import TbmbrFormInputs from 'aio-app-ui-common-molecules/tbmbr-form-inputs';
import TbmbrFormDrawer from 'aio-app-ui-common-molecules/tbmbr-form-drawer';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');
    
    const form = () => {
        return (
            <div className='full pd-rl24 pd-t30 bxs'>
                <TbmbrFormInputs {...props} />
            </div>
        )
    }

    const noResults = () => {
        if(action === 'view'){
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>Linked roles map for selecte team not found?</p>
                        <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                        <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                        <TbmbrFormDrawer id={id} {...props} details={{}} />
                    </div>
                </div>
            )
        }
    }

    const list = () => {
        if(action === 'update' && !blank){
            return form();
        }else{
            if(blank || results.length > 0){
                return (
                    <TbmbrResultList {...props} />
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