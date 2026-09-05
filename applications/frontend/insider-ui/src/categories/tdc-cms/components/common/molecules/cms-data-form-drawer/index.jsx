import helpers from 'ui-helpers';
import SlideDrawer from 'aio-global-ui/molecules/slide-drawer';
import CmsDataFormInputs from 'aio-app-ui-tdc-cms-molecules/cms-data-form-inputs'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <SlideDrawer 
                id={props.id}
                wrapperDs={{
                    ds:{
                        theme:{
                            colorPairing:{
                                default:"025"
                            }
                        }
                    }
                }}
                contentDs={{
                    theme:{
                        colorPairing:{
                            default:"025"
                        }
                    }
                }}
                closeIconDs = {{
                    theme:{
                        colorPairing:{
                            default:"025"
                        }
                    }
                }}
            >
                <div className='full bxs pd-rl20 pd-t32'>
                    <CmsDataFormInputs {...props} id={props.id} />
                </div>
            </SlideDrawer>
        )
    }

    return ui();
}

export default Comp;