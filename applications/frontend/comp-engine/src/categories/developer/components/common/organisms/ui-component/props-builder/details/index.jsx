import Enums from './enum';
import Common from './common';
import helpers from 'ui-helpers';
import CompProps from './comp-props';
import Predefined from './predefined';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const type = helpers.json.get(props, 'node.__.type', '');

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
            case 'compProps':
                return <CompProps {...props} />
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