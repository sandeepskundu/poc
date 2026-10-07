import helpers from 'ui-helpers';
import CompPropsMetas from './comp-props';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const editorDataType = helpers.json.get(props, 'node.__.editorDataType', '');

    const ui = () => {
        switch (editorDataType) {
            case 'compProps':
                return <CompPropsMetas {...props} />
            break;
            default :
                return <></>
        }
        
    }

    return ui();
}

export default Comp;