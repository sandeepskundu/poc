import helpers from 'ui-helpers';
import ApiPresetResultList from 'aio-app-ui-access-molecules/api-preset-results-list';
import ApiPresetFormInputs from 'aio-app-ui-access-molecules/api-preset-form-inputs';
import ApiPresetFormDrawer from 'aio-app-ui-access-molecules/api-preset-form-drawer';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const details = helpers.json.val(props, 'presetData', {});
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');

    const form = () => {
        return (
            <div className='full pd-rl24 pd-t30 bxs'>
                <ApiPresetFormInputs {...props} details={details} />
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
                            <p className='txt-xl fm-md'>Child roles data is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                            {<ApiPresetFormDrawer
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
                            <p className='txt-xl fm-md'>API access preset data is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id+'a'}>Lets Start</label>
                            <ApiPresetFormDrawer
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

    const ui = () => {
        if(action === 'update' && !blank){
            return (
                <>
                    {form()}
                </>
            )
        }else{
            if(blank || results.length > 0){
                return (
                    <ApiPresetResultList {...props} />
                )
            }else{
                return noResults();
            }
        }
    }

    return ui()
}

export default Comp;