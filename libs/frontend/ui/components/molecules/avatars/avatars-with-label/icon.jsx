import helpers from 'ui-helpers';
import {createElement} from 'react';
import AvatarIcon from 'aio-global-ui/atoms/avatar/icon';
import AvatarsLabel from 'aio-global-ui/molecules/avatars/avatars-label';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {});
    const hasLabel = (helpers.json.get(props, 'labels.content.title', '') || helpers.json.get(props, 'labels.content.description', ''));
    const hasIcon = (helpers.json.get(props, 'avatar.icon.config.icon.name', '') || helpers.json.get(props, 'avatar.icon.config.svg.src', ''));

    const avatar = () => {
        if(hasIcon){
            return <AvatarIcon {...helpers.json.get(props, 'avatar', {})} />
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
        if(hasIcon || hasLabel){
            return helpers.element.jsx.ds({...props.wrapper, ...{content:childs}}, createElement, null, 'full flx-vc', props);
        }else{
            return <></>
        }
    })()
};

export default Comp;