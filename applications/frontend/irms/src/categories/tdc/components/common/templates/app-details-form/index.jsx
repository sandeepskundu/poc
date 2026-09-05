/*--
import helpers from 'ui-helpers';

import React, {useState, useRef, useEffect} from 'react';
import UiApplicationDetails from 'aio-app-ui-tdc-application-templates/ui-application-details';
import ApiApplicationDetails from 'aio-app-ui-tdc-application-templates/api-application-details';
import ApplicationFormActions from 'aio-app-ui-tdc-application-organisms/application-form-actions';

import ApplicationCommonDetails from 'aio-app-ui-tdc-tdc-organisms/app-details-common';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const [blank, setBlank] = useState(true);
    const [fresh, setFresh] = useState(true);
    const [configs, setConfigs] = useState(null);
    const [details, setDetails] = useState({});
    const [odata, setOdata] = useState({});
    const [expended, setExpended] = useState('')

    const getConfigs = (resp) => {
        mhelper.api.configs.get(props, (conf) => {
            setConfigs(conf);
            setTimeout(() => {
                setDetails(resp);
                setOdata(resp);
                setBlank(false);
            }, 0);
        });
    }

    const appDetails = (resp) => {
        mhelper.api.details.get(props, getConfigs, resp);
    }

    if(fresh){
        setFresh(false);
        mhelper.api.getApp.init({
            category:'',
            appConfig:{
                applicationType:''
            },
            appInfo:{
                version:'0.0.1',
                author:'sandeep-kundu',
                description:'sample applciation',
            }
        }, appDetails);
    }

    useEffect(() => {
        //console.log(details, configs);
    }, [details]);

    const onChange = (arg, reset) => {
        setDetails(arg);
    }

    const onExpend = (val) => {
        setExpended(val);
    }

    const detailsByType = () => {
        const type = helpers.json.val(details, 'appConfig.category', '');

        switch (type) {
            case 'ui':
                return (
                    <UiApplicationDetails 
                        details={details}
                        configs={configs}
                        expended={expended}
                        onExpend={onExpend}
                        onChange={onChange}
                    />
                )
            break;
            case 'api':
                return (
                    <ApiApplicationDetails 
                        details={details}
                        configs={configs}
                        expended={expended}
                        onExpend={onExpend}
                        onChange={onChange}
                    />
                )
            break;
            default:
            
        }
    }

    const onSave = (resp) => {
        setDetails(resp);
        setOdata(resp);
        setBlank(false);
    }

    

    return ui();
}

export default Comp;

--*/

import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-tdc-modules';
import {useState, useRef, useEffect} from 'react';
import AppDetailsUi from 'aio-app-ui-tdc-templates/app-details-ui';
import AppDetailsApi from 'aio-app-ui-tdc-templates/app-details-api';
import AppFormActions from 'aio-app-ui-tdc-organisms/app-form-actions';
import AppCommonDetails from 'aio-app-ui-tdc-organisms/app-details-common';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const dv = {
        blank:false,
        configs:{},
        details:{
            appInfo:{
                version:'0.0.1',
                author:'aio-foundation'
            },
            category:helpers.json.val(_siteProps_, 'router.params.type', ''),
            appConfig:{
                applicationType:helpers.json.val(_siteProps_, 'router.params.type', '')
            }
        }
    }

    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const type = helpers.json.val(_siteProps_, 'router.params.type', '');

    const [data, setData] = useState(dv);
    const [odata, setOdata] = useState(dv.details);
    const [expended, setExpended] = useState('')
    const [cache, setCache] = useState(helpers.random.id(10));

    const onExpend = (val) => {
        setExpended(val);
    }

    const update = (d) => {
        setData(d);
        setCache(helpers.random.id(10));
    }

    const onChange = (arg) => {
        let d = helpers.json.copy(data);
            d.details = arg;
            update(d);
    }

    const onSave = (resp) => {
        debugger;
        //setDetails(resp);
        //setOdata(resp);
        //setBlank(false);
    }

    const req = () => {
        return {
            request:{
                data:helpers.json.val(data, 'details', {}),
                params:{
                    id:id,
                    cate:helpers.json.val(_siteProps_, 'router.params.type', '')
                }
            }
        }
    }

    const initApi = () => {
        if(id){
            mhelper.api.appUpdate.init(req(), onSave);
        }else{
            mhelper.api.appCreate.init(req(), onSave);
        }
    }

    const onAction = (action) => {
        switch (action) {
            case 'save':
                initApi();
            break;
            case 'reset':
            case 'cancel':
                let d = helpers.json.copy(odata);
                    // setDetails(d)
            break;
            default:
        }
    }

    const request = (name, id, to, rmap, rfb) => {
        return {
            name:name,
            request:{
                options:{},
                request:{
                    method:'get',
                    params:{
                        id:id
                    }
                },
                dataMaker:(data, rawResp, configs, error) => {
                    return helpers.json.val(data, rmap, rfb);
                },
                responseDataMap:{
                    "fallback":{},
                    "from":"data",
                    "to":to || "results",
                },
            }
        };
    }

    const onResp = (resp) => {
        let d = helpers.json.copy(data);
        let rd = helpers.json.val(resp, 'details', {});
            d.blank = false;
            d.configs = dv.configs;
            d.details = helpers.json.merge((d.details || {}), rd);
            update(d);
            setOdata(d.details);
            
    }

    const onConstResp = (res) => {
        dv.configs = res || {};

        if(id){
             helpers.store.getDetailsById([request('tdc.app.getById', id, 'details', 'data.result.0', {})], onResp)
        }else[
            onResp({})
        ]
    }

    if(fristRender){
        helpers.store.getConstants({
            request:{
                data:{
                    includes:{
                        "appConfigs.hooksLables":true,
                        "appConfigs.cacheDurType":true,
                        "appConfigs.appInstanceModes":true,
                        "appConfigs.applicationTypes":true,
                        "enums.mappingLastIndexVal.required":true
                    },
                    _includes:"all"
                }
            },
            dataMakers:{}
        }, onConstResp);
    }

    const detailsByType = () => {
        switch (type) {
            case 'ui':
                return (
                    <AppDetailsUi {...props} {...data} key={cache} expended={expended} onExpend={onExpend} onChange={onChange} />
                )
            break;
            case 'api':
                return (
                    <AppDetailsApi {...props} {...data} key={cache} expended={expended} onExpend={onExpend} onChange={onChange} />
                )
            break;
            default:
            
        }
    }

    const actions = () => {
        const same = helpers.json.is.same(data.details, odata);
        if(!same){
            return (
                <div className='full bxs pd-t24 pd-rl24 fl'>
                    <AppFormActions onAction={onAction} />
                </div>
            )
        }else{
            return <></>
        }
    }

    const ui = () => {
        if(data.blank){
            return <>Fetching details pls wait.</>
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-t24 pd-rl10'>
                        <AppCommonDetails {...props} {...data} key={cache} onChange={onChange} />
                    </div>
                    {detailsByType()}
                    {actions()}
                </div>
            )
        }        
    }

    return ui();

    
}

export default Comp;