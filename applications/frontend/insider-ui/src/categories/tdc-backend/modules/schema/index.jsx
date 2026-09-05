import helpers from 'ui-helpers';
import validation from './validation';

export default {
    validation:validation,
    update(arg, props) {
        if(props.onChange){
            props.onChange(arg, helpers.json.val(props, 'selected', []));
        }
    }
}