import helpers from 'ui-helpers';
import { Highlight, themes } from "prism-react-renderer"
import { useState } from 'react';

const Comp = (props) => {
    let  copy = {
        alias:'',
        props:'',
        component:''
    }

    const [cache, setCache] = useState(helpers.random.key())
    const [preview, setPreview] = useState((() => {
        let rval = helpers.json.get(props, 'preview.props', {});
        let sprops = helpers.storage.storybook.get('preview');
            sprops = helpers.json.get(sprops, 'props', {});
            return helpers.json.merge(rval, sprops);
    })());

    if(props.editor){
        const onPreview = (arg) => {
            let d = helpers.json.copy(preview);
                d = helpers.json.merge(d, arg);
                setPreview(d);
                setCache(helpers.random.id());
        };

        helpers.react.hooks.event.off('PREVIEW_PROPS_CODE_CHANGES', onPreview);
        helpers.react.hooks.event.on('PREVIEW_PROPS_CODE_CHANGES', onPreview);
    }

    const indentText = (text = '', spaces = 4, indentFirstLine = true) => {
        if (!text){
            return '';
        }

        const indentation = ' '.repeat(spaces);
        const lines = text.split('\n');

        return lines.map((line, index) => {
            if (index === 0 && !indentFirstLine){
                return line;
            }
            return line.trim().length > 0 ? `${indentation}${line}` : line;
        }).join('\n');
    };

    const removeBlankObj = (arg) => {
        let rval = {};

        for(let a in arg){
            if(helpers.data.type.is(arg[a], 'object')){
                if(helpers.json.length(arg[a]) > 0){
                    rval[a] = arg[a];
                }
            }else{
                rval[a] = arg[a];
            }
        }

        return rval;
    }

    const code = () => {
        let name = helpers.json.get(props, 'data.component.name', '');
        let alias = helpers.json.get(props, 'data.component.alias', '');
        let dprops = helpers.json.get(props, 'data.props.default', {});
            dprops = helpers.json.merge(dprops, preview);

        let pr = helpers.json.removeDuplicate(dprops, helpers.json.get(props, 'data.props.default', {}));
        let dp = helpers.json.asProps(removeBlankObj(pr), 2);

            copy.props = `${dp}`;
            copy.alias = `import ${name} from '${alias}';`
            copy.component = `\n${copy.alias}\n\n<${name} ${indentText(dp, 2, true)}${dp?'\n':''}/>\n`;

        return copy.component;
    }

    const header = () => {
        return (
            <div className='full pr bxs flx-sb pd-6 pd-bn'>
                <span></span>
                <ul className='flx-vc bg-c00102 bdr-bn txt-c00107 bdr-4'>
                    <li className='shdw-sm flx-d bdr-1 bdr-c00105 bdr-wtn bdr-wbn bdr-wln bg-c00104 txt-c00110 bdr-l4 hbg-c00105 anim'><span className='cp txt-xxs pd-6' data-tip-html='Copy code' onClick={() => {}}>Code</span></li>
                    <li className='flx-d bdr-1 bdr-c00105 bdr-tn bdr-bn bdr-ln bg-c00104 txt-c00110 hbg-c00105 anim'><span className='cp txt-xxs pd-tb6 pd-rl10' data-tip-html='Copy import path' onClick={() => {}}>Alias</span></li>
                    <li className='flx-d bg-c00104 txt-c00110 bdr-r4 hbg-c00105 anim'><span className='cp txt-xxs pd-tb6 pd-rl10' data-tip-html='Copy props' onClick={() => {}}>Props</span></li>
                </ul>
            </div>
        )
    }

    const ui = () => {
        if(props.blank){
            return <></>
        }else{
            return (
                <Highlight _theme={themes.jettwaveDark} theme={themes.github} code={code()} language="jsx" key={cache}>
                    {({className, style, tokens, getLineProps, getTokenProps }) => (
                        <div style={style} className='bdr-b8 bdr-tn pr pd-r16 bdr-1 bdr-c00103 shdw-md'>
                            {header()}
                            <div className='full bxs oa'>
                                <pre>
                                    {tokens.map((line, i) => (
                                        <div key={i} {...getLineProps({ line })} className='pd-rl16 pd-tb2'>
                                            <span className='hide'>{i + 1}</span>
                                            {line.map((token, key) => (
                                                <span key={key} {...getTokenProps({ token })} />
                                            ))}
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>
                    )}
                </Highlight>
            )
        }
    }

    return ui();
}

export default Comp;