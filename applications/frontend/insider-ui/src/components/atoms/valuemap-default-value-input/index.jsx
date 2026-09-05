import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'value';
    const valuetype = helpers.json.val(props, 'valuetype', 'string');
    const details = helpers.json.val(props, 'details.default', {});

    const pattern = (() => {
        let rval = '';

        switch (valuetype){
            case 'object':
            break;
            case 'number':
                rval = 'number'
            break;
            default:
        };

        return rval;
    })();

    const onChange = (e) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(e, 'target.value', '');

            if(val || (val === 0 || val === '0')){
                d = helpers.json.set(d, map, val, false, true);
            }else{
                helpers.json.remove(d, map)
            }

            if(props.onChange){
                props.onChange(d);   
            }
    }

    const ui = () => {
        return (
            <Input
                pattern={pattern}
                onChange={(e) => {onChange(e)}}
                value={helpers.json.val(details, map, '')}
                label={helpers.json.val(props, 'label', 'Value map')}
            />
        )
    }

    return ui();
}

export default Comp;