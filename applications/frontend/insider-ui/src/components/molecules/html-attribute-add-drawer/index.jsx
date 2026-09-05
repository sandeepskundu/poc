import helpers from 'ui-helpers';
import SlideDrawer from 'aio-global-ui/molecules/slide-drawer';
import HtmlAttributeAddForm from 'aio-app-ui-molecules/html-attribute-add-form'

const AddNewNode = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    
    const label = () => {
        if(props.label){
            return (
                <>
                    {props.label(id)}
                    {ui()}
                </>
            )
        }else{
            return (
                <li className='pd-l12'>
                    <label className="link-u ns cp txt-xxs fl" htmlFor={id}>{props.labelText}</label>
                    {ui()}
                </li>
            )
        }  
    }

    const ui = () => {
        return (
            <SlideDrawer 
                id={id}
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
                    <HtmlAttributeAddForm {...props} />
                </div>
            </SlideDrawer>
        )
    }

    return (
        <>
            {label()}
        </>
        
    )   
}

export default AddNewNode;