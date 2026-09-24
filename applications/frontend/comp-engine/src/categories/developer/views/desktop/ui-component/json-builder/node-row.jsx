import {useState} from 'react';
import helpers from 'ui-helpers';
import Input from 'aio-global-raw-ui/atoms/form/input';
import Select from 'aio-global-raw-ui/atoms/form/select';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const Comp = (props) => {
    const builder = props.builder;
    const types = helpers.json.get(builder, 'utils.dataType', []);
    const keyRegex = helpers.json.get(builder, 'utils.keyRegex');
    const iconByType = helpers.json.get(builder, 'utils.iconByType');
    const {node, depth, parentType, index, parentId = 'root', onUpdate, onDelete, onAddChild, entireTree, isSiblingKeyDuplicateFn, onReorder, onReparent, draggedParentType, setDraggedParentType, searchQuery, renderCustomMetaAttribute} = props;
    




    const isObjectOrArray = node.type === 'object' || node.type === 'array';
    const isParentArray = parentType === 'array';
    const [isEditing, setIsEditing] = useState(!node.key && depth === 0);
    const [dragOverPosition, setDragOverPosition] = useState(null);

    // Strict Array Fallbacks preventing 'map of undefined' crashes
    const safeCustomMeta = node.customMeta || [];
    const safeChildren = node.children || [];
    const query = (searchQuery || '').trim().toLowerCase();
    const isMatchInBranch = query?builder.matchesQuery(node, query):true;
    const hasDuplicateError = !isParentArray && isSiblingKeyDuplicateFn(entireTree, node.id, node.key);
    const hasEmptyError = !isParentArray && (!node.key || !node.key.trim());
    const hasError = hasDuplicateError || hasEmptyError;
    const isDropAllowed = draggedParentType === null || draggedParentType === parentType;

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
    const newMeta = { id: Math.random().toString(36).substring(2, 9), key: '', value: '' };
    onUpdate(node.id, (prev) => ({
      ...prev,
      customMeta: [...safeCustomMeta, newMeta],
    }));
  };

  const handleUpdateMetaItem = (metaId, metaField, metaVal) => {
    onUpdate(node.id, (prev) => ({
      ...prev,
      customMeta: safeCustomMeta.map((item) => {
        if (item.id === metaId) {
          if (metaField === 'key' && !keyRegex.test(metaVal)) return item;
          return { ...item, [metaField]: metaVal };
        }
        return item;
      }),
    }));
  };

  const handleDeleteMetaItem = (metaId) => {
    onUpdate(node.id, (prev) => ({
      ...prev,
      customMeta: safeCustomMeta.filter((item) => item.id !== metaId),
    }));
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    setDraggedParentType(parentType);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOverPosition(null);
    setDraggedParentType(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDropAllowed) {
      e.dataTransfer.dropEffect = 'none';
      return;
    }
    e.dataTransfer.dropEffect = 'move';
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;

    if (isObjectOrArray) {
      if (relativeY < rect.height * 0.25) setDragOverPosition('before');
      else if (relativeY > rect.height * 0.75) setDragOverPosition('after');
      else setDragOverPosition('inside');
    } else {
      if (relativeY < rect.height / 2) setDragOverPosition('before');
      else setDragOverPosition('after');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropAction = dragOverPosition;
    setDragOverPosition(null);
    if (!isDropAllowed) return;

    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId === node.id) return;

    if (dropAction === 'inside' && isObjectOrArray) {
      onReparent(draggedId, node.id);
    } else {
      const offset = dropAction === 'after' ? 1 : 0;
      onReorder(draggedId, parentId, index + offset);
    }
  };

    const dragCls = () => {
        let rval = ['full txt-md bdr-1 bdr-c00104 bdr-tn bdr-rn bdr-ln']

        return rval.join(' ');
    }

    const expendIcon = () => {
        if(isObjectOrArray){
            return (
                <span className={`mr-t6 mr-r8 ico-12 cp ico-g-${node.isExpanded?'minus':'plus'}`} onClick={() => onUpdate(node.id, (prev) => ({ ...prev, isExpanded: !prev.isExpanded }))}></span>
            )
        }
    }

    const typeIcon = () => {
        let icos = helpers.json.get(props, 'getIconByType');

        if(icos && helpers.data.type.is(icos, 'functions')){
            return icos(node.type, node)
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
            return <span className='txt-xxs txt-c00105 pd-tb2 pd-rl6 bdr-2 mr-l2 cp' onClick={() => onAddChild(node.id, builder.createNode('', 'string'))}>+ Add</span>
        }
    }

    const doneOrEditAction = () => {
        if(isEditing){
            return <span className='txt-xxs txt-c00105 pd-tb2 pd-rl6 bdr-2 mr-l2 cp' onClick={() => setIsEditing(!isEditing)}>Done</span>
        }else{
            return <span className='txt-xxs txt-c00105 pd-tb2 pd-rl6 bdr-2 mr-l2 cp' onClick={() => setIsEditing(!isEditing)}>Edit</span>
        }
    }

    const deleteAction = () => {
        return <span className='txt-xxs txt-c00105 pd-tb2 pd-rl6 bdr-2 mr-l2 cp' onClick={() => onDelete(node.id)}>Delete</span>
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
                            parentId={node.id}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onAddChild={onAddChild}
                            entireTree={entireTree}
                            isSiblingKeyDuplicateFn={isSiblingKeyDuplicateFn}
                            onReorder={onReorder}
                            onReparent={onReparent}
                            draggedParentType={draggedParentType}
                            setDraggedParentType={setDraggedParentType}
                            searchQuery={searchQuery}
                            renderCustomMetaAttribute={renderCustomMetaAttribute}
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
        if(safeCustomMeta.length > 0){
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

    const attrsList = () => {
        if(safeCustomMeta.length > 0){
            return safeCustomMeta.map((meta) => {
                const metaKeyEmpty = !meta.key || !meta.key.trim();
                const customTemplate = renderCustomMetaAttribute?renderCustomMetaAttribute({
                      meta,
                      node,
                      onChangeValue: (newVal) => handleUpdateMetaItem(meta.id, 'value', newVal),
                      onChangeKey: (newKey) => handleUpdateMetaItem(meta.id, 'key', newKey),
                      onDelete: () => handleDeleteMetaItem(meta.id),
                    })
                  : null;

                return (
                    <div key={meta.id} className='full bxs grid-wrapper flx-full'>
                        <div className='grid-w4 pd-t14 pd-b4 pd-r18 bxs'>
                            <Input 
                                _label="Attr name"
                                placeholder="name"
                                value={meta.key || ''}
                                invalid={metaKeyEmpty}
                                callback={{
                                    onChange:(val) => {
                                        handleUpdateMetaItem(meta.id, 'key', val)
                                    }
                                }}
                            />
                        </div>
                        <div className='grid-w7 pd-t14 pd-b4 bxs'>
                            {customTemplate?(customTemplate):(
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
                            )}
                        </div>
                        <div className='grid-w1 pd-t14 pd-b4 pd-l10 bxs'>
                            <span className='mr-t14 mr-l16 ico-16 ico-g-delete cp' data-tip-html="Delete" onClick={() => handleDeleteMetaItem(meta.id)}></span>
                        </div>
                  </div>
                );
            })
        }
    }

    const attribute = () => {
        if(node.key && !node.isNull){
            return (
                <div className='full bxs pd-rl16 pd-b20 bdr-1 bdr-c00104 bdr-tn bdr-rn bdr-ln'>
                    {attrsHeader()}
                    {attrsList()}
                </div>
            )
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

    return (
        <div className='full bxs'>
            {dragOverPosition === 'before' && isDropAllowed && <div className='sandeep-kundu' style={dropIndicatorStyle} />}
            <div draggable="false" onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragLeave={() => setDragOverPosition(null)} onDrop={handleDrop} className={dragCls()}>
                <ul className='full bxs flx-vc flx-sb pd-tb4'>
                    <li className='flx-vc'>
                        <div className='fl'>
                            <span className='hide' style={dragHandleStyle}>⣿</span>
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
            </div>
            {dragOverPosition === 'after' && isDropAllowed && <div style={dropIndicatorStyle} />}
            {editor()}

      {/* --- EXPANDED EDIT DRAWER --- */}
      {isEditing && (
        <div style={editDrawerStyle} className='hide'>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div className='hide' style={{ flex: 1.5, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              
              {node.isNull ? (
                <div style={nullValuePlaceholderStyle}>
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

const nullValuePlaceholderStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '6px 10px',
  backgroundColor: '#f1f5f9',
  border: '1px dashed #94a3b8',
  borderRadius: '4px',
  fontSize: '12px',
  color: '#0f172a',
};

const editDrawerStyle = {
  background: '#f8fafc',
  padding: '12px 16px',
  borderRadius: '0 0 6px 6px',
  border: '1px solid #cbd5e1',
  borderTop: 'none',
  marginTop: '-1px',
};

const fieldLabelStyle = {
  fontSize: '11px',
  fontWeight: 600,
  color: '#64748b',
};

const dragHandleStyle = {
  cursor: 'grab',
  paddingRight: '4px',
  userSelect: 'none',
  fontSize: '15px',
  color: '#94a3b8',
};

const dropIndicatorStyle = {
  height: '4px',
  backgroundColor: '#3b82f6',
  borderRadius: '4px',
  margin: '6px 0',
  animation: 'pulseGlow 1.5s infinite ease-in-out',
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
