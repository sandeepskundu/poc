import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import Button from 'aio-global-ui/atoms/form/button';
import ApplicationList from 'aio-app-ui-tdc-db-atoms/applications-list';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const collection = helpers.json.val(props, 'collection', {});
    const list = helpers.json.val(props, 'configs.collections', []);

    const [details, setDetails] = useState(collection);

    const onNameChange = (e) => {
        let valid = true;
        let d = helpers.json.copy(details);
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.transform.camelize(val);
            val = helpers.string.remove.space(val);

        if(val){
            if(list && list.length > 0){
                for(const a in list){
                    const name = helpers.json.val(list[a], 'name', '')

                    if(name && name.toUpperCase() === val.toUpperCase()){
                        valid = false;
                        break;
                    }
                }
            }
        }

        if(val){
            val = val.charAt(0).toLowerCase() + val.slice(1);  
        }

        if(valid){
            d.name = val
        }else{
            d.name = ''
        }

        e.target.value = val;
    
        setDetails(d);
    }

    const onChange = (e, map) => {
        let valid = true;
        let d = helpers.json.copy(details);
        let val = helpers.json.val(e, 'target.value', '');

        if(valid){
            d[map] = val
        }else{
            d[map] = ''
        }

        e.target.value = val;
        setDetails(d);
    }

    const onAppSelect = (arg) => {
        let d = helpers.json.copy(details);
            d.appId = helpers.json.val(arg, 'id');
            setDetails(d);
    }

    const save = () => {
        if(props.onSave){
            props.onSave(details, false, 'collection-changes');
        }
    }

    const actions = () => {
        let name = helpers.json.val(details, 'name');
        let appId = helpers.json.val(details, 'appId');
        let desc = helpers.json.val(details, 'description');

        if(name && appId && desc){
            return (
                <div className='fr '>
                    <Button 
                        label='Save'
                        buttonDs={{
                            size:"md",
                            theme:'000'
                        }}
                        onClick={save}
                    />
                </div>
            )
        }
    }

    const applications = () => {
        let name = helpers.json.val(details, 'name', '');
        let desc = helpers.json.val(details, 'description')

        if(name && desc){
            return (
                <div className='full bxs pd-b24'>
                    <ApplicationList 
                        {...props}
                        details={details}
                        onSelect={(arg) => {onAppSelect(arg)}}
                    />
                </div>
            )
        }
    }

    const description = () => {
        let name = helpers.json.val(details, 'name', '');

        if(name){
            return (
                <div className='full bxs pd-b24'>
                    <Input
                        label="Description"
                        onBlur={(e) => {onChange(e, 'description')}}
                        value={helpers.json.val(details, 'description', '')}
                    />
                </div>
            )
        }
    }

    return (
        <>
            <div className='full bxs pd-b24'>
                <Input
                    label="Collection name"
                    onBlur={(e) => {onNameChange(e)}}
                    value={helpers.json.val(details, 'name', '')}
                />
            </div>
            {description()}
            {applications()}
            {actions()}
        </>
    )

}

export default AddNewNode;