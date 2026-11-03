import Enums from './enums';
import helpers from 'ui-helpers';
import Input from 'aio-global-raw-ui/atoms/form/input';
import Textarea from 'aio-global-ui/atoms/form/textarea';
import Select from 'aio-global-raw-ui/atoms/form/select';

const booleans = (() => {
    let ops = ['true', 'false'].map((a, i) => {
        return {
            id: a,
            label: a
        }
    })
    return helpers.array.toIndexJson(ops, {});
})();

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const enabled = {
        any:true,
        jsx:true,
        enum:true,
        number:true,
        string:true,
        object:true,
        boolean:true,
        function:true
    };

    const node = props.node || {};
    const metas = props.metas || {};
    const builder = props.builder || {};
    const templates = props.templates || {};
    
    
    const meta = helpers.json.get(metas, 'base.dvalue', {});
    const type =  helpers.json.get(node, '__.editorDataType', helpers.json.get(node, '__.type', ''));

    const isFunction = (str) => {
        if (typeof str !== 'string' || !str.trim()){
            return false;
        };

        return /^(function\s*\(|function\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(|\([^)]*\)\s*=>|[^=]+\s*=>)/.test(str.trim());
    };

    const isObject = (str) => {
        if (typeof str !== 'string' || !str.trim()) {
            return false;
        }

        try {
            const parsed = JSON.parse(str);
            return typeof parsed === 'object' && parsed !== null;
        } catch (error) {
            return false;
        }
    };

    const value = (() => {
        let v = helpers.json.get(meta, 'value', '');

        switch (type) {
            case 'object':
                return JSON.stringify(v || {}, null, 4)
            break;
            default:
                return `${v}`
        }
    })();

    const parse = (val) => {
        switch (type) {
            case 'object':
                if(isObject(val)){
                    return JSON.parse(val);
                }else{
                    return JSON.parse(value);
                }
            break;
            default:
                return val
        }
    }

    const update = (val) => {
        if(meta.id){
            templates.item.meta.item.actions.updateByKey(meta.id, 'value', parse(val))
        }else{
            templates.item.meta.item.actions.add({value:val, key:'dvalue'})
        }
    }

    const textare = () => {
        return (
            <Textarea
                key={type}
                value={value || ''}
                label="Default value"
                placeholder="Enter default value"
                callback={{
                    onChange:(val, b, c) => {update(val)}
                }}
            />
        )
    }

    const bool = () => {
        return (
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
                        update(helpers.json.get(a, '0.id'));
                    }
                }}
                data={{
                    list:booleans,
                    selected: {
                        0: {
                            id:value || '',
                            label:value || ''
                        }
                    }
                }}
            />
        )
    }

    const input = () => {
        return (
            <Input
                value={value || ''}
                label='Default value'
                placeholder='Ender default value'
                callback={{
                    onChange: (val) => {
                        update(val);
                    }
                }}
            />
        )
    }

    const enums = () => {
        return <Enums {...props} />
    }

    const byType = () => {
        switch (type){
            case 'any':
                return textare();
            break;
            case 'jsx':
                return textare();
            break;
            case 'number':
                return input();
            break;
            case 'string':
                return textare();
            break;
            case 'object':
                return textare();
            break;
            case 'boolean':
                return bool();
            break;
            case 'function':
                return textare();
            break;
            case 'enum':
                return enums();
            break;
            default: 
                return <></>
        }
    }

    const ui = () => {
        if(type && enabled[type]){
            return (
                <div className='full bxs pd-t24'>
                    {byType()}
                </div>
            )
        }
    }

    return ui();
}

export default Comp;