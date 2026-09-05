
import helpers from 'ui-helpers';
import Icon from 'aio-global-raw-ui/atoms/icons';
import {useState, createElement, useEffect, forwardRef} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const dir = helpers.json.get(props, 'direction', 'right');
    const pageview = helpers.json.get(props, 'pageview', false);
    const backdropClose = helpers.json.get(props, 'backdropClose', true);
    const [active, setActive] = useState(helpers.json.get(props, 'active', false));

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    let id = (() => {
        return helpers.json.get(props, 'id', '') || helpers.random.key();
    })();

    const initCallback = (type) => {
        let cb = helpers.json.get(props, `callbacks.${type}`, null);

        if(helpers.data.type.is(cb, 'function')){
            cb(props)
        }
    }

    const toggle = (show) => {
        setActive(show);
        if(!show){
            initCallback('onClose')
            helpers.element.class.remove(document.body, 'oh')
        }else{
            initCallback('onOpen')
            helpers.element.class.add(document.body, 'oh')
        }
    }

    const onCloseClick = (e) => {
        toggle(false);
    }

    const close = () => {
        if(!props.hideClose && !pageview){
            let cls = ['sd-close cp anim']
            let prop = helpers.json.get(props, 'configs.closeIconWrapper', {})
                prop = toggleAttrs(prop);

            return (
                <div {...helpers.element.jsx.attrs(prop, cls.join(' '))} onClick={() => {onCloseClick()}}>
                    <Icon {...helpers.json.get(props, 'closeIcon', {})} />
                </div>
            )
        }else{
            return <></>
        }
    }

    const wrapperProps = () => {
        let rval = ['sd-wrpr transition'];
        let prop = helpers.json.get(props, 'configs.wrapper', {}); 

        if(dir){
            rval.push(`from-${dir}`);
        }

        if(active){
            rval.push('active');
            helpers.element.class.add(document.body, 'oh')
        }

        if(pageview){
            rval.push('as-page');
        }

        prop = helpers.json.set(prop, 'dataAttrs.slide-drawer-wrapper', id);

        return helpers.element.jsx.attrs(prop, rval.join(' '));
    }

    const toggleAttrs = (rval) => {
            rval = helpers.json.set(rval, 'dataAttrs.data-comp', 'slide-drawer');
            rval = helpers.json.set(rval, 'dataAttrs.slide-drawer-id', id);

        return rval;
    }

    const onBackdropClick = (e) => {
        if(backdropClose){
            toggle(false)
        }
    }

    const backdropProps = () => {
        let prop = {};

        if(backdropClose){
            prop = toggleAttrs(prop);
        }

        return helpers.element.jsx.attrs(prop, ['backdrop fade-in'].join(' '));
    }

    const contentWrapper = () => {
        let rval = ['sd-ctnt-wrpr'];
        let prop = helpers.json.get(props, 'configs.contentWrapper', {})

        return helpers.element.jsx.attrs(prop, rval.join(' '));
    }

    const contentBody = () => {
        let rval = ['sd-ctnt-hldr bxs'];
        let prop = helpers.json.get(props, 'configs.contentBody', {})

        return helpers.element.jsx.attrs(prop, rval.join(' '));
    }

    const title = () => {
        let ctnt = helpers.json.get(props, 'templates.title', '');

        if(ctnt && helpers.data.type.is(ctnt, 'string')){
            return createElement(helpers.json.get(props, 'configs.titleWrapper.markup.element', 'div'), {...helpers.element.jsx.attrs(helpers.json.get(props, 'configs.titleWrapper', {}), 'full bxs')}, ctnt);
        }

        if(helpers.data.type.is(ctnt, 'function')){
            return ctnt(props);
        }

        return <></>
    }

    const body = () => {
        let ctnt = helpers.json.get(props, 'templates.body', '');

        if(ctnt && helpers.data.type.is(ctnt, 'string')){
            return createElement(helpers.json.get(props, 'configs.bodyWrapper.markup.element', 'div'), {...helpers.element.jsx.attrs(helpers.json.get(props, 'configs.bodyWrapper', {}), 'full bxs')}, ctnt);
        }

        if(helpers.data.type.is(ctnt, 'function')){
            return ctnt(props);
        }

        return <></>
    }

    const ui = () => {
        return (
            <div {...wrapperProps()} >
                {pageview?<></>:<div {...backdropProps()} onClick={() => {onBackdropClick()}}>&nbsp;</div>}
                <div {...contentWrapper()}>
                    <div className='full pr sh-1'>
                        {close()}
                        <div {...contentBody()}>
                            {title()}
                            {body()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return ui();
};

export default Comp;