import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let map = `name`;
    let details = helpers.json.val(props, 'details', {});
    let type = helpers.json.val(_siteProps_, 'router.params.type', '');
    let value = helpers.json.val(details, map, '');

    const onChange = (e) => {
        if(props.onChange){
            let val = helpers.json.val(e, 'target.value', '');
                val = helpers.string.remove.space(val);
                props.onChange(val);
            }
    }

    const ui = () => {
        return (
            <Input
                value={value}
                onChange={(e) => {onChange(e)}}
                label={`${helpers.string.transform.camelize(type)} name`}
            />
        )
    }

    return ui();
}

export default Comp;