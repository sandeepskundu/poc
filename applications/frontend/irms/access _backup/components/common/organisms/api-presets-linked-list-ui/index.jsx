import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';
import ApiLinkedPresetFormDrawer from 'aio-app-ui-access-molecules/api-linked-preset-form-drawer';
import ApiLinkedPresetResultList from 'aio-app-ui-access-molecules/api-linked-preset-results-list';
import ApiLinkedPresetResultHeader from 'aio-app-ui-access-organisms/api-presets-linkeed-list-header'

const Comp = (dprops) => {
    const id = helpers.random.id(10);
    const props = helpers.element.jsx.props.define({}, dprops);
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const [data, setData] = useState({
        results:[],
        blank:true,
        configs:{}
    });

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(data);
            d.results = helpers.json.val(resp, 'results', [])
            d = helpers.json.merge(d, resp);
            d.blank = false;
            setData(d);
    }

    if(fristRender){
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(id){
            appHelpers.store.get([{
                name:'access.apiPresetLinked.presetDataByPresetHash'
            }], onResp);
        }
    }

    const ui = () => {
        let results = helpers.json.val(data, 'results', []);

         if(results.length > 0){
            return (
                <>
                    <ApiLinkedPresetResultHeader {...props} />
                    <ApiLinkedPresetResultList {...props} results={results} />
                </>
            )
        }else{
            return (
                <div className='full bxs pd-20 bdr-c00104 bdr-1 bdr-wrln bdr-wbn bg-c00102'>
                    <p className='txt-xl fm-md'>API access linked preset data is not found?</p>
                    <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                    <label className="link-u ns cp txt-xs" htmlFor={id+'a'}>Lets Start</label>
                    <ApiLinkedPresetFormDrawer
                        id={id+'a'}
                        {...props}
                        details={{}}
                    />
                </div>
            )
        }
    }

    return ui()
}

export default Comp;