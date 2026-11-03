import helpers from 'ui-helpers';
import NavTree from 'aio-app-ui-molecules/nav-tree';
import UiLibsNav from 'aio-app-ui-developer-molecules/ui-libs-menu';
import FoundationNav from 'aio-app-ui-developer-molecules/foundation-menu';
import DocumentionBody from 'aio-app-ui-developer-organisms/documention-body';

const Comp = (props) => {
    let cate = helpers.json.get(_siteProps_, 'router.params.category', '');
    let subcate = helpers.json.get(_siteProps_, 'router.params.subcate', '');
    
    const listmap = {
        root:{
            0:{
                id:'designsystem',
                label:'Design System',
            },
            1:{
                id:'jsuitls',
                label:'Javascript utils'
            }
        },
        designsystem:{
            0:{
                id:'foundation',
                label:'Foundation'
            },
            1:{
                id:'uilibs',
                label:'UI Library'
            }
        }
    }

    const selected = (li, cur) => {
        let rv = {};
        for(let a in li){
            if(li[a] && cur && cur === li[a].id){
                rv[a] = true;
            }
        };

        return rv;
    }

    const getTree = (li, cur, body, item) => {
        return (
            <NavTree
                {...{
                    templates:{
                        body:{
                            content:body
                        }
                    },
                    data:{
                        list:li,
                        disabled:{},
                        selected:cur,
                    },
                    callbacks:{
                        header:{
                            wrapper:{
                                onClick:item
                            }
                        }
                    }
                }}
            />
        )
    }

    const subtypeTree = (arg, map, single, pos, props, sel) => {
        let id = helpers.json.get(arg, 'id', '');

        if(map && map.length > 0 && helpers.json.get(sel, map.join('.')) && pos === 'before'){

            if(cate === 'designsystem' && subcate === 'uilibs'){
                return <UiLibsNav />
            };

            if(cate === 'designsystem' && subcate === 'foundation'){
                return <FoundationNav />
            };

            return 'Sandeep Kundu'
        }
    }


    const getChilds = (arg, map, single, pos, props, sel) => {
        let id = helpers.json.get(arg, 'id', '');

        if(id && listmap[id] && map && map.length > 0 && helpers.json.get(sel, map.join('.')) && pos === 'before'){
            let sel = selected(listmap[id], subcate);
            return getTree(listmap[id], sel, 
                (arg, map, single, pos, props) => {
                    return subtypeTree(arg, map, single, pos, props, sel);
                },
                (prop, item) => {      
                    helpers.url.route.redirect('developer.documention', {
                        params:{
                            hash:'',
                            category:cate,
                            subcate:helpers.json.get(item, 'id', '')
                        }
                    });
                }
            )
        }
    }

    const root = () => {
        let sel = selected(listmap.root, cate);

        return getTree(listmap.root, sel, 
            (arg, map, single, pos, props) => {
                return getChilds(arg, map, single, pos, props, sel);
            },
            (prop, item) => {      
                helpers.url.route.redirect('developer.documention', {
                    params:{
                        hash:'',
                        subcate:'',
                        category:helpers.json.get(item, 'id', '')
                    }
                });
            }
        )
    }

    return (
        <div className='full grid-wrapper vh oh'>
            <div className='grid-w2 vh bg-c00101 oa bdr-1 bdr-c00103 bdr-tn bdr-bn shdw-md'>
                {root()}
            </div>
            <div className='grid-w10 vh oa pd-rl30 pd-b36 bxs bg-c00000'>
                <DocumentionBody />
            </div>
        </div>
    )
}

export default Comp;