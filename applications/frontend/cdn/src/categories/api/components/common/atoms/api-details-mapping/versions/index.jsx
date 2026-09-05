import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';

const ApplicationVersions = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const nodata = {
        map:{},
        list:[]
    };

    const [versions, setVersions] = useState(nodata);

    const action = helpers.json.val(props, 'modified.type');
    const modify = helpers.json.val(props, 'modified.modify');
    const vername = helpers.json.val(props, 'modified.version.id');
    const modified = helpers.json.copy(props.modified || {});

    useEffect(() => {
        let appId = helpers.json.val(props, 'modified.app.id', false);
        let aId = helpers.json.val(props, 'modified.action.id', false);
        let cId = helpers.json.val(props, 'modified.controller.id', false);

        if(appId && cId && aId){
            mhelpers.api.versions.enums.init({
                appId:appId,
                actionId:aId,
                controllerId:cId
            }, onResponse);
        }
    }, [props.modified])

    const onResponse = (resp, ) => {
        setVersions(resp);
    }

    const onInputChange = (e) => {
        let cmap = helpers.json.copy(versions.map);
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.transform.camelize(val);
            val = helpers.string.transform.to.alphabet(val);
            e.target.value = val;

        let vuc = helpers.string.transform.uppercase(val);
            modified.version = modified.version || {};

        if(val){
            if(cmap[vuc]){
                modified.version.label = '';
            }else{
                modified.version.label = val;
            }
        }else{
            modified.version.label = '';
        }
    }

    const onSelect = (e, arg) => {
        modified.version = arg;
        change();
    }

    const change = () => {
        if(props.onChange){
            props.onChange({...modified, ...{
                job:"",
                method:"",
            }});
        }
    }

    const onBlur = () => {
        let n = helpers.json.val(modified, 'version.label', '');

        if(n){
            change();
        }
    }

    const listOrInput = () => {
        let li = helpers.json.val(versions, 'list', []);
    
        return ((action === 'create' &&  modify === 'version') || li.length === 0)
    }

    const ui = () => {
        const input = listOrInput();
        if(input){
            return (
                <Input
                    label="Version"
                    onBlur={(e) => {onBlur()}}
                    onChange={(e) => {onInputChange(e)}}
                    value={helpers.json.val(modified, 'version.label', '')}
                />
            )
        }else{
            return (
                <SelectBox
                    noBlank={true}
                    selected={vername}
                    list={versions.list}
                    selectBoxProps={{
                        onSelect:onSelect,
                        "label":"Select Version",
                    }}
                />
            )
        }
    }

    return ui();
}

export default ApplicationVersions;