import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';

const ApplicationActions = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const nodata = {
        map:{},
        list:[]
    };

    const [actions, setActions] = useState(nodata);

    const action = helpers.json.val(props, 'modified.type');
    const modify = helpers.json.val(props, 'modified.modify');
    const colname = helpers.json.val(props, 'modified.action.id');
    const modified = helpers.json.copy(props.modified || {});

    useEffect(() => {
        let appId = helpers.json.val(props, 'modified.app.id', false);
        let cId = helpers.json.val(props, 'modified.controller.id', false);

        if(appId && cId){
            mhelpers.api.actions.enums.init({
                appId:appId,
                controllerId:cId
            }, onResponse)
        }
    }, [props.modified])

    const onResponse = (resp, ) => {
        setActions(resp);
    }

    const onInputChange = (e) => {
        let cmap = helpers.json.copy(actions.map);
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.transform.camelize(val);
            val = helpers.string.transform.to.alphabet(val);
            e.target.value = val;

        let vuc = helpers.string.transform.uppercase(val);
            modified.action = modified.action || {};

        if(val){
            if(cmap[vuc]){
                modified.action.label = '';
            }else{
                modified.action.label = val;
            }
        }else{
            modified.action.label = '';
        }
    }

    const onSelect = (e, arg) => {
        modified.action = arg;
        change();
    }

    const change = () => {
        if(props.onChange){
            props.onChange({...modified, ...{
                job:"",
                method:"",
                version:""
            }});
        }
    }

    const onBlur = () => {
        let n = helpers.json.val(modified, 'action.label', '');

        if(n){
            change();
        }
    }

    const listOrInput = () => {
        let li = helpers.json.val(actions, 'list', []);
    
        return ((action === 'create' &&  modify === 'action') || li.length === 0)
    }

    const ui = () => {
        const input = listOrInput();
        if(input){
            return (
                <Input
                    label="Action name"
                    onBlur={(e) => {onBlur()}}
                    onChange={(e) => {onInputChange(e)}}
                    value={helpers.json.val(modified, 'action.label', '')}
                />
            )
        }else{
            return (
                <SelectBox
                    noBlank={true}
                    selected={colname}
                    list={actions.list}
                    selectBoxProps={{
                        onSelect:onSelect,
                        "label":"Select Action",
                    }}
                />
            )
        }
    }

    return ui();
}

export default ApplicationActions;