
import helpers from 'ui-helpers';
import DeleteLink from 'aio-app-ui-tdc-application-molecules/data-validation-req-delete';
import DataValidationRegex from 'aio-app-ui-tdc-application-organisms/data-validation-regex';
import DataValidationEnums from 'aio-app-ui-tdc-application-organisms/data-validation-enums';
import DataValidationObject from 'aio-app-ui-tdc-application-organisms/data-validation-object';
import DataValidationDefault from 'aio-app-ui-tdc-application-organisms/data-validation-default'
import DataValidationRequired from 'aio-app-ui-tdc-application-organisms/data-validation-required';
import DataValidationTextLength from 'aio-app-ui-tdc-application-organisms/data-validation-text-lengths';
import DataValidationMinMaxValue from 'aio-app-ui-tdc-application-organisms/data-validation-min-max-value';
import DataValidationMinMaxLength from 'aio-app-ui-tdc-application-organisms/data-validation-min-max-length'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type.id');
    const mapping = helpers.json.val(props, 'mapping', []);
    const parentId = helpers.json.val(props, 'parentId', '');
    const active = helpers.json.val(props, 'expend.validation', '');

    const expend = (() => {
        let map = mapping.join('.')
        return (active.indexOf(`${parentId}.${map}`) === 0)
    })(); 

    const toggle = () => {
        if(props.onExpend){
            let map = [...mapping];

            if(expend){
                map.pop();
                map = map.join('.');
            }else{
                map = map.join('.');
            }
            
            props.onExpend(`${parentId}.${map}`);
        }
    }

    const dlink = () => {
        return (
            <DeleteLink 
                clear={true}
                mapping={[...mapping]}
                details={props.details}
                configs={props.configs}
                onChange={props.onChange}
                validation={props.validation}
                type={helpers.json.val(props, 'type.id')}
            />
        )
    }

    const header = () => {
        return (
            <div className='full bxs pd-tb8'>
                <div className='full bxs flx-sb'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 pd-l6 txt-sm'>
                            {helpers.json.val(props, 'type.label', '')}
                        </li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        {dlink()}
                        <li className='pd-l10 cp txt-xs link-u ns'>
                            <span onClick={() => toggle()}>{expend?'Collapse':'Expend'}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    const template = () => {
        switch (type) {
            case 'default':
                return <DataValidationDefault {...props} />
            break;
            case 'required':
                return <DataValidationRequired {...props} />
            break;
            case 'lengths':
                return <DataValidationTextLength {...props} />
            break;
            case 'maxvalue':
            case 'minvalue':
                return <DataValidationMinMaxValue {...props} valuetype={type} />
            break;
            case 'minlength':
            case 'maxlength':
                return <DataValidationMinMaxLength {...props} valuetype={type} />
            break;
            case 'object':
                return <DataValidationObject {...props} />
            break;
            case 'regex':
                return <DataValidationRegex {...props} />
            break;
            case 'enums':
                return <DataValidationEnums {...props} />
            break;
            default:
                return <></>
        }
    }

    const details = () => {
        if(expend){
            return (
                <div className="full">
                    {template()}
                </div>  
            )
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <div className='full bxs grid-wrapper bdr-c00104 bdr-1 bdr-wrln bdr-wbn pd-rl10'>
                {header()}
                {details()}
            </div>
        )
    }

    return ui();
}

export default Comp;