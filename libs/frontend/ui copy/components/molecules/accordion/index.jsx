import helpers from 'ui-helpers';
import React, {createElement} from 'react';
import Icon from 'aio-global-ui/atoms/icon';
import Divider from 'aio-global-ui/atoms/divider';
import TextLabel from 'aio-global-ui/atoms/text-label';
import Text from 'aio-global-ui/atoms/typography/text';
import JsxBuilder from 'aio-global-ui/atoms/jsx-builder';

const Accordion = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const id = helpers.random.id(16);
    const options = helpers.json.val(props, 'list', []);
    const dlabelDs = helpers.json.val(props, 'labelDs', {});
    const dMoreLess = helpers.json.val(props, 'moreLess', {});
    const dContentDs = helpers.json.val(props, 'contentDs', {});
    const ldivider = helpers.json.val(props, 'labelDs.divider', {});
    const wdivider = helpers.json.val(props, 'wrapperDs.divider', {});

    const ids = {
        "id":id,
        "name":props.name?props.name:id
    }

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
        let dds = helpers.json.val(arg, 'divider', {});
        let rvl = helpers.json.merge(wdivider, ldivider);
        return helpers.json.merge(rvl, dds);
    }

    const lableClss = (arg) => {
        const rval = [arg];
        const map = {
            'md':"pd-tb8 pd-rl12"
        }

        if(map[props.size]){
            rval.push(map[props.size]);
        }

        return rval.join(' ');
    }

    const linkDs = (arg) => {
        let rval = helpers.json.merge(helpers.json.merge(dlabelDs, arg), {element:'label'})
            rval.css = rval.css || {};
            rval.css.others = lableClss(rval.css.others?`acrdn-lbl cp ${rval.css.others}`:`acrdn-lbl cp`);
        
        return rval;
    }

    const leftIcon = (arg) => {
        let lico = helpers.json.val(arg, 'leftIcon');

        if(lico){
            return (
                <Icon icon={{...{"css":{
                    "class":{
                        "margin":{
                            "1":0,
                            "2":12,
                            "3":0,
                            "4":0
                        }
                    }
                }}, ...helpers.json.val(arg, 'leftIcon', {})}} />
            )
        }
        return <></>
        
    }

    const rightIcon = (arg) => {
        return <Icon icon={{name:"da"}} className='anim acrdn-ico' />
    }

    const item = (arg, keyval) => {
        let iprops = helpers.json.set(arg, 'attrs.htmlFor', keyval, false, true);
        return (
            <TextLabel 
                {...iprops}
                wrapperDs={linkDs(arg)}
                leftIconJsx={leftIcon(iprops)}
                rightIconJsx={rightIcon(iprops)}
            />
        )
    }

    const getReadMoreLess = (arg, key) => {
        return {...dMoreLess, ...helpers.json.val(arg, 'moreLess', {})};
    }

    const getContentDs = (arg, key) => {
        return {...dContentDs, ...helpers.json.val(arg, 'contentDs', {})};
    }

    const contentChilds = (arg, key) => {
        let type = helpers.data.type.get(arg.content || '');
        let childs = helpers.json.val(arg, 'childComponents');

        if(childs){
            return <JsxBuilder {...helpers.element.jsx.builder.props.get({...props, ...{childComponents:childs}})} />
        }else{
            switch(type) {
                case 'function':
                  return arg.content(arg, props);
                break;
                case 'string':
                    const cds = getContentDs(arg, key);
                    return (
                        <Text
                            ds={cds}
                            content={arg.content}
                            moreLess={getReadMoreLess(arg, key)}   
                            attrs={helpers.json.val(cds, 'attrs', {})}
                            dataAttrs={helpers.json.val(cds, 'dataAttrs', {})}
                            element={helpers.json.val(cds, 'element', 'p')}
                        />
                    )
                default:
                    return arg.content || '';
            }
        }
    }

    const content = (arg, key) => {
        return (
            <div className='acrdn-ctent transition'>
                {contentChilds(arg, key)}
            </div>
        )
    }

    const inputAttrs = (key, index) => {
        const rv = {
            id:key,
            className:'inpt',
            type:props.openMultiple?'checkbox':'radio',
            name:props.openMultiple?ids.name+index:ids.name
        }

        if(props.active === index){
            rv.checked=true
        }

        return rv;
    }

    const list = () => {
        if(options.length > 0) {
            return options.map((arg, i) => {
                const kv =  `${ids.id}${i}`;
                const ldiv = linkDivProps(arg);
                return (
                    <li className='full acrdn-tb' key={kv}>
                        {divider(ldiv, 'top')}
                        <input {...inputAttrs(kv, i)} />
                        {item(arg, kv)}
                        {content(arg, kv)}
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

    const className = () => {
        const rv = ['acrdn bdr-1 oh', `acrdn-${props.size}`];
        return helpers.element.jsx.className({ds:props.wrapperDs || {}}, rv.join(' '));
    }

    const wrapperAttrs = () => {
        const attrs = helpers.element.jsx.attrs(props, false, 'attrs');
        return {...attrs, ...{className:className()}};
    }

    const wrapper = () => {
        return createElement('ul', wrapperAttrs(), childs());
    }

    const ui = () => {
        if(options.length > 0) {
            return wrapper();
        }

        return <></>
    }

    return ui();
}

Accordion.__PROP__TYPES__

Accordion.__DEFAULT__PROP__

export default Accordion;