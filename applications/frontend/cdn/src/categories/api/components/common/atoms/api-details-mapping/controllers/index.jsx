import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';

const ApplicationControllers = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const nodata = {
        map:{},
        list:[]
    };

    const [controllers, setControllers] = useState(nodata);
    
    const action = helpers.json.val(props, 'modified.type');
    const modify = helpers.json.val(props, 'modified.modify');
    const collid = helpers.json.val(props, 'modified.controller.id');
    const modified = helpers.json.copy(props.modified || {});

    useEffect(() => {
        let appId = helpers.json.val(props, 'modified.app.id', false);
        let acId = helpers.json.val(props, 'modified.action.id', false);
        let cId = helpers.json.val(props, 'modified.controller.id', false)

        if(appId && (!acId && !cId) && (modify != 'controller')){
            mhelpers.api.controller.enums.init({
                appId:appId
            }, onResponse)
        }
    }, [props.modified])

    const onResponse = (resp, ) => {
        setControllers(resp);
    }

    const onInputChange = (e) => {
        let cmap = helpers.json.copy(controllers.map);
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.transform.camelize(val);
            val = helpers.string.transform.to.alphabet(val);
            e.target.value = val;

        let vuc = helpers.string.transform.uppercase(val);
            modified.controller = modified.controller || {};

        if(val){
            if(cmap[vuc]){
                modified.controller.label = '';
            }else{
                modified.controller.label = val;
            }
        }else{
            modified.controller.label = '';
        }
    }

    const onSelect = (e, arg) => {
        modified.controller = arg;
        change();
    }

    const change = () => {
        if(props.onChange){
            props.onChange({...modified, ...{
                job:"",
                method:"",
                action:"",
                version:""
            }});
        }
    }

    const onBlur = () => {
        let n = helpers.json.val(modified, 'controller.label', '');

        if(n){
            change();
        }
    }

    const ui = () => {
        if(action === 'create' &&  modify === 'controller'){
            return (
                <Input
                    label="Controller name"
                    onBlur={(e) => {onBlur()}}
                    onChange={(e) => {onInputChange(e)}}
                    value={helpers.json.val(modified, 'label', '')}
                />
            )
        }else{
            return (
                <SelectBox
                    noBlank={true}
                    selected={collid}
                    list={controllers.list}
                    selectBoxProps={{
                        onSelect:onSelect,
                        "label":"Select Controller",
                    }}
                />
            )
        }
    }

    return ui();
}

export default ApplicationControllers;