import helpers from 'ui-helpers';
import PropsBuilder from 'aio-app-ui-developer-organisms/ui-component/props-builder';
import TreeMap from 'aio-app-ui-developer-organisms/ui-component/component-tree-map'
import { useState } from 'react';

const Comp = (props) => {
    const action = 'create';

    const [details, setDetails] = useState({
        path:[],
        valid:false,
    });

    const onPropsChange = (arg) => {
        helpers.react.hooks.event.emit('show-save-component', {
            component:details,
            storybook:{
                props:arg
            }
        });
    }

    return (
        <div className='full'>
            <TreeMap 
                {...props}
                configs={{
                    action:action
                }}
                onChange={(arg) => {setDetails(arg)}}
            />

            {details.valid && <div className='full'>
                <PropsBuilder
                    {...props}
                    configs={{
                        isRoot:true,
                        action:action,
                        component:details
                    }}
                    onChange={onPropsChange}
                />
            </div>}
            
        </div>
    )
}

export default Comp;