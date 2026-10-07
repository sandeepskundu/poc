import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import React, {useEffect, useState, useRef} from "react";
import Select from 'aio-global-raw-ui/atoms/form/select';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const [list, setList] = useState({});
    const [cache, setChache] = useState(helpers.random.key());

    const parse = (input) => {
        let root = {};

        if (!input || typeof input !== 'object') {
            return root;
        }

        Object.values(input).forEach((path) => {
            if (typeof path !== 'string' || !path.trim()) {
                return;
            }

            let current = root;
            let segments = path.split('/').map(seg => seg.toLowerCase().trim());
            

            segments.forEach((segment, index) => {
                const isLast = index === segments.length - 1;

                if (isLast) {
                    // Set the leaf node value directly to true
                    current[segment] = true;
                } else {
                    // If the key doesn't exist, or is set to true (e.g., from an overlapping path),
                    // initialize it as a nested object.
                    if (current[segment] === undefined || current[segment] === true) {
                        current[segment] = {};
                    }
                    current = current[segment];
                }
            });
        });

        return root;
    };

    const mapping = (() => {
        let rval = [];
        let path = helpers.json.get(props, 'data.value', '');

        if (path || typeof path == 'string'){
            let segs = path.split('/').map(seg => seg.trim()).filter(Boolean);
        
                for (const seg of segs) {
                    rval.push(seg);
                }
        };

        return rval;
    })();

    const onResp = (resp, arg) => {
        setList(parse(helpers.json.get(resp, 'components', {})));
        setChache(helpers.random.key());
    }

    helpers.react.hooks.onmount(useRef(false), useEffect, () => {
        appHelpers.store.get([{
            name:'storybook.components.list.map',
            request:{
                options:{},
                request:{}
            }
        }], onResp);
    });

    const options = (map) => {
        let m = map.join('.');
        let d = m?helpers.json.get(list, m, {}):list;
            d = helpers.json.keys(d);
            d = d.map((a, i) => {
                return {
                    id: a,
                    label: a
                }
            })
        
        return helpers.array.toIndexJson(d, {});
    }

    const selectbox = (map, selected) => {
        return (
            <Select
                input={{
                    label:'',
                    placeholder:''
                }}
                mapping={{
                    selected: {
                        0: 'id'
                    }
                }}
                closeOn={{
                    blur: false
                }}
                callback={{
                    onSelect: (a, b, c, d) => {
                        props.onChange([...map, helpers.json.get(a, '0.id')].join('/'));
                    }
                }}
                data={{
                    list:options(map),
                    selected: {
                        0: {
                            id:selected || '',
                            label:selected || ''
                        }
                    }
                }}
            />
        )
    } 

    const next = (map, last) => {
        if(last){
            let m = map.join('.');
            let d = m?helpers.json.get(list, m, {}):list;

            if(d && helpers.json.length(d) > 0){
                return (
                    <li className='bxs pd-r20 pd-t20 grid fl'>
                        {selectbox(map, '')}
                    </li>
                )
            }
        }
    }

    const ui = () => {
        if(mapping && mapping.length > 0){
            let old = [];
            return mapping.map((arg, i) => {
                let map = [...old];
                    old.push(arg);
                return (
                    <React.Fragment key={`${cache}${i}`}>
                        <li className='bxs pd-r20 pd-t20 grid fl'>
                            {selectbox(map, arg)}
                        </li>
                        {next(old, (mapping.length === i+1))}
                    </React.Fragment>
                )
            })
        }else{
            return selectbox([], '')
        }   
    }

    return (
        <ul className='bxs full grid-wrapper grid-layout-4'>
            {ui()}
        </ul>
    )
}

export default Comp;