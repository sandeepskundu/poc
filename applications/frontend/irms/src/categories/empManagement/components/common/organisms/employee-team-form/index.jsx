import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';
import Button from 'aio-global-ui/atoms/form/button';
import mhelper from 'aio-app-ui-empManagement-modules';
import MappingList from 'aio-app-ui-atoms/mapping-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const dvals = {
        teams:[],
        blank:true,
        configs:{}
    }

    let dv = dvals;
    const [org, setOrg] = useState(dvals);
    const [data, setData] = useState(dvals);
    const mId = helpers.json.val(props, 'auth.uIds.merchant', '');
    const eId = helpers.json.val(props, 'auth.uIds.employer', '');
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();
    const type = helpers.json.val(_siteProps_, 'router.params.type', '');
    const action = helpers.json.val(_siteProps_, 'router.params.action', 'create');

    useEffect(() => {
        console.log(data);
    }, [data]);

    const subId = () => {
        switch (type) {
            case 'group-team':
                return 'grp'
            break;
            case 'sub-team':
                return 'sub'
            break;
            default:
                return '';
        }
    }

    const onRespData = (resp, arg) => {
        let d = helpers.json.copy(dv);
            d = helpers.json.merge(d, arg);
            d.validation = helpers.json.val(resp, 'validation', {});
            d.details = helpers.json.val(resp, 'details', helpers.json.val(resp, 'data', {}));
            d.blank = false;
            setOrg(d);
            setData(d);
    }

    const onResp = (resp) => {
        onRespData(resp, {});
    }

    const getDetails = () => {
        if(action === 'update'){
            helpers.store.getDetailsById([{
                name:'employee.empTeams.getByIdAndType',
                request:{
                    options:{},
                    request:{
                        method:'get',
                        params:{
                            subId:subId(),
                        }
                    },
                    dataMaker:(data, rawResp, configs, error) => {
                        return helpers.json.val(data, 'data.result.0', {});
                    },
                    responseDataMap:{
                        "fallback":{},
                        "from":"data",
                        "to":"teams",
                    },
                }
            }], onResp);
        }else{
            onResp({})
        } 
    }

    const onConstResp = (res) => {
        dv.configs = res || {};
        getDetails();
    }

    if(fristRender){
        helpers.store.getConstants({
            request:{
                data:{
                    includes:{
                        'employment.type.default':true
                    },
                    includess:"all"
                }
            }
        }, onConstResp);  
    }

    const addTeamForm = () => {

    }


    const ui = () => {
        let pd = helpers.json.val(data, 'teams', []);

        if(data.blank || pd > 0){
            return (
                <div className='full bxs pd-t30 pd-rl20'>
                    <ul className='full bxs grid-wrapper'>
                        <li className='bxs pd-r24 pd-b28 grid-w2'>
                            {/*--selectBox('employedBy', 'configs.employment.employedBy.default', 'Employement By')--*/}
                        </li>
                        {/*--employer()--*/}
                    </ul>
                    {/*--buttons()--*/}
                </div>
            )
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>Employee details are not found?</p>
                        <p className='full txt-xs mr-tb4'>Please select valid employee from list</p>
                    </div>
                </div>
            )
        }
    }

    return ui();


    /*--

    const onSaveResp = (resp) => {
        onRespData(resp, data)
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
                    let li = [];
                    let rl = helpers.json.val(data, rmap, rfb);

                    if(rl && rl.length > 0){
                        for(const a in rl){
                            li.push({
                                id:rl[a].vd.id,
                                label:rl[a].name
                            })
                        }
                    }

                    return li;
                },
                responseDataMap:{
                    "fallback":{},
                    "from":"data",
                    "to":to || "results",
                },
            }
        };
    }

    const onDataResp = (a, b) => {
        let conf = helpers.json.copy(data.configs);
            conf = helpers.json.merge(conf, a);
        setData(p => ({...p, ...{configs:conf}}));
    }

    const getData = (arg, map) => {
        let li = [];
        let val = helpers.json.val(arg, `details.${map}`, '');

        if(val){
            switch (map) {
                case 'employedBy':
                    if(val === 'GROUP'){
                        li.push(request('common.bus.rootList', mId, 'bus', 'data.result', []));
                    }else{
                        li.push(request('org.employers.rootList', '', 'employers', 'data.result', []));
                    }
                break;
                case 'employer':
                    li.push(request('common.bus.rootList', val, 'bus', 'data.result', [])); 
                break;
                case 'bu':
                    li.push(request('common.bvs.listByParentId', val, 'bvs', 'data.result', []));
                break;
                case 'department':
                    let vl = val.split('.');
                    if(vl[0]){
                        li.push(request('common.roles.byDepatmentId', vl[0], 'designation', 'data.result', []));
                    }
                break;
                case 'designation':
                    li.push(request('common.offices.byEmployerId', helpers.json.val(arg, `details.employer`, ''), 'offices', 'data.result', []));
                break;
                default :

            }
        }

        helpers.store.getDetailsById(li, onDataResp);
    }

    const resetByType = (rval, type) => {
        let all = {
            details:{
                bu:true,
                bv:true,
                employer:true,
                department:true,
                designation:true,
                location:true,
                type:true,
                status:true,
                workMode:true,
                manager:true
            },
            configs:{
                bus:true,
                bvs:true,
                offices:true,
                designation:true,
            }
        };
        let map = {
            employedBy:all,
            employer:helpers.json.merge(all, {
                configs:{},
                details:{
                    employer:false,
                }
            }),
            bu:helpers.json.merge(all, {
                configs:{
                    bus:false
                },
                details:{
                    bu:false,
                    employer:false,
                }
            }),
            bv:helpers.json.merge(all, {
                configs:{
                    bus:false,
                    bvs:false
                },
                details:{
                    bu:false,
                    bv:false,
                    employer:false,
                }
            }),
            department:helpers.json.merge(all, {
                configs:{
                    bus:false,
                    bvs:false
                },
                details:{
                    bu:false,
                    bv:false,
                    employer:false,
                    department:false
                }
            }),
            designation:helpers.json.merge(all, {
                configs:{
                    bus:false,
                    bvs:false,
                    designation:false
                },
                details:{
                    bu:false,
                    bv:false,
                    employer:false,
                    department:false,
                    designation:false
                }
            }),
            location:helpers.json.merge(all, {
                configs:{
                    bus:false,
                    bvs:false,
                    offices:false,
                    designation:false
                },
                details:{
                    bu:false,
                    bv:false,
                    employer:false,
                    location:false,
                    department:false,
                    designation:false
                }
            })
        }
        let cd = helpers.json.val(map, `${type}.configs`, {});
        let md = helpers.json.val(map, `${type}.details`, {});

        for(const a in md){
            if(md[a]){
                rval = helpers.json.set(rval, `details.${a}`, '', false, true);
            }
        }

        for(const a in cd){
            if(cd[a]){
                rval = helpers.json.set(rval, `configs.${a}`, [], false, true);
            }
        }

        return rval;
    }

    const onSelect = (arg, map) => {
        let d = data;
        let v = helpers.json.val(arg, 'id', '');
            d.details = helpers.json.set(d.details, map, v, false, true);
            d.details = helpers.json.set(d.details, 'mapId', id, false, true);
            d = resetByType(d, map);

        let empBy = helpers.json.val(d, `details.employedBy`, '');

            if(empBy === "GROUP"){
                d.details.employer = mId;
            }

            d.details.manager = id;

            setData(p => ({...p, ...d}));
            setTimeout(() => {
                getData(d, map);
            }, 10);
    }

    const selectBox = (map, options, label) => {
        return (
            <div className='full bxs'>
                <p class="full fl pd-b12 txt-sm">{label}</p>
                <div className='full bxs'>
                    <SelectBox
                        noBlank={true}
                        list={helpers.json.val(data, options, {})}
                        selected={helpers.json.val(data.details, map, '')}
                        selectBoxProps={{
                            label:'',
                            onSelect:(e, item) => {
                                onSelect(item, map);
                            },
                            labelProps:{
                                validation:helpers.json.val(data, `validation.body.${map}`, {})
                            }
                        }}
                    />
                </div>
            </div>
        )
    }

    const itemParser = (arg, b) => {
        arg.id = b.vd.id;
        return arg;
    }

    const mapList = (map, rootEndpoint, childEndpoint, rootId, label, gridCls) => {
        return (
            <MappingList
                label={label}
                apies={{
                    root:{
                        name:rootEndpoint,
                        request:{
                            options:{
                                endpoint:rootEndpoint,
                            },
                            request:{
                                params:{
                                    id:rootId
                                }
                            }
                        },
                    },
                    childs:{
                        name:childEndpoint,
                        request:{
                            options:{
                                endpoint:childEndpoint,
                            }
                        },
                    }
                }}
                selectorKey="id"
                gridCls={gridCls || ''}
                itemParser={itemParser}
                onChange={(arg) => {onSelect(arg, map)}}
                valuemap={helpers.json.val(data.details, map, '')}
                validation={helpers.json.val(data, `validation.body.${map}`, {})}
                mappingLastIndexVal={helpers.json.val(props, 'configs.enums.mappingLastIndexVal.required', '__LAST__ITEM__ENUM__')}
            />
        )
    }

    const employer = () => {
        let empBy = helpers.json.val(data, 'details.employedBy', '');
        let employer = helpers.json.val(data, 'details.employer', '');

        if(empBy){
            if(empBy === 'SUBSIDIARY'){
                return (
                    <>
                        <li className='bxs pd-r24 pd-b28 grid-w2'>
                            {selectBox('employer', 'configs.employers', 'Employer')}
                        </li>
                        {employer?bu():<></>}
                    </>
                )
            }else{
                return (
                    <>{bu()}</>
                )
            }
        }
    }

    const bu = () => {
        return (
            <li className='bxs full'>
                <ul className='full bxs grid-wrapper'>
                    <li className='bxs pd-r24 pd-b14 grid-w2'>
                        {selectBox('bu', 'configs.bus', 'Business Unit')}
                    </li>
                    {bv()}
                </ul>
            </li>
        )
    }

    const bv = () => {
        let sbu = helpers.json.val(data, 'details.bu', '');

        if(sbu){
            return (
                <>
                    <li className='grid-w10 bxs pd-r24 pd-b4'>
                        {mapList('bv', 'common.bvs.listByParentId', 'common.bvs.listByParentId', sbu, 'Business Vertical', 'grid-w2 pd-r24')}
                    </li>
                    {department()}
                </>
            )
        }
    }

    const department = () => {
        let sbv = helpers.json.val(data, 'details.bv', '');
        let employer = helpers.json.val(data, 'details.employer', '');

        if(sbv){
            return (
                <>
                    <li className='full bxs pd-r24 pd-b14'>
                        {mapList('department', 'common.departments.getChildsByParentId', 'common.departments.getChildsByParentId', employer, 'Department', 'grid-w2 pd-r24')}
                    </li>
                    {designation()}
                </>
            )
        }
    }

    const designation = () => {
        let dep = helpers.json.val(data, 'details.department', '');

        if(dep){
            return (
                <>
                    <li className='grid-w2 bxs pd-r24 pd-b28'>
                        {selectBox('designation', 'configs.designation', 'Designation')}
                    </li>
                    {location()}
                </>
            )
        }
    }

    const location = () => {
        let des = helpers.json.val(data, 'details.designation', '');

        if(des){
            return (
                <>
                    <li className='grid-w2 bxs pd-r24 pd-b28'>
                        {selectBox('location', 'configs.offices', 'Location')}
                    </li>
                    {others()}
                </>
            )
        }
    }

    const others = () => {
        let des = helpers.json.val(data, 'details.location', '');

        if(des){
            return (
                <>
                    <li className='grid-w2 bxs pd-r24 pd-b28'>
                        {selectBox('type', 'configs.employment.type.default', 'Employement Type')}
                    </li>
                    <li className='grid-w2 bxs pd-r24 pd-b28'>
                        {selectBox('status', 'configs.employment.status.default', 'Employement Status')}
                    </li>
                    <li className='grid-w2 bxs pd-r24 pd-b28'>
                        {selectBox('workMode', 'configs.employment.workMode.default', 'Work Mode')}
                    </li>
                    {manager()}
                </>
            )
        }
    }

    const manager = () => {
        let type = helpers.json.val(data, 'details.type', '');
        let status = helpers.json.val(data, 'details.status', '');
        let workMode = helpers.json.val(data, 'details.workMode', '');

        if(workMode && type && status){
            return (
                <li className='grid-w2 bxs pd-r24 pd-b28'>
                    {selectBox('manager', 'configs.employment.workMode.default', 'Manager')}
                </li>
            )
        }
    }

    const show = () => {
        let show = helpers.json.is.defined(data.details, {
            bu:true,
            bv:true,
            type:true,
            status:true,
            manager:true,
            location:true,
            employer:true,
            workMode:true,
            department:true,
            designation:true
        });

        if(action === 'update' && show){
            return !helpers.json.is.same(data.details, org.details);
        }

        return show;
    }

    const save = () => {
        const req = {
            request:{
                data:data.details
            }
        }

        if(action === 'update'){
            mhelper.api.updateEmploymentInfo.init(onSaveResp, req);
        }else{
            mhelper.api.createEmploymentInfo.init(onSaveResp, req);
        }
    }

    const saveButton = () => {
        return (
            <Button 
                label='Save'
                buttonDs={{
                    size:"md",
                    theme:'000'
                }}
                onClick={() => {save()}}
            />
        )
    }

    const buttons = () => {
        let valid = show();

        if(valid){
            return (
                <ul className='full pd-r24 pd-t28 bxs'>
                    <li className='fr'>{saveButton()}</li>
                </ul>
            )
        }else{
            return <></>
        }
    }

    const ui = () => {
        let pd = helpers.json.val(data, 'details', {})
        let pdl = helpers.json.length(pd);

        if(data.blank || pdl > 0 || action === 'create'){
            return (
                <div className='full bxs pd-t30 pd-rl20'>
                    <ul className='full bxs grid-wrapper'>
                        <li className='bxs pd-r24 pd-b28 grid-w2'>
                            {selectBox('employedBy', 'configs.employment.employedBy.default', 'Employement By')}
                        </li>
                        {employer()}
                    </ul>
                    {buttons()}
                </div>
            )
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>Employement details are not found?</p>
                        <p className='full txt-xs mr-tb4'>Please select valid employee from list</p>
                    </div>
                </div>
            )
        }
    }

    return ui();--*/
}

export default Comp;