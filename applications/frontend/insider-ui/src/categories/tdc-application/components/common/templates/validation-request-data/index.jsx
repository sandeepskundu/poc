import helpers from 'ui-helpers';
import ValidationReqDataTypes from 'aio-app-ui-tdc-application-organisms/validation-req-data-types';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const validation = helpers.json.val(props, 'validation.validation', {});
    const id = helpers.random.id(16);
    const list = helpers.json.keys(validation);

    const onChange = (arg, map, reset) => {
        let d = helpers.json.copy(validation);

        if(reset && map){
            helpers.json.remove(d, map)
        }

        d = helpers.json.set(d, map, arg);

        if(props.onChange){
            props.onChange(d, 'validation', true);
        }
    }
 
    const cls = (i) => {
        let rval = ['full']
        let odd = helpers.is.odd(i);

        if(odd){
            rval.push('bg-c00101')
        }

        return rval.join(' ')
    }

    const ui = () => {
        if(list && list.length > 0){
            return list.map((type, i) => {
                return (
                    <div className={cls(i)} key={id+i}>
                        <ValidationReqDataTypes
                            {...props}
                            type={type}
                            length={list.length}
                            configs={props.configs}
                            details={props.details}
                            validation={helpers.json.val(validation, type)}
                            onChange={(arg, map, reset) => {onChange(arg, map, reset)}}
                        />
                    </div>
                )
            })
        }
    }

    return (
        <div className='full bxs pd-rl10'>
            {ui()}
        </div>
    )
}

export default Comp;