import helpers from 'ui-helpers';
import MappingList from 'aio-app-ui-atoms/mapping-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'details', {});
    const valuemap = helpers.json.val(props, 'valuemap', '')

    const onChange = (val) => {
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, valuemap, val, false, true)
        
            if(props.onChange){
                props.onChange(d);
            }
    }

    const itemParser = (rval, arg) => {
        rval.id = arg.vd.id;

        return rval;
    }

    const ui = () => {
        return (
            <MappingList
                apies={{
                    root:{
                        name:'access.role.getByMapId',
                        request:{
                            options:{
                                endpoint:'access.role.getByMapId',
                            },
                            request:{
                                params:{
                                    id:'672cac644a0dded765b5c3b2'
                                }
                            }
                        },
                    },
                    childs:{
                        name:'access.role.getByMapId',
                        request:{
                            options:{
                                endpoint:'access.role.getByMapId',
                            }
                        },
                    }
                }}
                selectorKey="id"
                itemParser={itemParser}
                gridCls={'grid-w2 pd-r24'}
                onChange={(arg) => {onChange(arg.id)}}
                valuemap={helpers.json.val(details, valuemap, '')}
                validation={helpers.json.val(props, `validation.body.${valuemap}`, {})}
                mappingLastIndexVal={helpers.json.val(props, 'configs.enums.mappingLastIndexVal.required', '__LAST__ITEM__ENUM__')}
            />
        )
    }

    return ui();
}

export default Comp;