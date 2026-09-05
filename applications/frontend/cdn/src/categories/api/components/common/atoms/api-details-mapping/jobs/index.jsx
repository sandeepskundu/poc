import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';

const ApplicationJob = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const nodata = {
        map:{},
        list:[]
    };

    const [jobs, setJobs] = useState(nodata);
    const action = helpers.json.val(props, 'modified.type');
    const modify = helpers.json.val(props, 'modified.modify');
    const vername = helpers.json.val(props, 'modified.job.id');
    const modified = helpers.json.copy(props.modified || {});

    useEffect(() => {
        let appId = helpers.json.val(props, 'modified.app.id', false);
        let aId = helpers.json.val(props, 'modified.action.id', false);
        let vId = helpers.json.val(props, 'modified.version.id', false);
        let cId = helpers.json.val(props, 'modified.controller.id', false);

        if(appId && cId && aId && vId){
            mhelpers.api.jobs.enums.init({
                appId:appId,
                actionId:aId,
                versionId:vId,
                controllerId:cId
            }, onResponse);
        }
    }, [props.modified])

    const onResponse = (resp, ) => {
        setJobs(resp);
    }

    const onInputChange = (e) => {
        let cmap = helpers.json.copy(jobs.map);
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.transform.camelize(val);
            val = helpers.string.transform.to.alphabet(val);
            e.target.value = val;

        let vuc = helpers.string.transform.uppercase(val);
            modified.job = modified.job || {};

        if(val){
            if(cmap[vuc]){
                modified.job.label = '';
            }else{
                modified.job.label = val;
            }
        }else{
            modified.job.label = '';
        }
    }

    const onSelect = (e, arg) => {
        modified.job = arg;
        change();
    }

    const change = () => {
        if(props.onChange){
            props.onChange({...modified, ...{
                method:"",
            }});
        }
    }

    const onBlur = () => {
        let n = helpers.json.val(modified, 'job.label', '');

        if(n){
            change();
        }
    }

    const listOrInput = () => {
        let li = helpers.json.val(jobs, 'list', []);
    
        return ((action === 'create' &&  modify === 'job') || li.length === 0)
    }

    const ui = () => {
        const input = listOrInput();
        if(input){
            return (
                <Input
                    label="Job name"
                    onBlur={(e) => {onBlur()}}
                    onChange={(e) => {onInputChange(e)}}
                    value={helpers.json.val(modified, 'job.label', '')}
                />
            )
        }else{
            return (
                <SelectBox
                    noBlank={true}
                    selected={vername}
                    list={jobs.list}
                    selectBoxProps={{
                        onSelect:onSelect,
                        "label":"Select Job",
                    }}
                />
            )
        }
    }

    return ui();
}

export default ApplicationJob;