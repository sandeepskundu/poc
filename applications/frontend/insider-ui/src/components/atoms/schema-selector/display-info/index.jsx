import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';

const DisplayInfo = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const database = () => {
        let dbId = helpers.json.val(props, 'collection.dbId');
        let name = helpers.json.val(props, `data.dbs.${dbId}.label`, 'NA')
        
        return (
            <li className='txt-14 grid'>
                <span className="fm-sb">Database name:</span> {name}
            </li>
        )
    }

    const collection = () => {
        let name = helpers.json.val(props, 'collection.name', 'NA');
        
        return (
            <li className='txt-14 grid'>
                <span className="fm-sb">Collection name:</span> {name}
            </li>
        )
    }

    const ui = () => {
        return (
            <ul className='full bxs pd-tb4 grid-wrapper grid-layout-4'>
                {database()}
                {collection()}
            </ul>
        )
    }

    return ui();
}

export default DisplayInfo;