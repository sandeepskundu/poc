import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import ValuemapMapInput from 'aio-app-ui-atoms/valuemap-map-input'
import ValuemapFromOptions from 'aio-app-ui-atoms/valuemap-from-options';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'details', {});

    const rumtimeMap = 'mapValueAtRuntime';
    const mappedFromObj = 'valueNotMappedWithSelectedFromData';

    const onChange = (arg) => {
        if(props.onChange){
            props.onChange(arg, 'map');
        }
    }

    const mapInputs = () => {
        const objmap = helpers.json.val(details, mappedFromObj, false);

        if(objmap){
            return (
                <ValuemapMapInput {...props} details={details} onChange={onChange}/>
            )
        }else{
            return <ValuemapMapInput {...props} details={details} onChange={onChange}/>
        }
    }

    const onToggle = (checked, type) => {
        let d = helpers.json.copy(details);
            d[type] = checked;
            onChange(d);
    }
    
    const ui = () => {
        return (
            <>
                <ul className='full bxs grid-wrapper flx-vc pd-t14'>
                    <li className='grid-w2 bxs pd-b24 pd-r30'>
                        <ValuemapFromOptions {...props} details={details} onChange={onChange} />
                    </li>
                    <li className='grid-w3 bxs pd-b24 pd-r20'>
                        <Toggle
                            label="Map value at runtime"
                            checked={helpers.json.val(details, rumtimeMap, false)}
                            onChange={(checked) => {onToggle(checked, rumtimeMap)}}
                        />
                    </li> 
                    <li className='grid-w5 bxs pd-b24 pd-r30'>
                        <Toggle
                            label='Is value not mapped with selected from type?'
                            checked={helpers.json.val(details, mappedFromObj, false)}
                            onChange={(checked) => {onToggle(checked, mappedFromObj)}}
                        />
                    </li>                 
                </ul>
                <div className='full pd-b24'>
                    {mapInputs()}
                </div>
            </>
        )
    }

    return ui();
};

export default Comp;