import helpers from 'ui-helpers';
import Ds from 'aio-app-ui-templates/design-system';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const valuemap = (() => {
        return helpers.json.val(props, 'valuemap.self', []).join('.');
    })();

    const ui = () => {
        return (
            <div className='full pd-rl10 pd-b12 bxs'>
                <Ds layout="page"
                    valuemap={valuemap}
                    expended={props.expended}
                    onChange={props.onChange}
                    onAttrsExpend={props.onAttrsExpend}
                    runtimeData={helpers.json.val(props, 'runtimeData', {})}
                    dsProps={helpers.json.val(props, 'item.aioDsConfigs.props', {})}

                    _dsProps={{
                        attrs:{},
                        dataAttrs:{},
                        ds:{
                            "theme":{
                                "colorPairing":{
                                    "default":"000",
                                    "hover":"002",
                                },
                                "background":{
                                    "default":"",
                                    "hover":""
                                },
                                "text":{
                                    "default":"",
                                    "hover":""
                                },
                                "border":{
                                    "default":"",
                                    "hover":""
                                },
                            },
                            'css':{
                                "class":{
                                    'shadow':'xs', // Done
                                    'radius':{ // Done
                                        "1":'2',
                                        "2":'4',
                                        "3":'6',
                                        "4":'8'
                                    },
                                    'padding':{ // Done
                                        "1":'12',
                                        "2":'14',
                                        "3":'16',
                                        "4":'18'
                                    },
                                    "margin":{ // Done
                                        "1":'6',
                                        "2":'8',
                                        "3":'10',
                                        "4":'12'
                                    },
                                    'borderNone':{ // Done
                                        "1":true,
                                        "3":true
                                    },
                                    'family':'inter', //Done
                                    'fontsize':'md', // Done
                                },
                                "flags":{
                                    'noBorder':true, //done
                                    'rounded':false, //done
                                    'disabled':false, //done
                                    'isDisplay':true, // done
                                    'boxSizing':false, // done
                                    'animation':'anim', //Done
                                    'noRadius':false //done
                                },
                                'others':'',
                            }
                        }
                    }}
                />
            </div>
        );
    }

    return ui();
};

export default Comp;