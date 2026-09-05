import helpers from 'ui-helpers';
import {createElement} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const dsTheme = (skipOverwrite) => {
        return {
            predefined:helpers.json.merge({
                'image__d__thumbnail':24
            }, helpers.json.get(props, 'dsTheme', {}))
        }
    };

    const imgConfig = (() => {
        return helpers.element.jsx.getCompThemeDs(helpers.json.merge(helpers.json.get(props, 'config.image', {}), {
            ds:dsTheme(),
            attrs:{
                src:helpers.json.get(props, 'src', '')
            },
        }), 'element');
    })();

    const wrprConfig = (() => {
        return helpers.element.jsx.getCompThemeDs(helpers.json.merge(helpers.json.get(props, 'config.wrapper', {}), {
            ds:{
                predefined:{
                    'image__d__thumbnail':null,
                    'radius':helpers.json.get(props, 'dsTheme.radius', ''),
                }
            }
        }), 'element');
    })();

    const attrs = () => {
        let attrs = helpers.element.jsx.attrs(imgConfig, 'resp-img');
            attrs.alt = attrs.alt || ' '
        return attrs;
    }

    const img = () => {
        let src = helpers.json.get(props, 'src', '');

        if(src){
            return createElement('img', attrs())
        }else{
            return <></>
        }
    }

    const wrapper = () => {
        let Elm = helpers.json.get(props, 'config.wrapper.markup.element', 'div');

        return (
            <Elm {...helpers.element.jsx.attrs(wrprConfig, 'bxs flx-vc anim')}>
                {img()}
            </Elm>
        )
    }

    const ui = () => {
        let src = helpers.json.get(props, 'src', '');
        let wrap = helpers.json.get(props, 'wrap', '');

        if(src){
            if(wrap){
                return wrapper();
            }else{
                return img();
            }
        }
        
        return <></>
    }

    return ui()
}

export default Comp;