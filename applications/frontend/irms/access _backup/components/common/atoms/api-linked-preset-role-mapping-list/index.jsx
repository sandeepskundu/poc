import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import MappingList from 'aio-app-ui-atoms/mapping-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'roleHashMap';
    const details = helpers.json.val(props, 'details', {});
    const lastIndex = helpers.json.val(appHelpers, 'constants.enums.mappingLastIndexVal.required', '');

    const setHashId = (arg, val) => {
        let pId = '';
        
        let vmap = helpers.string.replace.word(val, `.${lastIndex}`, '');
        let maplist = vmap.split('.');

        if(maplist && maplist.length > 0){
            pId = maplist?.[maplist.length - 1];
        }

        arg.roleHash = pId || '';

        return arg;
    }

    const onChange = (arg) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(arg, 'id', '');
            d = helpers.json.set(d, map, val, false, true);
            d = setHashId(d, val);

            if(props.onChange){
                props.onChange(d);   
            }
    }

    const itemParser = (rval, arg) => {
        return rval;
    }

    const gridCls = () => {
         let mode = helpers.json.val(_siteProps_, 'router.params.action', '');
         let lpId = helpers.json.val(_siteProps_, 'router.params.linkedPresetId', '');

        if(!lpId){
            return 'full'
        }
    }

    const ui = () => {
        return (
            <MappingList
                label='Select role'
                apies={{
                    root:{
                        name:'access.roles.rootRoles',
                        request:{
                            options:{
                                endpoint:'access.roles.rootRoles',
                            }
                        },
                    },
                    childs:{
                        name:'access.roles.childRolesByParentHashId',
                        request:{
                            options:{
                                endpoint:'access.roles.childRolesByParentHashId',
                            }
                        },
                    }
                }}
                selectorKey="id"
                gridCls={gridCls()}
                itemParser={itemParser}
                onChange={(arg) => {onChange(arg)}}
                valuemap={helpers.json.val(details, map, '')}
                validation={helpers.json.val(props, 'validation.body.roleHashMap', {})}
                mappingLastIndexVal={helpers.json.val(appHelpers, 'constants.enums.mappingLastIndexVal.required', '__LAST__ITEM__ENUM__')}
            />
        )
    }

    return ui();
}

export default Comp;