import helpers from 'ui-helpers';
import PresetFormInputs from 'aio-app-ui-access-molecules/preset-form-inputs';
import PresetFormDrawer from 'aio-app-ui-access-molecules/preset-form-drawer';
import PresetResultList from 'aio-app-ui-access-molecules/preset-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(20);
    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'presets', []);
    const page = helpers.json.val(_siteProps_, 'router.view.page', '');
    const cate = helpers.json.val(_siteProps_, 'router.view.category', '');

    const noResults = () => {
        return (
            <div className='full'>
                <div className='full bxs pd-t20 pd-rl20'>
                    <p className='txt-xl fm-md'>Access preset data is not found?</p>
                    <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                    <label className="link-u ns cp txt-xs" htmlFor={id+'a'}>Lets Start</label>
                    <PresetFormDrawer id={id+'a'} {...props} details={{}} />
                </div>
            </div>
        )
    }

    const ui = () => {
        
        if(page === 'preset' && cate === 'access'){
            return (
                <div className='full pd-rl24 pd-t30 bxs'>
                    <PresetFormInputs {...props} />
                </div>
            )
        }else{
            if(blank || results.length > 0){
                return (
                    <PresetResultList {...props} />
                )
            }else{
                return noResults();
            }
        }
    }

    return ui()
}

export default Comp;