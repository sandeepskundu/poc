import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-application-modules';
import React, {useState, useRef, useEffect} from 'react';
import UiApplicationDetails from 'aio-app-ui-application-templates/ui-application-details';
import ApplicationFormActions from 'aio-app-ui-application-organisms/application-form-actions';
import ApplicationCommonDetails from 'aio-app-ui-application-organisms/application-common-details';

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

    if(fresh){
        setFresh(false);
        mhelper.api.details.get(props, getConfigs, {
            category:'ui',
            appConfig:{
                applicationType:'ui'
            },
            appInfo:{
                author:'sandeep-kundu',
                description:'sample applciation',
                version:'0.0.0.001'
            }
        });
    }

    useEffect(() => {
        console.log(details, configs);
    }, [details]);

    const onChange = (arg, reset) => {
        setDetails(arg);
    }

    const onExpend = (val) => {
        setExpended(val);
    }

    const detailsByType = () => {
        const type = helpers.json.val(details, 'appConfig.applicationType', '');

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
            case 'express':
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
            default:
        }
    }

    const actions = () => {
        const same = helpers.json.is.same(details, odata);
        if(!same){
            return (
                <div className='full bxs pd-t24 pd-rl10'>
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