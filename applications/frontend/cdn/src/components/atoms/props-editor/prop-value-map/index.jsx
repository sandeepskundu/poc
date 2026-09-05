import helpers from 'ui-helpers';

import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useState, useEffect, useRef} from 'react';

const PropValueMap = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);
    let rdata = helpers.json.val(props, 'rdata', {});
    let index = helpers.json.val(props, 'index', 0);
    
    const onChange = (arg, name, index, valm, dd, islast) => {
        let vm = [...valm];
        let v = helpers.json.val(arg, 'id', '');

            if(!islast){
                vm.pop();
            };

            vm.push(v);

            if(props.onChange){
                props.onChange(vm);
            }
    }

    const list = (dd) => {
        let rval = {};

        for(const a in dd){
            rval[a] = {
                id:a,
                label:a
            }
        }

        return rval;
    };

    const label = (name, index, valm, dd, islast) => {
        if(islast){
            return 'Select map'
        }else{
            if(valm && valm.length > 1){
                return `Child of ${valm.slice(-2, -1)[0]}`
            }else{
                return `Root node`
            }
        }
    }

    const selectbox = (name, index, valm, dd, islast) => {
        return (
            <SelectBox 
                list={list(dd)}
                noBlank={true}
                selected={name || {}} 
                selectBoxProps={{
                    label:label(name, index, valm, dd, islast),
                    onSelect:(el, arg, i) => {onChange(arg, name, index, valm, dd, islast)}
                }}
            />
        )
    }

    const getData = (i, valm, islast) => {
        let vml = [...valm];

        if(!islast){
            vml.pop();
        }

        if(vml && vml.length > 0){
            return helpers.json.val(rdata, vml.join('.'), {});;
        }

        return rdata;
    }

    const last = (name, index, valm, islast) => {
        if(islast && name){
            const dd = getData(index, valm, islast);
            const dl = helpers.json.length(dd || {});
            if(dl > 0){
                return (
                    <>
                        <div className='bxs grid-w2 pd-r16 pd-b16' key={index}>
                            {selectbox(name, index, valm, dd, islast)}
                        </div>
                    </>
                )
            }
        }

        return <></>
    }

    const items = (name, index, valm, islast) => {
        const dd = getData(index, valm);
        const dl = helpers.json.length(dd || {});

        if(dl > 0){
            if(islast){
                return (
                    <>
                        <div className='bxs grid-w2 pd-r16 pd-b16' key={index}>
                            {selectbox(name, index, valm, dd)}
                        </div>
                        {last(name, index, valm, islast)}
                    </>
                )
            }
            return selectbox(name, index, valm, dd)
        }else{
            return <></>
        }
    }

    const ui = () => {
        const dvl = [];
        const vl = helpers.json.val(props, `valuemap`, []);

        if(vl && vl.length > 0){
            return vl.map((name, i) => {
                let islast = ((vl.length-1) === i);
                    dvl.push(name);
    
                if(islast){
                    return items(name, index, [...dvl], islast);
                }else{
                    return (
                        <div className='bxs grid-w2 pd-r16 pd-b16' key={i}>
                            {items(name, index, [...dvl], islast)}
                        </div>
                    )
                }
            })
        }else{
            return items('', 0, [], true);
        }
    }

    return ui()
}

export default PropValueMap;