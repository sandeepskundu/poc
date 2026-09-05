
import helpers from 'ui-helpers';
import DataValueMap from 'aio-app-ui-tdc-application-molecules/data-value-map';
import ColumnsList from 'aio-app-ui-tdc-application-atoms/model-query/column-names';
import QueryConditions from 'aio-app-ui-tdc-application-molecules/model-config/query/conditions';

const QueryDetailsInputs = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const query = helpers.json.val(props, 'query', {});
    
    const onChange = (arg) => {
        if(props.onChange){
            props.onChange(arg, props.map);
        }
    }

    const onVmapChange = (arg) => {
        let q = helpers.json.copy(query);
            q.valuemap = arg;
            onChange(q)
    }

    const colum = () => {
        return (
            <li className='grid-w2 bxs pd-r20'>
                <ColumnsList
                    map={props.map}
                    query={props.query}
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg) => {onChange(arg)}}
                />
            </li>
        )
    }

    const ui = () => {
        return (
            <ul className='full bxs grid-wrapper pd-b28'>
                {colum()}
                <li className='grid-w10'>
                    <DataValueMap 
                        details={props.details}
                        configs={props.configs}
                        valueMapNode='valuemap'
                        onChange={(arg) => {onVmapChange(arg)}}
                        valMapDetails={helpers.json.val(query, 'valuemap', {})}
                    />
                </li>
                <li className='full grid-w12'>
                    <QueryConditions 
                        map={props.map}
                        query={props.query}
                        onChange={onChange}
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                    />
                </li>
            </ul>
        )
    }

    return ui();
}

export default QueryDetailsInputs;