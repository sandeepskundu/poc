import EnumMeta from './enum';
import helpers from 'ui-helpers';
import CompPropsMetas from './comp-props';
import PredefinedMeta from './predefined';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const editorDataType = helpers.json.get(props, 'node.__.editorDataType', '');

    const ui = () => {
        switch (editorDataType) {
            case 'compProps':
                return <CompPropsMetas {...props} />
            break;
            case 'predefined':
                return <PredefinedMeta {...props} />
            break;
            case 'enum':
                return <EnumMeta {...props} />
            break;
            default :
                return <></>
        }
        
    }

    return ui();
}

export default Comp;