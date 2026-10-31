import helpers from 'ui-helpers';
import PropsBuilder from 'aio-app-ui-developer-organisms/ui-component/props-builder';

const Comp = (props) => {
    return (
        <div className='full'>
            <PropsBuilder 
                configs={{
                    isRoot:true,
                    action:'update'
                }}
            />
        </div>
    )
}

export default Comp;