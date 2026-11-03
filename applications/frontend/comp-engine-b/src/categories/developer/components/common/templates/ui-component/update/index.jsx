import helpers from 'ui-helpers';
import PropsBuilder from 'aio-app-ui-developer-organisms/ui-component/props-builder';
import TreeMap from 'aio-app-ui-developer-organisms/ui-component/component-tree-map'

const Comp = (props) => {
    const action = 'update';

    return (
        <div className='full'>
            <TreeMap 
                {...props}
                configs={{
                    action:action
                }}
            />
            <PropsBuilder
                {...props}
                configs={{
                    isRoot:true,
                    action:action
                }}
            />
        </div>
    )
}

export default Comp;