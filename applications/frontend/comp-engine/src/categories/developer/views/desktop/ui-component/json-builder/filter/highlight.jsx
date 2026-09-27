import helpers from 'ui-helpers';
import {memo, useMemo} from 'react';

const rId = helpers.random.key();
const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const {text, offsets, className} = props;

    if (text === null || text === undefined || text === '') {
        return null;
    }

    const str = typeof text === 'string'?text:String(text);
    const cls = '';
    const strlen = str.length;
    const style = {
        fontWeight:'bold'
        //backgroundColor:'#f00'
    };

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

            elms.push(<mark key={`${rId}${start}${end}`} style={style}>{str.slice(start, end)}</mark>);
            index = end;
        }

        if (index < strlen) {
            elms.push(str.slice(index));
        }

        return elms;
    }, [str, offsets, cls, style, strlen]);

    if (className) {
        return <span className={className}>{chunks}</span>;
    }

    return <>{chunks}</>;
};

export default memo(Comp);