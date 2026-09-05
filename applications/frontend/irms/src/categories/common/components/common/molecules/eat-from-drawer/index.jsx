import helpers from 'ui-helpers';
import SlideDrawer from 'aio-global-ui/molecules/slide-drawer';
import EatFormInputs from 'aio-app-ui-common-molecules/eat-form-inputs'

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
                    <EatFormInputs {...props} id={props.id} />
                </div>
            </SlideDrawer>
        )
    }

    return ui();
}

export default Comp;