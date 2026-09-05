import helpers from 'ui-helpers';
import Icon from 'aio-global-ui/atoms/0/icons/font';
import Aavatar from 'aio-global-ui/atoms/0/avatar';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const badge = () => {
        let li = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    
        return [1].map(() => {
            return (
                <div className='_grid pd-b20 pd-r20'>
                    <Aavatar
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
                    />
                </div>
            )
        })
    }
    
    const ui = () => {
        return (
            <div className='full pd-t60 grid-wrapper grid-layout-6'>
                {badge()}
            </div>
        )  
    }

    return ui();
}

export default Comp;