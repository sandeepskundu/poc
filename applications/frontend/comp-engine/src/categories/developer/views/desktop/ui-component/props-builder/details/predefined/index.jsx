
import From from './from';
import {useState} from 'react';
import Mapping from './mapping';
import helpers from 'ui-helpers';
import Common from './../common';
import Overwrite from './overwrite';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const node = props.node || {};
    const templates = props.templates || {};
    const details = helpers.json.get(node, '__.details.__', {});
    const [metas, setMetas] = useState(helpers.json.get(details, 'metaMap', {}));

    const updateMetas = (type, value) => {
        let m = helpers.json.copy(metas);
            m[type].value = value;
            setMetas(m);
    }

    const update = (id, field, value) => {
        templates.item.meta.item.actions.updateByKey(id, field, value, details.id)
    }

    const from = () => {
        return (
            <From
                selected={helpers.json.get(metas, 'from.value', '')}
                onChange={(value) => {
                    update(helpers.json.get(metas, 'from.id', ''), 'value', value)}
                }
            />
        )
    }

    const key = () => {
        return helpers.json.get(metas, 'mapping.value', '')+helpers.json.get(metas, 'from.value', '')
    }

    const mapui = () => {
        return (
            <div className='full bxs pd-ln'>
                <div className='full bxs pd-t8'>
                    <div className='full pd-l16 bxs pd-b16'>
                        {from()}
                        <Mapping
                            configs={props.configs} 
                            data={helpers.json.get(metas, 'mapping', {})} 
                            onChange={(value) => {
                                templates.item.meta.item.actions.updateMetaDetailsByKey({
                                    [helpers.json.get(metas, 'mapping.id', '')]:{
                                        value:value 
                                    },
                                    [helpers.json.get(metas, 'overwirte.id', '')]:{
                                        value:{}
                                    }
                                }, details.id);
                                updateMetas('overwirte', {});
                                updateMetas('mapping', value)
                            }}
                        />
                    </div>
                    <Overwrite 
                        {...props}
                        key={key()}
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

    return (
        <div className='full'>
            <Common {...props} />
            {mapui()}
        </div>
        
    )
}


export default Comp;
