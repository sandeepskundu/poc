import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import ApplicationDatabaseList from 'aio-app-ui-tdc-application-atoms/application-db-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const onChange = (conf) => {
        if(props.onChange){
            props.onChange(conf);
        }
    }

    const ui = () => {
        return (
            <div className='full grid-wrapper grid-layout-4 bxs pd-tb20'>
                <li className='grid bxs pd-r20'>
                    <ApplicationDatabaseList
                        details={props.details}
                        configs={props.configs}
                        onChange={(conf) => {onChange(conf)}}
                    />
                </li>
                <li className='grid bxs pd-r20'>
                    
                </li>
            </div>
        )
    }

    return ui()
}

export default Comp;