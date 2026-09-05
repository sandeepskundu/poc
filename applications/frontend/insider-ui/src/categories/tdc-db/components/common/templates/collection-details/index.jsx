import helpers from 'ui-helpers';
import React, {useState} from 'react';
import mhelper from 'aio-app-ui-tdc-db-modules';
import CollectionSchemaEditor from 'aio-app-ui-tdc-db-templates/collections-schema-editor';
import CollectionsDetailsHeader from 'aio-app-ui-tdc-db-organisms/collections-details-header';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);


    

    const ui = () => {
        return (
            <>
                <CollectionsDetailsHeader 
                    {...props}
                />
                <CollectionSchemaEditor
                    {...props}
                    key={props.cache}
                    configs={props.configs}
                    onUpdate={props.onUpdate}
                    collDetails={helpers.json.val(props.configs, 'collDetails', {})}
                />
            </>
        )
    }

    return ui();
}

export default Comp;