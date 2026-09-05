import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import ApplicationsResultsList from 'aio-app-ui-tdc-application-molecules/application-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const blank = helpers.json.val(props, 'details.blank');
    const results = helpers.json.val(props, 'details.list');

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <ApplicationsResultsList 
                    {...props}
                    blank={blank}
                    results={results}
                />
            )
        }else{
            return <>dkdkdkdk</>
        }
    }

    return ui()
}

export default Comp;