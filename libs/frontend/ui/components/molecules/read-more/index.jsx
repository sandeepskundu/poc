import helpers from 'ui-helpers';
import Description from 'aio-global-ui/atoms/typography/text/description';

const Comp = (dprops) => {
    const props = () => {
        let rv = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {});
            rv = helpers.json.set(rv, 'toggle.enabled', true);
            rv = helpers.json.set(rv, 'description.text.content', helpers.json.get(rv, 'content', ''));
            helpers.json.remove(rv, 'content');

        return rv;
    };

    return <Description {...props()} />
};

export default Comp;