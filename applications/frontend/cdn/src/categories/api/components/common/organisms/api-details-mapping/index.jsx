
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import ApiJobs from 'aio-app-ui-api-atoms/api-details-mapping/jobs';
import ApiMethods from 'aio-app-ui-api-atoms/api-details-mapping/methods';
import ApiActions from 'aio-app-ui-api-atoms/api-details-mapping/actions';
import ApiVersions from 'aio-app-ui-api-atoms/api-details-mapping/versions';
import ApiControllers from 'aio-app-ui-api-atoms/api-details-mapping/controllers';
import MethodActions from 'aio-app-ui-api-atoms/api-details-mapping/method-actions';
import ApiControllersRoute from 'aio-app-ui-api-atoms/api-details-mapping/route-map';
import AppList from 'aio-app-ui-api-atoms/api-details-mapping/application-name-list';

const ValidationDetailsMapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const header = () => {
        return (
            <>
                <p className='txt-xl fm-md'>Validation Mapping</p>
                <p class="full txt-xs mr-t4">Pls select the details below</p>
            </>
        )
    }

    const onChange = (arg) => {
        if(props.onChange){
            props.onChange(arg, 'mapping');
        }
    }

    const appList = () => {
        return (
            <li className='grid pd-r10 bxs'>
                <AppList
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg) => {onChange(arg)}}
                />
            </li>
        )
    }

    const actions = () => {
        const aId = helpers.json.val(props, 'modified.app.id');
        if(aId){
            return (
                <li className='grid pd-r10 pd-l10 bxs'>
                    <MethodActions 
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </li>
            )
        }else{
            return <></>
        }
    }

    const routes = () => {
        const type = helpers.json.val(props, 'modified.type');
        if(type === 'create'){
            return (
                <li className='grid pd-r10 pd-l10 bxs'>
                    <ApiControllersRoute 
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </li>
            )
        }
    }

    const controller = () => {
        const type = helpers.json.val(props, 'modified.type');
        const modify = helpers.json.val(props, 'modified.modify');
        if(type && (type != 'create' || modify)){
            return (
                <li className='grid pd-r10 pd-l10 bxs'>
                    <ApiControllers 
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </li>
            )
        }
    }

    const controllerActions = () => {
        const type = helpers.json.val(props, 'modified.type');
        const modify = helpers.json.val(props, 'modified.modify');
        const contrl = helpers.json.val(props, 'modified.controller.label');
        if(type && contrl && (type != 'create' || modify)){
            return (
                <li className='grid pd-r10 mr-t24 bxs'>
                    <ApiActions 
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </li>
            )
        }
    }

    const versions = () => {
        const type = helpers.json.val(props, 'modified.type');
        const modify = helpers.json.val(props, 'modified.modify');
        const actnl = helpers.json.val(props, 'modified.action.label');
        if(type && actnl && (type != 'create' || modify)){
            return (
                <li className='grid pd-r10 pd-l10 bxs mr-t24'>
                    <ApiVersions 
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </li>
            )
        }
    }

    const jobs = () => {
        const type = helpers.json.val(props, 'modified.type');
        const modify = helpers.json.val(props, 'modified.modify');
        const verl = helpers.json.val(props, 'modified.version.label');
        if(type && verl && (type != 'create' || modify)){
            return (
                <li className='grid pd-r10 pd-l10 bxs mr-t24'>
                    <ApiJobs
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </li>
            )
        }
    }

    const methods = () => {
        const type = helpers.json.val(props, 'modified.type');
        const modify = helpers.json.val(props, 'modified.modify');
        const jobl = helpers.json.val(props, 'modified.job.label');
        if(type && jobl && (type != 'create' || modify)){
            return (
                <li className='grid pd-r10 pd-l10 bxs mr-t24'>
                    <ApiMethods 
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {onChange(arg)}}
                    />
                </li>
            )
        }
    }

    const options = () => {
        return (
            <>
                <ul className='full bxs grid-wrapper grid-layout-4 pd-t20'>
                    {appList()}
                    {actions()}
                    {routes()}
                    {controller()}
                </ul>
                <ul className='full bxs grid-wrapper grid-layout-4'>
                    {controllerActions()}
                    {versions()}
                    {jobs()}
                    {methods()}
                </ul>
            </>
        )
    }

    const ui = () => {
        return (
            <div className='full bxs pd-rl20 pd-t20'>
                {header()}
                {options()}
            </div>
        )
    }

    return ui();
}


export default ValidationDetailsMapper;