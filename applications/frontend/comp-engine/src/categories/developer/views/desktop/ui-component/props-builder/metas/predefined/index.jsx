import From from './from';
import Mapping from './mapping';
import helpers from 'ui-helpers';
import Overwrite from './overwrite';
import { useState } from 'react';

const Comp = (dprops) => { 
    const [cache, setCache] = useState(helpers.random.id());
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

    const from = () => {
        return (
            <From
                selected={helpers.json.get(metas, 'from.value', '')}
                onChange={(value) => { update(helpers.json.get(metas, 'from.id', ''), 'value', value)}}
            />
        )
    }

    const ui = () => {
        return (
            <div className='full bxs pd-t16 pd-ln'>
                <div className='full bxs pd-t8'>
                    <div className='full pd-l16 bxs pd-b16'>
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

                                setTimeout(() => {
                                    setCache(helpers.random.id());
                                    setCache(helpers.random.id());
                                }, 10);
                            }}
                        />
                    </div>
                    <Overwrite 
                        {...props}
                        key={cache}
                        data={helpers.json.get(metas, 'overwirte', {})}
                        mapping={helpers.json.get(metas, 'mapping.value', '')}
                        onChange={(value) => {
                            update(helpers.json.get(metas, 'overwirte.id', ''), 'value', value)}
                        }
                    />
                </div> 
            </div>
        )
    }

    return ui();
}

export default Comp;