import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';
import React, {useEffect, createElement, useState, useRef, useMemo} from 'react';

const PopupBox = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const ssr = helpers.is.ssr();
    const wref = useRef(null);
    const tref = useRef(null);
    const id = helpers.random.id(10);
    const [active, setActive] = useState(false);
    const onHover = helpers.json.val(props, 'wrapperDs.openOnHover');

    const ids = {
        wrapper:id,
        actionId:`${id}Actn`
    }

    useEffect(() => {
        setActive(props.active);
        document.removeEventListener('mousedown', clickOutside);
        document.addEventListener('mousedown', clickOutside);
        return () => clearTimeout(tref.current);
    }, [props.active]);

    const clickOutside = (event) => {
        if (wref.current && !wref.current.contains(event.target)) {
            setActive(false);
            onClose();
        }
    };

    const onOpen = () => {
        if(props.onOpen) {
            props.onOpen(active, props);
        }
    };
    
    const onClose = () => {
        if (props.onClose) {
            props.onClose(active, props);
        }
    };

    const togglePopup = () => {
        if(active){
            onClose()
            setActive(false);
        }else{
            onOpen();
            if(!props.openStateControlByPartent){
                setActive(true);
            }    
        }
    }

    const action = () => {
        if(props.action){
            let type = helpers.data.type.get(props.action || '');
            switch(type) {
                case 'function':
                  return props.action({...props, ...{ids:ids}});
                break;
                case 'string':
                    return props.action || '';
                break;
                default:
                    return props.action || '';
            }
        }else{
            return (
                <Button 
                    {...helpers.json.val(props, 'buttonDs', {})}
                    buttonDs={helpers.json.val(props, 'buttonDs', {})}
                />
            )
        }
    }

    const content = () => {
        if(props.content){
            let type = helpers.data.type.get(props.content);
            switch(type) {
                case 'function':
                  return props.content({...props, ...{ids:ids}});
                break;
                case 'string':
                    return props.content || ''
                break;
                default:
                    return props.content || ''
            }
        }else{
            if(props.children){
                return props.children;
            }else{
                return <></>
            }
        }
    }

    const bodyClassName = () => {
        let rv = ['bdr-1 anim']
        let aln = helpers.json.val(props, 'bodyDs.alignFrom');

        if(aln){
            rv.push(`aln-${aln}`);
        }

        return helpers.element.jsx.css.get(props.bodyDs, rv.join(' '));
    }

    const body = () => {
        if(onHover || ssr || active){
            return (
                <div className='pop-body pd-b8'>
                    <div className='pd-t10 full'></div>
                    <div className={bodyClassName()}>
                        {content()}
                    </div>
                </div>
            )
        }

        return <></>
    }

    const childs = () => {
        return (
            <>
                {ssr?<input type="checkbox" className='pop-actn-inpt' id={ids.actionId} />:<></>}
                {ssr?<label className='pop-lb' onClick={() => {togglePopup()}} htmlFor={ids.actionId}>{action()}</label>:<div className='pop-lb' onClick={() => {togglePopup()}} htmlFor={ids.actionId}>{action()}</div>}
                {body()}
            </>
        )
    }

    const wrapperElementClassName = () => {
        let rv = ['pop-wrpr'];

        if(active){
            rv.push('active')
        }

        if(onHover || ssr){
            rv.push('hver-open')
        }

        return helpers.element.jsx.css.get(props.wrapperDs, rv.join(' '));
    }

    const wrapperElementAttrs = () => {
        const attrs = helpers.element.jsx.attrs(props, false, 'attrs')
        return {...attrs,
            ...{
                'ref':wref,
                'id':ids.wrapper,
                'data-component':'popup-box', 
                className:wrapperElementClassName()
            }
        };
    }

    return createElement(helpers.json.val(props, 'wrapperDs.element', 'div'), wrapperElementAttrs(), childs())
}

PopupBox.__PROP__TYPES__

PopupBox.__DEFAULT__PROP__

export default PopupBox;