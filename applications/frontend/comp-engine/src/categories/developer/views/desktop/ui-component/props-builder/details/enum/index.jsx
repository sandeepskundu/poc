
import From from './from';
import Mapping from './mapping';
import helpers from 'ui-helpers';
import Common from './../common';
import {useState, useEffect} from 'react';

const getLiveMetaMap = (details) => {
    const metaList = helpers.json.get(details, 'metas', []);

    if (helpers.data.type.is(metaList, 'list') && metaList.length > 0) {
        const map = {};

        for (let i = 0; i < metaList.length; i++) {
            const item = metaList[i];

            if (item && item.key) {
                map[item.key] = item;
            }
        }

        return map;
    }

    return helpers.json.copy(helpers.json.get(details, 'metaMap', {}));
};

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const node = props.node || {};
    const templates = props.templates || {};
    const details = helpers.json.get(node, '__.children.0.__.children.0.__', helpers.json.get(node, '__.details.__', {}));
    const [metas, setMetas] = useState(() => getLiveMetaMap(details));

    useEffect(() => {
        setMetas(getLiveMetaMap(details));
    }, [details.metas]);

    const fromval = helpers.json.get(metas, 'from.value', '');

    const baseMetas = (() => {
        let rval = {
            base:{},
            nonbase:[]
        }
        let base = {
            dvalue:true,
            required:true,
            description:true
        };
        let list = helpers.json.get(node, '__.metas', []);

        for(let a in list){
            let item = list[a];

            if(item && item.key){
                if(base[item.key]){
                    rval.base[item.key] = item;
                }else{
                    rval.nonbase.push(item);
                }
            }
        };

        return rval;
    })();

    const updateMetas = (type, value) => {
        setMetas((prev) => {
            let m = helpers.json.copy(prev);
            if (m[type]) {
                m[type].value = value;
            }
            return m;
        });
    }

    const update = (id, field, value) => {
        templates.item.meta.item.actions.updateByKey(id, field, value, details.id)
    }

    const from = () => {
        return (
            <From
                selected={helpers.json.get(metas, 'from.value', '')}
                onChange={(value) => {
                    update(helpers.json.get(metas, 'from.id', ''), 'value', value);
                    updateMetas('from', value)
                }}
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
                        {fromval && <Mapping
                            key={key()}
                            {...props}
                            metas={metas}
                            configs={props.configs}
                            dvalue={baseMetas.base.dvalue}
                            onChange={(value) => {
                                update(helpers.json.get(metas, 'mapping.id', ''), 'value', value);
                                updateMetas('mapping', value);
                            }}
                        />}
                    </div>
                </div> 
            </div>
        )
    }

    return (
        <div className='full'>
            <Common 
                {...props}
                exclude={{
                    dvalue:true
                }} 
            />
            {mapui()}
        </div>
    )
}


export default Comp;