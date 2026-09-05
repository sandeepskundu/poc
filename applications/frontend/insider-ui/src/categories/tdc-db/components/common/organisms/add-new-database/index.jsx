import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import AddNewDbDrawer from 'aio-app-ui-tdc-db-molecules/add-new-database-drawer';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);

    const drawer = () => {
        return (
            <AddNewDbDrawer {...props} dbDetails={{}} id={id} />
        )
    }

    const label = () => {
        return (
            <li className='pd-l12 cp txt-xs link-u ns'>
                <label className="link-u ns cp txt-xs link-u ns" htmlFor={id}>+ Add new database</label>
            </li>
        )
    }

    const ui = () => {
        return (
            <>
                {label()}
                {drawer()}
            </>
        )
    }

    return ui();
}

export default AddNewNode;