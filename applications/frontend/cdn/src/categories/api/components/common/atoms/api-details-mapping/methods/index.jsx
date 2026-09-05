import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';

const ApplicationMethods = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const nodata = {
        map:{},
        list:[]
    };

    const [methods, setMethods] = useState(nodata);
    const modified = helpers.json.copy(props.modified || {});
    const mname = helpers.json.val(props, 'modified.method.id');

    useEffect(() => {
        let jId = helpers.json.val(props, 'modified.job.id', false);
        let appId = helpers.json.val(props, 'modified.app.id', false);
        let aId = helpers.json.val(props, 'modified.action.id', false);
        let vId = helpers.json.val(props, 'modified.version.id', false);
        let cId = helpers.json.val(props, 'modified.controller.id', false);

        if(appId && cId && aId && vId){
            mhelpers.api.methods.enums.init({
                jobId:jId,
                appId:appId,
                actionId:aId,
                versionId:vId,
                controllerId:cId
            }, onResponse);
        }
    }, [props.modified])

    const onResponse = (resp, ) => {
        setMethods(resp);
    };

    const onSelect = (e, arg) => {
        modified.method = arg;
        change();
    }

    const change = () => {
        if(props.onChange){
            props.onChange({...modified, ...{}});
        }
    }

    const ui = () => {
        return (
            <SelectBox
                noBlank={true}
                selected={mname}
                list={methods.list}
                selectBoxProps={{
                    onSelect:onSelect,
                    "label":"Select Method",
                }}
            />
        )
    }

    return ui();
}

export default ApplicationMethods;