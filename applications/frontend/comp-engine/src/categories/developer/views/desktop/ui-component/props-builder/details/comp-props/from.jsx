import helpers from 'ui-helpers';
import Select from 'aio-global-raw-ui/atoms/form/select';

const options = (() => {
    let ops = ['statics'].map((a, i) => {
        return {
            id: a,
            label: a
        }
    })
    return helpers.array.toIndexJson(ops, {});
})();

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    
    return (
        <Select
            input={{
                label:'From',
                placeholder:'From'
            }}
            mapping={{
                selected: {
                    0: 'id'
                }
            }}
            closeOn={{
                blur: false
            }}
            callback={{
                onSelect: (a, b, c, d) => {
                    props.onChange(helpers.json.get(a, '0.id'));
                }
            }}
            data={{
                list:options,
                selected: {
                    0: {
                        id:props.selected || '',
                        label:props.selected || ''
                    }
                }
            }}
        />
    )
}

export default Comp;