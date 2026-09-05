import helpers from 'ui-helpers';
import ValueEnumMapList from 'aio-app-ui-tdc-application-atoms/enums-value-map-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'virtual.validation.map';
    const mapping = helpers.json.val(props, 'mapping', []);
    const validation = helpers.json.val(props, 'validation', {});
 
    const onChange = (arg) => {
        if(props.onChange){
            let d = helpers.json.copy(validation);
            let val = helpers.json.val(arg, 'id', '')
                d = helpers.json.set(d, map, val, false, true);
                props.onChange(d, (mapping.join('.')), true);
        }
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                <ValueEnumMapList 
                    {...props}
                    onChange={(arg) => {onChange(arg)}}
                    valuemap={helpers.json.val(validation, map, '')}
                />
            </div>
        )
    }

    return ui();
}

export default Comp;