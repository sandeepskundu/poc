import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import MappingList from 'aio-app-ui-atoms/mapping-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'departOrRoleHashMap';
    const details = helpers.json.val(props, 'details', {});
    const code = helpers.json.val(props, 'presetData.code', '');
    const lastIndex = helpers.json.val(appHelpers, 'constants.enums.mappingLastIndexVal.optional', '');

    const setHashId = (arg, val) => {
        let pId = '';
        
        let vmap = helpers.string.replace.word(val, `.${lastIndex}`, '');
        let maplist = vmap.split('.');

        if(maplist && maplist.length > 0){
            pId = maplist?.[maplist.length - 1];
        }

        arg.departOrRoleHash = pId || '';

        return arg;
    }

    const onChange = (arg) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(arg, 'id', '');

            if(val && val.indexOf(lastIndex) < 0){
                val = `${val}.${lastIndex}`
            }


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

        if(mode === 'view'){
            return 'full'
        }
    }

    const label = () => {
        if(code === 'ROLE'){
            return 'Select role'
        };
    
        return 'Select department'
    }

    const ui = () => {
        if(code && code != 'ORG-GLOBAL'){
            return (
                <MappingList
                    code={code}
                    label={label()}
                    apies={{
                        root:{
                            name:'orgStructure.hierarchy.rootHierarchyByType',
                            request:{
                                options:{
                                    endpoint:'orgStructure.hierarchy.rootHierarchyByType',
                                },
                                request:{
                                    params:{
                                        type:code
                                    }
                                }
                            },
                        },
                        childs:{
                            name:'orgStructure.hierarchy.childHierarchyByParentHashId',
                            request:{
                                options:{
                                    endpoint:'orgStructure.hierarchy.childHierarchyByParentHashId',
                                }
                            },
                        }
                    }}

                    gridCls={gridCls()}
                    selectorKey="id"
                    itemParser={itemParser}
                    onChange={(arg) => {onChange(arg)}}
                    valuemap={helpers.json.val(details, map, '')}
                    validation={helpers.json.val(props, 'validation.body.departOrRoleHashMap', {})}
                    mappingLastIndexVal={helpers.json.val(appHelpers, 'constants.enums.mappingLastIndexVal.optional', '__LAST__ITEM__ENUM__')}
                />
            )
        }
    }

    return ui();
}

export default Comp;