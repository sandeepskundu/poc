import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import Textarea from 'aio-global-ui/atoms/form/textarea';
import OneOf from 'aio-app-ui-developer-atoms/storybook-input/one-of';

const Comp = (props) => {
    const dval = helpers.random.key();
    const storybook = helpers.storage.storybook.get('preview');
    const nodemap = helpers.json.get(props, 'item.nodemap', dval);
    const type = helpers.json.get(props, 'item.value.config.type', '');

    const value = (() => {
        let rv = helpers.json.get(storybook, `props.${nodemap}`, dval);

        if(rv != dval){
            return rv;
        }
    })();

    const onChange = (value,) => {
        if(nodemap != dval){
            let d = helpers.json.copy(storybook);
                d = helpers.json.set(d, `props.${nodemap}`, value, false, true);
                helpers.storage.storybook.set('preview', d);
                helpers.react.hooks.event.emit('PREVIEW_PROPS_CHANGES', helpers.json.get(d, 'props', {}));
        }
    }

    const ui = () => {
        switch (type) {
            case 'enum':
                return (
                    <OneOf
                        item={props.item}
                        value={value || ''}
                        enums={helpers.json.get(props, 'storybook.data.storybook.propTypes.enums', {})}
                        onChange={(a) => {
                            onChange(helpers.json.get(a, '0.label', ''));
                        }}
                    />
                )
            break;
            case 'boolean':
                return (
                    <Toggle
                        checkbox={{
                            checked:value || false
                        }}
                        label={{
                            text:`${value?'true':'false'}`
                        }}
                        callback={{
                            input:{
                                onChange:(checked) => {onChange(checked)}
                            }
                        }}
                    />
                )
            break;
            case 'string':
                return (
                    <Textarea
                        maxLength={5000}
                        value={value || ''}
                        callback={{
                            onChange:(value) => {onChange(value)}
                        }}
                    />
                )
            break;
            case 'any':
                return (
                    <Textarea
                        maxLength={5000}
                        value={value || ''}
                        callback={{
                            onChange:(value) => {onChange(value)}
                        }}
                    />
                )
            break;
            case 'number':
                return (
                    <Input
                        value={value || ''}
                        callback={{
                            onChange:(value) => {onChange(parseInt(value))}
                        }}
                    />
                )
            break;
            case 'function':
                return (
                    <Textarea
                        maxLength={5000}
                        value={value || ''}
                        callback={{
                            onChange:(value) => {onChange(value)}
                        }}
                    />
                )
            break;
            case 'object':
                return 'object'
            break;
            default:
                return <></>
        }
    }

    const desc = () => {
        let dsc = helpers.json.get(props, 'item.value.config.desc', '');
        
        return (dsc?<p className='full txt-xs pd-t16 pd-b8 bxs txt-c00107'>{dsc}</p>:<></>)
    }

    return (
        <div className='full bxs pd-tb16 pd-rl4'>
            {ui()}
            {desc()}
        </div>
        
    )
}

export default Comp;