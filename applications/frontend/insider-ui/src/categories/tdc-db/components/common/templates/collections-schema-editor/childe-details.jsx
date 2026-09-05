import helpers from 'ui-helpers';
import React, {useState, useEffect, useRef} from 'react';
import SchemaMapper from 'aio-app-ui-tdc-db-molecules/collection-schema-mapper';
import CollectionSchemaEditor from 'aio-app-ui-tdc-db-templates/collections-schema-editor';
import AddNewCollSchemaNode from 'aio-app-ui-tdc-db-molecules/add-new-collection-schema-node';

const ChildDetails = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const [map, setMap] = useState(false);
    const sel = helpers.json.val(props, 'selected', []);

    const editable = (() => {
        const allowed = {
            'create':true,
            'update':true,
        }
        const type = helpers.json.val(_siteProps_, 'router.params.action');

        return allowed[type];
    })()

    const expend = (() =>{
        let sels = sel.join('.')
        let expend = props.expended;

        if(expend && sels && expend.indexOf(sels) === 0){
            return true;
        }else{
            return false;
        }
    })()

    const maping = () => {
        let sels = sel.join('.')
        let expend = props.expended;

        if((sel && sel.length > 1 && map) || (sels && expend && expend === sels)){
            return <p className='txt-xxs full mr-t4'>{sel.join('.')}</p>
        }

        return <></>
    }

    const addChild = (id) => {
        const name = helpers.json.val(props, 'name');
        const pd = helpers.json.val(props, `schema.${name}`, {});
        const type = helpers.json.val(props, `schema.${name}.type`);

        if((type === 'object' || type === 'nested')){
            return (
                <li className='pd-l10'>
                    <label className="link-u ns cp txt-xs link-u ns" htmlFor={id}>Add child</label>
                    <AddNewCollSchemaNode
                        id={id}
                        details={pd}
                        selected={sel}
                        key={props.key}
                        configs={props.configs}
                        onSave={(arg, vm, action) => {onChange(arg, vm, action)}}
                    />
                </li>
            )
        }else{
            return <></>
        }
    }

    const add = () => {
        const id = helpers.random.id(10);
        if(editable){
            if(!props.isRoot){
                return addChild(id)
            }else{
                if(props.isRoot){
                    return (
                        <>
                            <li className='pd-l10'>
                                <label className="link-u ns cp txt-xs link-u ns" htmlFor={id+'as'}>Add sibling</label>
                                <AddNewCollSchemaNode
                                    id={id+'as'}
                                    details={{}}
                                    selected={[]}
                                    key={props.key}
                                    configs={props.configs}
                                    onSave={(arg, vm, action) => {onChange(arg, vm, action)}}
                                />
                            </li>
                            {addChild(id)}
                        </>
                    )
                }else{
                    return addChild(id)
                }
            }
        }
    
        return <></>
    }

    const remove = () => {
        if(editable){
            return <li className='mr-l10 cp txt-xs link-u ns' onClick={() => {onChange({}, sel, 'remove')}}>Remove</li>
        }else{
            return <></>
        }
        
    }

    const hmap = () => {
        if(sel && sel.length > 1){
            return <li className='mr-l10 cp txt-xs link-u ns' onClick={() => {setMap(!map)}}>{map?'Hide Map':'View Map'}</li>
        }else{
            return <></>
        }
    }

    const expendLink = () => {
        return <li className='mr-l10 cp txt-xs link-u ns' onClick={() => {onChange({}, sel, (expend?'collapse':'expend'))}}>{expend?'Collapse':'Expend'}</li>
    }

    const header = () => {
        return (
            <div className='full bxs pd-t10'>
                
                <div className='full bxs flx-sb pd-b10'>
                    <div className='bxs'>
                        <p className='pd-r10 txt-sm full'>{helpers.json.val(props, 'name')}</p>
                        {maping()}
                    </div>
                    <ul className='bxs flx-vc'>
                        {hmap()}
                        {add()}
                        {remove()}
                        {expendLink()}
                    </ul>
                </div>
            </div>
        )
    }

    const onChange = (arg, vmap, action) => {
        if(props.onChange){
            props.onChange(arg, vmap, action);
        }
    }

    const view = (conf) => {
        const type = helpers.json.val(conf, 'type');

        switch(type) {
            case 'nested':
                return (
                    <CollectionSchemaEditor
                        selected={sel}
                        key={props.key}
                        configs={props.configs}
                        expended={props.expended}
                        collection={props.collection}
                        schema={helpers.json.val(conf, 'schema', {})}
                        onChange={(arg, vm, action) => {onChange(arg, vm, action)}}
                    />
                )
            break;
            case 'email':
            case 'switch':
            case 'object':
            case 'paragraph':
            case 'stringKey':
            case 'objectId':
            case 'string':
            case 'boolean':
            case 'number':
            case 'date':
                return (
                    <SchemaMapper 
                        details={conf}
                        selected={sel}
                        key={props.key}
                        configs={props.configs}
                        collection={props.collection}
                        onChange={(arg, vm, action) => {onChange(arg, vm, action)}}
                    />
                   
                )
            break;
            default:  
        }
    }

    const preview = () => {
        if(expend){
            const name = helpers.json.val(props, 'name');
            const pd = helpers.json.val(props, `schema.${name}`, {});
            const type = helpers.json.val(props, `schema.${name}.type`);

            if(type === 'nested'){
                return (
                    <div className='full bxs'>
                        <CollectionSchemaEditor
                            selected={sel}
                            key={props.key}
                            configs={props.configs}
                            expended={props.expended}
                            collection={props.collection}
                            schema={helpers.json.val(pd, 'schema', {})}
                            onChange={(arg, vm, action) => {onChange(arg, vm, action)}}
                        />
                    </div>
                )
            }else{
                let len = helpers.json.length(pd);

                if(len && len > 0){
                    return (
                        <div className='full bxs'>
                            {view(pd)}
                        </div>
                    )
                }else{
                    return <></>
                }
            }
        }

        return <></>
    }

    const ui = () => {
        return (
            <>
                <div className='full bxs'>
                    {header()}
                    {preview()}
                </div>
            </>
        )
    }

    return (
        <>
            {ui()}
        </>
    )
}

export default ChildDetails;