import React, { useMemo } from 'react';
import Dvalue from './dvalue';
import helpers from 'ui-helpers';
import Select from 'aio-global-raw-ui/atoms/form/select';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const cache = useMemo(() => helpers.random.key(), []);
    const list = helpers.json.get(props, 'configs.enums', {});
    
    const mapping = useMemo(() => {
        const path = helpers.json.get(props, 'metas.mapping.value', '');
        if (path && typeof path === 'string') {
            return path.split('.').map(seg => seg.trim()).filter(Boolean);
        }
        return [];
    }, [props]);

    const hasNested = (obj) => {
        if (helpers.data.type.is(obj, 'object')) {
            return Object.values(obj).some((value) => helpers.data.type.is(value, 'object'));
        }
        return false;
    };

    const hasNext = useMemo(() => {
        if (mapping.length === 0) {
            return true;
        }

        const currentPath = mapping.join('.');
        const activeSegment = currentPath ? helpers.json.get(list, currentPath, {}) : list;

        return Boolean(
            activeSegment &&
            helpers.json.length(activeSegment) > 0 &&
            hasNested(activeSegment)
        );
    }, [mapping, list]);

    const getOptions = (map) => {
        const m = map.join('.');
        let d = m ? helpers.json.get(list, m, {}) : list;

        const keys = helpers.json.keys(d);
        const optionsList = keys.map((a) => ({
            id: a,
            label: a
        }));

        return helpers.array.toIndexJson(optionsList, {});
    };

    const renderSelectBox = (map, selected) => {
        return (
            <Select
                input={{
                    label: '',
                    placeholder: ''
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
                    onSelect: (a) => {
                        const nextVal = [...map, helpers.json.get(a, '0.id')].join('.');
                        props.onChange(nextVal);
                    }
                }}
                data={{
                    list: getOptions(map),
                    selected: {
                        0: {
                            id: selected || '',
                            label: selected || ''
                        }
                    }
                }}
            />
        );
    };

    const renderNextSelect = (map, last) => {
        if (last && hasNext) {
            return (
                <li className='bxs pd-r20 pd-t20 grid fl'>
                    {renderSelectBox(map, '')}
                </li>
            );
        }
        return null;
    };

    const ui = () => {
        if (mapping && mapping.length > 0) {
            const old = [];
            return mapping.map((arg, i) => {
                const map = [...old];
                old.push(arg);
                return (
                    <React.Fragment key={`${cache}${i}${arg}`}>
                        <li className='bxs pd-r20 pd-t20 grid'>
                            {renderSelectBox(map, arg)}
                        </li>
                        {renderNextSelect(old, mapping.length === i + 1)}
                    </React.Fragment>
                );
            });
        }

        return (
            <li className='bxs pd-r20 pd-t20 grid'>
                {renderSelectBox([], '')}
            </li>
        );
    };

    return (
        <>
            <ul className='bxs full grid-wrapper grid-layout-5'>
                {ui()}
            </ul>
            {!hasNext && (
                <div className='full bxs mr-t24'>
                    <Dvalue {...props} metas={{ ...props.metas, dvalue: props.dvalue }} />
                </div>
            )}
        </>
    );
};

export default Comp;
