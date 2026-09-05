
import {useState} from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-common-modules';
import Button from 'aio-global-ui/atoms/form/button';
import MappingList from 'aio-app-ui-atoms/mapping-list';
import SelectBox from 'aio-app-ui-common-atoms/select-box';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);

    let action = helpers.json.val(_siteProps_, 'router.params.action', '')
    let linkFor = helpers.json.val(_siteProps_, 'router.params.linkFor', '');

    const [cache, setCache] = useState(id);

    console.log(props);

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
                dd.data.linkFor = linkFor;
                dd.data.mapId = helpers.json.val(_siteProps_, 'router.params.mId', '');
                dd.data.linkType = helpers.json.val(_siteProps_, 'router.params.linkType', '')
            }

            console.log(arg);
            
            setDetails(dd)
    }

    const onRoleChange = (arg) => {
        let d = helpers.json.val(details, 'data', {});
            d.mapping = helpers.json.val(arg, 'id', '');
            onChange(d);
    }

    const show = () => {
        let dis = helpers.json.is.defined(details.data, {
            'type':true,
            'mapping':true
        });

        if(action === 'update' && dis){
            //return !helpers.json.is.same(details.data, original.data);
        }

        return dis;
    }

    const onResp = (resp) => {
        setDetails(resp);
        setOriginal(resp);
        setCache(helpers.random.id(10));
    }

    const api = () => {
        if(action === 'update'){
            mhelper.api.roleBaseAccessUpdate.init({
                request:{
                    data:helpers.json.copy(details.data),
                    params:{
                        id:helpers.json.val(details, 'data.vd.id', '')
                    }
                }
            }, onResp);
        }else{
            mhelper.api.roleBaseAccessCreate.init({
                request:{
                    data:helpers.json.copy(details.data)
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

     const itemParser = (rval, arg) => {
        rval.id = arg.vd.id;
        return rval;
    }

    const gridCls = () => {
        if(action === 'view'){
            return 'full'
        }
    }

    const getRootId = () => {
        if(linkFor === 'grp'){
            return helpers.json.val(props, 'auth.uIds.merchant', '')
        }else{
            return helpers.json.val(props, 'auth.uIds.employer', '')   
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <SelectBox 
                        {...props}
                        key={cache}
                        valuemap="type"
                        onChange={onChange}
                        details={details.data}
                        validation={details.validation}
                        optionmap="configs.access.rolebaseAccess.permissons.types"
                        selectBoxProps={{
                            label:'Permission',
                            keyMapping:{
                                label:"label",
                                selection:"id"
                            }
                        }}
                    />
                </li>

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
                        
                        gridCls={gridCls()}
                        selectorKey="id"
                        itemParser={itemParser}
                        onChange={(arg) => {onRoleChange(arg)}}
                        valuemap={helpers.json.val(details, 'data.mapping', '')}
                        validation={helpers.json.val(details, `validation.body.mapping`, {})}
                        mappingLastIndexVal={helpers.json.val(props, 'configs.enums.mappingLastIndexVal.required', '__LAST__ITEM__ENUM__')}
                    />
                </li>

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default Comp;