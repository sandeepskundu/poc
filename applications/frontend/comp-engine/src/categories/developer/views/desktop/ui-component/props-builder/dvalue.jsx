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
        number:true,
        string:true,
        object:true,
        boolean:true,
        function:true
    };

    const meta = props.meta || {};
    const node = props.node || {};
    const builder = props.builder || {};
    const templates = props.templates || {};
    const type = helpers.json.get(node, '__.type', '');

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
                return `${v || ''}`
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
        templates.item.meta.item.actions.updateByKey(meta.id, 'value', parse(val))
    }

    console.log(type, value);

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

    const ui = () => {
        if(type && enabled[type]){
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
                default: 
                    return <></>
            }
        }
    }

    return ui();
}

export default Comp;