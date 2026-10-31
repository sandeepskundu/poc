import helpers from 'ui-helpers';
import Input from 'aio-global-raw-ui/atoms/form/input';
import Select from 'aio-global-raw-ui/atoms/form/select';
import Button from 'aio-global-raw-ui/atoms/form/button';
import React, { useEffect, useState, useCallback, useMemo } from 'react';

const ATOMIC_LAYERS = {
    atoms: true,
    pages: true,
    templates: true,
    molecules: true,
    organisms: true,
};

const TREE_SCHEMA = {
    raw:ATOMIC_LAYERS,
    components:ATOMIC_LAYERS,
    categories: {
        abc: ATOMIC_LAYERS
    }
};

const parseTree = (schema, source) => {
    const result = {};

    if (!helpers.data.type.is(schema, 'object')) {
        return result;
    }

    for (const key in schema) {
        const val = schema[key];
        const normalizedKey = `${key}`.toLowerCase();
        const children = helpers.json.get(source, normalizedKey, {});

        if (!val) continue;

        if (helpers.data.type.is(val, 'object')) {
            result[normalizedKey] = parseTree(val, children);
        } else if (val === true) {
            result[normalizedKey] = children;
        }
    }

    return result;
};

const getDefaultIndex = (node) => (node && node.index === true ? 'index' : '');

const parseMapping = (compmap) => {
    const normalized = `${compmap || ''}`.trim().toLowerCase();
    return normalized ? normalized.split('/').filter(Boolean) : [];
};

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const action = helpers.json.get(props, 'configs.action', '');
    const comptree = helpers.json.get(props, 'details.compTree', {});
    const rawCompMap = helpers.json.get(props, 'details.componentMap', '');

    const [name, setName] = useState({
        value:'',
        error:true
    });

    const [details, setDetails] = useState({
        component:{},
        storybook:{}
    });

    const [cache, setCache] = useState(() => helpers.random.key());
    const [mapping, setMapping] = useState(() => parseMapping(rawCompMap));

    // Sync state if `details.componentMap` prop changes externally
    useEffect(() => {
        setMapping(parseMapping(rawCompMap));
        setCache(helpers.random.key());
    }, [rawCompMap]);

    // Memoize parsed component tree so it only recomputes when `comptree` changes
    const list = useMemo(() => parseTree(TREE_SCHEMA, comptree), [comptree]);

    const getNode = useCallback((pathArray) => {
        const path = pathArray.join('.');
        return path ? helpers.json.get(list, path, {}) : list;
    }, [list]);

    const getOptions = useCallback((pathArray) => {
        const node = getNode(pathArray);
        const items = helpers.json.keys(node).map((key) => ({
            id: key,
            label: key,
        }));
        return helpers.array.toIndexJson(items, {});
    }, [getNode]);

    const onChange = () => {
        if (typeof props.onChange === 'function' && name.value && !name.error) {
            props.onChange({
                valid:!name.error,
                path:[...mapping, name.value]
            });
        }
    }

    const bindEvent = (name, cb) => {
        helpers.react.hooks.event.off(name, cb);
        helpers.react.hooks.event.on(name, cb);
    }

    bindEvent('show-save-component', (arg) => {
        setDetails(arg);

        console.log(arg);
    });

    const handleSelect = useCallback((parentPath, selectedData) => {
        const d = helpers.json.copy(name);
        const selectedId = helpers.json.get(selectedData, '0.id', '');

        if(selectedId != 'index'){
            const nextMapping = selectedId ? [...parentPath, selectedId] : [...parentPath];

            setMapping(nextMapping);
            setCache(helpers.random.key());

            
            
            d.value = '';
            d.error = true;

            setName(d);
            onChange()
        }
    }, [props]);

    const renderSelectBox = (pathArray, selected = '') => (
        <Select
            input={{
                label: '',
                placeholder: '',
            }}
            mapping={{
                selected: {
                    0: 'id',
                },
            }}
            closeOn={{
                blur: false,
            }}
            callback={{
                onSelect: (a) => handleSelect(pathArray, a),
            }}
            data={{
                list: getOptions(pathArray),
                selected: {
                    0: {
                        id: selected,
                        label: selected,
                    },
                },
            }}
        />
    );

    const onNameChange = (val) => {
        let d = helpers.json.copy(name);
        let parents = getNode(mapping);
        let ivmap = {
            root:true,
            base:true,
            index:true
        }

        d.error = val?false:true;
        val = `${val}`.toLowerCase();

        if(ivmap[val]){
            d.error = 'This is a reserved keyword and cannot be used as a component name.'
        }else{
            if(parents[val]){
                d.error = 'A component with this name already exists. Please choose a different name.'
            }else{
                d.value = val;
            }
        }

        setName(d);
        onChange()
    }

    const showShowCreate = (pathArray, dIndex) => {
        return ((pathArray && pathArray.length > 0) && ((dIndex === 'index' || pathArray.at(-1) === 'index') || ATOMIC_LAYERS[pathArray.at(-1)]))
    }

    const createInput = (pathArray, dIndex) => {
        if(action === 'create' && showShowCreate(pathArray, dIndex)){
            return (
                <li className="bxs pd-r20 pd-t20 grid fl">
                    <Input
                        label='Name'
                        value={name.value}
                        error={name.error}
                        invalid={name.error?true:false}
                        placeholder='Enter name'
                        callback={{
                            onChange:onNameChange
                        }}
                    />
                </li>
            )
        }
    }

    const renderTrailingSelect = (pathArray) => {
        const node = getNode(pathArray);
        const dIndex = getDefaultIndex(node);

        if (node && helpers.json.length(node) > 0) {
            return (
                <>
                    <li className="bxs pd-r20 pd-t20 grid fl">
                        {renderSelectBox(pathArray, dIndex)}
                    </li>
                    {createInput(pathArray, dIndex)}
                </>
            );
        }
        
        return createInput(pathArray, dIndex);
    };

    const submit = () => {
        let valid = !helpers.json.get(name, 'error', false);
        let sp = helpers.json.get(details, 'storybook.props', {});

        if(valid && helpers.json.length(sp) > 0){
            return (
                <li className="bxs pd-r20 pd-t20 grid fl">
                    <Button 
                        button={{
                            "content": "Save"
                        }}
                    />
                </li>
            );
        }
    }

    const renderCascadingSelects = () => {
        if (mapping.length === 0) {
            return (
                <li className="bxs pd-r20 pd-t20 grid fl">
                    {renderSelectBox([], '')}
                </li>
            );
        }

        const traversedPath = [];

        return mapping.map((segment, index) => {
            const currentPath = [...traversedPath];
            const isLast = index === mapping.length - 1;
                traversedPath.push(segment);

            return (
                <React.Fragment key={`${cache}-${index}-${segment}`}>
                    <li className="bxs pd-r20 pd-t20 grid fl">
                        {renderSelectBox(currentPath, segment)}
                    </li>
                    {isLast && renderTrailingSelect(traversedPath)}
                </React.Fragment>
            );
        });
    };

    return (
        <ul className="bxs full grid-wrapper grid-layout-7 pd-l20 pd-b10">
            {renderCascadingSelects()}
            {submit()}
        </ul>
    );
};

export default Comp;