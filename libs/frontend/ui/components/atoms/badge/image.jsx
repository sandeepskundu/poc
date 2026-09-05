import Badge from './index';
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = (() => {
        let rv = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {});
        let limg = helpers.json.get(rv, 'avatars.left.image.src', '');
        let rimg = helpers.json.get(rv, 'avatars.right.image.src', '');
            rv = helpers.json.set(rv, 'avatars.left.enable', limg?true:false, false, true);
            rv = helpers.json.set(rv, 'avatars.right.enable', rimg?true:false, false, true);
            return rv;
    })();
    
    return <Badge {...props} />
};

export default Comp;