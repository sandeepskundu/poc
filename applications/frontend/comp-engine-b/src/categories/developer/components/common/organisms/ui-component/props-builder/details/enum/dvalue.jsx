
import helpers from 'ui-helpers';
import Select from 'aio-global-raw-ui/atoms/form/select';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const node = props.node || {};
    const metas = props.metas || {};
    const templates = props.templates || {};
    const metaId = helpers.json.get(metas, 'dvalue.id', '');
    const metaValue = helpers.json.get(metas, 'dvalue.value', '');

    const options = (() => {
        let rv = {};
        let opt = helpers.json.get(metas, 'options.value', '');
        let map = helpers.json.get(metas, 'mapping.value', '');

        if(opt){
            opt = opt.split('|');
        }

        if(map){
            let opts = helpers.json.get(props, `configs.enums.${map}`, {});
                opts = helpers.json.keys(opts);

            if(opt && opt.length > 0){
                opts = opts.concat(opt);
            };

            if(opts && opts.length > 0){
                opts = helpers.array.removeDuplicate(opts);

                opts = opts.map((a, i) => {
                    return {
                        id: a,
                        label: a
                    }
                });

                rv = helpers.array.toIndexJson(opts, {});
            }
        }

        return rv;
    })();

    return (
        <ul className='full grid-wrapper grid-layout-2'>
            <Select
                input={{
                    label:'Default value',
                    placeholder:'Select default value'
                }}
                mapping={{
                    selected: {
                        0: 'id'
                    }
                }}
                closeOn={{
                    blur: false
                }}
                callback={{
                    onSelect: (a, b, c, d) => {
                        let val = helpers.json.get(a, '0.id');
                        if(metaId){
                            templates.item.meta.item.actions.updateByKey(metaId, 'value', `${val}`)
                        }else{
                            templates.item.meta.item.actions.add({value:`${val}`, key:'dvalue'})
                        }
                    }
                }}
                data={{
                    list:options,
                    selected: {
                        0: {
                            id:metaValue || '',
                            label:metaValue || ''
                        }
                    }
                }}
            />
        </ul>
    )

}

export default Comp;