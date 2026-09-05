import helpers from 'ui-helpers';
import NavTree from 'aio-app-ui-molecules/nav-tree';

const Comp = (props) => {
    const id = helpers.json.get(_siteProps_, 'router.params.hash', '');
    const menu = {
        0:{
            id:"radius",
            label:'Border Radius'
        }, 
        1:{
            id:'colors',
            label:'Colors'
        },
        2:{
            id:"shadows",
            label:'Shadows'
        },
        3:{
            id:"Spacing",
            label:'Spacing'
        },
        4:{
            id:'typography',
            label:'Typography'
        },
        
    };

    const selected = (arg) => {
        let rval = {};

        for(let a in menu){
            if(menu && menu[a] && id === menu[a].id){
                rval[a] = true;
            }
        }

        return rval;
    }

    const goLink = (item) => {
        helpers.url.route.redirect('developer.documention', {
            params:{
                hash:helpers.json.get(item, 'id', ''),
                subcate:helpers.json.get(_siteProps_, 'router.params.subcate', ''),
                category:helpers.json.get(_siteProps_, 'router.params.category', '')
            }
        });
    }

    const ui = () => {
        if(props.blank){

        }else{
            return (
                <NavTree
                    templates={{
                        body:{
                            content:(arg, map, single, pos, props) => {
                                let val = helpers.json.get(arg, 'id', '');
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
                        list:menu,
                        selected:selected(menu)
                    }}
                /> 
            )
        }
    }

    return ui()
}

export default Comp;