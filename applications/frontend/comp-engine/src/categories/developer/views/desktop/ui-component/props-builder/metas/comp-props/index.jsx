import From from './from';
import Mapping from './mapping';
import helpers from 'ui-helpers';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const node = props.node || {};
    const templates = props.templates || {};
    const metas = (() => {
        let rv = {};
        let li = props.metas || [];

        for(let a in li){
            rv[li[a].key] = li[a]
        }

        return rv;
    })();

    const update = (id, field, value) => {
        templates.item.meta.item.actions.updateByKey(id, field, value)
    }

    const key = helpers.json.get(node, '__.key');

    const asroot = (arg) => {
        return (
            <Toggle
                label={{
                    text: "Set as root"
                }}
                checkbox={{
                    checked:helpers.json.get(arg, 'value', false)
                }}
                callback={{
                    input: {
                        onChange: (checked, b, c) => {
                            update(arg.id, 'value', checked)
                        }
                    }
                }}
            />
        )
    }

    const from = () => {
        return (
            <From
                selected={helpers.json.get(metas, 'from.value', '')}
                onChange={(value) => { update(helpers.json.get(metas, 'from.id', ''), 'value', value)}}
            />
        )
    }

    const compProps = () => {
        return (
            <div className='full bxs pd-16'>
                <div className='full bxs pd-t8'>
                    {from()}
                    <Mapping 
                        data={helpers.json.get(metas, 'mapping', {})} 
                        onChange={(value) => {
                            let mId = helpers.json.get(metas, 'mapping.id', '');
                            let oId = helpers.json.get(metas, 'overwirte.id', '');

                            templates.item.meta.item.actions.updateMetaDetailsByKey({
                                [mId]:{
                                   value:value 
                                },
                                [oId]:{
                                    value:{}
                                }
                            });
                        }}
                    />
                </div> 
            </div>
        )
    }

    const ui = () => {
        if(key === '___'){
            return (
                <div className='full bxs pd-16'>
                    {asroot(metas.asroot)}
                </div>
            )
        }else{
            return compProps();
        }
        
    }

    return ui();
}

export default Comp;