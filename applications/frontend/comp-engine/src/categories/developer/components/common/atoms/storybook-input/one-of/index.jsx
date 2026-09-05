import helpers from 'ui-helpers';
import Select from 'aio-global-raw-ui/atoms/form/select';

const Comp = (props) => {
    const oneof = helpers.json.get(props, 'item.value.config.___.oneOf', {});
    const options = (() => {
        let from = helpers.json.get(oneof, 'from', '');
        let mapping = helpers.json.get(oneof, 'mapping', '');
        let oneofOpts = helpers.json.get(oneof, 'options', '');
        let map = [];

            if(from){
                map.push(from);
            }

            if(mapping){
                map.push(mapping);
            }

        let rval = helpers.json.get(props, `enums.${map.join('.')}`, '');
        let ops = [];

        if(oneofOpts && helpers.data.type.is(oneofOpts, 'string')){
            ops = oneofOpts.split('|');
        }

        if(helpers.data.type.is(rval, 'string')){
            ops = ops.concat(rval.split('|'));
        }

        ops = helpers.array.removeDuplicate(ops);
        ops = helpers.array.toIndexJson(ops, {
            indexKey:'id',
            valueKey:'label',
            valueToIndex:false
        })

        return ops;
    })();

    const ui = () => {
        return (
            <Select 
                mapping={{
                    selected:{
                        0:'id'
                    }
                }}
                selection={{
                    max:10,
                    multiple:false,
                }}
                searchable={false}
                switch={{
                    selectedFirst:false,
                    hideDisabled:false
                }}
                templates={{
                    listbox:{}
                }}
                multiselect={{
                    placement:'top',
                    wrapper:{
                        ds:{
                            css:{
                                class:{
                                    padding:{
                                        1:0,
                                        2:0,
                                        3:20,
                                        4:0
                                    }
                                }
                            }
                        }
                    }
                }}
                open={false}
                closeOn={{
                    blur:false
                }}
                openOn={{
                    focus:false,
                    search:false
                }}
                input={{
                    required:false,
                    invalid:false,
                    label:"",
                    placeholder:'Select an option'
                }}
                callback={{
                    onChange:{
                        selected:(list, arg) => {
                            debugger;
                            if(props.onChange){
                                props.onChange(list)
                            }
                        }
                    }
                }}
                data={{
                    list:options,
                    selected:{
                        0:{
                            id:helpers.json.get(props, 'value'),
                            label:helpers.json.get(props, 'value'),
                        }
                    },
                    excluded:{},
                    disabled:{}
                }}
            />
        )
    }

    return ui();
}

export default Comp;