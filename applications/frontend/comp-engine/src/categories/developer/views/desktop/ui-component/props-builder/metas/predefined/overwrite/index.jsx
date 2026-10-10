import parser from './parser';
import Header from './header';
import Details from './details';
import helpers from 'ui-helpers';
import JsonBuilder from './../../../../json-builder';

const Comp = (dprops) => { 

    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const types = ['any', 'string', 'number', 'boolean', 'object', 'function', 'enum', 'jsx', 'nested'];
    const builder = helpers.json.schema.builder.init('props', {
        utils:{
            keyRegex:null,
            dataType:types,
            dataTypeFlags:{
                array:[],
                object:['nested', 'enum', 'asEditorObject']
            },
            keysmap:{} 
        },
        callbacks:{
            onNodeCreate:(arg) => {
                return arg;
            },
            onNodeUpdate:(arg, prev) => {
                return arg;
            }
        }
    });

    const pdmap = (() => {
        let map = helpers.json.get(props, 'mapping', '');
            map = map.replace(/\/index$/, '');
            map = map.split('.');
            map.push('index');

        return map.join('.')            
    })();


    debugger;

    let data = parser.init((() => {
        let oval = helpers.json.get(props, 'data.value', {});
        let pd = helpers.json.get(props, 'configs.predefined', {});
            pd = helpers.json.get(pd, pdmap, {});

        return helpers.json.merge(pd, oval);
    })(), {
        sortPath:'__.type',
        sortOrder:['boolean', 'nested',  'object', 'any', 'enum', 'boolean', 'string', 'number', 'function', 'jsx']
    })

    const getConfigs = () => {
        return {
            types:types,
            enums:helpers.json.get(props, 'configs.enums', {}),
            compTree:helpers.json.get(props, 'configs.compTree', {}),
            predefined:helpers.json.get(props, 'configs.predefined', {})
        }
    }

    const itemHeaderLayout = (arg, props) => {
        return <Header templates={arg} node={props.node} builder={builder} configs={getConfigs()} />
    }

    const itemDetailsLayout = (arg, props) => {
        return <Details templates={arg} node={props.node} builder={builder} configs={getConfigs()} />
    }

    const jsonTree = (arg, temp) => {
        return (
            <div className='full bxs'>
                {temp.header(arg)}
                {temp.details(arg)}
                {temp.nested(arg)}
            </div>
        )
    }

    const render = (arg) => {
        return (
            <div className='full bxs'>
                {arg.jsonTree()}
            </div>
        )
    }

    return (
        <JsonBuilder
            data={data}
            builder={builder}
            templates={{
                editor:{
                    layout:render,
                    jsonTree:jsonTree,
                    jsonTreeHeader:() => {},
                    //jsonOutput:jsonOutput
                },
                item:{
                    header:{
                        layout:itemHeaderLayout,
                    },
                    details:{
                        layout:itemDetailsLayout
                    }
                }
            }}
        />
    )
}

export default Comp;