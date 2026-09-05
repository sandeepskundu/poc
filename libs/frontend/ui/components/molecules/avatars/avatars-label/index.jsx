import helpers from 'ui-helpers';
import {createElement} from 'react';
import Text from 'aio-global-ui/atoms/typography/text';
import Title from 'aio-global-ui/atoms/typography/heading';

const Comp = (dprops) => {
    const props = (() => {
        let rv = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {});
            rv = helpers.json.set(rv, 'title.config.content', helpers.json.get(rv, 'content.title', ''));
            rv = helpers.json.set(rv, 'description.content', helpers.json.get(rv, 'content.description', ''));
            helpers.json.remove(rv, 'content');

        return rv;
    })();

    const title = helpers.json.get(props, 'title.config.content');
    const description = helpers.json.get(props, 'description.content');

    const titleUi = () => {
        if(title){
            return <Title {...helpers.json.get(props, 'title', {})} />
        }else{
            return <></>
        }
    }

    const descriptionUi = () => {
        if(description){
            return <Text text={helpers.json.get(props, 'description', {})} />
        }else{
            return <></>
        }
    }

    const childs = () => {
        return (
            <>
                {titleUi()}
                {descriptionUi()}
            </>
        )
    }

    return (() => {
        if(title || description){
            return helpers.element.jsx.ds({...props.wrapper, ...{content:childs}}, createElement, null, 'full bxs', props);
        }else{
            return <></>
        }
    })();
};

export default Comp;