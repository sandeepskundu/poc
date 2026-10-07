const Comp = (props) => { 
    const details = props.props;

    const node = details.node;
    const editor = props.__ || {};
    const metas = helpers.json.get(node, '__.metas', []);
    const showMeta = helpers.json.get(node, '__.showMetas', false);

    const getTemplate = (map) => {
        let rval =  helpers.json.get(props, map, null);

        if(rval && helpers.data.type.is(rval, 'function')){
            return rval;
        }

        return null;   
    }
    
    const layoutTemplate = getTemplate('templates.layout');

    const isType = (type, parent) => {
        return details.builder.isDataType(parent || node.__.type, type);
    }

    const key = () => {
        if(!isType('array', details.parentType)){
            return (
                <div className='grid pd-r16 bxs'>
                    {editor.templates.node.key()}
                </div>
            )
        }
    }

    const type = () => {
        return (
            <div className='grid pd-l16 bxs'>
                {editor.templates.node.type()}
            </div>
        )
        
    }

    const deleteMeta = (meta) => {
        return <span className={`mr-l20 mr-t16 ico-14 cp ico-g-delete`} data-tip-html="Delete" onClick={() => {editor.callbacks.metas.deleteMeta(meta.id)}} />
    }

    const metaKey = (meta) => {
        return <li className="grid-w5 pd-r16 bxs">{editor.templates.meta.key(meta)}</li>
    }

    const metaValue = (meta) => {
        return <li className="grid-w6 pd-l16 bxs">{editor.templates.meta.value(meta, 'value')}</li>
    }

    const metaItem = (meta) => {
        return (
            <ul className="full bxs pd-t24 grid-wrapper">
                {metaKey(meta)}
                {metaValue(meta)}
                {deleteMeta(meta)}
            </ul>
        )
    }

    const metalist = () => {
        if(metas.length > 0 && showMeta){
            return metas.map((meta) => {
                return (
                    <React.Fragment key={meta.id}>
                        {metaItem(meta)}
                    </React.Fragment>
                )
            })
        }
    }

    const layout = () => {
        return (
            <div className='full bxs grid-wrapper grid-layout-2 pd-rl16 pd-tb30'>
                {key()}
                {type()}
                <ul className='full pd-tb18'>
                    <li className='fl'>
                        {editor.templates.node.nullable()}
                    </li>
                    <li>
                        <span onClick={() => {editor.callbacks.node.toggleMetas()}}>{showMeta?'hide metas':'show meta'}</span>
                    </li>
                </ul>
                <div className="full bxs">
                    {metalist()}
                </div>
            </div>
        )
    }

    const ui = () => {
        if(node.__.editing){
            if(layoutTemplate){
                return layoutTemplate({
                    layout:{
                        ui:layout
                    },
                    item:{
                        node:node,
                        key:{
                            ui:key,
                            input:editor.templates.node.key,
                            show:!isType('array', details.parentType)
                        },
                        type:{
                            ui:type,
                            input:editor.templates.node.type
                        },
                        nullable:{
                            input:editor.templates.node.nullable
                        },
                        actions:{
                            edit:editor.callbacks.node.edit,
                            add:editor.callbacks.node.addNew,
                            remove:editor.callbacks.node.delete,
                            expend:editor.callbacks.node.expend,
                            onKeyChange:editor.callbacks.node.keyChange,
                            onTypeChange:editor.callbacks.node.typeChange,
                            toggleMetas:editor.callbacks.node.toggleMetas,
                            validateKeyName:editor.callbacks.node.validateKey,
                            changeValueByKey:editor.callbacks.node.valueChange
                        },
                        meta:{
                            show:showMeta,
                            list:{
                                data:metas,
                                ui:metalist,
                            },
                            item:{
                                ui:metaItem,
                                inputs:{
                                    key:{
                                        ui:metaKey,
                                        input:editor.templates.meta.key,
                                    },
                                    value:{
                                        ui:metaValue,
                                        input:editor.templates.meta.value,
                                    }
                                },
                                actions:{
                                    remove:{
                                        ui:deleteMeta,
                                        method:editor.callbacks.metas.deleteMeta,
                                    },
                                    add:editor.callbacks.metas.addNewMeta,
                                    validateKey:editor.callbacks.metas.validateKey,
                                    updateByKey:editor.callbacks.metas.updateMetaDetailsByKey,
                                    updateMetaDetailsByKey:editor.callbacks.metas.updateMultipleMetasById
                                }
                            }
                        }
                    }
                }, {
                    node:node,
                    editor:editor
                });
            }else{
                return layout();
            }
        }
    }

    return ui();
}

export default Comp;