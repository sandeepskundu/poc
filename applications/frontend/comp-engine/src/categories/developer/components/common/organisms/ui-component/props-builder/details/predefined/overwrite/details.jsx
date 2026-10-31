import Dvalue from './dvalue';
import Overwrite from './index';
import helpers from 'ui-helpers';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const node = props.node || {};
    const configs = props.configs || {};
    const templates = props.templates || {};
    const types = helpers.json.get(configs, 'types', []);
    const ptype = helpers.json.get(node, '__.editorDataType', '');
    const editable = (() => {
        if(!helpers.json.get(node, '__.nonEditable', false) || helpers.json.get(node, '__.showMetas', false)){
            return true;
        }
    })();

    const update = (id, field, value) => {
        templates.item.meta.item.actions.updateByKey(id, field, value);
    }

    const metas = (() => {
        let rval = {
            base:{},
            nonbase:[]
        }
        let base = {
            from:true,
            dvalue:true,
            mapping:true,
            required:true,
            overwrite:true,
            description:true
        };
        let list = helpers.json.get(node, '__.metas', []);

        for(let a in list){
            let item = list[a];

            if(item.key){
                if(base[item.key]){
                    rval.base[item.key] = item;
                }else{
                    rval.nonbase.push(item);
                }
            }
        };

        return rval;
    })();

    const required = () => {
        return (
            <li className='pd-r24 bxs hide'>
                <Toggle
                    label={{
                        text: "Required"
                    }}
                    checkbox={{
                        checked:helpers.json.get(metas, 'base.required.value', false)
                    }}
                    callback={{
                        input: {
                            onChange: (checked, b, c) => {
                                let id = helpers.json.get(metas, 'base.required.id', '');

                                if(id){
                                    templates.item.meta.item.actions.updateByKey(id, 'value', checked)
                                }else{
                                    templates.item.meta.item.actions.add({value:checked, key:'required'})
                                }
                            }
                        }
                    }}
                />
            </li>
        )
    }

    const setnull = () => {
        return (
            <li className='pd-r24 bxs'>
                {templates.item.nullable.input()}
            </li>
        )
    }

    const flags = () => {
        return (
            <ul className="full bxs pd-t24 bxs flx-vc">
                {required()}
                {setnull()}
            </ul>
        )
    };

    const overwitres = () => {
        if(ptype === 'predefined'){
            return (
                <Overwrite 
                    {...props}
                    data={helpers.json.get(metas, 'base.overwrite', {})}
                    mapping={helpers.json.get(metas, 'base.mapping.value', '')}
                    onChange={(value) => { update(helpers.json.get(metas, 'base.overwrite.id', ''), 'value', value)}}
                />
            )
        }
    }

    const ui = () => {
        if(editable){
            return (
                <>
                    <div className='full bxs pd-l16 pd-b16 bdr-c00104 bdr-1 bdr-tn bdr-rn bdr-bn'>
                        <Dvalue {...props} node={node} metas={metas} />
                        {flags()}
                    </div>
                    {overwitres()}
                </>
            )
        }else{
            return overwitres();
        }
    }

    return ui();
}

export default Comp;