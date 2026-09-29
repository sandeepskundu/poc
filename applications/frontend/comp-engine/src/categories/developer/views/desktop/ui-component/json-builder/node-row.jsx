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
    const builder = props.builder;
    const keyRegex = helpers.json.get(builder, 'utils.keyRegex');
    const keyReplaceRegex = helpers.json.get(builder, 'utils.keyReplaceRegex');

    const node = props.node;
    const childs = node.__.children || [];
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
            debugger;
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
                label={(label || "Key Name")}
                placeholder={(placeholder || "key_name")}
                callback={{ onChange: handleKeyChange }}
            />
        )
    }

    const nullable = () => {
        if (node.__.key) {
            return (
                <Toggle
                    label={{
                        text: "Set null"
                    }}
                    checkbox={{
                        checked: node.__.isNull
                    }}
                    callback={{
                        input: {
                            onChange: (checked, b, c) => {
                                onUpdate(node.__.id, (prev) => ({ ...prev, __: { ...prev?.__, isNull: checked } }));
                            }
                        }
                    }}
                />
            )
        }

        return <></>
    }

    const nodeType = () => {
        return (
            <Select
                input={{
                    label: "Data type"
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
                            updateMetaDetailsByKey: handleUpdateMetaItem
                        }
                    }
                }
            })
        }
    }

    return ui()
};

export default Comp;