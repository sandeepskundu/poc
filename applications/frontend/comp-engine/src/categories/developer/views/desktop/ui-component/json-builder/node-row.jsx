import helpers from 'ui-helpers';
import Input from 'aio-global-raw-ui/atoms/form/input';
import Select from 'aio-global-raw-ui/atoms/form/select';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const booleans = (() => {
    let ops = ['true', 'false'].map((a, i) => {
        return {
            id: a,
            label: a
        }
    })
    return helpers.array.toIndexJson(ops, {});
})();

const Comp = (props) => {
    const node = props.node;
    const builder = props.builder;
    const childs = node.__.children || [];
    const keyRegex = helpers.json.get(builder, 'utils.keyRegex');
    const keyReplaceRegex = helpers.json.get(builder, 'utils.keyReplaceRegex');
    const { depth, onUpdate, onDelete, onAddChild, entireTree, isKeyDuplicate, query } = props;

    const datatTypes = (() => {
        let ops = (helpers.json.get(builder, 'utils.dataType', [])).map((a, i) => {
            return {
                id: a,
                label: a
            }
        })
        return helpers.array.toIndexJson(ops, {});
    })();

    const validateKey = (val) => {
        if (val && keyReplaceRegex) {
            val = val.replace(keyReplaceRegex, '');
        };

        if (keyRegex && keyRegex.test(val)) {
            return true;
        }

        return false;
    }

    const handleKeyChange = (val) => {
        if (validateKey(val)) {
            onUpdate(node.__.id, (prev) => ({
                ...prev,
                __: {
                    ...prev.__, // Safely preserve sibling metadata (id, expanded, etc.)
                    key: val    // Safely update or override only the targeted key
                }
            }));
        }
    };

    const handleTypeChange = (type) => {
        onUpdate(node.__.id, (prev) => {
            const meta = prev?.__ || {};
            return builder.onNodeUpdate({
                ...prev,
                __: {
                    ...meta,
                    type: type,
                    isNull: false,
                    ...((builder.isDataType(type, 'object') || builder.isDataType(type, 'array')) ? { children: meta.children || [] } : {})
                }
            }, prev);
        });
    };

    const handleAddMetaItem = (arg) => {
        onUpdate(node.__.id, (prev) => {
            return {
                ...prev,
                __: {
                    ...prev?.__,
                    metas: [
                        ...prev?.__?.metas || [],
                        {
                            ...{
                                key: '',
                                value: '',
                                id: helpers.random.key()
                            }, ...(arg || {})
                        }
                    ]
                }
            }
        })
    }

    const handleUpdateMetaItem = (id, field, value) => {
        if (id && field) {
            onUpdate(node.__.id, (prev) => {
                return {
                    ...prev,
                    __: {
                        ...prev?.__,
                        metas: (prev?.__?.metas || []).map((item) => {
                            if (item.id !== id) {
                                return item;
                            }

                            if (field === 'key' && !validateKey(value)) {
                                return item;
                            }

                            return {
                                ...item,
                                [field]: value
                            };
                        })
                    }
                }
            })
        }
    }

    /**
     * Atomically updates multiple meta items strictly matching their unique IDs.
     *
     * @param {Record<string, Record<string, any>>} updates - Map of meta ID to its field-value changes.
     * 
     * Example input structure:
     * {
     *   "meta-id-required": { value: true },
     *   "meta-id-from": { value: "statics" },
     *   "meta-id-overwrite": { value: { theme: null } }
     * }
     */
    const handleUpdateMultipleMetasById = (updates) => {
        if (!updates || !node?.__?.id) return;

        onUpdate(node.__.id, (prevNode) => {
            const currentMetas = prevNode?.__?.metas || [];

            // Map over all metas in a single state-modifier loop
            const updatedMetas = currentMetas.map((item) => {
                const itemUpdates = updates[item.id];

                // If this meta item doesn't have any updates registered under its ID, keep it as-is
                if (!itemUpdates) {
                    return item;
                }

                // Merge the updates onto the meta item
                const nextItem = { ...item };
                let isValid = true;

                Object.entries(itemUpdates).forEach(([field, value]) => {
                    // Enforce validations if updating the meta key
                    if (field === 'key' && typeof validateKey === 'function' && !validateKey(value)) {
                        isValid = false;
                    }

                    if (isValid) {
                        nextItem[field] = value;
                    }
                });

                return isValid ? nextItem : item;
            });

            return {
                ...prevNode,
                __: {
                    ...prevNode?.__,
                    metas: updatedMetas
                }
            };
        });
    };


    const handleDeleteMetaItem = (metaId) => {
        if (metaId) {
            onUpdate(node.__.id, (prev) => {
                return {
                    ...prev,
                    __: {
                        ...prev?.__,
                        metas: (prev?.__?.metas || []).filter((item) => item.id !== metaId)
                    }
                }
            })
        }
    };

    const toggle = (key, value) => {
        onUpdate(node.__.id, (prev) => {
            const meta = prev?.__ || {};
            return {
                ...prev,
                __: {
                    ...meta,
                    [key]: (typeof value != 'undefined' ? value : !meta[key]) // Safely toggle the state while preserving all other keys
                }
            };
        }, true);
    }

    const metaKey = (meta, label, placeholder) => {
        return (
            <Input
                label={label || ''}
                value={meta.key || ''}
                placeholder={placeholder || ''}
                invalid={!meta.key || !meta.key.trim()}
                callback={{
                    onChange: (val) => {
                        if (val && keyReplaceRegex) {
                            val = val.replace(keyReplaceRegex, '');
                        };
                        handleUpdateMetaItem(meta.id, 'key', val)
                    }
                }}
            />
        )
    }

    const metaValue = (meta, key, label, placeholder) => {
        return (
            <Input
                label={label || ''}
                placeholder={placeholder || ''}
                value={(typeof meta[key] != 'undefined' ? meta[key] : '')}
                callback={{
                    onChange: (val) => {
                        handleUpdateMetaItem(meta.id, key, val)
                    }
                }}
            />
        )
    }

    const nested = () => {
        if (node.__.expanded && childs.length > 0) {
            return childs.map((child, idx) => (
                <Comp
                    index={idx}
                    node={child}
                    query={query}
                    depth={depth + 1}
                    key={child.__.id}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onAddChild={onAddChild}
                    entireTree={entireTree}
                    builder={props.builder}
                    parentType={node.__.type}
                    templates={props.templates}
                    isKeyDuplicate={isKeyDuplicate}
                />
            ))
        }
    }

    const keyName = (label, placeholder) => {
        return (
            <Input
                value={node.__.key || ''}
                callback={{ onChange: handleKeyChange }}
                label={((typeof label != 'undefined')?label:'Key Name')}
                placeholder={((typeof placeholder != 'undefined')?placeholder:'key_name')}
            />
        )
    }

    const nullable = (label) => {
        if (node.__.key) {
            return (
                <Toggle
                    label={{
                        text:((typeof label != 'undefined')?label:'Set null')
                    }}
                    checkbox={{
                        checked: node.__.isNull
                    }}
                    callback={{
                        input: {
                            onChange: (checked, b, c) => {
                                onUpdate(node.__.id, (prev) => {
                                    return builder.onNodeUpdate({...prev, __:{...prev?.__, isNull:checked}}, prev);
                                });
                            }
                        }
                    }}
                />
            )
        }

        return <></>
    }

    const nodeType = (label) => {
        return (
            <Select
                input={{
                    label:((typeof label != 'undefined')?label:"Type"),
                    placeholder:((typeof placeholder != 'undefined')?placeholder:"")
                }}
                mapping={{
                    selected: {
                        0: 'id'
                    }
                }}
                closeOn={{
                    blur: false
                }}
                callback={{
                    onSelect: (a, b, c, d) => {
                        handleTypeChange(helpers.json.get(a, '0.id'));
                    }
                }}
                data={{
                    list: datatTypes,
                    selected: {
                        0: {
                            id: node.__.type || 'string',
                            label: node.__.type || 'string'
                        }
                    }
                }}
            />
        )
    }

    const valueChange = (field, val) => {
        onUpdate(node.__.id, (prev) => ({ ...prev, [field]: val }))
    }

    const toggleMetas = () => {
        onUpdate(node.__.id, (prev) => ({...prev, __:{...prev?.__, showMetas:!prev?.__.showMetas}}))
    }

    const booleanType = (key, label, placeholder) => {
        if (key) {
            return (
                <Select
                    input={{
                        label: (label || ''),
                        placeholder: (placeholder || '')
                    }}
                    mapping={{
                        selected: {
                            0: 'id'
                        }
                    }}
                    closeOn={{
                        blur: false
                    }}
                    callback={{
                        onSelect: (a, b, c, d) => {
                            valueChange(key, (helpers.json.get(a, '0.id') === 'true'))
                        }
                    }}
                    data={{
                        list: booleans,
                        selected: {
                            0: {
                                id: String(node[key]),
                                label: String(node[key])
                            }
                        }
                    }}
                />
            )
        }
    }

    const ui = () => {
        if (props.templates && props.templates.tree && helpers.data.type.is(props.templates.tree, 'function')) {
            return props.templates.tree({
                props: props,
                __: {
                    templates: {
                        boolean: booleanType,
                        meta: {
                            key: metaKey,
                            value: metaValue
                        },
                        node: {
                            key: keyName,
                            nested: nested,
                            type: nodeType,
                            nullable: nullable
                        }
                    },
                    callbacks: {
                        node: {
                            toggleMetas:toggleMetas,
                            valueChange: valueChange,
                            validateKey: validateKey,
                            keyChange: handleKeyChange,
                            typeChange: handleTypeChange,
                            edit: () => { toggle('editing') },
                            expend: () => { toggle('expanded') },
                            delete: () => { onDelete(node.__.id) },
                            addNew: (type) => { onAddChild(node.__.id, builder.createNode('', (typeof type != 'undefined' ? type : 'string'))) }
                        },
                        metas: {
                            validateKey: validateKey,
                            addNewMeta: handleAddMetaItem,
                            deleteMeta: handleDeleteMetaItem,
                            updateMetaDetailsByKey: handleUpdateMetaItem,
                            updateMultipleMetasById:handleUpdateMultipleMetasById
                        }
                    }
                }
            })
        }
    }

    return ui()
};

export default Comp;