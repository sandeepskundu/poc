import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';
import React, {useEffect, createElement, useMemo} from 'react';

const PaginationLimiInput = (props) => {

    const onChange = (e) => {
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.remove.nonnumber(val);

            if(props.onChange){
                props.onChange(val);
            }
    }

    return (
        <div className='full bxs'>
            <Input
                pattern="number"
                max={props.max}
                min={props.min}
                label={props.label}
                value={props.value}
                onChange={(e) => {onChange(e)}}
            />
        </div>
    )
}

export default PaginationLimiInput;