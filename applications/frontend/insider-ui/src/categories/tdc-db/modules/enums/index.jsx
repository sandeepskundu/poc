import ENUMS from './enums';
import helpers from 'ui-helpers';

export default {

    get:{
        defaultValue:(arg) => {
            let type = helpers.json.val(arg, 'id', '');
                return helpers.json.val(ENUMS, `SCHEMA_TYPES.DEFAULT_VALUES.${type.toUpperCase()}`, {});
        },

        defaultOptionsValue(arg, props, fallback){
            let type = helpers.json.val(arg, 'id', '');
            let rval = helpers.json.val(ENUMS, `SCHEMA_OPTIONS.DEFAULT_VALUES.${type.toUpperCase()}`, {});

                if(type === 'default'){
                    let pt = helpers.json.val(props, 'details.type', '');

                        return helpers.json.val(rval, pt.toUpperCase(), fallback);
                }else{
                    return rval;
                }

                
        }
    }
}