import helpers from 'ui-helpers';
import Icon from 'aio-global-ui/atoms/0/icons/font';
import Image from 'aio-global-ui/atoms/0/image';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const badge = () => {
        let li = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        return [1].map(() => {
            return (
                <div className='_grid pd-b20 pd-r20 bg-c10010'>
                    <Image
                        wrap={true}
                        src="/irms/statics/images/avatar.jpg"
                        dsTheme={{
                            radius:'round',
                            shadow:'lg',
                            'image.thumbnail':20
                        }}
                        wrapperDsTheme={{
                            shadow:'md',
                            background:"c00210",
                            hbackground:"c00307"
                        }}
                        config={{
                            wrapper:{
                                ds:{
                                    theme:{
                                        background:{
                                            hover:'c00103'
                                        }
                                    },
                                    css:{
                                        class:{
                                            padding:{
                                                1:4,
                                                2:4
                                            },
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