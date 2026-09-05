import React from 'react';
import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';
import ValueEnumMapList from 'aio-app-ui-atoms/schema-editor/schema-validations/enums-value-map-list';

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
                    <div className='full bxs grid-wrapper hide'>
                        <div className='grid-w3 pd-r10 bxs'>
                            <SelectBox 
                                noBlank={true}
                                selected={selected('type')} 
                                list={helpers.json.val(props, 'configs.match.types', {})}
                                selectBoxProps={{
                                    "label":"Type",
                                    onSelect:(e, item) => {onChange(item, 'type')}
                                }}
                            />
                        </div>
                        <div className='grid-w3 pd-r10 pd-l10 bxs'>
                            <SelectBox 
                                noBlank={true}
                                selected={selected('category')}  
                                list={helpers.json.val(props, 'configs.match.types', {})}
                                selectBoxProps={{
                                    "label":"Category",
                                    onSelect:(e, item) => {onChange(item, 'category')}
                                }}
                            />
                        </div>
                        <div className='grid-w3 pd-r10 pd-l10 bxs'>
                            <SelectBox 
                                noBlank={true}
                                selected={selected('subCategory')}  
                                list={helpers.json.val(props, 'configs.match.types', {})}
                                selectBoxProps={{
                                    "label":"Sub-category",
                                    onSelect:(e, item) => {onChange(item, 'subCategory')}
                                }}
                            />
                        </div>
                        <div className='grid-w3 pd-l10 bxs'>
                            <SelectBox 
                                noBlank={true}
                                selected={selected('name')} 
                                list={helpers.json.val(props, 'configs.match.types', {})}
                                selectBoxProps={{
                                    "label":"Type",
                                    onSelect:(e, item) => {onChange(item, 'name')}
                                }}
                            />
                        </div>
                    </div>
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