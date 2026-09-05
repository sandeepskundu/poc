import helpers from 'ui-helpers';
import Divider from 'aio-global-ui/atoms/0/divider';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const badge = () => {
        return [1].map(() => {
            return (
                <div className='grid pd-b20 pd-r20'>
                    <Divider 
                        dsTheme={{
                            size:'sm',
                            minHeight:10,
                            radius:'round',
                            hbackground:'c11608'
                        }}
                        config={{
                            "css":{},
                            "theme":{
                                background:{
                                    default:'c12306'   
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