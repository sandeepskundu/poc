
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import QueryModes from 'aio-app-ui-api-atoms/model-query/query-modes';
import ConditionalOptions from 'aio-app-ui-api-atoms/model-query/conditional-options';
import QueryDetailsInputs from 'aio-app-ui-api-molecules/model-config/query/details-inputs';

const ItemDetailsHolder = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [map, setMap] = useState(false);
    const [expend, setExpend] = useState(false);
    const ml = helpers.json.val(props, 'mapping', []);

    const maping = () => {
        if(map && ml && ml.length > 0){
            return <p className='txt-xxs'>{ml.join('.')}</p>
        }

        return <></>
    }

    const add = () => {
        return <li className='pd-r10 cp txt-xs link-u ns'>Add key</li>
    }

    const header = () => {
        return (
            <div className='full bxs pd-t10'>
                {maping()}
                <div className='full bxs flx-sb pd-b10'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{helpers.json.val(props, 'name')}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        {(ml && ml.length > 0)?<li className='pd-r10 cp txt-xs link-u ns' onClick={() => {setMap(!map)}}>{map?'Hide map':'View Map'}</li>:<></>}
                        <li className='pd-r10 cp txt-xs link-u ns' onClick={() => {setExpend(!expend)}}>{expend?'Collapse':'Expend'}</li>
                        {add()}
                        <li className='pd-r10 cp txt-xs link-u ns'>Configs</li>
                        <li className='pd-r10 cp txt-xs link-u ns'>Values</li>
                    </ul>
                </div>
            </div>
        )
    }

    const childs = () => {
        if(expend){
            return (
                <>{props.children}</>
            )
        }
    }
    
    const ui = () => {
        

        return (
            <div className="full bxs">
                {header()}
                {childs()}
            </div>
        )
    }

    return ui();
}


export default ItemDetailsHolder;