import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import ApplicationAuthor from 'aio-app-ui-tdc-application-atoms/application-auther';
import ApplicationDescription from 'aio-app-ui-tdc-application-atoms/application-description'
import ApplicationInfoVersion from 'aio-app-ui-tdc-application-atoms/application-info-version';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const details = props.details;

    const onChange = (val, map) => {
        let d = helpers.json.copy(details);
                helpers.json.remove(d, map);
            d = helpers.json.set(d, map, val, false, true);

            if(props.onChange){
                props.onChange(d);
            }
    }

    const ui = () => {
        return (
            <ul className='full bxs grid-wrapper bxs'>
                <li className='grid-w4 pd-rl12 bxs pd-tb16'>
                    <ApplicationInfoVersion
                        map='appInfo.version'
                        details={props.details}
                        configs={props.configs}
                        onChange={onChange}
                    />
                </li>
                <li className='grid-w4 pd-rl12 bxs pd-tb16'>
                    <ApplicationAuthor
                        map='appInfo.author'
                        details={props.details}
                        configs={props.configs}
                        onChange={onChange}
                    />
                </li>
                <li className='full pd-rl12 bxs pd-tb16'>
                    <ApplicationDescription
                        map='appInfo.description'
                        details={props.details}
                        configs={props.configs}
                        onChange={onChange}
                    />
                </li>
            </ul>
        )
    }

    return ui()
}

export default Comp;