import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import JsxBuilder from 'aio-global-ui/atoms/jsx-builder';

const ChildDetails = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const [preview, setPreview] = useState(false);

    useEffect(() => {
        setPreview(props.preview)
    }, [props.preview])

    const editProps = () => {
        let oe = helpers.data.type.is(props.onEditProps, 'function')
        if(oe){
            props.onEditProps(props);
        }
    }

    const viewChild = () => {
        let oe = helpers.data.type.is(props.onChildView, 'function')
        if(oe){
            props.onChildView(props);
        }
    }

    const viewChildLink = () => {
        const childs = helpers.json.val(props, 'details.childs', {});
        const childsl = helpers.json.length(childs);

        if(childsl > 0){
            return (
                <li className='pd-r16 cp txt-xs link-u'>
                    <span onClick={() => {viewChild()}}>View childs</span>
                </li>
            )
        }

        return <></>
    }

    const viewParent = () => {
        const sel = helpers.json.val(props, 'selected', []);
        const oe = helpers.data.type.is(props.onViewParent, 'function');
        if(oe){
            sel.splice(-1, 1);
            props.onViewParent(sel);
        }
    }

    const backTopParent = () => {
        const sel = helpers.json.val(props, 'selected', []);
        if(sel && sel.length > 0){
            return (
                <li className='pd-r16 cp txt-xs link-u'>
                    <span onClick={() => {viewParent()}}>View parent</span>
                </li>
            )
        }

        return <></>
    }

    const header = (arg) => {
        return (
            <div className='flx-sb full'>
                <div className=''>{helpers.json.val(props, 'details.cmsDetails.name', `Index ${props.order}`)}</div>
                <ul className='flx-vc'>
                    {/*--backTopParent()--*/}
                    {viewChildLink()}
                    <li className='pd-r16 cp txt-xs link-u'>
                        <span onClick={() => {editProps()}}>Edit Props</span>
                    </li>
                    <li className='cp txt-xs link-u'>
                        <span onClick={() => {setPreview(!preview)}}>{preview?'Hide Preview':'Show Preview'}</span>
                    </li>
                </ul>
            </div>
        )
    }

    const buildPreview = () => {
        return (
            <JsxBuilder 
                layout={{
                    0:helpers.json.val(props, 'details', {})
                }}
                data={helpers.json.val(props, 'data', {})}
                componentsList={helpers.json.val(props, 'compList', {})}
                componentProps={helpers.json.val(props, 'compProps', {})}
            />
        )
    }

    const displayPreview = () => {
        if(preview){
            return (
                <div className='full pd-tb20'>
                    {buildPreview()}
                </div>
            )
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <>
                <div className='full pd-tb6'>
                    {header()}
                </div>
                {displayPreview()}
            </>
        )
    }

    return (
        <>
            {ui()}
        </>
    )
}

export default ChildDetails;