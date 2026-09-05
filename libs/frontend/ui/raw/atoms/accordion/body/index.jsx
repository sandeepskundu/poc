import helpers from 'ui-helpers';
import {forwardRef} from "react";
import Description from 'aio-global-raw-ui/atoms/typography/text/description';

const Comp = forwardRef((dprops, ref) => {
	const id = helpers.random.uuid();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
	const content = helpers.json.get(props, 'content', id);
	
	const descProps = () => {
		return helpers.json.set(helpers.json.get(props, 'description', {}), 'description.text.content', content, false, true);
	}

	const ui = () => {
		if(content!= '' && content != id){
			if(helpers.data.type.is(content, 'function')){
				return content(props);
			}

			return (
				<Description {...descProps()} />
			)
		}
	}

	return ui();
});

export default Comp;