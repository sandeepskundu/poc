import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-tdc-application-modules';
import React, {useState, useRef, useEffect} from 'react';
import UiApplicationDetails from 'aio-app-ui-tdc-application-templates/ui-application-details';
import ApiApplicationDetails from 'aio-app-ui-tdc-application-templates/api-application-details';
import ApplicationFormActions from 'aio-app-ui-tdc-application-organisms/application-form-actions';
import ApplicationCommonDetails from 'aio-app-ui-tdc-application-organisms/application-common-details';

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

    const onAction = (type) => {
        const action = helpers.url.param('action');

        switch (type) {
            case 'save':
                switch (action) {
                    case 'create':
                        mhelper.api.createApp.init(details, onSave);
                    break;
                    case 'update':
                        mhelper.api.updateApp.init(details, onSave);
                    break;
                    default :
                    
                };
            break;
            case 'reset':
            case 'cancel':
                let d = helpers.json.copy(odata);
                    setDetails(d)
            break;
            default:
        }
    }

    const actions = () => {
        const same = helpers.json.is.same(details, odata);
        if(!same){
            return (
                <div className='full bxs pd-t24 pd-rl24 fl'>
                    <ApplicationFormActions 
                        details={details}
                        configs={configs}
                        onAction={onAction}
                    />
                </div>
            )
        }else{
            return <></>
        }
    }

    const ui = () => {

        if(blank){
            return <>Fetching details pls wait.</>
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-t24 pd-rl10'>
                        <ApplicationCommonDetails 
                            details={details}
                            configs={configs}
                            onChange={onChange}
                        />
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