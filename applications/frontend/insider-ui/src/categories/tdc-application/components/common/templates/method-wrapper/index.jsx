import config from './configs';
import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import mhelpers from 'aio-app-ui-tdc-application-modules';
import React, {useState, useEffect, useRef} from 'react';
import ModelMethod from 'aio-app-ui-tdc-application-organisms/model-method';
import ModelQuery from 'aio-app-ui-tdc-application-organisms/model-configs';
import MethodHeader from 'aio-app-ui-tdc-application-organisms/method-header';
import ModelValidation from 'aio-app-ui-tdc-application-organisms/model-validation';
import ModelCollection from 'aio-app-ui-tdc-application-organisms/model-collection';
import ModelMethodActions from 'aio-app-ui-tdc-application-molecules/model-method-actions'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const amode = helpers.json.val(_siteProps_, 'router.params.type', '')
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const [type, setTypes] = useState({
        active:'',
        list:[
            {
                id:'collection',
                label:'Collection details'
            }, {
                id:'method',
                label:'Method'
            }, {
                id:'model',
                label:'Model'
            }, {
                id:'request',
                label:'Request'
            }
        ]
    });

    const [cache, setCache] = useState(id);
    const [details, setDetails] = useState({});
    const [original, setOriginal] = useState({});
    const [configs, setConfigs] = useState(config);
    const [expend, setExpend] = useState({model:''});

    const apies = [
        {
            name:'appDetailsById'
        }, {
            name:'conrtollerChildByParentId',
            request:{
                responseDataMap:{
                    "to":"methods",
                },
            }
        }
    ]

    const onResp = (arg) => {
        let d = mhelpers.helpers.method.dmaker.start(arg);
        let con = helpers.json.val(d, 'configs', {});
        let data = helpers.json.val(d, 'details', {});
            con = helpers.json.merge(configs, con);
            data = helpers.json.merge(details, data);
            setConfigs(con);
            setDetails(helpers.json.copy(data));
            setOriginal(JSON.stringify(data));
            setCache(helpers.random.id(10));
    }

    if(fristRender){
        if(amode != 'create'){
            apies.push({
                name:'getMethodByHashId'
            })
        };
        appHelpers.store.get(apies, onResp);
    }

    const save = () => {
        let d = mhelpers.helpers.method.apiData.transform(details);
            mhelpers.api.createMethod.init(d);
    }

    const onAction = (type) => {
        switch (type) {
            case 'reset':
                setDetails(JSON.parse(original));
                setCache(helpers.random.id(10));
            break;
            case 'save':
                save();
            break;
            default:
        }
    }

    const onExpend = (map, type) => {
        let d = helpers.json.copy(expend);

        if(d[type]){
            for(const a in d){
                if(a === type){
                    if(d[a] === map){
                        d[a] = '';
                    }else{
                        d[a] = map;
                    }
                }else{
                    d[a] = '';
                }
            }
        }else{
            d[type] = map || '';
        }

        setExpend(d);
    }

    const setActive = (arg) => {
        let d = helpers.json.copy(type);

        if(d.active === arg.id){
            d.active = ''
        }else{
            d.active = arg.id;
        }
        
        setTypes(d);
        onExpend('', arg.id);
    }

    const onDetailChange = (arg, type) => {
        let d = helpers.json.copy(details);
        switch (type) {
            case 'method':
                d.method = arg || {};
            break;
            case 'expend':
                d.expend = arg || {};
            break;
            case 'collection':
                d.collection = arg || {};
            break;
            case 'mapping':
                d.mapping = arg || {};
            break;
            case 'md5Hash':
                d.model.md5Hash = arg || {};
            break;
            case 'response':
                d.model.response = arg || {};
            break;
            case 'query':
                d.model.query = arg || {};
            break;
            case 'validation':
                d.validation = arg || {};
            break;
            case 'pagination':
                d.model.pagination = arg || {};
            break;
            case 'signature':
                d.model.signature = arg || {};
            break;
            case 'model-valuemap':
                d.model.valuemap = arg || {};
            break;
            default :
            break;
        }

        console.log(d);
        setDetails(d);
        setTimeout(() => {setCache(helpers.random.id(16))}, 5)
        
    }

    const components = (arg) => {
        if(arg.id === type.active){
            switch (arg.id){
                case 'collection':
                    return (
                        <ModelCollection 
                            expend={expend}
                            details={details}
                            configs={configs}
                            onExpend={(map) => {onExpend(map, 'collection')}}
                            modified={helpers.json.val(details, 'collection', {})}
                            onChange={(arg) => {onDetailChange(arg, 'collection')}}
                        />
                    )
                break;
                case 'method':
                    return (
                        <ModelMethod
                            expend={expend}
                            details={details}
                            configs={configs}
                            onExpend={(map) => {onExpend(map, 'method')}}
                            modified={helpers.json.val(details, 'method', {})}
                            onChange={(arg) => {onDetailChange(arg, 'method')}}
                        />
                    )
                break;
                case 'model':
                    return (
                        <ModelQuery
                            expend={expend}
                            details={details}
                            configs={configs}
                            onExpend={(map) => {onExpend(map, 'model')}}
                            modified={helpers.json.val(details, 'model', {})}
                            onChange={(arg, type) => {onDetailChange(arg, type)}}
                        />
                    )
                break;
                case 'request':
                    return (
                        <ModelValidation
                            expend={expend}
                            details={details}
                            configs={configs}
                            onExpend={(map) => {onExpend(map, 'validation')}}
                            modified={helpers.json.val(details, 'validation', {})}
                            onChange={(arg, type) => {onDetailChange(arg, type)}}
                        />
                    )
                break;
                default:
                    return <></>
            }
        }else{
            return <></>
        }
    }

    const cls = (cur) => {
        let rv = ['full bxs flx-sb pd-tb10 pd-rl16 hbg-c00102 anim']

        if(cur){
            rv.push('bg-c00102');
        }

        return rv.join(' ');
    }

    const list = () => {
        let li = type.list;

        return li.map((arg, i) => {
            let cur = (type.active === arg.id);
            return (
                <div className='full bxs  full bdr-c00104 bdr-1 bdr-wrln bdr-wtn anim' key={id+i}>
                    <div className={cls(cur)}>
                        <span className='txt-sm fm-md'>{arg.label}</span>
                        <ul className=''>
                            <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {setActive(arg)}}>{cur?'Collapse':'Expend'}</li>
                        </ul>
                    </div>
                    <div className='full pd-rl16 bxs'>
                        {components(arg)}
                    </div>
                </div>
            )
        })
    }

    const ui = () => {
        return (
            <>
                <MethodHeader 
                    details={details}
                    configs={configs}
                />
                {list()}
                <ModelMethodActions
                    key={cache}
                    cache={cache}
                    details={details}
                    configs={configs}
                    original={original}
                    onAction={onAction}
                />
            </>
        )
    }

    return ui();
}

export default Comp;