import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import ApplicationAuthor from 'aio-app-ui-tdc-application-atoms/application-auther';
import ApplicationDescription from 'aio-app-ui-tdc-application-atoms/application-description'
import ApplicationPortDetailsByType from 'aio-app-ui-tdc-application-molecules/application-port-details-by-type';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);

    const modes = (() => {
        const m = helpers.json.val(props,  'configs.appInstanceModes', {});
        return helpers.json.toList(m)
    })();

    const ui = () => {
        if(modes && modes.length > 0){
            return modes.map((arg, i) => {
                return (
                    <div className='full bxs pd-t6 pd-b16' key={id+i}>
                        <ApplicationPortDetailsByType
                            type={arg}
                            details={props.details}
                            configs={props.configs}
                            onChange={props.onChange}
                        />
                    </div>
                )
            })
        }
        return <></>
    }

    return ui()
}

export default Comp;