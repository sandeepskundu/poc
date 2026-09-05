import helpers from 'ui-helpers';
import UiComponentForm from 'aio-app-ui-tdc-interface-kit-molecules/ui-component-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const results = helpers.json.val(props, 'results', []);
    const details = helpers.json.val(props, 'componentData', {});
    const childView = helpers.json.val(_siteProps_, 'router.params.id');
    const action = helpers.json.val(_siteProps_, 'router.params.action');
    const hasAtomicChilds = helpers.json.val(props, 'componentData.hasAtomicChilds', false);

    console.log(props)

    const addlink = () => {
        if(action === 'view'){
            if(hasAtomicChilds){
                if(results && results.length < 6){
                    return <UiComponentForm {...props} />
                }else{
                    return <></>
                }
            }else{
                return <UiComponentForm {...props} />
            }
        }
    }

    const rootLink = () => {
        if(action === 'view'){
            return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('tdc-interface-kit.uiComponents', {params:{action:'view', id:''}})}}>Back to base</span>
        }
    }

    const siblings = () => {
        if(action === 'update' && details.hashId){
            return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('tdc-interface-kit.uiComponents', {params:{action:'view',id:details.parentId}})}}>View siblings</span>
        }
    }

    const heading = () => {
        if(action === 'view'){
            if(childView){
                return <div className='txt-md fm-sb'>UI Components</div>
            }else{
                return <div className='txt-md fm-sb'>UI Components Category</div>
            }
        }else{
            return <div className='txt-md fm-sb'>Component details</div>
        }
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
                {rootLink()}
                {addlink()}
                {siblings()}
            </ul>
        </div>
    )
}

export default Comp 