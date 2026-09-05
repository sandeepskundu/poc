import {useState} from "react";
import helpers from 'ui-helpers';

const Comp = (props) => {
    const [cache, setCache] = useState(helpers.random.id());
    const [preview, setPreview] = useState(helpers.json.get(props, 'preview.props', {}));

    if(props.editor){
        const onPreview = (arg) => {
            let d = helpers.json.copy(preview);
                d = helpers.json.merge(d, arg);
                setPreview(d);
                setCache(helpers.random.id());
                helpers.react.eventBus.emit('PREVIEW_PROPS_CODE_CHANGES', d);
        };

        helpers.react.hooks.event.off('PREVIEW_PROPS_CHANGES', onPreview);
        helpers.react.hooks.event.on('PREVIEW_PROPS_CHANGES', onPreview);
    }

    const ui = () => {
        let C = props.chunk;
        return <C {...preview} key={cache} />
    }

    return ui();
}

export default Comp;