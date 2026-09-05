import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';

import Databases from 'aio-app-ui-atoms/schema-selector/database-list';
import SchemaActions from 'aio-app-ui-atoms/schema-selector/schema-actions';
import CollectionName from 'aio-app-ui-atoms/schema-selector/collection-name';
import CollectionConfigs from 'aio-app-ui-molecules/schema-editor/collection-configs'

const EditableInfo = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const collc = helpers.json.val(props, 'collection', {});
    const [modified, setModified] = useState(collc);
    const [cache, setCache] = useState(helpers.random.id(10));

    const onChange = (arg, action) => {
        setModified(arg);
        setCache(helpers.random.id(10));
        if(props.onChange){
            switch (action) {
                case 'fetch':
                case 'save':
                    props.onChange(arg, action);
                break;
                case 'collection-changed':
                    props.onChange(arg, action);
                break;
                default:
                    let id = helpers.json.val(arg, 'name');
                    let dId = helpers.json.val(arg, 'dbId');
                    let type = helpers.json.val(arg, 'type');

                    if(!(id && dId && type)){
                        props.onChange(arg, 'collection-change');
                    }
                break
            }
        }
    }

    const database = () => {
        const type = helpers.json.val(modified, 'type');

        if(type){
            return (
                <li className='grid pd-l10 pd-r10'>
                    <Databases 
                        key={cache}
                        data={props.data}
                        collection={collc}
                        canEdit={props.canEdit}
                        configs={props.configs}
                        modified={{...modified}}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </li>
            )
        }else{
            return <></>
        }
    }

    const name = () => {
        const dbId = helpers.json.val(modified, 'dbId');

        if(dbId) {
            return (
                <li className='txt-14 grid pd-l10'>
                    <CollectionName
                        key={cache}
                        data={props.data}
                        collection={collc}
                        canEdit={props.canEdit}
                        configs={props.configs}
                        modified={{...modified}}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </li>
            )
        }else{
            return <></>
        }
    }

    const actions = () => {
        return (
            <li className='txt-14 grid pd-r10'>
                <SchemaActions 
                    key={cache}
                    data={props.data}
                    collection={collc}
                    canEdit={props.canEdit}
                    configs={props.configs}
                    modified={{...modified}}
                    onChange={(arg) => {onChange(arg)}}
                />
            </li>
        )
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                <ul className='full bxs pd-t24 pd-b12 grid-wrapper grid-layout-4'>
                    {actions()}
                    {database()}
                    {name()}
                </ul>
                <div className='full'>
                    <CollectionConfigs
                        key={cache}
                        data={props.data}
                        collection={collc}
                        canEdit={props.canEdit}
                        configs={props.configs}
                        modified={{...modified}}
                        onChange={(arg, action) => {onChange(arg, action)}}
                    />
                </div>
            </div>
        )
    }

    return ui();
}

export default EditableInfo;