import React from 'react';
import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(16);
    let methods = helpers.json.val(props, 'validation.methods', {});
    let options = helpers.json.val(props, 'configs.validation.methods', {});

    const enabled = (arg) => {
        let n = helpers.json.val(arg, 'id');
            return helpers.json.val(methods, `${n}.allowed`);
    }

    const config = (checked, arg) => {
        const lbl = helpers.json.val(arg, 'label');
        return {
            "allowed":checked,
            "message":{
                "success":`${lbl} method is allowed`,
                "error":`${lbl} method is not allowed`
            }
        }
    }

    const onChange = (checked, arg) => {
        let d = helpers.json.copy(methods);
        let n = helpers.json.val(arg, 'id');

        if(checked){
            let md = config(checked, arg);
                md = helpers.json.merge(md, helpers.json.val(d, n, {}));
                d = helpers.json.set(d, n, md);
        }else{
            helpers.json.remove(d, n);
        }

        if(props.onChange){
            props.onChange(d);
        }
    }

    const list = () => {
        let li = helpers.json.toList(options || {})

        return li.map((arg, i) => {
            return (
                <div className='full pd-t20' key={id+i}>
                    <Toggle 
                        label={arg.label}
                        checked={enabled(arg)}
                        onChange={(checked) => {
                            onChange(checked, arg);
                        }}
                    />
                </div>
            )
        });
    }

    return (
        <div className='pd-rl20 full bxs pd-t30'>
            <p class="txt-md fm-md">Request methods</p>
            {list()}
        </div>
    )
}

export default Comp;