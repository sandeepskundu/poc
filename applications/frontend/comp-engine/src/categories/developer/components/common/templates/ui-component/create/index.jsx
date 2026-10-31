import helpers from 'ui-helpers';
import PropsBuilder from 'aio-app-ui-developer-organisms/ui-component/props-builder';

const Comp = (props) => {
    return (
        <PropsBuilder 
            configs={{
                isRoot:true,
                action:'create'
            }}
        />
    )
}

export default Comp;