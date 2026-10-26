
import helpers from 'ui-helpers';
import Select from 'aio-global-raw-ui/atoms/form/select';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const node = props.node || {};
    const metas = props.metas || {};
    const templates = props.templates || {};
    const metaId = helpers.json.get(metas, 'base.dvalue.id', '');
    const metaValue = helpers.json.get(metas, 'base.dvalue.value', '');

    const enumMap = (() => {
        let rv = {};
        let m = helpers.json.get(node, '__.children.0.__.children.0.__.metas', []);

        for(let a in m){
            let i = m[a];
            if(i && i.key && i.value){
                rv[i.key] = i.value;
            }
        }

        return rv;
    })();

    const options = (() => {
        let rv = {};
        let opt = helpers.json.get(enumMap, 'options', '');

        if(opt){
            opt = opt.split('|');
        }

        if(enumMap && enumMap.mapping){
            let opts = helpers.json.get(props, `configs.enums.${enumMap.mapping}`, {});
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