import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import Button from 'aio-global-ui/atoms/form/button';
import React, {useEffect, useState, useRef} from 'react';
import ColumnsList from 'aio-app-ui-api-atoms/model-query/column-names';

const AddNewQuery = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type', '');

    const [query, setQuery] = useState(props.query || {});

    const lastmap = (typ) => {
        let qp = helpers.json.val(props, 'queryData', {});

        if(type === 'query'){
            if(typ){
                return type;
            }else{
                return helpers.json.length(qp);
            }
        }else{
            switch (type) {
                case 'or':
                case 'and':
                    if(qp.query){
                        return 'logical'
                    }

                    if(qp.logical){
                        return 'query'
                    }
                break;
                case 'logical':
                    if(qp.or){
                        return 'and'
                    }

                    if(qp.and){
                        return 'or'
                    }
                break;
                default :
                    return type;
            }
        }
    }

    useEffect(() => {
        //console.log(query);
    }, [query]);

    const getMap = () => {
        let rval = [];
        let rv = helpers.json.val(props, 'map', []);
        let ql = lastmap();
            rv = [...rv];

            rv.map((a) => {
                if(a){
                    rval.push(a);
                }
            });

            rval.push(''+ql);
        return rval;
    }

    const map = getMap();

    const onChange = (val, map, reset, action) => {
        let vm = map.join('.');
        let qp = helpers.json.copy(query)
            helpers.json.remove(qp, vm);
            qp = helpers.json.set(qp, vm, val);
            setQuery(qp);
    }

    const save = (action) => {
        if(action === 'reset'){
            setQuery({});
        }else{
            if(props.onAction){
                props.onAction(query, action);
            }
        }
    }

    const buttons = () => {
        let qpl = helpers.json.length(query);

        if(qpl > 0){
            return (
                <ul className='full grid-wrapper grid-layout-3 bxs pd-t20 flx-vc'>
                    <li className='grid pd-l14 bxs'>
                        <span className='link-u cp txt-sm fl'
                            onClick={() => {
                                save('reset')
                            }}
                        >Reset</span>
                    </li>
                    <li className='grid pd-l14 bxs'>
                        <Button 
                            label='Cancel'
                            buttonDs={{
                                size:"md",
                                theme:'002'
                            }}
                            onClick={() => {
                                save('cancel')
                            }}
                        />
                    </li>
                    <li className='grid pd-l14 bxs'>
                        <Button 
                            label='Save'
                            buttonDs={{
                                size:"md",
                                theme:'000'
                            }}
                            onClick={() => {
                                save('save')
                            }}
                        />
                    </li>
                </ul>
            )
        }
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                <p className="txt-xxs full pd-b20">{map.join('.')}</p>
                <ColumnsList
                    map={lastmap()}
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg) => {onChange(arg, map, true)}}
                    query={helpers.json.val(query, `${map.join('.')}`, {})}
                />
                {buttons()}
            </div>
        )
    }

    return ui();
}

export default AddNewQuery;