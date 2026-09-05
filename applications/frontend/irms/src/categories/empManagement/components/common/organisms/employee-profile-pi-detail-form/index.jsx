import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import Button from 'aio-global-ui/atoms/form/button';
import mhelper from 'aio-app-ui-empManagement-modules';
import DobInput from 'aio-app-ui-empManagement-atoms/dob-input';
import EmployeeProfileGenderList from 'aio-app-ui-empManagement-atoms/empolyee-profile-gender-list'
import EmployeeProfileCountryList from 'aio-app-ui-empManagement-atoms/empolyee-profile-country-list';
import EmployeeProfileNameInputs from 'aio-app-ui-empManagement-molecules/employee-profile-name-inputs';
import EmployeeProfileMaritalStatus from 'aio-app-ui-empManagement-atoms/empolyee-profile-marital-status';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const dvals = {
        blank:true,
        details:{},
        configs:{}
    }

    let dv = dvals;
    const [org, setOrg] = useState(dvals);
    const [data, setData] = useState(dvals);
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();
    const action = helpers.json.val(_siteProps_, 'router.params.action', 'create');

    useEffect(() => {
        
    }, [data])

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
        onRespData(resp, {})
    }

    const onSaveResp = (resp) => {
        onRespData(resp, data)
    }

    const getDetails = () => {
        if(action === 'update'){
            helpers.store.getDetailsById([{
                name:'employee.directory.personalInfoByMapId',
                request:{
                    options:{
                        //endpoint:'access.roles.roleDataByHash',
                    },
                    request:{
                        method:'get',
                        params:{}
                    },
                    dataMaker:(data, rawResp, configs, error) => {
                        return helpers.json.val(data, 'data.result.0', {});
                    },
                    responseDataMap:{
                        "fallback":{},
                        "from":"data",
                        "to":"details",
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
                        "country.list":true,
                        "name.titles.adults":true,
                        "gender.types.default":true,
                        "marital.status.default":true
                    }
                }
            },
            dataMakers:{
                "name.titles.adults":null
            }
        }, onConstResp);  
    }

    const onChange = (arg) => {
        let d = helpers.json.copy(data);
            d.details = helpers.json.merge(d.details, (arg || {}));
            setData(d);
    }

    const show = () => {
        let show = helpers.json.is.defined(data.details, {
            'dob':true,
            'gender':true,
            'marital':true,
            'country':true,
            'name.last':true,
            'name.first':true,
            'name.title':true,
            'name.middle':true,
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
            mhelper.api.updatePersonalDetailsByMapId.init(onSaveResp, req);
        }else{

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

        if(data.blank || pdl > 0){
            return (
                <div className='full bxs pd-t30 pd-rl20'>
                    <EmployeeProfileNameInputs {...data} onChange={onChange} />
                    <ul className='full bxs grid-wrapper grid-layout-4'>
                        <li className='grid bxs pd-r24 pd-t28'><EmployeeProfileCountryList {...data} onChange={onChange} /></li>
                        <li className='grid bxs pd-r24 pd-t28'><EmployeeProfileGenderList {...data} onChange={onChange} /></li>
                        <li className='grid bxs pd-r24 pd-t28'><EmployeeProfileMaritalStatus {...data} onChange={onChange} /></li>
                        <li  className='grid bxs pd-r24 pd-t28'><DobInput {...data} onChange={onChange} /></li>
                    </ul>
                    {buttons()}
                </div>
            )
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>Employee profile details are not found?</p>
                        <p className='full txt-xs mr-tb4'>Please select valid employee from list</p>
                    </div>
                </div>
            )
        }
    }

    return ui();
}

export default Comp;