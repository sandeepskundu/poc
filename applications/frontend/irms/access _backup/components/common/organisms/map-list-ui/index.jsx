import helpers from 'ui-helpers';
import MapResultList from 'aio-app-ui-access-molecules/map-results-list';
import MapFormInputs from 'aio-app-ui-access-molecules/map-form-inputs';
import MapFormDrawer from 'aio-app-ui-access-molecules/map-form-drawer';

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
                    <MapFormDrawer
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
                    <MapFormInputs {...props} />
                </div>
            )
        }else{
            if(blank || results.length > 0){
                return (
                    <MapResultList {...props} />
                )
            }else{
                return noResults();
            }
        }
    }

    return ui()
}

export default Comp;