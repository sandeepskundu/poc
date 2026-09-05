import React from 'react';
import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import DeleteIncludeOptions from 'aio-app-ui-api-atoms/model-query/delete-inlcudes-options';

const ValidationDetailsMapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const hCols = helpers.json.val(props, 'configs.model.query.hiddenCloumns', {});

    const options = (() => {
        const rval = [];

        for(const a in hCols){
            rval.push(hCols[a]);
        }

        return rval;
    })();
    
    const onChange = (checked, arg) => {
        let id = helpers.json.val(arg, 'id');
        let d = helpers.json.val(props, 'modified.hidden.configs.columns', {});
            d = helpers.json.copy(d);

            if(checked){
                d[id] = {
                    enable:true
                }
            }else{
                helpers.json.remove(d, id);
                helpers.json.remove(d, 'includes');
            }

            if(props.onChange){
                props.onChange(d, arg);
            }
    }

    const enabled = (arg) => {
        return helpers.json.val(props, `modified.hidden.configs.columns.${helpers.json.val(arg, 'id')}.enable`);
    }

    const selectOptions = (arg) => {
        let id = helpers.json.val(arg, 'id');

            if(id === 'deleted'){
                return (
                    <div className='grid-w2 bxs'>
                        <DeleteIncludeOptions
                            parent={arg}
                            configs={props.configs}
                            details={props.details}
                            modified={props.modified}
                            onChange={props.onChange}
                        />
                    </div>
                )
            }
    }

    const list = () => {
        let li = options;

        if(li && li.length > 0){
            return li.map((arg, i) => {
                return (
                    <li className='full pd-b18 bxs grid-wrapper' key={i}>
                        <div className='grid-w2 bxs pd-r20'>
                            <Toggle 
                                label={arg.label}
                                checked={enabled(arg)}
                                onChange={(checked) => {
                                    onChange(checked, arg);
                                }}
                            />
                        </div>
                        {selectOptions(arg)}
                    </li>
                )
            })
        }
    }

    const ui = () => {
        return (
            <ul className='full bxs pd-t20 pd-l30'>
                {list()}
            </ul>
        )
    }

    return ui();
}

export default ValidationDetailsMapper;