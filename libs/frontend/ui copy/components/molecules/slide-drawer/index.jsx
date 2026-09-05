import helpers from 'ui-helpers';
import React, {createElement} from 'react';
import Icon from 'aio-global-ui/atoms/icon';

const SlideDrawer = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const ids = {
        "id":props.id?props.id:helpers.random.id(16)
    }

    const closeIconAttrsClassName = () => {
        return helpers.element.jsx.css.get(props.closeIconDs, 'sd-close cp')
    }

    const closeIconAttrs = () => {
        let attrs = helpers.element.jsx.attrs(props.closeIconDs, false, 'attrs')
            attrs.htmlFor = ids.id;
        return {...attrs, ...{className:closeIconAttrsClassName()}};
    }

    const close = () => {
        if(props.hideClose){
            return <></>
        }

        return createElement('label', closeIconAttrs(), <Icon icon={helpers.json.val(props, 'closeIconDs.icon', {})} />)
    }

    const backdrop = () => {
        if(props.outsideClose){
            return <label className='backdrop fade-in' htmlFor={ids.id}>&nbsp;</label>
        }else{
            return <div className='backdrop fade-in'>&nbsp;</div>
        }
    }

    const slideContentClassName = () => {
        return helpers.element.jsx.css.get(props.contentDs, 'sd-ctnt transition');
    }

    const slideContentAttrs = () => {
        let attrs = helpers.element.jsx.attrs(props.contentDs, false, 'attrs');
        return {...attrs, ...{className:slideContentClassName()}};
    }

    const slideWrapperClassName = () => {
        let rv = ['sd-wrpr transition', `from-${props.direction}`];
        return helpers.element.jsx.css.get(props.wrapperDs, rv.join(' '));
    }

    const slideWrapperAttrs = () => {
        let attrs = helpers.element.jsx.attrs(props, false, 'attrs');
        return {...attrs, ...{className:slideWrapperClassName()}};
    }

    const ui = () => {
        return (
            <>
                <input type="checkbox" name={ids.id} id={ids.id} className='sd-inpt' />
                <div {...{...slideWrapperAttrs(), ...{style:{color: "red"}}}}>
                    {backdrop()}
                    <div className='sd-ctnt-wrpr'>
                        <div {...slideContentAttrs()}>
                            <div className='full pr sh-1'>
                                {close()}
                                <div className='sd-ctnt-hldr'>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return ui();
}

SlideDrawer.__PROP__TYPES__

SlideDrawer.__DEFAULT__PROP__

export default SlideDrawer;