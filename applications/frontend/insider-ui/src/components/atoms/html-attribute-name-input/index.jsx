import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const PropDescription = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'name';
    const details = helpers.json.val(props, 'data', {});
    const siblings = helpers.json.val(props, 'parent', {});
    const type = helpers.json.val(props, 'type', 'attrs') // 
    const htmlAttrs = (() => {

        if(type === 'attrs'){
            return helpers.json.val(props, `configs.htmlAttrs`, {});
        }else{
            return helpers.json.val(props, `configs.${type}`, {});
        }
    })();

    const onChange = (e) => {
        let d = helpers.json.copy(details);
        let v = helpers.json.val(e, 'target.value', '');
            v = v.toLowerCase();

            if(type === 'attrs'){
                if(!siblings[v] && htmlAttrs[v]){
                    d[map] = v;
                }else{
                    d[map] = '';
                }
            }else{
                if(!siblings[v]){
                    d[map] = v;
                }else{
                    d[map] = '';
                }
            }

            if(props.onUpdate){
                props.onUpdate(d);
            }
    }

    return (
        <Input 
            label="Attribute name"
            pattern="html-attr"
            onChange={(e) => {onChange(e)}}
            value={helpers.json.val(details, map, '')}
        />
    )
}

export default PropDescription;