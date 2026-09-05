import helpers from 'ui-helpers';
import {createElement} from 'react';
import AvatarInitial from 'aio-global-ui/atoms/avatar/initial';
import AvatarsLabel from 'aio-global-ui/molecules/avatars/avatars-label';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {});
    const hasLabel = (helpers.json.get(props, 'labels.content.title', '') || helpers.json.get(props, 'labels.content.description', ''));
    const hasInital = (helpers.json.get(props, 'avatar.initial.value', '') || helpers.json.get(props, 'avatar.initial.fallback', ''));

    const avatar = () => {
        if(hasInital){
            return <AvatarInitial {...helpers.json.get(props, 'avatar', {})} />
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
        if(hasInital || hasLabel){
            return helpers.element.jsx.ds({...props.wrapper, ...{content:childs}}, createElement, null, 'full flx-vc', props);
        }else{
            return <></>
        }
    })()
};

export default Comp;