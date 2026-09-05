import helpers from 'ui-helpers';
import {createElement} from 'react';
import AvatarImage from 'aio-global-ui/atoms/avatar/image';
import AvatarsLabel from 'aio-global-ui/molecules/avatars/avatars-label';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {});
    const hasImage = helpers.json.get(props, 'avatar.image.src', '');
    const hasLabel = (helpers.json.get(props, 'labels.content.title', '') || helpers.json.get(props, 'labels.content.description', ''));

    const avatar = () => {
        if(hasImage){
            return <AvatarImage {...helpers.json.get(props, 'avatar', {})} />
        }else{
            return <></>
        }
    }

    const labels = () => {
        if(hasLabel){
            return <AvatarsLabel {...helpers.json.get(props, 'labels', {})} />
        }else{
            return <></>
        }
    }

    const childs = () => {
        return (
            <>
                {avatar()}
                {labels()}
            </>
        )
    }

    return (() => {
        if(hasImage || hasLabel){
            return helpers.element.jsx.ds({...props.wrapper, ...{content:childs}}, createElement, null, 'full flx-vc', props);
        }else{
            return <></>
        }
    })()
};

export default Comp;