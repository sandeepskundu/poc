
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-common-modules';
import Button from 'aio-global-ui/atoms/form/button';
import MappingList from 'aio-app-ui-atoms/mapping-list';
import SelectBox from 'aio-app-ui-common-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const action = helpers.json.val(_siteProps_, 'router.params.action', '')

    const [cache, setCache] = useState(id);

    const d = {
        validation:{},
        data:helpers.json.val(props, 'details', {}),
    }

    const [details, setDetails] = useState(d);
    const [original, setOriginal] = useState(d);

    const onChange = (arg) => {
        let dd = helpers.json.copy(details);
            dd.data = arg;

            if(action === 'view'){
                dd.data.teamId = helpers.json.val(props, 'team.vd.id', '');
                dd.data.itemId = helpers.json.val(props, 'team.itemId', '');   
            }

            console.log(dd.data)

            setDetails(dd)
    }

    const show = () => {
        let dis = helpers.json.is.defined(details.data, {'linkwith':true, 'rolemap':true});

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

    const getData = () => {
        return helpers.json.copy(details.data);
    }

    const api = () => {
        if(action === 'update'){
            mhelper.api.tbmbrCreate.init({
                request:{
                    data:getData(),
                    params:{
                        id:helpers.json.val(details, 'data.vd.id', '')
                    }
                }
            }, onResp);
        }else{
            mhelper.api.tbmbrCreate.init({
                request:{
                    data:getData()
                }
            }, onResp);
        }
    }

    const save = (type) => {
        switch (type) {
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

    const actions = () => {
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

    const onRoleChange = (arg) => {
        let dd = helpers.json.copy(details.data || {});
            dd.rolemap = arg.id || '';
            onChange(dd);
    }

    const onLinkwithChange = (arg) => {
        delete arg.rolemap;
        onChange(arg);
    }

    const gridCls = () => {
        return (action === 'view'?'full':'');
    }

    const itemParser = (rval, arg) => {
        rval.id = helpers.json.val(arg, 'vd.id', '');

        return rval;
    }

    const getRootId = () => {
        let linkwith = helpers.json.val(details, 'data.linkwith', '');

        if(linkwith === 'emp'){
            return helpers.json.val(props, 'auth.uIds.employer', '');
        }else{
            return helpers.json.val(props, 'auth.uIds.merchant', '')
        }
    }

    const roles = () => {
        let r = helpers.json.val(details, 'data.linkwith', '');

        if(r){
            return (
                <li>
                    <MappingList
                        label='Select role'
                        apies={{
                            root:{
                                name:'common.ars.listByMapId',
                                request:{
                                    options:{
                                        endpoint:'common.ars.listByMapId',
                                    },
                                    request:{
                                        params:{
                                            id:getRootId()
                                        }
                                    }
                                },
                            },
                            childs:{
                                name:'common.ars.listByMapId',
                                request:{
                                    options:{
                                        endpoint:'common.ars.listByMapId',
                                    }
                                },
                            }
                        }}
                    
                        selectorKey="id"
                        gridCls={gridCls()}
                        itemParser={itemParser}
                        onChange={(arg) => {onRoleChange(arg)}}
                        valuemap={helpers.json.val(details, 'data.rolemap', '')}
                        validation={helpers.json.val(details, `validation.body.rolemap`, {})}
                        mappingLastIndexVal={helpers.json.val(props, 'configs.enums.mappingLastIndexVal.required', '__LAST__ITEM__ENUM__')}
                    />
                </li>
            )
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <SelectBox 
                        {...props}
                        key={cache}
                        valuemap="linkwith"
                        details={details.data}
                        onChange={onLinkwithChange}
                        validation={details.validation}
                        optionmap="configs.access.link.for"
                        selectBoxProps={{
                            label:'Group or Employer',
                            keyMapping:{
                                label:"label",
                                selection:"id"
                            }
                        }}
                    />
                </li>
                
                {roles()}

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default Comp;