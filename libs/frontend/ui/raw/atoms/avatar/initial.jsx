import helpers from 'ui-helpers';
import Aavatar from 'aio-global-raw-ui/atoms/avatar';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const ui = () => {
        return (
            <Aavatar
                icon={null}
                image={null}
                initial={helpers.json.get(props, 'initial', {})}
                dsTheme={helpers.json.get(props, 'dsTheme', {})}
                nowrapper={helpers.json.get(props, 'nowrapper', false)}
                config={{
                    image:null,
                    initial:helpers.json.get(props, 'config.initial', {}),
                    wrapper:helpers.json.get(props, 'config.wrapper', {})
                }}
            />
        )
    }

    return ui();
}

export default Comp;