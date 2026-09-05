import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const map = 'details.aioDsConfigs.required';
    const details = helpers.json.val(props, 'data', {});
    const layout = helpers.json.val(props, 'layout', 'grid');
    const types = helpers.json.val(props, 'configs.props.required.types', {});
    const options = helpers.json.val(props, 'configs.props.required.options', {});

    const onChange = (selected, item, vtype) => {
        let d = helpers.json.copy(details);
        let t = helpers.json.val(item, 'id');
        let s = helpers.json.val(selected, 'id');
            d = helpers.json.set(d, `${map}.${t}`, s, false, false);

        if(props.onUpdate){
            props.onUpdate(d);
        }
    }

    const selected = (arg) => {
        let id = helpers.json.val(arg, 'id');
        return helpers.json.val(details, `${map}.${id}`, '');
    }

    const ui = () => {
        let li = helpers.json.keys(types);
        if(li.length > 0){
            return li.map((name, i) => {
                const item = helpers.json.val(types, name, {});
                return (
                    <li className={layout === 'full'?'full bxs pd-b20':'grid-w3 flx-vc pd-r20'} key={id+i}>
                        <SelectBox 
                            list={options}
                            noBlank={true}
                            selected={selected(item)} 
                            selectBoxProps={{
                                onSelect:(el, arg, i) => {
                                    onChange(arg, item);
                                },
                                "label":item.label,
                            }}
                        />
                    </li>
                )
            });
        }else{
            return <></>
        }
    }

    return (
        <ul className='full bxs grid-wrapper'>
            {ui()}
        </ul>
    )
}

export default PropTypes;