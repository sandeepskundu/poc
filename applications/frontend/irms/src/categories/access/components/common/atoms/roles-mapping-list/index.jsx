import helpers from 'ui-helpers';
import MappingList from 'aio-app-ui-atoms/mapping-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'roleMapping';
    const details = helpers.json.val(props, 'details', {});

    const onChange = (arg) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(arg, 'id', '');
            d = helpers.json.set(d, map, val, false, true);

            if(props.onChange){
                props.onChange(d);   
            }
    }

    const itemParser = (rval, arg) => {
        rval.id = arg.vd.id;
        return rval;
    }

    const gridCls = () => {
         let mode = helpers.json.val(_siteProps_, 'router.params.action', '');
         let lpId = helpers.json.val(_siteProps_, 'router.params.linkedPresetId', '');

        if(!lpId){
            return 'full'
        }
    }

    const getRootId = () => {
        let group = {
            1:'group',
            2:'group',
            3:'group',
            4:'group',
            5:'group',
            6:'employer',
            7:'employer',
            8:'employer',
            9:'employer',
            10:'employer'
        }
        let type = details.type;
        let t = helpers.json.val(group, `${type}`, '');

        if(t){
            if(t === 'group'){
                return helpers.json.val(props, 'auth.uIds.merchant')
            }else{
                return helpers.json.val(props, 'auth.uIds.employer');
            }
        }
    }

    const ui = () => {
        return (
            <MappingList
                label='Select role'
                apies={{
                    root:{
                        name:'access.role.getByMapId',
                        request:{
                            options:{
                                endpoint:'access.role.getByMapId',
                            },
                            request:{
                                params:{
                                    id:getRootId()
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
                gridCls={gridCls()}
                itemParser={itemParser}
                onChange={(arg) => {onChange(arg)}}
                valuemap={helpers.json.val(details, map, '')}
                validation={helpers.json.val(props, `validation.body.${map}`, {})}
                mappingLastIndexVal={helpers.json.val(props, 'configs.enums.mappingLastIndexVal.required', '__LAST__ITEM__ENUM__')}
            />
        )
    }

    return ui();
}

export default Comp;