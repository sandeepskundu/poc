import helpers from 'ui-helpers';
import ContentRow from 'aio-global-ui/atoms/0/content-row';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const badge = () => {
        return [1].map(() => {
            return (
                <div className='grid pd-b20 pd-r20'>
                    <ContentRow
                        childs={{
                            start:'S',
                            before:'B',
                            center:'Center'
                        }}
                        dsTheme={{
                            wrapper:{
                                color:'c00000',
                                hcolor:'c11608',
                                background:'c11608',
                                hbackground:'c00000',
                                className:'test test test'
                            }
                            
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