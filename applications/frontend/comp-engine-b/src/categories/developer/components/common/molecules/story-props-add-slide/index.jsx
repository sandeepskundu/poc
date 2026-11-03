import helpers from 'ui-helpers';
import storybook from 'app-helpers/storybook';
import SlideDrawer from 'aio-global-raw-ui/molecules/slide-drawer';
import TreeMenu from './../story-props-add-new-tree'

const Comp = (props) => {
    const item = helpers.json.get(props, 'item', {});
    const editor = helpers.json.get(props, 'editor', {});
    const map = (helpers.json.get(props, 'map', [])).join('.')
    const propmap = helpers.json.get(props, 'item.value.propmap', '');
    const schema = helpers.json.get(props, 'editor.___.indexJson.schema', {});
    const sdata = helpers.json.get(props, `storybook.data.storybook.propTypes.data.${propmap}.___.nested`, {});
    const propdata = storybook.props.tree.build(helpers.json.transform.to.tree.add(sdata, schema));
    const tree = helpers.json.toIndexTree(propdata);

    const content = () => {
        console.log('map', map);
        console.log('item', item);
        console.log('editor', editor);
        console.log('schema', schema);
        console.log('propmap', propmap);
        console.log(props, propdata, tree);

        return (
            <div className='full bxs pd-20' style={{width:'450px'}}>
                <TreeMenu tree={tree} storybook={props.storybook} />
            </div>
        )
    }

    const ui = () => {
        return (
            <SlideDrawer 
                pageview={false}
                direction="right"
                key={props.slide.key}
                active={props.slide.show}
                templates={{
                    body:() => {return content()}
                }}
            />
        );
    }

    return ui()
}

export default Comp;