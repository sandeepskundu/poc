import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useState, useEffect, useRef} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [enums, setEnums] = useState({});

    let valuemap = helpers.json.val(props, 'valuemap', '');
    let selctor = helpers.json.val(props, 'selectorKey', 'id');
    let fristRender = helpers.react.state.frist(useRef(true), useEffect)();
    let dLastEnum = helpers.json.val(appHelpers, 'constants.enums.mappingLastIndexVal.required', '__LAST__ITEM__ENUM__');
    let lastEnum = helpers.json.val(props, 'mappingLastIndexVal', dLastEnum);

    const list = (() => {
        if(valuemap){
            return valuemap.split('.');
        }else{
            return []
        }
    })();

    const root = () => {
        return helpers.json.merge({
            request:{
                //name:'access.apiPreset.createPresetInfo',
                options:{},
                cache:{
                    basedOn:{
                        url:true,
                        data:true,
                        method:true,
                        params:true
                    }
                },
                responseDataMap:{
                    "to":"0",
                },
                dataMaker:(data, rawResp, configs, error) => {
                    return helpers.json.val(data, 'data.result', []);
                },
            },
            
        }, helpers.json.val(props, 'apies.root', {}))
    }

    const req = (id, index) => {
        return helpers.json.merge({
            request:{
                //name:'access.apiPreset.createPresetInfo',
                options:{},
                cache:{
                    basedOn:{
                        url:true,
                        data:true,
                        method:true,
                        params:true
                    }
                },
                request:{
                    params:{
                        id:id
                    }
                },
                dataMaker:(data, rawResp, configs, error) => {
                    return helpers.json.val(data, 'data.result', []);
                },
                responseDataMap:{
                    "to":`${index+1}`,
                }
            }   
        }, helpers.json.val(props, 'apies.childs', {}));
    }

    const apiList = (li) => {
        let rv = [root()];
        if(li && li.length > 0){
            for(const a in li){
                let id = li[a];
                if(id != lastEnum){
                    rv.push(req(id, parseInt(a))); 
                }
            }
        }
    
        return rv;
    }
    
    const getItem = (arg) => {
        const iparser = helpers.json.val(props, 'itemParser');
        const isfun = helpers.data.type.is(iparser, 'function');

        const rval = {
            "id":helpers.json.val(arg, 'hashId', ''),
            "label":helpers.json.val(arg, 'name', ''),
            "hasChilds":helpers.json.val(arg, 'hasChilds', false)
        }

        if(isfun){
            return iparser(rval, arg);
        }else{
            return rval;
        }
    }
    
    const parseResp = (resp) => {
        let rval = {};
        let res = resp || {};
        
        for(const a in res){
            let li = {};
            let list = res[a] || [];

            if(list.length > 0){
                for(const b in list){
                    li[b] = getItem(list[b]);
                }
            };

            rval[a] = li;
        }
            
        setEnums(rval);
    }
    
    const getMapData = (maplist, callOnChange) => {
        appHelpers.store.get(apiList(maplist), (resp) => {
            parseResp(resp);
            if(callOnChange){
                onChangeCb(maplist);
            }
        });
    }

    if(fristRender){
        getMapData(list);
    }

    const options = (index) => {
        let rv = [];
        let opts = helpers.json.val(enums, `${index}`, {});

        for(const a in opts){
            rv.push(opts[a]);
        }

        return rv;
    };

    const onChangeCb = (arg) => {
        if(props.onChange){
            props.onChange({id:arg.join('.')});
        }
    }

    const getEnums = (vm) => {
        if(vm && vm.length > 0){
            getMapData([...vm], true);
        }else{
            onChangeCb(vm) 
        }
    }

    const onSelect = (item, map) => {
        let vm = [...map];
        let id = helpers.json.val(item, selctor);
        let childs = helpers.json.val(item, 'hasChilds');
            vm.push(id);

            if(childs){
                vm.push(lastEnum);
                getEnums(vm);
            }else{
                onChangeCb(vm)
            }
    }

    const getValidation = (i) => {
        if(i === (list.length-1)){
            return helpers.json.val(props, 'validation', {})
        }else{
            return {}
        }
    }

    const gridCls = () => {
        let rval = [' pd-b20'];

        if(props.gridCls){
            rval.push(props.gridCls)
        }else{
            rval.push('grid-w3 pd-r20')
        }

        return rval.join(' ')
    }

    const hasChilds = (i, id) => {
        let rval = true;
        let llen = list.length;

        if(i > 0 && id && i === (llen -1)){
            let opts = options(i-1);

            if(opts.length > 0){
                for(const a in opts){
                    if(opts[a].id === id && opts[a].hasChilds === false){
                        rval = false;
                        break;
                    }
                }
            }
        }

        return rval;
    }

    const details = () => {
        if(list && list.length > 0){
            const map = [];
            let lastId = '';
            return list.map((name, i) => {   
                let vm = [...map];
                let childs = hasChilds(parseInt(i), lastId);
                    map.push(name);
                    lastId = name;

                if(childs){
                    return (
                        <li className={gridCls()} key={name+i}>
                            <SelectBox
                                noBlank={true}
                                list={options(i)}
                                selected={name || ''}
                                selectBoxProps={{
                                    label:'',
                                    onSelect:(e, item) => {
                                        onSelect(item, [...vm]);
                                    },
                                    labelProps:{
                                        validation:getValidation(parseInt(i))
                                    }
                                }}
                            />
                        </li>
                    )
                }else{
                    return <></>
                }
            })
        }else{
            return (
                <li className={gridCls()}>
                    <SelectBox
                        noBlank={true}
                        list={options(0)}
                        selected={''}
                        selectBoxProps={{
                            label:'',
                            onSelect:(e, item) => {
                                onSelect(item, []);
                            },
                            labelProps:{
                                validation:helpers.json.val(props, 'validation', {})
                            }
                        }}
                    />
                </li>
            )
        }
    }

    const lebel = () => {
        let lbl = helpers.json.val(props, 'label', '');

        if(lbl){
            return <p className='full pd-b12 txt-sm'>{lbl}</p>
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <>
                {lebel()}
                <ul className='full bxs grid-wrapper'>
                    {details()}
                </ul>
            </>
            
        )
    }

    return ui();
}

export default Comp;