import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SchemaDisplayInfomation from 'aio-app-ui-atoms/schema-selector/display-info';
import SchemaEditableInfomation from 'aio-app-ui-atoms/schema-selector/editable-info';

const CollectionDetails = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [expend, setExpend] = useState(false);
    const modified = helpers.json.val(props, 'modified', {});
    const collection = helpers.json.val(props, 'collection', {});

    const details = {
        dbs:{
            '6738829afbe779c7746626aa':{
                id:"6738829afbe779c7746626aa",
                label:"CMS Database"
            }
        }
    }

    const onChange = (arg, action) => {
        if(props.onChange){
            props.onChange(arg, action);
        }

        if(action === 'save'){
            setExpend(false);
        }
    }

    const detailsUi = (show) => {
        if(expend || show){
            if(props.canEdit){
                return (
                    <SchemaEditableInfomation 
                        data={details}
                        key={props.key}
                        canEdit={props.canEdit}
                        configs={props.configs}
                        isRoot={!props.onChange}
                        modified={props.modified}
                        collection={{...collection}}
                        onChange={(arg, action) => {onChange(arg, action)}}
                    />
                )
            }else{
                return (
                    <SchemaDisplayInfomation 
                        data={details}
                        key={props.key}
                        canEdit={props.canEdit}
                        configs={props.configs}
                        isRoot={!props.onChange}
                        collection={{...collection}}
                        onChange={(arg, action) => {onChange(arg, action)}}
                    />
                )
            }
        }
    }

    const hOptions = () => {
        return (
            <ul className='flx'>
                <li className='pd-l10 cp txt-xs link-u ns' onClick={() => {setExpend(!expend)}}>{expend?'Collapse':'Expend'}</li>
            </ul>
        )
    }

    const header = () => {
        return (
            <ul className='full flx-sb flx-vc'>
                <li className='txt-xl fm-md'>Collection details</li>
                <li>{hOptions()}</li>
            </ul>
        )
    }

    const information = () => {
        return (
            <div className='full bxs pd-rl16 pd-tb10 bg-c00102'>
                {header()}
                {detailsUi()}
            </div>
        )
    }

    const start = () => {
        return (
            <div className='full bxs pd-20'>
                <p className='txt-xl fm-md'>Collection Details</p>
                <p className='full txt-xs mr-t4'>Pls select the details below</p>
                {detailsUi(true)}
            </div>
        )
    }

    const ui = () => {
        if(props.isRoot){
            const mdLen = helpers.json.length(modified);
            const cld = helpers.json.val(collection, 'name');
            const dbId = helpers.json.val(collection, 'dbId');
            const cl = helpers.json.length(collection || {});

            if((cl && cl > 0) && (cld && dbId)){
                return information();
            }else{
                return start();
            }
        }
        return <></>
    }

    return ui();
}

export default CollectionDetails;