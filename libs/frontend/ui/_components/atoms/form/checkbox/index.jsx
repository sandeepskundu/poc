import helpers from 'ui-helpers';
import {useRef, forwardRef} from "react";
import Choice from 'aio-global-ui/atoms/form/choice';

const Comp = forwardRef((dprops, forwardedRef) => {
    return <Choice {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops)} ref={(forwardedRef || useRef(null))} mode="checkbox" />;
});

export default Comp;