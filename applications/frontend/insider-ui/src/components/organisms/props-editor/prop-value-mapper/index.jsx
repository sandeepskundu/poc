import helpers from 'ui-helpers';
import React, {useState, useEffect, useRef} from 'react';
import PropValueMap from 'aio-app-ui-atoms/props-editor/prop-value-map';

const PropValueMapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const data = helpers.json.val(props, 'data', {});
    const index = helpers.json.val(props, 'index', 0);
    //const valuemap = helpers.json.val(props, 'valuemap', []);
    const [valuemap, setValueMap] = useState([]);

    useEffect(() => {
        setValueMap(props.valuemap || []);
    }, [props.valuemap]);
    
    const onChange = (arg) => {
        setValueMap(arg);
        if(props.onChange){
            props.onChange(arg);
        }
    }

    const valmapui = () => {
        return (
            <>
                <PropValueMap 
                    data={data}
                    index={index}
                    valuemap={valuemap}
                    onChange={(arg) => {onChange(arg)}}
                    rdata={helpers.json.val(props, 'rdata', {})}
                    configs={helpers.json.val(props, 'configs', {})}
                    details={helpers.json.val(props, 'details', {})} 
                />
            </>
        )
    }

    const vmap = () => {
        return (
            <p className='full txt-xxs pd-b16'>{valuemap.join('.')}</p>
        )
    }

    const ui = () => {
        const dl = helpers.json.length(data || {});
        if(dl > 0){
            if(valuemap && valuemap.length > 0){
                return (
                    <>
                        {vmap()}
                        {valmapui()}
                    </>
                )
            }else{
                return (
                    <div className='full bxs grid-wrapper'>
                        
                        {valmapui()}
                    </div>
                )
            }
        }else{
            return <></>
        }
    }

    return ui();
}

export default PropValueMapper;