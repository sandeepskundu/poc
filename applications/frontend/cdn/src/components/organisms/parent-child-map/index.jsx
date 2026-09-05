import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';
import ParentChildsOptions from 'aio-app-ui-atoms/parent-childs-options';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({
        apiConfig:{
            "rootId":'67e640d2601ba8c6b57114a2',
            "url":{
                root:"http://localhost:1300/cdn/gUtilsApi/siteprops",
                child:'http://localhost:1300/cdn/gUtilsApi/siteprops'
            },
        },
        selected:'0.1.2.3.4.5.6.7.8.9.10.11.12.13'
    }, dprops);

    let map = {};
    let id = helpers.random.id(10);
    let list = helpers.json.val(props, 'selected', '');
    let rootId = helpers.json.val(props, 'apiConfig.rootId');
        list = list.split('.');

    const [data, setData] = useState({});

    const request = (url, id) => {
        return {
            name:id,
            request:{
                request:{
                    url:url,
                    params:{
                        id:id
                    }
                }
            }
        }
    }

    const getConfig = (index, current, parent) => {
        if(parent){
            map[parent] = {
                selected:current
            }

            if(index === 0 || index === '0'){
                return request(`${helpers.json.val(props, 'apiConfig.url.root')}`, parent)
            }else{
                return request(`${helpers.json.val(props, 'apiConfig.url.child')}`, parent)
            }
        }
    }

    const getData = () => {
        let rv = [];

        if(list && list.length > 0){
            for(const a in list){
                let index = a;

                    if(index === 0 || index === '0'){
                        rv.push(getConfig(index, list[a], rootId));
                    }else{
                        rv.push(getConfig(index, list[a], list[index-1]));
                    }
            }
        }else{
            rv.push(getConfig(0), '', rootId);
        };

        helpers.store.get(rv, onResp);
    };

    const onResp = (resp) => {
        for(const a in resp){
            map[a] = map[a] || {};
            map[a].data = resp[a];
        };
        setData(map);
    }

    useEffect(() => {
        getData();
    }, [dprops]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const details = (name) => {
        return helpers.json.val(data, `${name}.data`, {});
    }

    const current = (name) => {
        return helpers.json.val(data, `${name}.selected`, '');
    }

    const options = () => {
        const rv = []

        if(rootId){
            rv.push(rootId);
        }

        return rv.concat(list);
    }

    const islast = (li, i) => {
        return (i === (li.length-1));
    }

    const onChange = (valmap) => {
        if(props.onChange){
            props.onChange(valmap.join('.'))
        }
    }

    const ui = () => {
        let map = [];
        let prev = false;
        let pcur = false;
        let li = options();

        if(li && li.length > 0){
            return li.map((name, i) => {

                if(i > 0){
                    map.push(name);
                    pcur = current(li[i-1])
                    prev = details(li[i-1]);
                }

                return (
                    <li className='bxs grid pd-r20 pd-b24' key={id+i}>
                        <ParentChildsOptions 
                            pcur={pcur}
                            prev={prev}
                            mapping={[...map]}
                            isfrist={(i === 0)}
                            list={details(name)}
                            islast={islast(li, i)}
                            selected={current(name)}
                            onChange={(m) => {onChange(m)}}
                        />
                    </li>
                )
            })
        }else{
            return <></>
        }
    }

    return (
        <ul className='full bxs grid-wrapper grid-layout-5 pd-t16'>
            {ui()}
        </ul>
    )
}

export default Comp;