import helpers from 'ui-helpers';
import AppScssThemeSwitchesUi from 'aio-app-ui-tdc-molecules/app-scss-theme-switches-ui';
import UiAppScssRuntimeAdditionalDataMap from 'aio-app-ui-tdc-molecules/ui-app-scss-runtime-additional-data-map'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    /*--
        
        appConfig:{
            entries:{},
            alias:{},
            appWebCacheTime:"5d",
        },
        scssConfig:{
            hasTheme:true,
            hasDesignSystem:true,
            additionalData:{
                "$sandeep":"kundu"
            },
            additionalDataMap:{
                $fontsCdnPath:"appConfig.fontsCdnPath",
                $pathPrefix:"appConfig.pathPrefix",
                $imagesCdnPath:"appConfig.imagesCdnPath",
                $assetsCdnPath:"appConfig.assetsCdnPath"
            }
        },

    ---*/

    const ui = () => {
        return (
            <ul className='full bxs bxs'>
                <li className='full pd-tb16 bxs'>
                    <AppScssThemeSwitchesUi {...props} valuemap={[...props.valuemap]} />
                </li>
                <li>
                    <UiAppScssRuntimeAdditionalDataMap {...props} valuemap={[...props.valuemap]} />
                </li>
            </ul>
        )
    }

    return ui()
}

export default Comp;