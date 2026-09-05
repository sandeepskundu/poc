import helpers from 'ui-helpers';
import AddNewLink from 'aio-app-ui-tdc-application-molecules/data-validation-req-add-new';
import ValidationReqDataItemDetails from 'aio-app-ui-tdc-application-molecules/validation-req-data-item-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const validation = helpers.json.val(props, 'validation', {});
    const list = helpers.json.keys(validation);
    const parentId = helpers.json.val(props, 'parentId', '');

    const cls = (i) => {
        let rval = ['full bdr-c00104 bdr-1 bdr-wrln bdr-wbn bxs']
        let odd = helpers.is.odd(i);

            if(odd){
                rval.push('bg-c00103');
            }
        return rval.join(' ')
    }

    const onAddnew = (arg, map, reset) => {
        if(props.onChange){
            props.onChange(arg, map, reset);
        };

        if(props.onExpend){
            props.onExpend(`${parentId}.${map}`);
        }
    }

    const letsStart = (id) => {
        return <label className="link-u ns cp txt-xs link-u" htmlFor={id}>Lets start</label>
    }

    const add = () => {
        return (
            <AddNewLink
                label={letsStart}
                type={props.type}
                onChange={onAddnew}
                mapping={[props.type]}
                details={props.details}
                configs={props.configs}
                validation={validation}
            />
        )
    }

    const ui = () => {
        if(list && list.length > 0){
            return list.map((name, i) => {
                return (
                    <div className={cls(i)} key={id+i}>
                        <ValidationReqDataItemDetails
                            {...props}
                            node={name}
                            type={props.type}
                            details={props.details}
                            configs={props.configs}
                            onChange={props.onChange}
                            mapping={[props.type, name]}
                            validation={helpers.json.val(validation, name, {})}
                        />
                    </div>
                )
            })
        }

        return (
            <div className='full bxs pd-rl8 pd-b20 pd-t12'>
                <p className='txt-x fm-md'>Request {props.type} data configuration is not added yet?</p>
                <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                {add()}
            </div>
        )
    }

    return ui();
}

export default Comp;