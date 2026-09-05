
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-access-modules';
import {useState, useRef, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';
import Button from 'aio-global-ui/atoms/form/button';
import Toggle from 'aio-global-ui/atoms/form/toggle';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [cache, setCache] = useState(helpers.random.id(16));
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const code = helpers.json.val(_siteProps_, 'router.params.code');
    const type = helpers.json.val(_siteProps_, 'router.params.type');
    const pId = helpers.json.val(_siteProps_, 'router.params.pId', '');
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');
    const actions = helpers.json.val(props, 'configs.access.actions.types.all', []);
    
    const dd = helpers.json.merge({
        userId:"",
        itemId:pId,
        type:type.toUpperCase(),
        code:code.toUpperCase(),
        perms:{
            fetch:false,
            remove:false,
            create:false,
            update:false,
        }
    }, helpers.json.val(props, 'details', {}))
    
    const d = {
        data:dd,
        emps:[],
        validation:{}
    }

    const [details, setDetails] = useState(d);
    const [original, setOriginal] = useState(d);
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    useEffect(() => {
        console.log(details);
    }, [details]);

    const request = (name, id, to, rmap, rfb) => {
        return {
            name:name,
            request:{
                options:{},
                request:{
                    method:'get'
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

    const onEmpResp = (resp, arg) => {
        let list = [];
        let dd = helpers.json.copy(details);
        let res = helpers.json.val(resp, 'results', {})

        for(const a in res){
            list.push({
                id:helpers.json.val(res[a], 'id', ''),
                label:helpers.json.val(res[a], 'cd.email.id', 'NA')
            })
        }

        dd.emps = list;
        setDetails(dd);
        setCache(helpers.random.id(10));
    }

    if(fristRender){
        helpers.store.getDetailsById([request('employee.directory.listByMerchant', '', 'results', 'data.result', [])], onEmpResp);
    };

    const onChange = (arg) => {
        let dd = helpers.json.copy(details);
            dd.data = arg;
            setDetails(dd);
            setCache(helpers.random.id(10));
    }

    const show = () => {
        let dis = helpers.json.is.defined(details.data, {
            'type':true,
            'code':true,
            'userId':true,
            'itemId':true,
        });

        if(action === 'update' && dis){
            return !helpers.json.is.same(details.data, original.data);
        }

        return dis;
    }

    const onResp = (resp) => {
        setDetails(resp);
        setOriginal(resp);
        setCache(helpers.random.id(10));
    }

    const data = () => {
        return helpers.json.copy(details.data);
    }

    const api = () => {
        if(action === 'update'){
            mhelper.api.permissionCreate.init(onResp, {
                request:{
                    data:data(),
                    params:{
                        id:helpers.json.val(details, 'data.vd.id', '')
                    }
                }
            });
        }else{
            mhelper.api.permissionCreate.init(onResp, {
                request:{
                    data:data()
                }
            });
        }
    }
 
    const save = (action) => {
        switch (action) {
            case 'save':
                api();
            break;
            case 'reset':
                setDetails(original);
                setCache(helpers.random.id(10));
            break;
            case 'cancel':
            break;
        }
    }

    const reset = () => {
        let c = helpers.json.is.same(original, details);

        if(!c){
            return (
                <li className='pd-l30 bxs'>
                    <Button 
                        label='Reset'
                        buttonDs={{
                            size:"md",
                            theme:'002'
                        }}
                        onClick={() => {
                            save('reset')
                        }}
                    />
                </li>
            )
        }
    }

    const buttons = () => {
        let valid = show();

        if(valid){
            return (
                <div className='full flx-sb bxs'>
                    <div>&nbsp;</div>
                    <ul className='bxs flx-vc'>
                        <li className='pd-l30 bxs'><span className='link-u cp txt-sm fl' onClick={() => {save('cancel')}}>Cancel</span></li>
                        {reset()}
                        <li className='pd-l30 bxs'>
                            <Button 
                                label='Save'
                                buttonDs={{
                                    size:"md",
                                    theme:'000'
                                }}
                                onClick={() => {
                                    save('save')
                                }}
                            />
                        </li>
                    </ul>
                </div>
            )
        }else{
            return <></>
        }
    }

    const onToggle = (checked, type) => {
        let val = checked;
        let ran = helpers.random.id(20);
        let others = ['create', 'update', 'remove'];
        let d = helpers.json.copy(details.data || {});

        if(type === 'fetch'){
            for(let a in others){
                let v = helpers.json.val(d, `perms.${others[a]}`, ran);

                if(v != ran && v === true){
                    val = true;
                    break;
                }
            }
        }else{
            d = helpers.json.set(d, `perms.fetch`, true, false, true);
        }

        onChange(helpers.json.set(d, `perms.${type}`, val, false, true))
    }

    const onselect = (e, arg) => {
        let id = helpers.json.val(arg, 'id', '')
        let d = helpers.json.copy(details.data || {});
        onChange(helpers.json.set(d, 'userId', id, false, true))
    }

    const aui = () => {
        return actions.map((arg, i) => {
            return (
                <li className='full pd-b24 grid-w6' key={`${cache}${i}`}>
                    <Toggle
                        label={arg.label}
                        onChange={(checked) => {onToggle(checked, arg.id)}}
                        checked={helpers.json.val(details, `data.perms.${arg.id}`)}
                    />
                </li>
            )
        })
    }

    const user = () => {
        return (
            <div className='full bxs pd-b24'>
                <SelectBox
                    noBlank={true}
                    list={helpers.json.val(details, 'emps', [])}
                    selected={helpers.json.val(details, 'data.userId', '')}
                    selectBoxProps={{
                        label:"User",
                        onSelect:onselect,
                        labelProps:{
                            validation:helpers.json.val(details, `validation.body.userId`, {})
                        }
                    }}
                />
            </div>
        )
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                {user()}

                <ul className='full bxs grid-wrapper pd-t10'>
                    {aui()}
                </ul>

                {buttons()}
            </div>
        )
    }

    return ui();
}

export default AddNewNode;