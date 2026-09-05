import {useState} from "react";
import helpers from 'ui-helpers';
import DocCode from 'aio-app-ui-developer-molecules/story-component-code';
import ComponentChunk from 'aio-app-ui-developer-molecules/story-component-chunk';
import StorybookPropsEditor from 'aio-app-ui-developer-organisms/storybook-props-editor';

const Comp = (props) => {
    const [navbar, setNavbar] = useState({
        viewCode:false,
        viewEditor:false
    });

    const updateNavbar = (key, val) => {
        let nb = helpers.json.copy(navbar);
            nb = helpers.json.set(nb, key, val);
            setNavbar(nb);
    }

    const viewCode = () => {
        let lbl = `${navbar.viewCode?'Hide':'Show'} code`
        return <span className='cp txt-xs' data-tip-html={lbl} onClick={() => {updateNavbar('viewCode', !navbar.viewCode)}}>{lbl}</span>
    }

    const left = () => {
        return (
            <ul className='flx-vc'></ul>
        )
    }

    const right = () => {
        return (
            <ul className='flx-vc'>
                <li className='pd-rl10 bdr-1 bdr-c00104 bdr-rn bdr-ln bdr-tn bdr-bn'>{viewCode()}</li>
                <li className='pd-rl10 bdr-1 bdr-c00105 bdr-rn bdr-tn bdr-bn'><span className='cp txt-xs' data-tip-html='Maximize your workspace into a 50/50 fullscreen layout with side-by-side component preview and props editor.' onClick={() => {updateNavbar('viewEditor', !navbar.viewEditor)}}>Edit props</span></li>
                <li className='pd-rl10 bdr-1 bdr-c00105 bdr-rn bdr-tn bdr-bn'><span className='cp txt-xs' data-tip-html='Detach preview and controls into two independent browser windows with synchronized real-time updates.' onClick={() => {updateNavbar('viewCode', !navbar.viewCode)}}>Live Stream</span></li>
            </ul>
        )
    }

    const header = () => {
        return (
            <div className='full bxs flx-sb bg-c00101 bdr-t8 pd-10 bdr-1 bdr-c00103 bdr-bn shdw-xs'>
                {left()}
                {right()}
            </div>
        )
    }

    const code = () => {
        if(navbar.viewCode){
            return <DocCode {...props} />
        }
    }

    const editorUi = () => {
        if(navbar.viewEditor){
            return (
                <StorybookPropsEditor 
                    {...props}
                    callback={{
                        toggle:(active) => {
                            updateNavbar('viewEditor', !active)
                        }
                    }}
                />
            )
        }
    }

    const name = () => {
        let name = helpers.json.get(props, 'preview.name', '');
            name = helpers.string.split.byCapital(name);
        return helpers.string.transform.camelize(name.join(' '));
    }

    return (
        <>
            <p className='full bxs pd-rl16 txt-lg fm-md pd-b12 bdr-t8'>{name()}</p>
            <div className='full pd-rl16 bxs pd-tn pd-b40'>
                {header()}
                <div className={`full flx-center bdr-1 bdr-c00103 pd-40 bxs shdw-xs ${navbar.viewCode?'':'bdr-b8'}`}>
                    <div className='flx'>
                        <ComponentChunk {...props} />
                    </div>
                </div>
                {code()}
                {editorUi()}
            </div>
        </>
    )
}

export default Comp;