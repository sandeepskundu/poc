import Json from './json';
import Output from './output';
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const builder = helpers.json.schema.builder.init('props', {
        utils:{
            keyRegex:null,
            dataType:null,
            _iconByType:null,
            dvalueByType:null
        }
    });

    console.log(builder);

    return (
        <div className='full bxs grid-wrapper grid-layout-2 pd-20'>
            <div className='grid pd-r10 bxs'>
                <Json 
                    builder={builder}
                    onChange={(json, tree, valid) => {
                        console.log(json, tree, valid);
                        /*--setJson({
                            json:json,
                            valid:valid
                        })--*/
                    }}

                    icons={{
                        byTypes:(node) => {

                        }
                    }}

                    templates={{
                        node:{
                            header:{
                                viewport:(node, callbacks) => {
                                    console.log(node)
                                }
                            }
                        },
                        metaAttrs:{
                            key:(meta, node, callbacks) => {
                                return callbacks.template()
                            },
                            value:(meta, node, callbacks) => {
                                return callbacks.template()
                            },
                            delete:(meta, node, callbacks) => {
                                return callbacks.template()
                            },
                            row:(meta, node, callbacks) => {
                                return callbacks.template()
                            },
                            viewport:(metas, node, callbacks) => {
                                return callbacks.template()
                            }
                        }
                    }}
                />
            </div>
            <div className='grid pd-l10 bxs'>
                <Output builder={builder} />
            </div>
        </div>
    )

}


export default Comp;