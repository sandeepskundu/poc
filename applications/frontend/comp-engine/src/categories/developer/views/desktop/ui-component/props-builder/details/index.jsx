import Enums from './enum';
import Common from './common';
import helpers from 'ui-helpers';
import Predefined from './predefined';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const node = props.node || {};
    const type = helpers.json.get(node, '__.type', '');

    console.log(helpers.json.get(node, '__.type', ''), helpers.json.get(node, '__.key', ''));

    // 'compProps', '', '', '', '', '', '', '', '', '', ''

    const ui = () => {
        switch (type){
            case 'predefined':
                return <Predefined {...props} />
            break;
            case 'enum':
                return <Enums {...props} />
            break;
            case 'boolean':
                return <Common {...props} />
            break;
            case 'string':
                return <Common {...props} />
            break;
            case 'number':
                return <Common {...props} />
            break;
            case 'function':
                return <Common {...props} />
            break;
            case 'object':
                return <Common {...props} />
            break;
            case 'nested':
                return <Common {...props} />
            break;
            case 'any':
                return <Common {...props} />
            break;
            case 'jsx':
                return <Common {...props} />
            break;
            default:
        }
    }

    return (
        <div className='full bxs bdr-c00104 bdr-1 bdr-tn bdr-rn bdr-bn'>
            {ui()}
        </div>
    )
}

export default Comp;