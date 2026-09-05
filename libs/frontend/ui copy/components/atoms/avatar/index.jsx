import helpers from 'ui-helpers';
import {createElement} from 'react';
import Image from 'aio-global-ui/atoms/image';
import SvgIcon from 'aio-global-ui/atoms/icons/svg';
import FontIcon from 'aio-global-ui/atoms/icons/font';

/*-- 

const _dconf = {
    nowrapper={false} // Defines that initial / icon or avatar shadow be wrap in any element.
    dsTheme={{
        size:40, // Size of thumnail like 40X40, 56X56
        outer:20, // Width of outer box where displays border like gray etc.
        shadow:'sm', // shadow on outer box
        radius:'round', // Radius of image and outer box
        color:'c00000', // Text color of initial
        hcolor:'c11806', // Hover text color of initial > this will apply on both case like icon and font both
        background:'c12306', // Background color of outer.
        hbackground:'g00003' // Hover background color of outer.
    }}
    image={{
        _src:'/irms/statics/images/avatar.jpg', // Image path of thumbnail.
    }}
    initial={{
        size:'xxl', // Font size of initial
        family:'bd', // Font family of initial
        fallback:'UH', // Fallback value to display is initial value is blank/null or false.
        display:false, // Needs text in heading style.
        value:'Mandeep Kundu', // Complete string like Sandeep Kundu, that will pickup and return SK.
    }}
    icon={{
        ds:{}, // Icon ds config as we setup globally.
        attrs:{}, // Html attribute of Icon container
        markup:{}, // Html tag name of wrapper element.
        type:"font", // Type of icon like font/svg.
        svg:{
            style:{}, // Inline style props if icon is in SVG format
            src:null, // SVG string
            size:"24px" // Size of SVG icon
        },
        icon:{
            size:16, // Size of icon => First point to global dsTheme config passed to this component.
            name:'da', // Name of icon
            family:'g' // Family of icon like
        }
    }}
    config={{ // This is design system config where we can configure.
        image:{},
        wrapper:{},
        initial:{
            ds:{
                css:{
                    class:{
                        family:'md',
                        fontsize:'sm'
                    }
                }
            }
        }
    }}
}

--*/

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

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
        let type = helpers.json.get(icoProps, 'type', '');

        if(type === 'font' && icoProps.icon && icoProps.icon.name){
            return true;
        }

        if(type === 'svg' && icoProps.svg && icoProps.svg.src){
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
        let rval = helpers.json.copy(icoProps);
        let size = helpers.json.get(props, 'dsTheme.size', helpers.json.get(props, 'icon.icon.size', defaults.size));


        if(type === 'font'){
            rval = helpers.json.set(rval, 'icon.size', size, false, true)
        }

        if(type === 'svg'){
            rval = helpers.json.set(rval, 'svg.size', `${size}px`, false, true)
        }

        return rval;
    }

    const icon = () => {
        let type = helpers.json.get(icoProps, 'type', '');

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