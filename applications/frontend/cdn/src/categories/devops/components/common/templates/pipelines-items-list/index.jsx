import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-devops-modules';
import React, {useState, useRef, useEffect} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);


    const options = {
        0:{
            "id":"ui-pipelines",
            "label":"UI Pipelines"
        }
    }

    const item = (arg) => {
        return <a href={helpers.react.route.path.get.pagePath(arg?.id)}>{arg.label}</a>        
    }

    const list = () => {
        const li = helpers.json.toList(options);

        if(li && li.length > 0){
            return li.map((arg, i) => {
                return (
                    <li className='grid pd-r20' key={id+i}>
                        {item(arg)}
                    </li>
                )
            })
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl10 grid-wrapper grid-layout-4'>
                {list()}
            </ul>
        )  
    }

    return ui();
}

export default Comp;