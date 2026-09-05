import helpers from 'ui-helpers';
import AppResultList from 'aio-app-ui-tdc-molecules/app-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const type = helpers.json.val(_siteProps_, 'router.params.type', '')
    
    const noResults = () => {
        return (
            <div className='full'>
                <div className='full bxs pd-t20 pd-rl20'>
                    <p className='txt-xl fm-md'>Application data is not found?</p>
                    <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                    <span className='link-u ns cp txt-xs' onClick={() => {helpers.url.route.redirect('tdc.app-details-form', {params:{type:type, id:""}})}}>Lets Start</span>
                    
                </div>
            </div>
        )
    }

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <AppResultList {...props} />
            )
        }else{
            return noResults();
        }
    }

    return ui()
}

export default Comp;