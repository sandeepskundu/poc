import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import ApplicationDbDetails from 'aio-app-ui-tdc-application-molecules/api-application-db-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'appConfig';
    const details = props.details;

    const onChange = (val) => {
        let d = helpers.json.copy(details);
                helpers.json.remove(d, map);
            d = helpers.json.set(d, map, val, false, true);

            if(props.onChange){
                props.onChange(d, true);
            }
    }

    const valuemap = () => {
        let rv = [...props.valuemap]
            rv.push(map)

        return rv;
    }

    const ui = () => {
        return (
            <div className='full pd-rl10 bxs'>
                <ApplicationDbDetails
                    onChange={onChange}
                    valuemap={valuemap()}
                    details={props.details}
                    configs={props.configs}
                    expended={props.expended}
                    onExpend={props.onExpend}
                />
            </div>
        )
    }

    return ui()
}

export default Comp;