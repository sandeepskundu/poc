import helpers from 'ui-helpers';
import Icon from 'aio-global-ui/atoms/0/icons/font';
import Button from 'aio-global-ui/atoms/0/form/button';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const sizes = ['sm', 'md', 'd', 'lg', 'xl'];
    const themes = ['001', '000', '002', '003', '004', '005', '006', '007', '008', '009', '010'];

    const icons = (theme, disabled, hover) => {
        return sizes.map((size, i) => {
            return (
                <div className='grid pd-r16 bxs' key={i}>
                    <Button
                        index={0}
                        callback={{
                            onPress:(e, arg) => {
                                debugger
                            },
                            onClick:(e, arg) => {
                                debugger
                            }
                        }}
                        config={{
                            button:{
                                content:``,
                                states:{
                                    disabled:disabled
                                },
                                ds:{
                                    predefined:{
                                        size:size,
                                        theme:theme
                                    },
                                    css:{
                                        class:{
                                            shadow:'md'
                                        },
                                        others:hover?'hvr':''
                                    }
                                }
                            },
                            icons:{
                                left:{
                                    type:'font',
                                    icon:{
                                        name:'da',
                                        size:20
                                    }
                                },
                            }
                        }}
                    />
                </div>
            )
        });
    }

    const label = (theme, disabled, hover) => {
        return sizes.map((size, i) => {
            return (
                <div className='grid pd-r16 bxs' key={i}>
                    <Button config={{
                        button:{
                            content:`${theme} - ${size}`,
                            states:{
                                disabled:disabled
                            },
                            ds:{
                                predefined:{
                                    size:size,
                                    theme:theme
                                },
                                css:{
                                    others:hover?'hvr':''
                                }
                            }
                        },
                        icons:{
                            left:null,
                            right:null
                        }
                    }} />
                </div>
            )
        });
    }

    const get = () => {

        return themes.map((theme, i) => {
            return (
                <li className='full pd-rl10 bxs grid-wrapper' key={i}>
                    <div className="grid-w6 pd-r16 pd-b16">
                        <p className='txt-lg pd-b16'>Theme - {theme}</p>
                        <div className='full flx-sb pd-b8 flx-vc'>
                            {label(theme)}
                        </div>
                        <div className='full flx-sb pd-b8 flx-vc'>
                            {label(theme, false, true)}
                        </div>
                        <div className='full flx-sb pd-b8 flx-vc'>
                            {label(theme, true)}
                        </div>
                    </div>
                    <div className="grid-w3 pd-l8">
                        <p className='txt-lg pd-b16'>&nbsp;</p>
                        <div className='full flx-sb pd-b8 flx-vc'>
                            {icons(theme)}
                        </div>
                        <div className='full flx-sb pd-b8 flx-vc'>
                            {icons(theme, false, true)}
                        </div>
                        <div className='full flx-sb pd-b8 flx-vc'>
                            {icons(theme, true)}
                        </div>
                    </div>
                </li>
            )
        })
        
    }
    
    const ui = () => {
        return (
            <div className='full'>
                {get()}
            </div>
        )  
    }

    return ui();
}

export default Comp;