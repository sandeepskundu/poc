import helpers from 'ui-helpers';
import {memo, useMemo, createElement} from 'react';

const rId = helpers.random.key();

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const {text, offsets} = props;
    const wrapper = helpers.json.get(props, 'wrapper.enabled', false)

    if (text === null || text === undefined || text === '') {
        return null;
    }

    const str = typeof text === 'string'?text:String(text);
    const hcls = helpers.element.jsx.attrs(helpers.json.get(props, 'highlight', {}), '')
    const cls = '';
    const strlen = str.length;

    const chunks = useMemo(() => {
        if (!offsets || !Array.isArray(offsets) || offsets.length === 0) {
            return str;
        }

        let index = 0;
        let elms = [];

        for (let i = 0; i < offsets.length; i++) {
            const interval = offsets[i];
            const start = Math.max(0, interval.start);
            const end = Math.min(strlen, interval.end);

            if (start >= end || start < index) {
                continue;
            }

            if (start > index) {
                elms.push(str.slice(index, start));
            }

            elms.push(<mark key={`${rId}${start}${end}`} {...hcls}>{str.slice(start, end)}</mark>);
            index = end;
        }

        if (index < strlen) {
            elms.push(str.slice(index));
        }

        return elms;
    }, [str, offsets, cls, hcls, strlen]);

    if (wrapper) {
        return helpers.element.jsx.ds(helpers.json.get(props, 'wrapper.ds', {}), createElement, chunks, '', props);
    }

    return <>{chunks}</>;
};

export default memo(Comp);