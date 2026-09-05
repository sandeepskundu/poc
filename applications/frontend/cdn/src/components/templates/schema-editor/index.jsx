import helpers from 'ui-helpers';
import ChildItems from './childs';
import mhelpers from 'aio-app-ui-schema-modules';
import React, {useEffect, useState, useRef} from 'react';
import AddNewSlider from 'aio-app-ui-molecules/schema-editor/add-new-node';
import CollectionDetails from 'aio-app-ui-molecules/schema-selector/collection-details'
import SchemaActionButtons from 'aio-app-ui-molecules/schema-editor/schema-action-buttons';

const JsonEditor = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = () => {
        return helpers.random.id(10);
    }

    const [cache, setCache] = useState(id);
    const [expended, setExpended] = useState('');
    const [signature, setSignature] = useState(null);
    const [schema, setSchema] = useState(props.schema || {});
    const [updated, setUpdated] = useState(props.schema || {});
    const [modified, setModified] = useState(props.schema || {});
    const [collection, setCollection] = useState(props.collection || {});
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    /*--useEffect(() => {
        if(fristRender){
            setModified(props.schema);
        }
    }, [props.schema]);--* /

    /*--
        useEffect(() => {
            //console.log(modified);
        }, [modified]);
    --*/

    const changeMap = (vmap) => {
        let rval = [];
        let valm = [...vmap];
        let name = valm.splice(-1);

        if(valm.length > 0){
            for(const a in valm){
                rval.push(valm[a]);
                rval.push('schema');
            }
        }

        if(name[0]){
            rval.push(name[0]);
        }

        return rval.join('.')
    }

    const mergeConfig = (arg, vmap) => {
        let dm = helpers.json.copy({...modified});
            dm = helpers.json.set(dm, vmap, false, false, true);
            dm = helpers.json.set(dm, vmap, arg, false, true);

            console.log(dm);
            console.log(JSON.stringify(dm));
            setModified(dm);
    }

    const remove = (arg, vmap) => {
        let dm = helpers.json.copy({...modified});
            helpers.json.remove(dm, vmap);
            setModified(dm);
    }

    const onFetchResponse = (resp, config) => {
        setSignature(resp.signature || null);
        onResponse(resp);
    }

    const collChange = (arg, action) => { 
        switch (action) {
            case 'collection-change':
                setCollection(arg);
                onResponse({schema:{}})
            break;
            default:
                setCollection(arg);
                if(action === 'fetch'){
                    mhelpers.api.schema.fetch.init(arg, onFetchResponse);
                }
        }
    }

    const onResponse = (resp, config) => {
        setSchema(resp.schema);
        setUpdated(resp.schema);
        setModified(resp.schema)
    }

    const save = () => {
        let arg = mhelpers.schema.validation.start({
            schema:{...modified},
            collection:{...collection}
        });

        if(signature){
            arg.signature = signature;
            mhelpers.api.schema.update.init(arg, onResponse);
        }else{
            mhelpers.api.schema.create.init(arg, onResponse);
        }
    }

    const onChange = (arg, vmap, action) => {
        if(props.onChange){
            props.onChange(arg, vmap, action);
        }else{
            switch (action) {
                case 'save':
                    save();
                break;
                case 'sync':
                    setUpdated(arg);
                    setModified(arg);
                break;
                case 'reset':
                    setUpdated(arg);
                    setModified(arg);
                break;
                case 'revert':
                    setUpdated(props.schema)
                    setModified(props.schema);
                break;
                case 'expend':
                    setExpended(vmap.join('.'));
                break;
                case 'collapse':
                    if(vmap && vmap.length > 1){
                        vmap.splice(-1);
                        setExpended(vmap.join('.'));
                    }else{
                        setExpended('');
                    }
                break;
                case 'remove':
                    remove(arg, changeMap(vmap))
                break;
                default :
                    mergeConfig(arg, changeMap(vmap)) 
                break;
            }
        }
    }

    const schemaUI = () => {
        const ml = helpers.json.length(modified || {});

        if((ml && ml > 0) || props.onChange){
            return (
                <>
                    <ChildItems
                        key={cache}
                        schema={{...modified}}
                        configs={props.configs}
                        collection={collection}
                        isRoot={!props.onChange}
                        expended={props.expended || expended}
                        selected={helpers.json.val(props, 'selected', [])}
                        onChange={(arg, vm, action) => {onChange(arg, vm, action)}}
                    />
                    <SchemaActionButtons 
                        {...props}
                        key={cache}
                        schema={schema}
                        updated={{...updated}}
                        modified={{...modified}}
                        onChange={(arg, vm, action) => {onChange(arg, vm, action)}}
                    />
                </>
            )
        }else{
            const id = helpers.random.id(10);
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>Create Schema</p>
                        <p className='full txt-xs mr-tb4'>Wants to collection schema? Lets start from beginning.</p>
                        <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                        <AddNewSlider
                            id={id}
                            key={cache}
                            details={{}}
                            selected={[]}
                            configs={props.configs}
                            onSave={(arg, vm, action) => {onChange(arg, vm, action)}}
                        />
                    </div>
                </div>
            )   
        }
    }

    const validColl = () => {
        return (collection.name && collection.dbId && collection.type)
    }

    const ui = () => {
        const vcoll = validColl();
        const cld = helpers.json.val(props, 'collection', {});
        const cl = helpers.json.length(cld);
        const modif = helpers.json.length(modified);

        if(((cl && cl > 0) && ((modif && modif > 0)) || vcoll) || props.onChange){
            return (
                <div className='full'>
                    <CollectionDetails 
                        key={cache}
                        canEdit={true}
                        modified={modified}
                        configs={props.configs}
                        isRoot={!props.onChange}
                        collection={{...collection}}
                        onChange={(arg, action) => {collChange(arg, action)}}
                    />
                    {schemaUI()}
                </div>
            )
        }else{
            const cdl = helpers.json.length(collection || {});
            return (
                <div className='full'>
                    <CollectionDetails
                        key={cache} 
                        canEdit={true}
                        modified={modified}
                        configs={props.configs}
                        isRoot={!props.onChange}
                        collection={{...collection}}
                        onChange={(arg, action) => {collChange(arg, action)}}
                    />
                    {((cdl && cdl > 0) && ((modif && modif > 0) || vcoll))?schemaUI():<></>}
                </div>
            )
        }
    }

    return ui()
}

export default JsonEditor;