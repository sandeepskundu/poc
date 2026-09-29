import Json from './json';
import Editor from './editor';
import Header from './header';
import Output from './output';
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const nested = (arg) => {
        return (
            <div className='bxs bdr-c00104 anim' style={{ borderLeftWidth: "4px", borderLeftStyle: 'solid' }}>
                <div className='full bdr-1 bdr-tn bdr-bn bdr-rn bdr-c00104'>
                    {arg.__.templates.node.nested()}
                </div>
            </div>
        )
    }

    const header = (arg) => {
        return <Header {...arg} />
    }

    const details = (arg) => {
        return <Editor {...arg} />
    }

    const tree = (arg) => {
        return (
            <div className='full'>
                {header(arg)}
                {details(arg)}
                <div className='full bxs'>
                    {nested(arg)}
                </div>
            </div>
        )
    }

    const json = () => {
        return (
            <Json
                data={props.data}
                builder={props.builder}
                onChange={(json, valid) => { }}
                templates={{
                    tree:(arg) => {
                        return tree(arg);
                    }
                }}
            />
        )
    }

    const output = () => {
        return <Output builder={props.builder} />
    }

    const ui = () => {
        if (props.render && helpers.data.type.is(props.render, 'function')) {
            return props.render({
                __: {
                    templates: {
                        editor: {
                            root:json
                        },
                        output: {
                            display: output
                        },
                    }
                }
            })
        }
    }

    return ui()
}

export default Comp;