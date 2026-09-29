import JsonBuilder from './json-builder';

const Comp = () => {

    const builder = helpers.json.schema.builder.init('props', {
        utils:{
            keyRegex:null,
            dataType:['any', 'array', 'string', 'number', 'boolean', 'object', 'function', 'enum', 'jsx', 'nested', 'compProps', 'predefined'],
            dataTypeFlags:{
                array:['array'],
                object:['object']
            },
            keysmap:{
                arrayChilds:'sandeep'
            } 
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

    const data = [
        builder.createNode('userIduser', 'number', {
            __:{
                editing:false,
                expanded:true,
                metas:[{
                    id:'sss', key:'sandeep', value:'kundu'     
                }, {
                    id:'ssssls', key:'required', value:false
                }]
            }}), {
            ...builder.createNode('userConfig', 'object', {
                __:{
                    editing:false,
                    expanded:true,
                    children: [
                        builder.createNode('theme_mode_for_user_userId_', 'string', {
                            __:{
                                editing:false,
                                expanded:true,
                                metas:[{
                                    id:'sss', key:'sandeep', value:'kundu'
                                }, {
                                    id:'ssssls', key:'required', value:false
                                }]
                            }
                        }),
                    ]
                }
            })
        },
    ]

    const layout = (arg) => {
        return (
            <div className='full bxs grid-wrapper grid-layout-2 pd-20'>
                <div className='grid pd-r10 bxs'>
                    {arg.__.templates.editor.root()}
                </div>
                <div className='grid pd-l10 bxs'>
                    {arg.__.templates.output.display()}
                </div>
            </div>
        )
    }

    return (
        <JsonBuilder
            data={data}
            builder={builder}
            render={(arg) => {
                return layout(arg);
            }}
        />
    )
}

export default Comp;