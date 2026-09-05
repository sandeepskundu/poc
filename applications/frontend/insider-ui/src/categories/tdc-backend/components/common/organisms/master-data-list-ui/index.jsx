import helpers from 'ui-helpers';
import MasteDataFormDrawer from 'aio-app-ui-tdc-backend-molecules/master-data-form-drawer';
import MasterDataFormInputs from 'aio-app-ui-tdc-backend-molecules/master-data-form-inputs';
import MasterDataResultsList from 'aio-app-ui-tdc-backend-molecules/master-data-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const details = helpers.json.val(props, 'masterData', {})

    const noResults = () => {
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');
        let action = helpers.json.val(_siteProps_, 'router.params.action', '');
        if(action === 'view'){
            if(id){
                return (
                    <div className='full'>
                        <div className='full bxs pd-t20 pd-rl20'>
                            <p className='txt-xl fm-md'>Child master data is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                            <MasteDataFormDrawer
                                id={id}
                                {...props}
                                details={{}}
                            />
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className='full'>
                        <div className='full bxs pd-t20 pd-rl20'>
                            <p className='txt-xl fm-md'>Master data is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                            <MasteDataFormDrawer
                                id={id}
                                {...props}
                            />
                        </div>
                    </div>
                )
            }
        }else{
            if(action === 'update'){
                console.log(details);
                return (
                    <div className='full pd-rl24 pd-t30 bxs'>
                        <MasterDataFormInputs {...props} details={details} />
                    </div>
                )
            }
        }
    }

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <MasterDataResultsList 
                    {...props}
                />
            )
        }else{
            return noResults();
        }
    }

    return ui()
}

export default Comp;