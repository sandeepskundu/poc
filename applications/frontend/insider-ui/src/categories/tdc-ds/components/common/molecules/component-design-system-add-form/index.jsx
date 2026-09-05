import {useState} from 'react';
import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';
import ComponentPropConfigTypesOptions from 'aio-app-ui-tdc-ds-atoms/component-prop-config-types-options';
import ComponentPropConfigRequiredInput from 'aio-app-ui-tdc-ds-atoms/component-prop-config-required-input';
import ComponentPropConfigNodeNameInput from 'aio-app-ui-tdc-ds-atoms/component-prop-config-node-name-input';
import ComponentPropConfigDescriptionInput from 'aio-app-ui-tdc-ds-atoms/component-prop-config-description-input';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const defaultValue = {
        aioDsChilds:{}
    }

    const mode = helpers.json.val(props, 'mode', '');
    const mapping = helpers.json.val(props, 'mapping', '');

    const getDetails = (parent) => {
        let d = helpers.json.val(props, 'data', {});
        let type = helpers.json.val(props, 'type', 'child');
        let map = helpers.json.val(props, 'valuemap.self', []);
            map = [...map]

        if(mode === 'update'){
            map = helpers.json.val(props, 'valuemap.childs', []);
            map = [...map]
            map.splice(-1);
            map.push('aioDsConfigs');
            
            return {
                aioDsConfigs:helpers.json.val(d, map.join('.'), defaultValue)
            }
        }else{
            if(type === 'add-child' && !parent){
                return defaultValue;
            }else{
                return helpers.json.val(d, map.join('.'), defaultValue);
            }
        }
    };

    const parent = getDetails(true);
    const [cache, setCache] = useState(helpers.random.id(10));
    const [data, setData] = useState({name:'', details:getDetails()});
    const [original, setOriginal] = useState({name:'', details:getDetails()});

    const map = () => {
        let n = helpers.json.val(data, 'name', '');
        let m = helpers.json.val(props, 'valuemap.childs', []);

        if(n){
            m.push(n);
        }else{
            m.splice(-1);
        }

        return m.join('.')
    };

    const saveData = (arg, vmap) => {
        let m = map();
        let n = helpers.json.val(data, 'name', '');
        let dt = helpers.json.val(props, 'data', {});
        let d = helpers.json.set({}, m, helpers.json.val((arg || data), 'details', {}));

        if(vmap){
            helpers.json.remove(dt, vmap);
        }

        if(props.onChange){
            props.onChange(helpers.json.merge(dt, d), n, false, false, vmap);
        }
    }

    const onUpdate = (arg, map) => {
        setData(arg);
        setCache(helpers.random.id(10));

        if(mode === 'update'){
            saveData(arg, map);
        }
    }    

    const save = (action) => {
        if(action === 'reset'){
            setData(original);
            setCache(helpers.random.id(10));
        }else{
            saveData();
        }
    }

    const show = () => {
        if(mode != 'update'){
            const name = helpers.json.val(data, 'name', '');
            const value = helpers.json.val(data, 'details.value', '');
            const label = helpers.json.val(data, 'details.label', '');
            const hasChilds = helpers.json.val(data, 'hasChilds', '');
            const description = helpers.json.val(data, 'description', '');

            return !helpers.json.is.same(original, data);
        }else{
            return false;
        }
    }

    const reset = () => {
        let c = helpers.json.is.same(original, data);

        if(!c){
            return (
                <li className='pd-l30 bxs'>
                    <Button 
                        label='Reset'
                        buttonDs={{
                            size:"md",
                            theme:'002'
                        }}
                        onClick={() => {
                            save('reset')
                        }}
                    />
                </li>
            )
        }
    }

    const actions = () => {
        let valid = show();

        if(valid){
            return (
                <div className='full flx-sb bxs'>
                    <div>&nbsp;</div>
                    <ul className='bxs flx-vc'>
                        <li className='pd-l30 bxs hide'><span className='link-u cp txt-sm fl' onClick={() => {save('cancel')}}>Cancel</span></li>
                        {reset()}
                        <li className='pd-l30 bxs'>
                            <Button 
                                label='Save'
                                buttonDs={{
                                    size:"md",
                                    theme:'000'
                                }}
                                onClick={() => {
                                    save('save')
                                }}
                            />
                        </li>
                    </ul>
                </div>
            )
        }else{
            return <></>
        }
    }

    const others = () => {
        let name = helpers.json.val(data, 'name', '');

        if(mode === 'update'){
            return (
                <>
                    <li className='grid-w2 bxs pd-b24 pd-r10'><ComponentPropConfigTypesOptions {...props} onUpdate={onUpdate} data={data} parent={parent} key={cache} /></li>
                    <li className='grid-w10 bxs pd-b24 pd-l10'><ComponentPropConfigDescriptionInput {...props} onUpdate={onUpdate} data={data} parent={parent} key={cache} /></li>
                    <li  className='full bxs pd-b24'><ComponentPropConfigRequiredInput {...props} onUpdate={onUpdate} data={data} parent={parent} key={cache} layout="grid" /></li>
                </>
            )
        }else{
            if(name){
                return (
                    <>
                        <li className='full bxs pd-b20'><ComponentPropConfigTypesOptions {...props} onUpdate={onUpdate} data={data} parent={parent} key={cache} /></li>
                        <li className='full bxs pd-b20'><ComponentPropConfigDescriptionInput {...props} onUpdate={onUpdate} data={data} parent={parent} key={cache} /></li>
                        <li  className='full bxs pd-b20'><ComponentPropConfigRequiredInput {...props} onUpdate={onUpdate} data={data} parent={parent} key={cache} layout="full" /></li>
                    </>
                )
            }else{
                return <></>
            } 
        }
    }

    const name = () => {
        if(mode != 'update'){
            return <li className='full bxs pd-b20'><ComponentPropConfigNodeNameInput {...props} onUpdate={onUpdate} data={data} parent={parent} key={cache} /></li>
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <>
                 <ul className={`full bxs grid-wrapper ${(mode === 'update')?'pd-t12':''}`}>
                    {name()}
                    {others()}
                </ul>
                {actions()}
            </>
        )
    }

    return ui();
}

export default AddNewNode;