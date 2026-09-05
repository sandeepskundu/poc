import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';
import ApiLinkedPresetFormInputs from 'aio-app-ui-access-molecules/api-linked-preset-form-inputs'
import ApiPresetLinkedDetailsHeader from 'aio-app-ui-access-organisms/api-presets-linked-details-header';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    const dvals = {
        blank:true,
        details:{},
        configs:{}
    }

    const [cache, setCache] = useState(id);
    const [data, setData] = useState(dvals);
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(data);
            d.details = helpers.json.val(resp, 'linkedPresetData', {})
            d = helpers.json.merge(d, resp);
            d.blank = false;
            setData(d);
            setCache(helpers.random.id(10))
    }

    if(fristRender){
        appHelpers.store.get([{
            name:'access.apiPresetLinked.presetDataByHash'
        }], onResp);
    }

    return (
        <>
            <ApiPresetLinkedDetailsHeader {...data} />
            <div className='full bxs pd-24'>
                <ApiLinkedPresetFormInputs {...data} key={cache} />
            </div>
        </>
    )
}

export default Comp;