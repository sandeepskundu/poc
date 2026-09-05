import helpers from 'ui-helpers';
import ChildDetails from './childe-details';
import ReactDragListView from 'react-drag-listview';
import React, {useEffect, useState, useRef} from 'react';
import JsxBuilder from 'aio-global-ui/atoms/jsx-builder';

const ChildsItem = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const [list, setList] = useState([]);
    const [preview, setPreview] = useState(false);
    const [previewWithActions, setPreviewWithActions] = useState(false);

    const dragProps = {
        nodeSelector:'li',
        onDragEnd(fromIndex, toIndex) {
            let li = [...list];
            let item = li.splice(fromIndex, 1)[0];
                li.splice(toIndex, 0, item);
                setList(li);
                reArrange(li);
        }
    };

    const reArrange = (li) => {
        let rval = {};

        if(li && li.length > 0){
            for(const a in li){
                rval[a] = li[a];
            }
        }

        onEditProps(rval, 'childs');
    }

    useEffect(() => {
        setList(props.list);
    }, [props.list]);

    const onChildView = (arg, index) => {
        let oe = helpers.data.type.is(props.onChildView, 'function')
        if(oe){
            props.onChildView(arg, index);
        }
    }

    const onEditProps = (arg, type) => {
        let oe = helpers.data.type.is(props.onEditProps, 'function')
        if(oe){
            props.onEditProps(arg, props.selected, type);
        }
    }

    const onViewParent = (arg) => {
        let oe = helpers.data.type.is(props.onViewParent, 'function')
        if(oe){
            props.onViewParent(arg);
        }
    }

    const odevn = (index) => {
        if(index % 2 != 0){
            return 'bg-c00102';
        };

        return ''
    }

    const childItems = () => {
        if(list && list.length > 0){
            return list.map((arg, i) => {
                if(preview){
                    return (
                        <li key={id+i} className={`full bxs`}>
                            <JsxBuilder 
                                layout={{
                                    0:arg
                                }}
                                data={helpers.json.val(props, 'data', {})}
                                componentsList={helpers.json.val(props, 'compList', {})}
                                componentProps={helpers.json.val(props, 'compProps', {})}
                            />
                        </li>
                    )
                }else {
                    return (
                        <li key={id+i} className={`full pd-16 bxs bdr-c00104 bdr-1 bdr-wrln bdr-wbn ${odevn(i)}`}>
                            <ChildDetails
                                order={i}
                                details={arg}
                                data={props.data}
                                selected={props.selected}
                                compList={props.compList}
                                compProps={props.compProps}
                                preview={previewWithActions}
                                collection={props.collection}
                                onChildView={(ap) => {onChildView(arg, i)}}
                                //onEditProps={(ap) => {onEditProps(arg, i)}}
                                onViewParent={(arg) => {onViewParent(arg)}}
                            />
                        </li>
                    )
                }
            })
        };

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
                <li className='pd-l16 cp txt-xs link-u ns'>
                    <span onClick={() => {viewParent()}}>View parent</span>
                </li>
            )
        }

        return <></>
    }

    const previewActions = () => {

        if(!previewWithActions){
            return (
                <li className='pd-l16 cp txt-xs link-u ns'>
                    <span onClick={() => {setPreview(!preview)}}>{preview?'Hide Preview':'Show Preview'}</span>
                </li>
            )
        }

        return <></>
    }

    const previewWithActionsLink = () => {
        if(!preview){
            return (
                <li className='pd-l16 cp txt-xs link-u ns'>
                    <span onClick={() => {setPreviewWithActions(!previewWithActions)}}>{previewWithActions?'Hide Preview with actions':'Show Preview with actions'}</span>
                </li>
            )
        }

        return <></>
    }

    const actions = () => {
        return (
            <>
                {backTopParent()}
                {previewWithActionsLink()}
                {previewActions()} 
            </>
        )
    }

    const header = () => {
        return (
            <div className='full pd-16 bxs flx-vc flx-sb'>
                <div className='layout bxs dis-xs fm-sb ns'>Layout Details</div>
                <ul className='flx-sb'>
                    {actions()}
                </ul>
            </div>
        )
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                {header()}
                <div className='full bxs'>
                    <ReactDragListView {...dragProps}>
                        <ul className='full pd-b20 ns'>
                            {childItems()}
                        </ul>
                    </ReactDragListView>
                </div>
            </div>
        )  
    }

    return (
        <>
            {ui()}
        </>
    )
}

export default ChildsItem;