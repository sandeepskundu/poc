import {forwardRef} from "react";
import helpers from 'ui-helpers';
import Icon from 'aio-global-ui/atoms/icons';
    
const Comp = forwardRef((dprops, forwardedRef) => {
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
        props = helpers.json.merge(props, {
            'config':{
                "svg":null,
                "type":"font",
                'ds':{
                    'css':{
                        'class':{
                            'shadow':null,
                            'radius':null,
                            'border':null,
                            'family':null,
                            'fontsize':null
                        },
                        'flags':{
                            'rounded':null,
                            'noBorder':null,
                            'disabled':null,
                            'isDisplay':null,
                            'boxSizing':null,
                        }
                    }
                }
            }
        });

    const ui = () => {
        let n = helpers.json.get(props, 'config.icon.name');
        let f = helpers.json.get(props, 'config.icon.family')

        if(n && f){
            return <Icon config={props.config || {}} callback={props.callback || {}} />
        }else{
            return <></>
        }
        
    }

    return ui();
});

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;