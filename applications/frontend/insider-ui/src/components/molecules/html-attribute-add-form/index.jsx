import {useState, useEffect} from 'react';
import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';
import HtmlAttributeNameInput from 'aio-app-ui-atoms/html-attribute-name-input';
import HtmlAttributeTypesOptions from 'aio-app-ui-atoms/html-attribute-types-options';
import HtmlAttributeDescriptionInput from 'aio-app-ui-atoms/html-attribute-description-input';

const AddNewNode = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(10)
    let mode = helpers.json.val(props, 'mode', '');
    let details = helpers.json.val(props, 'data', {});
    let original = helpers.json.val(props, 'data', {});

    const [data, setData] = useState({
        valuemap:{
            map:'',
            from:'',
            fallback:{},
            default:{}        
        }
    });

    const [cache, setCache] = useState(id);

    useEffect(() => {
        if(mode === 'update'){
            saveData(arg, map);
        }
    }, [data]);

    const type = (() => {

    })();

    const refesh = () => {
        setCache(helpers.random.id(10));
    }

    const saveData = (arg) => {
        if(props.onChange){
            props.onChange(data)
        }
    }

    const onUpdate = (arg) => {
        setData(arg);
        refesh();

        if(mode === 'update'){
            saveData(arg);
        }
    }    

    const save = (action) => {
        if(action === 'reset'){
            setData(original);
            refesh();
        }else{
            saveData();
        }
    }

    const show = () => {
        let name = helpers.json.val(data, 'name');
        let type = helpers.json.val(data, 'type');
        let desc = helpers.json.val(data, 'description')

        if(mode != 'update' && (name && type && desc)){
            return true;
            //return !helpers.json.is.same(original, data);
        }

        return false;
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
                    <li className='grid-w2 bxs pd-b24 pd-r10'>
                        <HtmlAttributeTypesOptions 
                            {...props}
                            data={data}
                            key={cache}
                            parent={details}
                            onUpdate={onUpdate}
                        />
                    </li>
                    <li className='grid-w10 bxs pd-b24 pd-l10'>
                        <HtmlAttributeDescriptionInput
                            {...props}
                            data={data}
                            key={cache}
                            parent={details}
                            onUpdate={onUpdate}
                        />
                    </li>
                </>
            )
        }else{
            if(name){
                return (
                    <>
                        <li className='full bxs pd-b20'>
                            <HtmlAttributeTypesOptions
                                {...props}
                                data={data}
                                key={cache}
                                parent={details}
                                onUpdate={onUpdate}
                            />
                        </li>
                        <li className='full bxs pd-b20'>
                            <HtmlAttributeDescriptionInput 
                                {...props}
                                data={data}
                                key={cache}
                                parent={details}
                                onUpdate={onUpdate}
                            />
                        </li>
                    </>
                )
            }else{
                return <></>
            } 
        }
    }

    const name = () => {
        if(mode != 'update'){
            return (
                <li className='full bxs pd-b20'>
                    <HtmlAttributeNameInput 
                        {...props}
                        data={data}
                        key={cache}
                        parent={details}
                        onUpdate={onUpdate}
                    />
                </li>
            )
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