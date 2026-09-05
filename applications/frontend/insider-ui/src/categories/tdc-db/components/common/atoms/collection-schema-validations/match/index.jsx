import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';
import ValueEnumMapList from 'aio-app-ui-tdc-db-atoms/collection-schema-validations/enums-value-map-list';

const EnumValidation = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const config = helpers.json.val(props, 'details', {});
    const sel = helpers.json.val(props, 'selected', []);
    const vmap = helpers.json.val(props, 'item.valuemap');

    const onChange = (item, type) => {
        let d = {...config};
        let val = helpers.json.val(item, 'id', '');
            d = helpers.json.set(d, `${vmap}.${type}`, val, false, false)

            if(props.onChange){
                props.onChange(d, sel);
            }
    }

    const selected = (type) => {
        return helpers.json.val(config, `${vmap}.${type}`);
    }

    const ui = () => {
        const vl = helpers.json.val(config, vmap, {});
        const vlen = helpers.json.length(vl);

        if(vlen && vlen > 0) {
            return (
                <>
                    <ValueEnumMapList
                        onChange={(arg) => {
                            onChange(arg, 'valuemap');
                        }}
                        valuemap={helpers.json.val(config, `${vmap}.valuemap`, '')}
                    /> 
                    <div className='full bxs'>
                        <Input
                            label="Error message"
                            value={selected('message')}
                            onChange={(e) => {
                                let val = helpers.json.val(e, 'target.value', '');

                                    onChange({
                                        id:helpers.string.transform.to.paragraph(val)
                                    }, 'message')
                            }}
                        />
                    </div>
                </>
            )
        }else {
            return <></>
        }
    }

    return ui();
}

export default EnumValidation;