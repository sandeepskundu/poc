import React from 'react';
import helpers from 'ui-helpers';
import ModelQuery from 'aio-app-ui-api-organisms//model-configs/query';
import Md5Hash from 'aio-app-ui-api-organisms//model-configs/md5-hash';
import ValueMap from 'aio-app-ui-api-organisms//model-configs/valuemap';
import ModelSignature from 'aio-app-ui-api-organisms//model-configs/signature';
import ModelPagination from 'aio-app-ui-api-organisms//model-configs/pagination';
import ResponseExclude from 'aio-app-ui-api-organisms//model-configs/response-exclude';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <>
                <div className='full'>
                    <ModelQuery 
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                        modified={helpers.json.val(props, 'details.model.query', {})}
                    />
                </div>
                <div className='full'>
                    <ModelPagination 
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                        modified={helpers.json.val(props, 'details.model.pagination', {})}
                        //editable={mapping?true:false}
                    />
                </div>
                <div className='full'>
                    <ModelSignature 
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                        modified={helpers.json.val(props, 'details.model.signature', {})}
                    />
                </div>
                <div className='full'>
                    <Md5Hash 
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                        modified={helpers.json.val(props, 'details.model.md5Hash', {})}
                    />
                </div>
                <div className='full'>
                    <ValueMap 
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                        modified={helpers.json.val(props, 'details.model.valuemap', {})}
                    />
                </div>
                <div className='full'>
                    <ResponseExclude 
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                        modified={helpers.json.val(props, 'details.model.response', {})}
                    />
                </div>
                
            </>
        )
    }

    return ui();
}

export default Comp;