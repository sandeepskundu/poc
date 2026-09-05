import helpers from 'ui-helpers';
import DsThemeResultsList from 'aio-app-ui-tdc-ds-molecules/ds-theme-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const blank = helpers.json.val(props, 'details.blank');
    const results = helpers.json.val(props, 'details.list');

    const addnew = () => {
        helpers.url.route.redirect('tdc-ds.theme-colors', {
            params:{
                action:'create',
                dsId:helpers.json.val(_siteProps_, 'router.params.dsId')
            }
        })
    }

    const start = () => {
        return (
            <p className='full bxs'>
                <span className='link-u ns cp txt-xs' onClick={() => {addnew()}}>Start</span>
            </p>
        )
    }

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <DsThemeResultsList 
                    {...props}
                    blank={blank}
                    results={results}
                />
            )
        }else{
            return (
                <div className='full bxs pd-20'>
                    <p className='txt-x fm-md'>Your theme library is empty!</p>
                    <p className='full txt-xs mr-tb4'>Let's begin from scratch.</p>
                    {start()}
                </div>
            )
        }
    }

    return ui()
}

export default Comp;