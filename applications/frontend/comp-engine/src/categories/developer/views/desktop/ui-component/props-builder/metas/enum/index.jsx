import From from './from';
import {useState} from 'react'
import Mapping from './mapping';
import helpers from 'ui-helpers';
import Textarea from 'aio-global-ui/atoms/form/textarea';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const [cache, setCache] = useState(helpers.random.id());

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

    const refesh = () => {
        setTimeout(() => {
            setCache(helpers.random.id());
        });
    }

    const update = (id, field, value) => {
        templates.item.meta.item.actions.updateByKey(id, field, value)
    }

    const from = () => {
        return (
            <From
                selected={helpers.json.get(metas, 'from.value', '')}
                onChange={(value) => {
                    update(helpers.json.get(metas, 'from.id', ''), 'value', value)
                    refesh()
                }}
            />
        )
    }

    const options = () => {
        return (
            <div className='full pd-t24'>
                <Textarea 
                    label="Options"
                    placeholder="Options"
                    value={helpers.json.get(metas, 'options.value', '')}
                    callback={{
                        onChange:(a, b, c) => {
                            update(helpers.json.get(metas, 'options.id', ''), 'value', a);
                            refesh();
                        }
                    }}
                />
            </div>
            
        )
    }

    const ui = () => {
        return (
            <div className='full bxs pd-16'>
                <div className='full bxs pd-t8'>
                    {from()}
                    <Mapping
                        configs={props.configs}
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
                    {options()}
                </div> 
            </div>
        )
    }

    return ui();
}

export default Comp;