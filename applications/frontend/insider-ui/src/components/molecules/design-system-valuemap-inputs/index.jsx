import {useState} from 'react';
import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import Button from 'aio-global-ui/atoms/form/button';
import ValuemapMapInput from 'aio-app-ui-atoms/valuemap-map-input'
import ValuemapFromOptions from 'aio-app-ui-atoms/valuemap-from-options';

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [cache, setCache] = useState(helpers.random.id(10));
    const [details, setDetails] = useState(helpers.json.val(props, 'details', {}));
    const [original, setOriginal] = useState(helpers.json.val(props, 'details', {}));

    const rumtimeMap = 'mapValueAtRuntime';
    const mappedFromObj = 'valueNotMappedWithSelectedFromData';

    const onChange = (arg) => {
        setDetails(arg);
        setCache(helpers.random.id(10));
    }

    const save = (action) => {
        switch (action) {
            case 'save':
                if(props.onSave){
                    props.onSave(details);
                }
            break;
            case 'cancel':
            case 'reset':
                setDetails(original);
                setCache(helpers.random.id(10));
            break;
            default:
        }
    }

    const reset = () => {
        let c = helpers.json.is.same(original, details);

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

    const show = () => {
        return !helpers.json.is.same(original, details);
    }

    const actions = () => {
        let valid = show();

        if(valid){
            return (
                <div className='full flx-sb bxs'>
                    <div>&nbsp;</div>
                    <ul className='bxs flx-vc'>
                        <li className='pd-l30 bxs'><span className='link-u cp txt-sm fl' onClick={() => {save('cancel')}}>Cancel</span></li>
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

    const onToggle = (checked, type) => {
        let d = helpers.json.copy(details);
            d[type] = checked;
            onChange(d);
    }

    const mapInputs = () => {
        const objmap = helpers.json.val(details, mappedFromObj, false);

        if(objmap){
            return (
                <ValuemapMapInput {...props} details={details} key={cache} onChange={onChange}/>
            )
        }else{
            return <ValuemapMapInput {...props} details={details} key={cache} onChange={onChange}/>
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs'>
                <li className='full pd-b24'>
                    <ValuemapFromOptions {...props} details={details} key={cache} onChange={onChange} />
                </li>
                <li className='full pd-b24 bxs'>
                    <Toggle
                        key={cache+'a'}
                        label="Map value at runtime"
                        checked={helpers.json.val(details, rumtimeMap, false)}
                        onChange={(checked) => {onToggle(checked, rumtimeMap)}}
                    />
                </li> 

                <li className='full pd-b24 bxs'>
                    <Toggle
                        key={cache+'a'}
                        label='Is value not mapped with selected from type?'
                        checked={helpers.json.val(details, mappedFromObj, false)}
                        onChange={(checked) => {onToggle(checked, mappedFromObj)}}
                    />
                </li>

                <li className='full pd-b24 bxs'>
                    {mapInputs()}
                </li>

                {actions()}
            </ul>
        )
    }

    return ui();
}

export default AddNewNode;