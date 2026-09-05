import helpers from 'ui-helpers';
import NumberInput from 'aio-app-ui-tdc-atoms/number-input';
import SelectBox from 'aio-app-ui-atoms/select-box';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'appConfig.appWebCacheTime';
    const details = helpers.json.val(props, 'details', {});
    const time = helpers.json.val(details, map, '');
    const alpha = helpers.string.remove.nonalpha(time);
    const number = helpers.string.remove.nonnumber(time);

    const onChange = (val, type) => {
        let rv = [];
        let d = helpers.json.copy(details);

        if(type === 'time'){
            let v = helpers.json.val(val, 'target.value', '');
                v = helpers.string.remove.nonnumber(`${v}`);
                v = parseInt(v || 0);
                rv.push(v);
                rv.push(alpha)
        }else{
            rv.push(number);
            rv.push(val)
        }

        d = helpers.json.set(d, map, rv.join(''), false, true);

        if(props.onChange){
            props.onChange(d);
        }
    }

    const ui = () => {
        return (
            <div className='full grid-wrapper grid-layout-4 bxs pd-tb20'>
                <li className='grid bxs pd-r20'>
                    <Input
                        value={number}
                        pattern="number"
                        label="Cache unit"
                        onChange={(e) => {onChange(e, 'time')}}
                        validation={helpers.json.val(props, `validation.body.${map}`, {})}
                    />
                </li>
                <li className='grid bxs pd-r20'>
                    <SelectBox
                        noBlank={true}
                        selected={alpha || ''}
                        list={helpers.json.val(props, 'configs.appConfigs.cacheDurType', {})}
                        selectBoxProps={{
                            label:'Cache unit type',
                            onSelect:(e, arg) => {onChange(arg.id, 'type')},
                            labelProps:{
                                validation:helpers.json.val(props, `validation.body.${map}`, {})
                            },
                           
                        }}
                    />
                </li>
            </div>
        )
    }

    return ui()
}

export default Comp;