import helpers from 'ui-helpers';
import UiComponentFormDrawer from 'aio-app-ui-tdc-interface-kit-molecules/ui-component-form-drawer';
import UiComponentFormInputs from 'aio-app-ui-tdc-interface-kit-molecules/ui-component-form-inputs';
import UiComponentResultsList from 'aio-app-ui-tdc-interface-kit-molecules/ui-component-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const details = helpers.json.val(props, 'componentData', {})

    const noResults = () => {
        let id = helpers.random.id(16);
        let action = helpers.json.val(_siteProps_, 'router.params.action', '');

        if(action === 'view'){
            if(id){
                return (
                    <div className='full'>
                        <div className='full bxs pd-t20 pd-rl20'>
                            <p className='txt-xl fm-md'>Child component is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                            <UiComponentFormDrawer
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
                            <p className='txt-xl fm-md'>UI component is not found?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                            <UiComponentFormDrawer
                                id={id}
                                {...props}
                            />
                        </div>
                    </div>
                )
            }
        }else{
            if(action === 'update'){
                return (
                    <div className='full pd-rl24 pd-t30 bxs'>
                        <UiComponentFormInputs {...props} details={details} />
                    </div>
                )
            }
        }
    }

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <UiComponentResultsList {...props} />
            )
        }else{
            return noResults();
        }
    }

    return ui()
}

export default Comp;