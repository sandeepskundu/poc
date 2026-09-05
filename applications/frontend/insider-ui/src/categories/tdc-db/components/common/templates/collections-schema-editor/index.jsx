import helpers from 'ui-helpers';
import ChildItems from './childs';
import appHelpers from 'app-helpers';
import mhelpers from 'aio-app-ui-tdc-db-modules';
import React, {useEffect, useState, useRef} from 'react';
import AddNewCollection from 'aio-app-ui-tdc-db-molecules/add-new-collection-form'
import AddNewCollSchemaNode from 'aio-app-ui-tdc-db-molecules/add-new-collection-schema-node';
import CollactionSchemaActionButtons from 'aio-app-ui-tdc-db-molecules/collection-schema-action-buttons';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const colSing = helpers.json.val(props, 'collDetails.signature');
    const colSchema = helpers.json.val(props, 'collDetails.schema', helpers.json.val(props, 'schema', {}));
    const colInfo = helpers.json.val(props, 'collDetails.collection', helpers.json.val(props, 'collection', {}));

    const [cache, setCache] = useState(id);
    const [expended, setExpended] = useState('');
    const [schema, setSchema] = useState(colSchema);
    const [updated, setUpdated] = useState(colSchema);
    const [signature, setSignature] = useState(colSing);
    const [modified, setModified] = useState(colSchema);
    const [collection, setCollection] = useState(colInfo);
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

    const changeMapAio = (vmap) => {
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
            rval.push('configs');
            rval.push('aioconfig');
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

    const onResponse = (resp, config) => {
        setSchema(resp.schema);
        setUpdated(resp.schema);
        setModified(resp.schema);
    }

    const save = () => {
        let arg = mhelpers.schema.validation.start({
            schema:{...modified},
            collection:{...collection}
        });

        let appId = helpers.json.val(collection, 'appId');
        let action = helpers.json.val(_siteProps_, 'router.params.action', '')

            arg.collection = {
                name:helpers.json.val(collection, 'name'),
                description:helpers.json.val(collection, 'description', '')
            }

        if(appId){
            arg.appId = helpers.json.val(collection, 'appId');
        }

        if(action === 'create'){
            arg.dbId = helpers.json.val(_siteProps_, 'router.params.dbId', '');
        }

        if(signature){
            arg.signature = signature;

            if(props.onUpdate){
                props.onUpdate(arg, 'update')
            }
        }else{
            mhelpers.api.createCollection.init(onResponse, arg);
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
                case 'collection-changes':
                    setCollection(arg);
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
                case 'extend-aioconfig':
                    mergeConfig(arg, changeMapAio(vmap))
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
                        key={`${cache}a`}
                        configs={props.configs}
                        schema={{...modified}}
                        collection={collection}
                        isRoot={!props.onChange}
                        expended={props.expended || expended}
                        selected={helpers.json.val(props, 'selected', [])}
                        onChange={(arg, vm, action) => {onChange(arg, vm, action)}}
                    />
                    <CollactionSchemaActionButtons 
                        {...props}
                        schema={schema}
                        key={`${cache}b`}
                        updated={{...updated}}
                        modified={{...modified}}
                        onChange={(arg, vm, action) => {onChange(arg, vm, action)}}
                    />
                </>
            )
        }else{
            const id = helpers.random.id(10);
            const collname = helpers.json.val(collection, 'name');

            if(collname){
                return (
                    <div className='full bdr-c00104 bdr-1 bdr-wrln bdr-wbn'>
                        <div className='full bxs pd-t20 pd-rl20'>
                            <p className='txt-xl fm-md'>Collection schema is not defined?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                            <AddNewCollSchemaNode
                                id={id}
                                details={{}}
                                selected={[]}
                                key={`${cache}c`}
                                configs={props.configs}
                                onSave={(arg, vm, action) => {onChange(arg, vm, action)}}
                            />
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className='full bdr-c00104 bdr-1 bdr-wrln bdr-wbn'>
                        <div className='full bxs pd-t20 pd-rl20'>
                            <p className='txt-xl fm-md'>New collection in database?</p>
                            <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                            <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                            <AddNewCollection
                                id={id}
                                key={`${cache}c`}
                                configs={props.configs}
                                collection={collection}
                                onSave={(arg, vm, action) => {onChange(arg, vm, action)}}
                            />
                        </div>
                    </div>
                )  
            }
            console.log(props);
             
        }
    }

    const validColl = () => {
        return (collection.name)
    }

    const ui = () => {
        const show = true;
        const vcoll = validColl();
        const cl = helpers.json.length(colInfo);
        const modif = helpers.json.length(modified);

        if(((cl && cl > 0) && ((modif && modif > 0)) || vcoll) || props.onChange){
            return (
                <div className='full'>
                    {schemaUI()}
                </div>
            )
        } else {

            const cdl = helpers.json.length(collection || {});
            return (
                <div className='full'>
                    {((cdl && cdl > 0) && ((modif && modif > 0) || vcoll))?schemaUI():schemaUI()}
                </div>
            )
        }
    }

    return ui()
}

export default Comp;