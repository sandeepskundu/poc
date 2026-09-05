import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import React, {useState, useRef, useEffect} from 'react';
import ApplicationList from 'aio-app-ui-devops-atoms/application-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const [configs, setConfigs] = useState({});
    const [details, setDetails] = useState({
        selected:{}
    });

    const onResp = (resp, arg) => {
        setConfigs(resp);
    }

    if(fristRender){
        appHelpers.store.get([{
            name:'appListByCategory'
        }], onResp);
    }

    useEffect(() => {
        console.log(details);
    }, [details]);

    const onAppChange = (arg) => {
        let d = helpers.json.copy(details);
            d.selected = arg;
            setDetails(d);
    }

    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl10 grid-wrapper grid-layout-4'>
                <ApplicationList 
                    configs={configs}
                    onChange={onAppChange}
                    selected={helpers.json.val(details, 'selected', {})}
                />
            </ul>
        )  
    }

    return ui();
}

export default Comp;