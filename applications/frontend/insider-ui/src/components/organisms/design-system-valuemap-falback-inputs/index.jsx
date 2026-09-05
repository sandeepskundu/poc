import helpers from 'ui-helpers';
import DesignSystemValuemapDrawer from 'aio-app-ui-molecules/design-system-valuemap-drawer';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const details = helpers.json.val(props, 'details.fallback', {});
    const dl = helpers.json.length(details);
    const id = helpers.random.id(10);

    const onSave = (arg) => {
        let d = helpers.json.copy(details);
            d = helpers.json.merge(d, arg || {});
            if(props.onChange){
                props.onChange(d, helpers.json.val(props, 'valuemap', []));
            }
    }

    const ui = () => {
        if(dl > 0){
            return <></>;
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-10'>
                        <p className='txt-md fm-md'>Fallback value map is not added?</p>
                        <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                        <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                        <DesignSystemValuemapDrawer
                            id={id}
                            {...props}
                            onSave={onSave}
                            details={details}
                        />
                    </div>
                </div>
            )
        }
    }

    return ui();
};

export default Comp;