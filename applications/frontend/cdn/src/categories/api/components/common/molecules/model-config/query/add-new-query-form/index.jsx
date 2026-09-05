import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useEffect, useState, useRef} from 'react';
import ColumnQuery from 'aio-app-ui-api-molecules/model-config/query/add-new-query-form/column-query';
import LogicalForm from 'aio-app-ui-api-molecules/model-config/query/add-new-query-form/logical-query';

const AddNewQuery = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type', {});

    const [view, setView] = useState(type);

    const lastmap = (typeOnly) => {
        return mhelpers.helpers.query.getMissing(type, helpers.json.val(props, 'queryData', {}), typeOnly);
    }

    useEffect(() => {
        setView(lastmap(true))
    }, [props.type]);

    const map = (() => {
        let rv = helpers.json.val(props, 'map', []);
        let ql = lastmap();
            rv = [...rv];
            rv.push(''+ql);
        return rv;
    })();

    const onChange = (val, map, reset, action) => {}

    const onAction = (qury, action) => {
        if(props.onAction){
            props.onAction(qury, action);
        }
    }

    const ui = () => {
        switch(view) {
            case 'query':
                return (
                    <ColumnQuery
                        map={map}
                        type={view}
                        onChange={onChange}
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onAction={(qury, action) => {onAction(qury, action)}}
                        queryData={helpers.json.val(props.query, `${map.join('.')}`, {})}
                    />
                )
            break;
            case 'or':
            case 'and':
            case 'logical':
                return (
                    <LogicalForm
                        map={map}
                        view={view}
                        onChange={onChange}
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onAction={(qury, action) => {onAction(qury, action)}}
                        query={helpers.json.val(props.query, `${map.join('.')}`, {})}
                    />
                )
            break;
            default:
                return (
                    <LogicalForm
                        map={map}
                        view={view}
                        onChange={onChange}
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onAction={(qury, action) => {onAction(qury, action)}}
                        query={helpers.json.val(props.query, `${map.join('.')}`, {})}
                    />
                )
        }
    }

    return ui();
}

export default AddNewQuery;