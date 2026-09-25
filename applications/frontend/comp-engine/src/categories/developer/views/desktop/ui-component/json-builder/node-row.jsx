import helpers from 'ui-helpers';
import React, {useState} from 'react';
import Input from 'aio-global-raw-ui/atoms/form/input';
import Select from 'aio-global-raw-ui/atoms/form/select';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const Comp = (props) => {
    const builder = props.builder;
    const types = helpers.json.get(builder, 'utils.dataType', []);
    const keyRegex = helpers.json.get(builder, 'utils.keyRegex');
    const iconByType = helpers.json.get(builder, 'utils.iconByType');
    const {node, depth, parentType, index, onUpdate, onDelete, onAddChild, entireTree, isSiblingKeyDuplicateFn, searchQuery} = props;
    const isObjectOrArray = node.type === 'object' || node.type === 'array';
    const isParentArray = parentType === 'array';
    const [isEditing, setIsEditing] = useState(!node.key && depth === 0);

    // Strict Array Fallbacks preventing 'map of undefined' crashes
    const metas = node.metas || [];
    const safeChildren = node.children || [];
    const query = (searchQuery || '').trim().toLowerCase();
    const isMatchInBranch = query?builder.matchesQuery(node, query):true;
    const hasDuplicateError = !isParentArray && isSiblingKeyDuplicateFn(entireTree, node.id, node.key);
    const hasEmptyError = !isParentArray && (!node.key || !node.key.trim());
    const hasError = hasDuplicateError || hasEmptyError;

    const handleKeyChange = (val) => {
        if (keyRegex.test(val)) {
            onUpdate(node.id, (prev) => ({ ...prev, key:val}));
        }
    };

    const handleTypeChange = (type) => {
        onUpdate(node.id, (prev) => ({
            ...prev,
            type:type,
            isNull:false,
            dvalue:builder.utils.dvalueByType(type),
            children:(type === 'object' || type === 'array')?prev.children || []:undefined
        }));
    };

    const handleValueChange = (field, val) => {
        onUpdate(node.id, (prev) => ({ ...prev, [field]: val }));
    };

    const handleAddMetaItem = () => {
        onUpdate(node.id, (prev) => ({...prev, metas:[...metas, {id:helpers.random.key(), key:'', value:''}]}));
    };

    const handleUpdateMetaItem = (metaId, metaField, metaVal) => {
        onUpdate(node.id, (prev) => ({...prev, metas:metas.map((item) => {
                if(item.id === metaId){
                    if(metaField === 'key' && !keyRegex.test(metaVal)){
                        return item;
                    }
                    return {...item, [metaField]:metaVal};
                }
                return item;
            })
        }));
    };

    const handleDeleteMetaItem = (metaId) => {
        onUpdate(node.id, (prev) => ({...prev, metas:metas.filter((item) => item.id !== metaId)}));
    };

    const expendIcon = () => {
        if(isObjectOrArray){
            return (
                <span className={`mr-t6 mr-r8 ico-12 cp ico-g-${node.isExpanded?'minus':'plus'}`} data-tip-html={node.isExpanded?'Collapse':'Expend'}  onClick={() => onUpdate(node.id, (prev) => ({ ...prev, isExpanded: !prev.isExpanded }))}></span>
            )
        }
    }

    const typeIcon = () => {
        let icos = helpers.json.get(props, 'icons.byTypes');

        if(icos && helpers.data.type.is(icos, 'functions')){
            return icos(node)
        }else{
           return (iconByType[node.type] || '📄') 
        }
    }

    const arrayBadge = () => {
        if(isParentArray){
            return <span className='txt-12'>[{index}]</span>
        }else{
            return (
                <>
                    <span className='txt-12'>{node.key || '<unnamed_key>'}</span>
                    {hasError && (<span className='txt-xxs txt-c00306'>{hasEmptyError ? '⚠️ (Key required)' : '⚠️ (Duplicate)'}</span>)}
                </>
            )
        }
    }

    const typeBadge = () => {
        return <span className='txt-xxs bg-c00103 pd-tb2 pd-rl6 bdr-2 bdr-1 bdr-c00104 mr-l8'>{node.type}</span>
    }

    const requiredBadge = () => {
        if(node.required){
            return <span className='txt-xxs bg-c00402 pd-tb2 pd-rl6 bdr-2 bdr-1 bdr-c00406 txt-c00408 mr-l8'>required</span>
        }
        
    }

    const nullBadge = () => {
        if(node.isNull){
            return <span className='txt-xxs bg-c00302 pd-tb2 pd-rl6 bdr-2 bdr-1 bdr-c00306 txt-c00308 mr-l8 fm-md'>null</span>
        }
    }

    const childCount = () => {
        if(isObjectOrArray){
            return <span className='txt-xxs txt-c00105 pd-tb2 pd-rl6 bdr-2 mr-l2'>({safeChildren.length} {node.type === 'array' ? 'items' : 'props'})</span>   
        }
    }

    const addAction = () => {
        if(isObjectOrArray){
            return <span className={`mr-l16 ico-16 cp ico-g-plus`} data-tip-html="Add" onClick={() => onAddChild(node.id, builder.createNode('', 'string'))} />
        }
    }

    const doneOrEditAction = () => {
        if(isEditing){
            return <span className={`mr-l16 ico-16 cp ico-g-check`} data-tip-html="Done" onClick={() => setIsEditing(!isEditing)} />
        }else{
            return <span className={`mr-l16 ico-12 cp ico-g-edit`} data-tip-html="Edit" onClick={() => setIsEditing(!isEditing)} />
        }
    }

    const deleteAction = () => {
        return <span className={`mr-l16 ico-12 cp ico-g-delete`} data-tip-html="Delete" onClick={() => onDelete(node.id)} />
    }

    const nested = () => {
        if(isObjectOrArray && node.isExpanded && safeChildren.length > 0){
            return (
                <div className='bxs pd-l8 bdr-1 bdr-tn bdr-bn bdr-rn bdr-c00104'>
                    {safeChildren.map((child, idx) => (
                        <Comp
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            parentType={node.type}
                            index={idx}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onAddChild={onAddChild}
                            entireTree={entireTree}
                            templates={props.templates}
                            isSiblingKeyDuplicateFn={isSiblingKeyDuplicateFn}
                            searchQuery={searchQuery}
                            getIconByType={props.getIconByType}
                            builder={props.builder}
                        />
                    ))}
                </div>
            )
        }
    }

    const keyName = () => {
        if(!isParentArray){
            return (
                <li className='grid pd-r16 bxs'>
                    <Input 
                        label="Key Name"
                        placeholder="key_name"
                        value={node.key || ''}
                        callback={{
                            onChange:handleKeyChange
                        }}
                    />
                </li>
            )
        }
    }

    const nullable = () => {
        if(node.key){
            return (
                <li className='grid pd-r16 bxs pd-t12 pd-l16'>
                    <Toggle 
                        label={{
                            text:"Set null"
                        }}
                        checkbox={{
                            checked:node.isNull
                        }}
                        callback={{
                            input: {
                                onChange:(checked, b, c) => {
                                    onUpdate(node.id, (prev) => ({...prev, isNull:checked}));
                                }
                            }
                        }}
                    />
                </li>
            )
        }

        return <></>
    }

    const required = () => {
        if(node.key && node.type && !node.isNull){
            return (
                <li className='grid pd-r16 bxs pd-t12 pd-l16'>
                    <Toggle 
                        label={{
                            text:"Required"
                        }}
                        checkbox={{
                            checked:node.required
                        }}
                        callback={{
                            input: {
                                onChange:(checked, b, c) => {
                                    onUpdate(node.id, (prev) => ({...prev, required:checked}))
                                }
                            }
                        }}
                    />
                </li>
            )
        }

        return <></>
    }

    const nodeType = () => {
        const options = (() => {
            let ops = types.map((a, i) => {
                return {
                    id:a,
                    label:a
                }
            })
            return helpers.array.toIndexJson(ops, {});
        })();

        return (
            <li className='fl bxs'>
                <Select 
                    input={{
                        label:"Data type"
                    }}
                    mapping={{
                        selected:{
                            0:'id'
                        }
                    }}
                    closeOn={{
                        blur:false
                    }}
                    callback={{
                        onSelect:(a, b, c, d) => {
                            handleTypeChange(helpers.json.get(a, '0.id'));
                        }
                    }}
                    data={{
                        selected:{
                            0:{
                                id:node.type || 'string',
                                label:node.type || 'string'
                            }
                        },
                        list:options
                    }}
                />
            </li>
        )
    }

    const booleanType = () => {
        const options = (() => {
            let ops = ['true', 'false'].map((a, i) => {
                return {
                    id:a,
                    label:a
                }
            })
            return helpers.array.toIndexJson(ops, {});
        })();

        return (
            <li className='fl bxs pd-l20'>
                <Select 
                    input={{
                        label:"Default value"
                    }}
                    mapping={{
                        selected:{
                            0:'id'
                        }
                    }}
                    closeOn={{
                        blur:false
                    }}
                    callback={{
                        onSelect:(a, b, c, d) => {
                            handleValueChange('dvalue', (helpers.json.get(a, '0.id') === 'true'))
                        }
                    }}
                    data={{
                        selected:{
                            0:{
                                id:String(node.dvalue),
                                label:String(node.dvalue)
                            }
                        },
                        list:options
                    }}
                />
            </li>
        )
    }

    const dvalue = () => {
        if(!isObjectOrArray){
            if(node.type === 'boolean'){
                return booleanType()
            }else{
                return (
                    <li className='full pd-l16 bxs flx-full fl'>
                        <Input 
                            label="Default value"
                            placeholder="Default value"
                            value={node.dvalue || ''}
                            callback={{
                                onChange:(val) => {
                                    handleValueChange('dvalue', (node.type === 'number'?Number(val) :val))
                                }
                            }}
                        />
                    </li>
                )
            }
        }
    }

    const details = () => {
        if(node.key && !node.isNull){
            return (
                <ul className='full bxs pd-rl16 flx-full'>
                    {nodeType()}
                    {dvalue()}
                </ul>
            )
        }
    }

    const attrsHeader = () => {
        if(metas.length > 0){
            return (
                <div className='flx-sb flx-vc mr-t20'>
                    <span className='txt-xs fm-md'>Custom Metadata Attributes</span>
                    <span className="txt-xxs txt-c00105 pd-tb2 bdr-2 mr-l2 cp" onClick={handleAddMetaItem}>+ Add Attribute</span>
                </div>
            )
        }else{
            return (
                <div className='full ac pd-14 txt-c00207 bg-c00200 bxs bdr-1 bdr-c00203 bdr-6 mr-t20'>
                    <p className='txt-xs fm-md'>No custom attributes added yet.</p>
                    <span className="txt-xxs pd-tb2 bdr-2 mr-l2 cp" onClick={handleAddMetaItem}>+ Add Attribute</span>
                </div>
            )
        }
    }

    const metaKey = (meta) => {
        return (
            <Input 
                _label="Attr name"
                placeholder="name"
                value={meta.key || ''}
                invalid={!meta.key || !meta.key.trim()}
                callback={{
                    onChange:(val) => {
                        handleUpdateMetaItem(meta.id, 'key', val)
                    }
                }}
            />
        )
    }

    const metaAttrKeyTemplate = (meta) => {
        const temp = helpers.json.get(props, 'templates.metaAttrs.key', '');
        if(temp && helpers.data.type.is(temp, 'function')){
            return temp(meta, node, {
                template:() => {return metaKey(meta)},
                onDelete:() => handleDeleteMetaItem(meta.id),
                onKeyChange:(val) => handleUpdateMetaItem(meta.id, 'key', val),
                onValueChange:(val) => handleUpdateMetaItem(meta.id, 'value', val)
            })
        }else{
            return metaKey(meta)
        }
    }

    const metaValue = (meta) => {
        return (
            <Input 
                _label="Attr value"
                placeholder="Value"
                value={meta.value || ''}
                callback={{
                    onChange:(val) => {
                        handleUpdateMetaItem(meta.id, 'value', val)
                    }
                }}
            />
        )
    }

    const metaAttrValueTemplate = (meta) => {
        const temp = helpers.json.get(props, 'templates.metaAttrs.value', '');
        if(temp && helpers.data.type.is(temp, 'function')){
            return temp(meta, node, {
                template:() => {return metaValue(meta)},
                onDelete:() => handleDeleteMetaItem(meta.id),
                onKeyChange:(val) => handleUpdateMetaItem(meta.id, 'key', val),
                onValueChange:(val) => handleUpdateMetaItem(meta.id, 'value', val)
            })
        }else{
            return metaValue(meta);
        }
    }

    const metaDelete = (meta) => {
        return (
            <span className='mr-t14 mr-l16 ico-16 ico-g-delete cp' data-tip-html="Delete" onClick={() => handleDeleteMetaItem(meta.id)}></span>
        )
    }

    const metaAttrDeleteTemplate = (meta) => {
        const temp = helpers.json.get(props, 'templates.metaAttrs.delete', '');

        if(temp && helpers.data.type.is(temp, 'function')){
            return temp(meta, node, {
                template:() => {return metaDelete(meta)},
                onDelete:() => handleDeleteMetaItem(meta.id),
                onKeyChange:(val) => handleUpdateMetaItem(meta.id, 'key', val),
                onValueChange:(val) => handleUpdateMetaItem(meta.id, 'value', val)
            })
        }else{
            return metaDelete(meta)
        }
    }

    const metaRow = (meta) => {
        return (
            <div className='full bxs grid-wrapper flx-full'>
                <div className='grid-w4 pd-t14 pd-b4 pd-r18 bxs'>
                    {metaAttrKeyTemplate(meta)}
                </div>
                <div className='grid-w7 pd-t14 pd-b4 bxs'>
                    {metaAttrValueTemplate(meta)}
                </div>
                <div className='grid-w1 pd-t14 pd-b4 pd-l10 bxs'>
                    {metaAttrDeleteTemplate(meta)}
                </div>
            </div>
        );
    }

    const attrItemTemp = (meta) => {
        const temp = helpers.json.get(props, 'templates.metaAttrs.row', '');
        if(temp && helpers.data.type.is(temp, 'function')){
            return temp(meta, node, {
                keyTemplate:metaKey,
                valueTemplate:metaValue,
                deleteTemplate:metaDelete,
                template:() => {return metaRow(meta)},
                onDelete:() => handleDeleteMetaItem(meta.id),
                onKeyChange:(val) => handleUpdateMetaItem(meta.id, 'key', val),
                onValueChange:(val) => handleUpdateMetaItem(meta.id, 'value', val)
            })
        }else{
            return metaRow(meta)
        }
    }

    const attrsList = () => {
        if(metas.length > 0){
            return metas.map((meta) => {
                return (
                    <React.Fragment key={meta.id}>
                        {attrItemTemp(meta)}
                    </React.Fragment>
                )
            })
        }
    }

    const attrsUi = () => {
        return (
            <div className='full bxs pd-rl16 pd-b20 bdr-1 bdr-c00104 bdr-tn bdr-rn bdr-ln'>
                {attrsHeader()}
                {attrsList()}
            </div>
        )
    }

    const attribute = () => {
        if(node.key && !node.isNull){
            const temp = helpers.json.get(props, 'templates.metaAttrs.viewport', '');
            if(temp && helpers.data.type.is(temp, 'function')){
                return temp(metas, node, {
                    addNewMeta:handleAddMetaItem,
                    template:() => {return attrsUi()},
                    keyTemplate:metaAttrKeyTemplate,
                    valueTemplate:metaAttrValueTemplate,
                    deleteTemplate:metaAttrDeleteTemplate
                })
            }else{
                return attrsUi()
            }
        }
    }

    const editor = () => {
        if(isEditing){
            return (
                <div className='full bxs'>
                    <ul className='full bxs pd-tb30 pd-rl16 grid-wrapper grid-layout-4'>
                        {keyName()}
                        {nullable()}
                        {required()}
                    </ul>
                    {details()}
                    {attribute()}
                </div>
            )
        }
    }

    if(query && !isMatchInBranch){
        return null
    }

    const headerUi = () => {
        return (
            <ul className='full bxs flx-vc flx-sb pd-tb8 pd-rl12 bg-c00101 bdr-1 bdr-c00104 bdr-tn bdr-rn bdr-ln'>
                <li className='flx-vc'>
                    <div className='fl'>
                        {expendIcon()}
                        <span className='mr-r8 hide' title={`Type: ${node.type}`}>{typeIcon()}</span>
                        {arrayBadge()}
                        {typeBadge()}
                        {requiredBadge()}
                        {nullBadge()}
                        {childCount()}
                    </div>
                </li>
                <li>
                    <div className='flx'>
                        {addAction()}
                        {doneOrEditAction()}
                        {deleteAction()}
                    </div>
                </li>
            </ul>
        )
    }

    const header = () => {
        const temp = helpers.json.get(props, 'templates.node.header.viewport', '');
        if(temp && helpers.data.type.is(temp, 'function')){
            return temp(node, {
                template:() => {return headerUi()}
            })
        }else{
            return headerUi();
        }
    }

    return (
        <div className='full bxs'>
            {header()}
            <ul className='full bxs flx-vc flx-sb pd-tb8 pd-rl12 bg-c00101 bdr-1 bdr-c00104 bdr-tn bdr-rn bdr-ln'>
                <li className='flx-vc'>
                    <div className='fl'>
                        {expendIcon()}
                        <span className='mr-r8 hide' title={`Type: ${node.type}`}>{typeIcon()}</span>
                        {arrayBadge()}
                        {typeBadge()}
                        {requiredBadge()}
                        {nullBadge()}
                        {childCount()}
                    </div>
                </li>
                <li>
                    <div className='flx'>
                        {addAction()}
                        {doneOrEditAction()}
                        {deleteAction()}
                    </div>
                </li>
            </ul>
            {editor()}

      {/* --- EXPANDED EDIT DRAWER --- */}
      {isEditing && (
        <div className='hide'>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div className='hide' style={{ flex: 1.5, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              
              {node.isNull ? (
                <div>
                  <code>null</code>
                  <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '8px' }}>
                    (Value is explicitly set to null)
                  </span>
                </div>
              ) : (
                <>
                  {node.type === 'string' && (
                    <input
                      type="text"
                      value={node.value ?? ''}
                      placeholder="e.g. ashok"
                      onChange={(e) => handleValueChange('value', e.target.value)}
                      style={inputStyle}
                    />
                  )}
                  {node.type === 'number' && (
                    <input
                      type="number"
                      value={node.value ?? 0}
                      onChange={(e) => handleValueChange('value', Number(e.target.value))}
                      style={inputStyle}
                    />
                  )}
                  {node.type === 'boolean' && (
                    <select
                      value={String(node.value)}
                      onChange={(e) => handleValueChange('value', e.target.value === 'true')}
                      style={selectStyle}
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  )}
                  {(node.type === 'function' || node.type === 'jsx') && (
                    <textarea
                      rows={3}
                      value={node.value ?? ''}
                      placeholder={`Enter raw ${node.type} code...`}
                      onChange={(e) => handleValueChange('value', e.target.value)}
                      style={codeTextAreaStyle}
                    />
                  )}
                  {isObjectOrArray && (
                    <span style={{ fontSize: '11px', color: '#64748b', lineHeight: '30px' }}>
                      (Value of Object/Array defined via nested children)
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

            {nested()}
        </div>
    );
};

const editDrawerStyle = {
  background: '#f8fafc',
  padding: '12px 16px',
  borderRadius: '0 0 6px 6px',
  border: '1px solid #cbd5e1',
  borderTop: 'none',
  marginTop: '-1px',
};

const inputStyle = {
  padding: '6px 8px',
  borderRadius: '4px',
  border: '1px solid #cbd5e1',
  fontSize: '12px',
  fontFamily: 'monospace',
  boxSizing: 'border-box',
};

const selectStyle = {
  padding: '6px 8px',
  borderRadius: '4px',
  border: '1px solid #cbd5e1',
  fontSize: '12px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
};

const codeTextAreaStyle = {
  width: '100%',
  fontFamily: 'monospace',
  fontSize: '11px',
  padding: '6px 8px',
  borderRadius: '4px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#ffffff',
  resize: 'vertical',
  boxSizing: 'border-box',
};

export default Comp;
