import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import ValueEnumMapList from 'aio-app-ui-atoms/enums-value-map-list';
import ValuemapBooleanOptions from 'aio-app-ui-atoms/valuemap-boolean-options';
import ValuemapDefaultValueInput from 'aio-app-ui-atoms/valuemap-default-value-input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const map = 'valueFromMap';
    const valuemap = 'valuemap';
    const rumtimeMap = 'mapValueAtRuntime';
    const details = helpers.json.val(props, 'details.default', {});
    const valuetype = helpers.json.val(props, 'valuetype', 'string');
    const valFromMap = helpers.json.val(details, map, false);
    const mapValueAtRuntime = helpers.json.val(details, rumtimeMap, false);

    const maptoggle = (() => {
        const exclude = {
            'jsx':false,
            'enum':false,
            'number':false,
            'string':false,
            'object':false,
            'boolean':false,
            'function':false,
            'design-system':true,
            'extended-design-system':true
        };

        return !exclude[valuetype]
    })();

    const onChangeCallback = (arg) => {
        if(props.onChange){
            props.onChange(arg);   
        }
    }

    const onChange = (arg) => {
        if(props.onChange){
            let d = helpers.json.copy(details);
            let val = helpers.json.val(arg, 'id', '')
                d = helpers.json.set(d, valuemap, val, false, true);
                onChangeCallback(d);
        }
    }

    const input = () => {
        switch (valuetype) {
            case 'string':
                return (
                    <div className='full bxs pd-b20'>
                        <ValuemapDefaultValueInput {...props} label="Value" />
                    </div>
                )
            break;
            case 'object':
                return (
                    <ValueEnumMapList
                        onChange={(arg) => {onChange(arg)}}
                        valuemap={helpers.json.val(details, valuemap, '')}
                    />
                )
            break;
            case 'design-system':
            break;
            case 'extended-design-system':
            break;
            case 'boolean':
                return (
                    <div className='full bxs pd-b20'>
                        <ValuemapBooleanOptions {...props} />
                    </div>
                )
            break;
            case 'function':
            break;
            case 'jsx':
            break;
            case 'enum':
            break;
            case 'number':
                return (
                    <div className='full bxs pd-b20'>
                        <ValuemapDefaultValueInput {...props} />
                    </div>
                )
            break;
            default:
                return <></>
        }
    }

    const onToggle = (checked) => {
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, map, checked, false, true);

            if(checked){
                delete d.value;
            }else{
                delete d.valuemap;
            }

            onChangeCallback(d);
    }
    
    const inpouts = () => {
        if(maptoggle){
            if(valFromMap){
                return (
                    <ValueEnumMapList
                        onChange={(arg) => {onChange(arg)}}
                        valuemap={helpers.json.val(details, valuemap, '')}
                    />
                )
            }else{
                return input();
            }
        }else{
            return input();
        }
    }

    const toggle = () => {
        if(maptoggle){
            return (
                <div className='grid bxs pd-b20 pd-r20'>
                    <Toggle
                        checked={valFromMap}
                        label="Value from map"
                        onChange={(checked) => {onToggle(checked)}}
                    />
                </div>
            )
        }else{
            return <></>
        }
    }

    const onRuntimeChange = (checked) => {
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, rumtimeMap, checked, false, true);
            onChangeCallback(d);
    }

    const runtime = () => {
        return (
            <div className='grid bxs pd-b20 pd-r20'>
                <Toggle
                    checked={mapValueAtRuntime}
                    label="Map value at runtime"
                    onChange={(checked) => {onRuntimeChange(checked)}}
                />
            </div>
        )
    }

    const common = () => {
        return (
            <li className='full bxs grid-wrapper grid-layout-5'>
                {runtime()}
                {toggle()}
            </li>
        )
    }

    const ui = () => {
        return (
            <>
                {common()}
                <li className='full bxs'>
                    {inpouts()}
                </li>
            </>
        )
    }

    return (
        <ul className='full bxs pd-t16'>
            {ui()}
        </ul>
    )
}

export default Comp;