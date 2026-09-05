import configs from './configs';
import helpers from 'ui-helpers';
import HtmlAttributes from 'aio-app-ui-organisms/html-attributes';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let parentItem = helpers.json.val(props, 'parent', {});
    let parent = helpers.json.val(props, 'parentmap', '');
        parent = `__${parent}__`

    const data = {
        attrs:helpers.json.val(props, 'attrs.attrs', {}),
        dataAttrs:helpers.json.val(props, 'attrs.dataAttrs', {})
    }

    const expended = (() => {
        return `${parent}.${helpers.json.val(props, 'expended.attrs', '')}`;
    })();

    const getmap = (arg) => {
        return `${parent}.${parentItem.expendMap}`;
    }

    const doexpend = (map) => {
        if(props.onExpend){
            props.onExpend(helpers.string.replace.word(map, `${parent}.`, ''));
        }
    }
   
    const onChange = (arg, type) => {
        let d = helpers.json.copy(data);
            delete d[type];
            d[type] = arg;

            if(props.onChange){
                props.onChange(d);
            }
    }

    const ui = () => {
        switch (parentItem.id){
            case 'attrs':
                return (
                    <HtmlAttributes
                        configs={configs}
                        expended={expended}
                        onExpend={doexpend}
                        expendmap={getmap()}
                        type={parentItem.id}
                        onChange={(d) => {onChange(d, parentItem.id)}}
                        data={helpers.json.val(data, parentItem.id, {})}
                        runtimeData={helpers.json.val(props, 'runtimeData', {})}
                    />
                )
            break;
            case 'dataAttrs':
                return (
                    <HtmlAttributes
                        configs={configs}
                        expended={expended}
                        onExpend={doexpend}
                        expendmap={getmap()}
                        type={parentItem.id}
                        onChange={(d) => {onChange(d, parentItem.id)}}
                        data={helpers.json.val(data, parentItem.id, {})}
                        runtimeData={helpers.json.val(props, 'runtimeData', {})}
                    />
                )
            break;
            default:
                return <></>
        }
    }

    return ui();
}

export default Comp;