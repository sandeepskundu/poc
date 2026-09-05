import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-tdc-db-modules';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';

const CollectionName = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const nodata = {
        map:{},
        list:[]
    };

    const [collData, setCollData] = useState(nodata);
    const collid = helpers.json.val(props, 'modified.id');
    const modified = helpers.json.copy(props.modified || {});
    const collection = helpers.json.copy(props.collection || {});


    useEffect(() => {
        let dbId = helpers.json.val(props, 'modified.dbId');

            if(dbId){
                mhelpers.api.schema.enums.init({dbId:dbId}, onResponse)
            }else{
                setCollData(nodata)
            }
    }, [props.modified.dbId])

    const onResponse = (resp, ) => {
        setCollData(resp);
    }

    const onInputChange = (e) => {
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.transform.camelize(val);
            val = helpers.string.transform.to.alphabet(val);
            e.target.value = val;

        let vuc = helpers.string.transform.uppercase(val);
        let oval = helpers.json.val(collection, 'name', '');

        if(val){
            if(collData && collData.map && collData.map[vuc]){
                modified.name = '';
            }else{
                modified.name = val;
            }
        }else{
            modified.name = '';
        }
    }

    const onSelect = (e, arg) => {
        modified.id = helpers.json.val(arg, 'id');
        modified.name = helpers.json.val(arg, 'label');
        change();
    }

    const change = () => {
        if(props.onChange && modified.name){
            props.onChange(modified);
        }
    }

    const ui = () => {
        const type = helpers.json.val(props, 'modified.type');

        if(type === 'create'){
            return (
                <Input
                    label="Collection name"
                    onBlur={(e) => {change()}}
                    onChange={(e) => {onInputChange(e)}}
                    value={helpers.json.val(modified, 'name', '')}
                />
            )
        }else{
            return (
                <SelectBox
                    noBlank={true}
                    selected={collid}
                    list={collData.list}
                    selectBoxProps={{
                        onSelect:onSelect,
                        "label":"Select Collection",
                    }}
                />
            )
        }
    }

    return ui();
}

export default CollectionName;