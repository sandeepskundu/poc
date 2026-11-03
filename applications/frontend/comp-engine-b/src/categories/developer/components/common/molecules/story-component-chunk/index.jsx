import Compview from './comp';
import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from "react";

const Comp = (props) => {
    const [Component, setComponent] = useState(null);
    const id = helpers.json.get(_siteProps_, 'router.params.hash', '');

    const onLoad = () => {
        if(helpers.json.get(_siteProps_, 'comps.'+id, '')) {
            setComponent(helpers.json.get(_siteProps_, 'comps.'+id, ''))
        }
    }

    const loadChunk = () => {
        if(id){
             helpers.assets.loader.js.load(`http://localhost:5200/comp-engine/statics/js/storybook/chunks/${id}.js`, {
                id:id,
                onLoad:onLoad
            });
        }
    }

    helpers.react.hooks.onmount(useRef(false), useEffect, () => {
        let C = helpers.json.get(_siteProps_, 'comps.'+id, '')
        if (C) {
            setComponent(C)
        }else{
            loadChunk();
        }
    });

    if(Component){
        return (
            <>
                <Compview 
                {...props}
                chunk={Component}
            />
            </>
            
        )
    }else{
        return <p>Loading</p>
    }
}

export default Comp;