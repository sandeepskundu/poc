import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import ApplicationPortType from 'aio-app-ui-tdc-application-atoms/application-port-type';
import ApplicationPortNumber from 'aio-app-ui-tdc-application-atoms/application-port-number';
import ApplicationNumberOfInstances from 'aio-app-ui-tdc-application-atoms/application-no-of-instances'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <ul className='grid-wrapper grid-layout-6 flx-vc'>
                <li className='grid pd-rl12'>
                    <ApplicationPortType 
                        type={props.type}
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                    />
                </li>
                <li className='grid pd-rl12'>
                    <ApplicationPortNumber 
                        type={props.type}
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                    />
                </li>
                <li className='grid pd-rl12'>
                    <ApplicationNumberOfInstances 
                        type={props.type}
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                    />
                </li>
            </ul>
        )
    }

    return ui()
}

export default Comp;