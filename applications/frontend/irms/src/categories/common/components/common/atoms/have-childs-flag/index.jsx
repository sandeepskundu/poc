import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'hasChilds';
    const details = helpers.json.val(props, 'details', {});

    const onToggle = (checked) => {
        let d = helpers.json.copy(details);
            d.hasChilds = checked;

            if(checked){
                delete d.details 
            }else{
                d.details = {
                    code:'',
                    label:''
                }
            }

            if(props.onChange){
                props.onChange(d);
            }
    }

    const ui = () => {
        return (
            <Toggle
                label='Have child roles?'
                checked={helpers.json.val(details, map)}
                onChange={(checked) => {onToggle(checked)}}
            />
        )
    }

    return ui();
}

export default Comp;