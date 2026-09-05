import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import CollectionActionButtons from 'aio-app-ui-atoms/schema-selector/collection-action-buttons';

const CollectionConfigs = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const onChange = (arg, action) => {
        if(props.onChange){
            props.onChange(arg, action);
        }   
    }

    return (
        <div className='full'>
            <CollectionActionButtons 
                data={props.data}
                canEdit={props.canEdit}
                configs={props.configs}
                isRoot={!props.onChange}
                modified={props.modified}
                onChange={(arg, action) => {onChange(arg, action)}}
                collection={helpers.json.val(props, 'collection', {})}
            />
        </div>
    )
}

export default CollectionConfigs;