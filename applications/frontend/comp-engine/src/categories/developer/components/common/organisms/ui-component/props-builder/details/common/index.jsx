import Dvalue from './dvalue';
import helpers from 'ui-helpers';
import Textarea from 'aio-global-ui/atoms/form/textarea';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const node = props.node || {};
    const configs = props.configs || {};
    const templates = props.templates || {};
    const types = helpers.json.get(configs, 'types', []);
    const keyval = helpers.json.get(node, '__.key', '');
    const dtype = helpers.json.get(node, '__.type', '');
    const editable = !helpers.json.get(node, '__.nonEditable', false);
    const isroot = helpers.json.get(props, 'editorProps.editorConfigs.utils.isRoot');
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
    const desc = helpers.json.get(metas, 'base.description.value', '');

    const key = () => {
        let show = helpers.json.get(templates, 'item.key.show', false);

        if(show){

            if(isroot){
                return (
                    <li className='grid bxs'>
                        {templates.item.key.input('Key name', '')}
                    </li>
                )
            }else{
                return <li className='grid bxs txt-xs'><span className='fm-sb txt-sm'>Name:</span> {keyval}</li>
            }
        }
    }

    const type = () => {
        if(keyval){
            if(isroot){
                return (
                    <li className='grid pd-l24 bxs'>
                        {templates.item.type.input('Data type')}
                    </li>
                )
            }else{
                return <li className='grid bxs txt-xs'><span className='fm-sb txt-sm'>Data type:</span> {dtype}</li>
            }
        }
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
        if(keyval){
            return (
                <li className='pd-r24 bxs'>
                    {templates.item.nullable.input()}
                </li>
            )
        }
    }

    const flags = () => {
        if(keyval){
            return (
                <ul className="full bxs pd-t24 bxs flx-vc">
                    {required()}
                    {setnull()}
                </ul>
            )
        }
    }

    const showKeyAndType = (() => {
        return types.includes(helpers.json.get(node, '__.type', ''))
    })();

    const keyAndType = () => {
        if(showKeyAndType){
            return (
                <>
                    <ul className="full bxs grid-wrapper grid-layout-2 pd-t24 bxs">
                        {key()}
                        {type()}
                    </ul>
                </>
            )
        }
    }

    const description = () => {
        if(keyval){
            if(isroot){
                return (
                    <div className='full bxs pd-t24'>
                        <Textarea 
                            label="Description"
                            placeholder="Description"
                            value={helpers.json.get(metas, 'base.description.value', '')}
                            callback={{
                                onChange:(a, b, c) => {
                                    templates.item.meta.item.actions.updateByKey(metas.base.description.id, 'value', a)
                                }
                            }}
                        />
                    </div>
                )
            }else{
                if(desc){
                    return <p className='full bxs txt-xs pd-t16'><span className='fm-sb txt-sm'>Description:</span> {desc}</p>
                }
            }
        }
    }

    const dvalue = () => {
        let has = helpers.json.get(metas, 'base.dvalue.id', '');
        let show = !helpers.json.get(props, 'exclude.dvalue', false);

        if(has && keyval && show){
            return (
                <div className='full bxs pd-t24'>
                    <Dvalue {...props} node={node} meta={metas.base.dvalue} builder={props.builder} templates={props.templates}  />
                </div>
            )
        }
    }

    const ui = () => {
        if(editable){
            return (
                <div className='full bxs pd-l16 pd-b16' key={node.__.type}>
                    {keyAndType()}
                    {description()}
                    {dvalue()}
                    {flags()}
                </div>
            )
        }else{
            return <></>
        }
    }

    return ui();
}

export default Comp;