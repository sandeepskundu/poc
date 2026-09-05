import helpers from 'ui-helpers';
import CreateDsDrawer from 'aio-app-ui-tdc-ds-organisms/create-ds-drawer';
import DsResultsList from 'aio-app-ui-tdc-ds-molecules/ds-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const id = helpers.random.id(10);
    const blank = helpers.json.val(props, 'details.blank');
    const results = helpers.json.val(props, 'details.list');

    const start = () => {
        return (
            <p className='full bxs'>
                <label htmlFor={id} className='cp link-u ns txt-xs'>Start</label>
                <CreateDsDrawer {...props} data={{}} id={id} />
            </p>
        )
    }

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <DsResultsList 
                    {...props}
                    blank={blank}
                    results={results}
                />
            )
        }else{
            return (
                <div className='full bxs pd-20'>
                    <p className='txt-x fm-md'>Your design system library is empty!</p>
                    <p className='full txt-xs mr-tb4'>Let's begin from scratch.</p>
                    {start()}
                </div>
            )
        }
    }

    return ui()
}

export default Comp;