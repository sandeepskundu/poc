import {useEffect, useState} from "react";
import helpers from 'ui-helpers';
import SlideDrawer from 'aio-global-raw-ui/molecules/slide-drawer';
import PropsTree from 'aio-app-ui-developer-molecules/story-props-tree';
import DocCode from 'aio-app-ui-developer-molecules/story-component-code';
import ComponentChunk from 'aio-app-ui-developer-molecules/story-component-chunk';

const Comp = (props) => {
    const [navbar, setNavbar] = useState({
        viewCode:false,
    });

    useEffect(() => {
        let sprop = helpers.json.get(props, 'preview', {});
        let storybook = helpers.storage.create('storybook', 'storybook');
            storybook.clear();
            storybook.set('preview', sprop);
    }, [props])

    const updateNavbar = (key, val) => {
        let nb = helpers.json.copy(navbar);
            nb = helpers.json.set(nb, key, val);
            setNavbar(nb);
    }

    const viewCode = () => {
        let lbl = `${navbar.viewCode?'Hide':'Show'} code`
        return <span className='cp txt-xs' data-tip-html={lbl} onClick={() => {updateNavbar('viewCode', !navbar.viewCode)}}>{lbl}</span>
    }

    const code = () => {
        if(navbar.viewCode){
            return (
                <div className={`full mr-t30`}>
                    <DocCode {...props} editor={true} />
                </div>
            )
        }
    }

    const content = () => {
        return (
            <ul className='full vh vw flx-vc'>
                <li className='vh bdr-1 bxs pd-r4 bg-c00103' style={{width:'50%'}}>
                    <div className='flx-page bg-c00000'>
                        <div className='header bxs pd-rl16 pd-tb10 bg-c00102 shdw-sm flx-sb'>
                            <span className='txt-md fm-sb'>Component live preview</span>
                            <ul className='flx-vc'>
                                <li className='pd-rl10 bdr-1 bdr-c00104 bdr-rn bdr-ln bdr-tn bdr-bn'>{viewCode()}</li>
                            </ul>
                        </div>
                        <div className='body full flx'>
                            <div className='full pd-tb20 pd-rl10 bxs flx-center'>
                                <div className='flx'>
                                    <ComponentChunk {...props} editor={true} />
                                </div>
                            </div>
                            {code()}
                        </div>
                    </div>
                </li>
                <li className='vh bxs pd-l4 bg-c00103' style={{width:'50%'}}>
                    <div className='flx-page'>
                        <div className='header bxs pd-rl16 pd-tb10 bg-c00102 shdw-sm txt-md fm-sb'>Component props</div>
                        <div className='body bg-c00000'>
                            <PropsTree {...props} />
                        </div>
                    </div>
                </li>
            </ul>
        )
    }

    const ui = () => {
        if(props.blank){

        }else{
            return (
                <SlideDrawer 
                    active={true}
                    pageview={true}
                    direction="right"
                    templates={{
                        body:() => {
                            return content()
                        }
                    }}
                />
            );
        }
    };

    return ui()
}

export default Comp;