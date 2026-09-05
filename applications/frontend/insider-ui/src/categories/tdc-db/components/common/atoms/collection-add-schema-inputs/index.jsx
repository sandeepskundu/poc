import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import Button from 'aio-global-ui/atoms/form/button';
import SchemaTypes from 'aio-app-ui-tdc-db-atoms/collection-schema-types';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [details, setDetails] = useState({
        data:{},
        map:[]
    });

    const onNodeNameChange = (e) => {
        let d = {...details};
        let val = helpers.json.val(e, 'target.value', '');
        let smap = helpers.json.val(props, 'selected', []);
        let keyes = helpers.json.val(props, 'details.schema', {});
            val = helpers.string.transform.camelize(val);
            val = helpers.string.remove.space(val);
            d.data = {};

            if(val){
                val = val.charAt(0).toLowerCase() + val.slice(1)
            }

            e.target.value = val;

            if(!keyes[val]){
                smap = smap.concat([val]);
                d.map = smap;
            }else{
                d.map = [];
            }

        setDetails(d);
    }

    const onTypeChange = (arg) => {
        let d = {...details};
            d.data = arg;
            setDetails(d);
    }

    const types = () => {
        let m = helpers.json.val(details, 'map', []);

        if(m && m.length > 0){
            return (
                <div className='full bxs pd-b26'>
                    <SchemaTypes
                        selected={[]}
                        details={helpers.json.val(details, 'data', {})}
                        configs={helpers.json.val(props, 'configs', {})}
                        onChange={(arg, vm, vt) => {onTypeChange(arg, vm, vt)}}
                    />
                </div>
            )
        }else{
            return <></>
        }
    }

    const save = () => {
        if(props.onSave){
            props.onSave(details.data, details.map, 'add');
            props.onSave({}, details.map, 'expend');
        }
    }

    const actions = () => {
        let d = helpers.json.val(details, 'data', {});
        let dl = helpers.json.length(d);
        if(dl && dl > 0){
            return (
                <div className='fr'>
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

    return (
        <>
            <div className='full bxs pd-b32'>
                <Input
                    label="Node name"
                    value={''}
                    onChange={(e) => {onNodeNameChange(e)}}
                />
            </div>
            {types()}
            {actions()}
        </>
    )

}

export default AddNewNode;