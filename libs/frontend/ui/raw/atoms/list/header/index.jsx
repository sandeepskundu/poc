import helpers from 'ui-helpers';
import ListItem from 'aio-global-raw-ui/atoms/list/item';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const defaults = (() => {
        return helpers.json.merge({
            dsTheme:{
                wrapper:{
                    font__d__family:'sb',
                    className:'item-header bdr-1 bxs',
                }
            },
            config:{
                "center":{},
                "wrapper":{}
            }
        }, helpers.json.get(props, 'defaults', {}))
    })();

    return <ListItem {...props} defaults={defaults} />;
};

export default Comp;