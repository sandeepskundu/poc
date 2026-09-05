import helpers from 'ui-helpers';
import Bubble from 'aio-global-ui/atoms/0/bubble';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const TM = () => {
        return (
            <span>SK</span>
        )
    }

    const badge = () => {
        return [1].map(() => {
            return (
                <div className='_grid pd-b20 pd-r20'>
                    <Bubble 
                        dsTheme={{
                            size:'sm',
                            radius:'round',
                            theme:'llslssl',
                            hbackground:'c11608'
                        }}
                        content={<TM></TM>}
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