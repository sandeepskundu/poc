import helpers from 'ui-helpers';
import MappingList from 'aio-app-ui-atoms/mapping-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'roleData.mapping';
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
        return rval;
    }

    const ui = () => {
        return (
            <MappingList
                label='Name'
                apies={{
                    root:{
                        name:'access.roles.rootRoles',
                    },
                    childs:{
                        name:'access.roles.childRolesByParentHashId',
                    }
                }}

                _selectorKey="id"
                itemParser={itemParser}
                onChange={(arg) => {onChange(arg)}}
                valuemap={helpers.json.val(details, map, '')}
                validation={helpers.json.val(props, 'validation.body.roleData.mapping', {})}
            />
        )
    }

    return ui();
}

export default Comp;