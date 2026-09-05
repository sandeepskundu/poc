import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import ApplicationName from 'aio-app-ui-application-atoms/application-name';
import ApplicationPort from 'aio-app-ui-application-atoms/application-port';
import ApplicationCategory from 'aio-app-ui-application-atoms/application-category';
import ApplicationInspectAt from 'aio-app-ui-application-atoms/application-inspect-at';
import ApplicationInstances from 'aio-app-ui-application-atoms/application-instances';
import ApplicationInfoDetails from 'aio-app-ui-application-organisms/application-info-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = props.details;

    const onChange = (val, map, reset) => {
        let d = helpers.json.copy(details);
                helpers.json.remove(d, map);
            d = helpers.json.set(d, map, val, false, true);

            if(props.onChange){
                props.onChange(d, reset);
            }
    }

    const ui = () => {
        return (
            <>
                <ul className='full bxs grid-wrapper grid-layout-4 bxs'>
                    <li className='grid pd-rl12 bxs pd-tb16'>
                        <ApplicationCategory
                            details={props.details}
                            configs={props.configs}
                            map='category'
                            onChange={(val, m) => {onChange(val, m, true)}}
                        />
                    </li>
                    <li className='grid pd-rl12 bxs pd-tb16'>
                        <ApplicationName
                            map='appName'
                            onChange={onChange}
                            details={props.details}
                            configs={props.configs}
                        />
                    </li>
                    <li className='grid pd-rl12 bxs pd-tb16'>
                        <ApplicationPort 
                            map='appConfig.port'
                            onChange={onChange}
                            details={props.details}
                            configs={props.configs}
                        />
                    </li>
                    <li className='grid pd-rl12 bxs pd-tb16'>
                        <ApplicationInstances
                            onChange={onChange}
                            details={props.details}
                            configs={props.configs}
                            map='appConfig.noOfInstances'
                        />
                    </li>
                    <li className='grid pd-rl12 bxs pd-tb16'>
                        <ApplicationInspectAt 
                            onChange={onChange}
                            details={props.details}
                            configs={props.configs}
                            map='appConfig.inspectAt'
                        />
                    </li>
                </ul>
                <div className='full bxs mr-t16'>
                    <ApplicationInfoDetails 
                        onChange={onChange}
                        details={props.details}
                        configs={props.configs}
                    />
                </div>
            </>
        )
    }

    return ui()
}

export default Comp;