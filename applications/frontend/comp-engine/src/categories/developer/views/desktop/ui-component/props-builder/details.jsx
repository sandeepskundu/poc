import Metas from './metas';
import Dvalue from './dvalue';
import helpers from 'ui-helpers';
import Textarea from 'aio-global-ui/atoms/form/textarea';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const node = props.node || {};
    const configs = props.configs || {};
    const builder = props.builder || {};
    const templates = props.templates || {};
    const types = helpers.json.get(configs, 'types', []);
    const editable = !helpers.json.get(node, '__.nonEditable', false);

    console.log(node.__)

    const metas = (() => {
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

    const key = () => {
        let show = helpers.json.get(templates, 'item.key.show', false);

        if(show){
            return (
                <li className='grid bxs'>
                    {templates.item.key.input('Key name', '')}
                </li>
            )
        }
    }

    const type = () => {
        return (
            <li className='grid pd-l24 bxs'>
                {templates.item.type.input('Data type', '')}
            </li>
        )
    }

    const required = () => {
        return (
            <li className='pd-r24 bxs'>
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
                                templates.item.meta.item.actions.updateByKey(metas.base.required.id, 'value', checked)
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
    }

    const showKeyAndType = (() => {
        return types.includes(helpers.json.get(node, '__.type', ''))
    })();

    const keyAndType = () => {
        if(showKeyAndType){
            return (
                <>
                    <ul className="full bxs grid-wrapper grid-layout-2 pd-tb24 bxs">
                        {key()}
                        {type()}
                    </ul>
                </>
                
            )
        }
    }

    const description = () => {
        return (
            <Textarea 
                label="Description"
                placeholder="Description"
                callback={{
                    onChange:(a, b, c) => {
                        templates.item.meta.item.actions.updateByKey(metas.base.description.id, 'value', a)
                    }
                }}
            />
        )
    }

    const dvalue = () => {
        let has = helpers.json.get(metas, 'base.dvalue.id', '');

        if(has){
            return (
                <div className='full bxs pd-t24'>
                    <Dvalue node={node} meta={metas.base.dvalue} builder={props.builder} templates={props.templates}  />
                </div>
            )
        }
    }

    const ui = () => {
        if(editable){
            return (
                <div className='full bxs pd-l16 pd-b16 bdr-c00104 bdr-1 bdr-tn bdr-rn bdr-bn'>
                    {keyAndType()}
                    {description()}
                    {dvalue()}
                    {flags()}
                    <Metas {...props} metas={metas.nonbase} />
                </div>
            )
        }else{
            return <Metas {...props} metas={metas.nonbase} />
        }
    }

    return ui();
}

export default Comp;