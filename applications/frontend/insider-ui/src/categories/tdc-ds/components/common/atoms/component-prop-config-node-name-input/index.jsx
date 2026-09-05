import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const PropDescription = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'name'
    const details = helpers.json.val(props, 'data', {});
    const siblings = helpers.json.val(props, 'parent.aioDsChilds', {});

    const onChange = (e) => {
        let d = helpers.json.copy(details);
        let v = helpers.json.val(e, 'target.value', '');
            d[map] = v;

        if(!siblings[v]){
            d[map] = v;
        }else{
            d[map] = '';
        }

        if(props.onUpdate){
            props.onUpdate(d);
        }
    }

    return (
        <Input 
            label="Node name"
            pattern="json-map-key"
            onChange={(e) => {onChange(e)}}
            value={helpers.json.val(details, map, '')}
        />
    )
}

export default PropDescription;