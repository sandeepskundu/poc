import helpers from 'ui-helpers';
import ChildItems from './childs';
import React, {useEffect, useState, useRef} from 'react';

const JsonEditor = (dprops) => {
    const props = helpers.element.jsx.props.define({
        data:{
            0:{
                1:{
                    2:{
                        4:{},
                        3:{
                            4:{
                                5:{
                                    6:{
                                        7:{
                                            8:{}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, dprops);

    const [selected, setSelected] = useState([]);
    const [schema, setSchema] = useState(props.schema || {});
    const [modified, setModified] = useState(props.schema || {});
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    useEffect(() => {
        if(fristRender){
            setSchema(props.schema);
            setModified(props.schema);
        }
    }, [props.schema]);

    useEffect(() => {
        if(fristRender){
            setSelected(props.selected);
        }
    }, [props.selected]);

    useEffect(() => {
        console.log(modified);
    }, [modified]);

    const changeMap = (vmap) => {
        let rval = [];
        let valm = [...vmap];
        let last = valm.splice(-2);
            last = last.reverse()

        let nvalm = [...last];
        let name = nvalm.splice(-1);

        if(valm.length > 0){
            for(const a in valm){
                rval.push('props');
                rval.push(valm[a]);
            }
        }

        name = ['props'].concat(name)

        return {
            value:rval.concat(name).join('.'),
            config:rval.concat(last).join('.')
        }
    }

    const mergeConfig = (arg, vmap) => {
        let dm = helpers.json.copy({...modified});
        let cmap = helpers.json.val(vmap, 'config');
            dm = helpers.json.set(dm, cmap, arg, false, true);
            setModified(dm);
    }

    const onChange = (arg, vmap, vtype) => {

        const vtypemap = {
            'prop-type':true,
            'description':true,
            'required-on-ui':true,
            'required-on-server':true,
            'required-on-storybook':true
        }

        console.log(vtype);
        if(props.onChange){
            props.onChange(arg, vmap, vtype);
        }else{
            mergeConfig(arg, changeMap(vmap)) 
        }
    }

    return (
        <>
            <ChildItems
                data={props.data}
                schema={props.schema}
                configs={props.configs}
                onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                props={helpers.json.val(modified, 'props', {})}
                selected={helpers.json.val(props, 'selected', [])}
            />
        </>
    )
}

export default JsonEditor;