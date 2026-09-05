import helpers from 'ui-helpers';
import CollectionsResultsList from 'aio-app-ui-tdc-db-molecules/collections-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const blank = helpers.json.val(props, 'details.blank');
    const results = helpers.json.val(props, 'details.list');

    const addnew = () => {
        helpers.url.route.redirect('tdc-db.collectionDetails', {
            params:{
                id:'x',
                action:'create',
                dbId:helpers.json.val(_siteProps_, 'router.params.dbId')
            }
        })
    }

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <CollectionsResultsList 
                    {...props}
                    blank={blank}
                    results={results}
                />
            )
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-x fm-md'>Collection schema is not defined?</p>
                        <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                        <span className="link-u ns cp txt-xs" onClick={() => {addnew()}}>Lets Start</span>
                    </div>
                </div>
            )
        }
    }

    return ui()
}

export default Comp;