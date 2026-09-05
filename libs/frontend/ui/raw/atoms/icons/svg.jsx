import {forwardRef} from "react";
import helpers from 'ui-helpers';
import Icon from 'aio-global-raw-ui/atoms/icons';
    
const Comp = forwardRef((dprops, forwardedRef) => {
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
        props = helpers.json.merge(props, {
            'config':{
                "icon":null,
                "type":"svg",
            }
        });

    const ui = () => {
        let src = helpers.json.get(props, 'config.svg.src');

        if(src){
            return <Icon config={props.config || {}} callback={props.callback || {}} />
        }else{
            return <></>
        }
        
    }

    return ui();
});

export default Comp;