import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const config = helpers.json.val(props, 'details.config', {});
    const types = helpers.json.val(props, 'configs.props.required.types', {});
    const options = helpers.json.val(props, 'configs.props.required.options', {});

    const map = () => {
        let sel = helpers.json.val(props, 'selected', []);
        let rsel = [...sel]
            rsel.push('config')
        return rsel;
    }

    const onChange = (selected, item, vtype) => {
        let d = helpers.json.copy(config);
        let t = helpers.json.val(item, 'id');
        let s = helpers.json.val(selected, 'id');
            d = helpers.json.set(d, `required.${t}`, s, false, false);

        if(props.onChange){
            props.onChange(d, map(), `required-on-${t}`);
        }
    }

    const selected = (arg) => {
        let id = helpers.json.val(arg, 'id');
        return helpers.json.val(props, `details.config.required.${id}`, '');
    }

    const ui = () => {
        let li = helpers.json.keys(types);
        if(li.length > 0){
            return li.map((name, i) => {
                const item = helpers.json.val(types, name, {});
                return (
                    <li className='grid-w2 flx-vc pd-r16' key={id+i}>
                        <div className='full bxs'>
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
                        </div>
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