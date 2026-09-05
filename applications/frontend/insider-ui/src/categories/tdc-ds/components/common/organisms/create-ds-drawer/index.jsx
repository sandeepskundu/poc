import helpers from 'ui-helpers';
import Drawer from 'aio-global-ui/molecules/slide-drawer';
import CreateDsForm from 'aio-app-ui-tdc-ds-organisms/create-ds-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
   
    const ui = () => {
        return (
            <Drawer 
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
                <div className='full bxs pd-rl20 pd-t20'>
                    <CreateDsForm {...props} />
                </div>
            </Drawer>
        )
    }

    return ui();
}

export default Comp;