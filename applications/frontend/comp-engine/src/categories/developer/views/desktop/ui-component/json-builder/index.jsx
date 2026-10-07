import Json from './json';
import Editor from './editor';
import Header from './header';
import Output from './output';
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const getTemplate = (map) => {
        let rval =  helpers.json.get(props, map, null);

        if(rval && helpers.data.type.is(rval, 'function')){
            return rval;
        }

        return null;   
    }

    const ntemplate = getTemplate('templates.item.nested.layout');
    const editorTemplate = getTemplate('templates.editor.layout');
    const jsonOutput = getTemplate('templates.editor.jsonOutput');
    const jsonTreeTemplate = getTemplate('templates.editor.jsonTree');

    const nested = (arg) => {
        if(ntemplate){
            return ntemplate(arg, arg.__.templates.node.nested);
        };

        return (
            <div className='bxs bdr-c00104 anim' style={{ borderLeftWidth: "4px", borderLeftStyle: 'solid' }}>
                <div className='full bdr-1 bdr-tn bdr-bn bdr-rn bdr-c00104'>
                    {arg.__.templates.node.nested()}
                </div>
            </div>
        )
    }

    const header = (arg) => {
        return <Header {...arg} templates={helpers.json.get(props, 'templates.item.header', {})} />
    }

    const details = (arg) => {
        return <Editor {...arg} templates={helpers.json.get(props, 'templates.item.details', {})} />
    }

    const tree = (arg) => {
        if(jsonTreeTemplate){
            return jsonTreeTemplate(arg, {
                nested:nested,
                header:header,
                details:details
            });
        };

        return (
            <div className='full'>
                {header(arg)}
                {details(arg)}
                {nested(arg)}
            </div>
        )
    }

    const json = () => {
        return (
            <Json
                data={props.data}
                builder={props.builder}
                templates={{
                    tree:(arg) => {
                        return tree(arg);
                    }
                }}
            />
        )
    }

    const output = () => {
        if(jsonOutput){
            return jsonOutput({
                template:() => {
                    return <Output builder={props.builder} onChange={(json, valid) => {console.log(json, valid)}} />;
                }
            })
        }
        return <Output builder={props.builder} onChange={(json, valid) => {console.log(json, valid)}} />
    }

    const ui = () => {
        if (editorTemplate) {
            return editorTemplate({
                jsonTree:json,
                jsonOutput:output
            })
        }
    }

    return ui()
}

export default Comp;