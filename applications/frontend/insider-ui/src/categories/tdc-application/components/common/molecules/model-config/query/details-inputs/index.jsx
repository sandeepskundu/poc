
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import ColumnsList from 'aio-app-ui-tdc-application-atoms/model-query/column-names';

const QueryDetailsInputs = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const onChange = (arg) => {
        if(props.onChange){
            props.onChange(arg, props.map);
        }
    }

    const colum = () => {
        return (
            <li className='grid bxs pd-r20'>
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
            <ul className='full bxs grid-wrapper grid-layout-6 pd-b28'>
                {colum()}
            </ul>
        )
    }

    return ui();
}


export default QueryDetailsInputs;