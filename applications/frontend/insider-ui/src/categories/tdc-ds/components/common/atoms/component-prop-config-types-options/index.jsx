import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'details.aioDsConfigs.type';
    const details = helpers.json.val(props, 'data', {});
    const options = helpers.json.val(props, 'configs.props.types', {});

    const onChange = (el, arg, i) => {
        let rv = [];
        let d = helpers.json.copy(details);
        let vmap = helpers.json.val(props, 'valuemap.self', []);

            for(const a in vmap){
                let i = parseInt(a);
                    rv.push(vmap[a]);

                    if(i < (vmap.length - 1)){
                        rv.push('aioDsChilds');
                    }
            }

            d = helpers.json.set(details, map, arg.id);
            helpers.json.remove(d, 'details.aioDsChilds')
            helpers.json.remove(d, 'details.aioDsConfigs.props')
            helpers.json.remove(d, 'details.aioDsConfigs.valuemap');

            if(props.onUpdate){
                props.onUpdate(d, rv.join('.'));
            }
    }

    return (
        <SelectBox 
            list={options}
            noBlank={true}
            selected={helpers.json.val(details, map, '')} 
            selectBoxProps={{
                onSelect:onChange,
                "label":"Prop type",
            }}
        />
    )
}

export default PropTypes;