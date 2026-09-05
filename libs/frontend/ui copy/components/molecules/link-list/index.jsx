import helpers from 'ui-helpers';
import Divider from 'aio-global-ui/atoms/divider';
import TextLabel from 'aio-global-ui/atoms/text-label';
import React, {useEffect, createElement, useState, useRef, useMemo} from 'react';

const LinkList = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const id = helpers.random.id(10);
    const options = helpers.json.val(props, 'listOptions', []);
    const dlinkDs = helpers.json.val(props, 'linkDs', {});
    const ldivider = helpers.json.val(props, 'linkDs.divider', {});
    const wdivider = helpers.json.val(props, 'wrapperDs.divider', {});

    const divider = (arg, pos) => {
        let enabled = helpers.json.val(arg, 'enabled');
        let position = helpers.json.val(arg, 'position');

        if(enabled && position && position === pos){
            return (
                <Divider 
                    ds={helpers.json.val(arg, 'ds', {})}
                    size={helpers.json.val(arg, 'size', 1)}
                />
            )
        }

        return <></>
    }

    const linkDivProps = (arg) => {
        let rvl = helpers.json.merge(wdivider, ldivider);
        let dds = helpers.json.val(arg, 'divider', {});
        return helpers.json.merge(rvl, dds);
    }

    const linkDs = (arg) => {
        console.log(helpers.json.merge(helpers.json.merge(dlinkDs, arg), {element:'a'}));
        return helpers.json.merge(helpers.json.merge(dlinkDs, arg), {element:'a'})
    }

    const item = (arg) => {
        return (
            <TextLabel 
                {...arg}
                wrapperDs={linkDs(arg)}
            />
        )
    }

    const list = () => {
        if(options.length > 0) {
            return options.map((arg, i) => {
                const ldiv = linkDivProps(arg);
                return (
                    <li className='full' key={`${id+i}ll`}>
                        {divider(ldiv, 'top')}
                        {item(arg)}
                        {divider(ldiv, 'bottom')}
                    </li>
                )
            })
        }

        return <></>
    }

    const childs = () => {
        return (
            <>
                {divider(wdivider, 'top')}
                {list()}
                {divider(wdivider, 'bottom')}
            </>
        )
    }

    const wrapperClassName = () => {
        return helpers.element.jsx.css.get(props.wrapperDs, 'full');
    }

    const wrapperAttrs = () => {
        const attrs = helpers.element.jsx.attrs(props, false, 'attrs')
        return {...attrs,
            ...{
                className:wrapperClassName()
            }
        };
    }

    const ui = () => {
        if(options.length > 0) {
            return createElement(helpers.json.val(props, 'wrapperDs.element', 'div'), wrapperAttrs(), childs())
        }

        return <></>
    }

    return ui();    
}

LinkList.__PROP__TYPES__

LinkList.__DEFAULT__PROP__

export default LinkList;