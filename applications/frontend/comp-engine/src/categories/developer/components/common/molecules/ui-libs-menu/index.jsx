import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from "react";
import NavTree from 'aio-app-ui-molecules/nav-tree';

const Comp = (props) => {
    const [details, setDetails] = useState({
        blank:true,
        components:{},
        cache:helpers.random.key()
    })
    const id = helpers.json.get(_siteProps_, 'router.params.hash', '');

    const onResp = (resp, arg) => {
        let d = helpers.json.copy({});
            d = helpers.json.merge(d, resp);
            d.cache = helpers.random.key()
            d.blank = false;
            setDetails(d)
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

    const normalize = (li) => {
        let rval = {};

        for(let a in li){
            rval[helpers.string.replace.word(a, '/', '.')] = li[a];
        }

        return rval;
    }

    const menuList = () => {
        let li = helpers.json.get(details, 'components', {});
            li = helpers.json.swapKeysAndValues(li);
        return helpers.json.toIndexTree(normalize(li));
    }

    const selected = (arg) => {
        let sel = helpers.json.findNodeByValue(arg, id);

        if(sel && sel.treemap){
            return helpers.json.set({}, sel.treemap, true);
        }else{
            return {}
        }
    }

    const goLink = (item) => {
        helpers.url.route.redirect('developer.documention', {
            params:{
                hash:helpers.json.get(item, 'value', ''),
                subcate:helpers.json.get(_siteProps_, 'router.params.subcate', ''),
                category:helpers.json.get(_siteProps_, 'router.params.category', '')
            }
        });
    }

    const ui = () => {
        if(props.blank){

        }else{
            let li = menuList();

            return (
                <NavTree
                    key={details.cache}
                    templates={{
                        body:{
                            content:(arg, map, single, pos, props) => {
                                let val = helpers.json.get(arg, 'value', '');
                                if(val && pos === 'before'){
                                    if(val === id){
                                        return <span className='fm-md txt-sm pd-tb8 pd-r4 pd-l16 pr flx-d anim txt-c00105 bdr-1 bdr-wbn bdr-wrln anim full bdr-c00103'>Doc</span>
                                    }else{
                                        return <span className='cp fm-md txt-sm pd-tb8 pd-r4 pd-l16 pr flx-d anim bdr-1 txt-c00206 bdr-wbn bdr-wrln anim full bdr-c00103' onClick={() => {goLink(arg)}}>Doc</span>
                                    }
                                }
                            }
                        }
                    }}
                    data={{
                        list:li,
                        selected:selected(li)
                    }}
                /> 
            )
        }
    }

    return ui()
}

export default Comp;