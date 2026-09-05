import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';

const CollectionName = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const nodata = {
        '6738829afbe779c7746626aa':{
            id:"6738829afbe779c7746626aa",
            label:"CMS Database"
        }
    }

    const [list, setList] = useState(nodata);

    const modified =  helpers.json.val(props, 'modified', {});
    const selected =  helpers.json.val(props, 'modified.app.id', '');

    const onSelect = (el, arg) => {
        let d = {...modified, ...{
            job:"",
            type:"",
            app:arg,
            modify:"",
            method:"",
            action:"",
            version:"",
            controller:"",
        }};

        if(props.onChange){
            props.onChange(d);
        }
    }

    const ui = () => {
        return (
            <SelectBox
                list={list}
                noBlank={true}
                selected={selected}
                selectBoxProps={{
                    onSelect:onSelect,
                    "label":"Select Application",
                }}
            />
        )
    }

    return ui();
}

export default CollectionName;