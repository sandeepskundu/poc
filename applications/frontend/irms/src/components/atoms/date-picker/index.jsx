import helpers from 'ui-helpers';
import DatePicker from "react-datepicker";
import Input from 'aio-global-ui/atoms/form/input';
import {useEffect, useRef, forwardRef} from 'react';


const Comp = (dprops) => {
    const dProps = {
        selected:null,
        onChange:null,
        dropdownMode:'select',
        showYearDropdown:null,
        showMonthDropdown:null,
        inputProps:{
            label:'Select date'
        }
    }

    const props = helpers.element.jsx.props.define(dProps, dprops); 

    const DateInput = forwardRef(({ value, onClick, className }, ref) => (
        <div onClick={onClick} >
            <Input {...props.inputProps} ref={ref} value={value} readonly={true} />
        </div>
    ));

    const onChange = (date) => {
        if(props.onChange){
            props.onChange(date);
        }
    }
   
    const ui = () => {
         return (
            <DatePicker
                selected={props.selected}
                dropdownMode={props.dropdownMode}
                onChange={(date) => onChange(date)}
                showYearDropdown={props.dropdownMode}
                showMonthDropdown={props.dropdownMode}
                customInput={<DateInput className="example-custom-input" />}
            />
         )
    }

    return ui();
}

export default Comp;