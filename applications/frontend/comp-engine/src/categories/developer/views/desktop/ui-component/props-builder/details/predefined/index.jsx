
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
    const isroot = helpers.json.get(props, 'editorProps.editorConfigs.utils.isRoot');
    const [metas, setMetas] = useState(helpers.json.get(details, 'metaMap', {}));

    const fromval = helpers.json.get(metas, 'from.value', '');
    const mappingval = helpers.json.get(metas, 'mapping.value', '');

    console.log('metas', metas);

    const updateMetas = (type, value) => {
        let m = helpers.json.copy(metas);
            m[type].value = value;
            setMetas(m);
    }

    const update = (id, field, value) => {
        templates.item.meta.item.actions.updateByKey(id, field, value, details.id)
    }

    const from = () => {

        if(isroot){
            return (
                <From
                    selected={fromval}
                    onChange={(value) => {
                        update(helpers.json.get(metas, 'from.id', ''), 'value', value)}
                    }
                />
            )
        }else{
            if(fromval){
                return <li className='full bxs txt-xs'><span className='fm-sb txt-sm'>From:</span> {fromval}</li>
            }
        }
    }

    const key = () => {
        return helpers.json.get(metas, 'mapping.value', '')+fromval
    }

    const mapping = () => {
        if(isroot){
            return (
                <div className='full bxs pd-t8'>
                    <Mapping
                        configs={props.configs} 
                        data={helpers.json.get(metas, 'mapping', {})} 
                        onChange={(value) => {
                            templates.item.meta.item.actions.updateMetaDetailsByKey({
                                [helpers.json.get(metas, 'mapping.id', '')]:{
                                    value:value 
                                },
                                [helpers.json.get(metas, 'overwrite.id', '')]:{
                                    value:{}
                                }
                            }, details.id);
                            updateMetas('overwrite', {});
                            updateMetas('mapping', value)
                        }}
                    />
                </div>
            )
        }else{
            if(mappingval){
                return <li className='full bxs txt-xs mr-t6'><span className='fm-sb txt-sm'>Mapping:</span> {mappingval}</li>
            }
        }
    }

    const mapui = () => {
        return (
            <div className='full bxs pd-ln'>
                <div className='full bxs'>
                    <div className='full pd-l16 bxs pd-b16'>
                        {from()}
                        {mapping()}
                    </div>
                    <Overwrite 
                        {...props}
                        key={key()}
                        data={helpers.json.get(metas, 'overwrite', {})}
                        mapping={helpers.json.get(metas, 'mapping.value', '')}
                        onChange={(value) => {
                            update(helpers.json.get(metas, 'overwrite.id', ''), 'value', value);
                            updateMetas('overwrite', value);
                        }}
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