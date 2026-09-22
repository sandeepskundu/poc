import {useState} from 'react';
import helpers from 'ui-helpers';
import AddPropsSlider from 'aio-app-ui-developer-molecules/story-props-add-slide';

const Comp = (props) => {
    const editor = helpers.json.get(props, 'item.value.config.___.editorConfig', '');

    const type = helpers.json.get(editor, 'type');
    const config = helpers.json.get(props, `item.value.config.___.editorConfig.___.${type}`, '');
    const structure = helpers.json.get(config, '_structure', 'flexible');
    //const propdata = storybook.props.tree.build(helpers.json.get(props, 'storybook.data.storybook.propTypes.data', {}));

    const [slide, setSlide] = useState({
        show:false,
        key:helpers.random.key()
    });

    const onClick = (e) => {
            e.stopPropagation();
        let d = helpers.json.copy(slide);
            d.show = true;
            d.key = helpers.random.key();
            setSlide(d);
    }

    const show = () => {
        let min = helpers.json.get(config, 'maxlength', 1);
        let max = helpers.json.get(config, 'minlength', 1);
        let childs = helpers.json.get(props, 'item.childs', {});
            childs = helpers.json.length(childs);

        return (childs < parseInt(min)) || (parseInt(max) > childs);
    }

    const ui = () => {
        if(structure === 'flexible' && type === 'indexJson' && show()){
            return (
                <>
                    <div className='full ar mr-b8'><span className='txt-xs cp ar dib link-u' onClick={(e) => {onClick(e)}}>+ Add more</span></div>
                    <AddPropsSlider storybook={props.storybook} slide={slide} key={slide.key} editor={editor} map={props.map} item={props.item} tree={props.tree} /> 
                </>
            )
        }

        return <></>
    }

    return ui();
}

export default React.memo(Comp);