import helpers from 'ui-helpers';
import {createElement} from 'react';
import Image from 'aio-global-ui/atoms/image';
import SvgIcon from 'aio-global-ui/atoms/icons/svg';
import FontIcon from 'aio-global-ui/atoms/icons/font';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const defaults = {
        size:32,
        outer:8,
        radius:8,
        initialFallback:'hi'
    };

    const dval = '___VALUE___NOT___DEFINED___'
    const icoProps = helpers.json.get(props, 'icon', {});
    const hasWrapper = !helpers.json.get(props, 'nowrapper', false);

    const hasInital = () => {
        let val = helpers.json.get(props, 'initial.value', '');
        let fb = helpers.json.get(props, 'initial.fallback', '');

        if(val || fb){
            return true;
        }else{
            return true;
        }
    }

    const wrapperDs = (isInitial) => {
        return helpers.json.merge(helpers.json.get(props, 'dsTheme', {}), {
            size:null,
            radius:helpers.json.get(props, 'dsTheme.radius', defaults.radius),
            image__d__thumbnail:isInitial?helpers.json.get(props, 'dsTheme.size', defaults.size):null
        })
    }

    const imgPorps = () => {
        return {
            wrap:hasWrapper,
            wrapperDsTheme:wrapperDs(),
            src:helpers.json.get(props, 'image.src', ''),
            dsTheme:{
                radius:helpers.json.get(props, 'dsTheme.radius', defaults.radius),
                image__d__thumbnail:helpers.json.get(props, 'dsTheme.size', defaults.size)
            },
            config:{
                image:helpers.json.get(props, 'config.image', {}),
                wrapper:{
                    ds:{
                        css:{
                            class:{
                                padding:{
                                    1:helpers.json.get(props, 'dsTheme.outer', defaults.outer),
                                    2:helpers.json.get(props, 'dsTheme.outer', defaults.outer)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const img = () => {
        return <Image {...imgPorps()} />
    }

    const hasIcon = () => {
        let type = helpers.json.get(icoProps, 'config.type', '');

        if(type === 'font' && icoProps.config && icoProps.config.icon && icoProps.config.icon.name){
            return true;
        }

        if(type === 'svg' && icoProps.config && icoProps.config.svg && icoProps.config.svg.src){
            return true;
        }

        return false;
    }

    const wrprConfig = (isInitial) => {
        return helpers.element.jsx.getCompThemeDs(helpers.json.merge(helpers.json.get(props, 'config.wrapper', {}), {ds:{predefined:wrapperDs(isInitial)}}), 'element');
    };

    const wrapper = (child, isInitial) => {
        if(hasWrapper){
            let Elm = helpers.json.get(props, 'config.wrapper.markup.element', 'div');

            return (
                <Elm {...helpers.element.jsx.attrs(wrprConfig(isInitial), 'bxs flx-vc anim')}>
                    {child()}
                </Elm>
            )
        }else{
            return child();
        }
    }

    const iconConfig = (type) => {
        let rval = helpers.json.get(icoProps, 'config', {});
        let size = helpers.json.get(props, 'dsTheme.size', helpers.json.get(props, 'icon.config.icon.size', defaults.size));

        if(type === 'font'){
            rval = helpers.json.set(rval, 'icon.size', size, false, true)
        }

        if(type === 'svg'){
            rval = helpers.json.set(rval, 'svg.size', `${size}px`, false, true)
        }

        return rval;
    }

    const icon = () => {
        let type = helpers.json.get(icoProps, 'config.type', '');

        if(type === 'font'){
            return <FontIcon config={iconConfig(type)} />
        }

        if(type === 'svg'){
            return <SvgIcon config={iconConfig(type)} />
        }

        return <></>
    }

    const initial = () => {
        let ip = {};
        let size = helpers.json.get(props, 'initial.size', dval);
        let fm = helpers.json.get(props, 'initial.family', dval);
        let dis = helpers.json.get(props, 'initial.display', false);
        let iprops = helpers.json.get(props, 'config.initial', {});

            if(fm != dval){
                ip = helpers.json.set(ip, 'ds.css.class.family', fm, false, true);
            }

            if(size != dval){
                ip = helpers.json.set(ip, 'ds.css.class.fontsize', size, false, true);
            }

            if(dis === true ){
                ip = helpers.json.set(ip, 'ds.css.flags.isDisplay', dis, false, true);
            }

            iprops = helpers.json.merge(iprops, ip);

        return (
            <span {...helpers.element.jsx.attrs(iprops, 'full ac')}>
                {helpers.format.name.initial(helpers.json.get(props, 'initial.value', ''), helpers.json.get(props, 'initial.fallback', defaults.initialFallback))}
            </span>
        )
    }

    const ui = () => {
        let src = helpers.json.get(props, 'image.src', '');

        if(src){
            return img();  
        }else{
            let hasIco = hasIcon();

            if(hasIco){
                return wrapper(icon);
            }else{
                let isInital = hasInital()

                if(isInital){
                    return wrapper(initial, true);
                }
            }
        }
    }

    return ui();
}


Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;