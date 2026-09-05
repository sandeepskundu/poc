import helpers from 'ui-helpers';
import AddNewDbDrawer from 'aio-app-ui-tdc-db-molecules/add-new-database-drawer';
import DatabaseResultsList from 'aio-app-ui-tdc-db-molecules/database-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const id = helpers.random.id(16);
    const blank = helpers.json.val(props, 'details.blank');
    const results = helpers.json.val(props, 'details.list');

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <DatabaseResultsList 
                    {...props}
                    blank={blank}
                    results={results}
                />
            )
        }else{
            return (
                <div className='full bxs'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>No database added?</p>
                        <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                        <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                        <AddNewDbDrawer {...props} dbDetails={{}} id={id} />
                    </div>
                </div>
            )
        }
    }

    return ui()
}

export default Comp;