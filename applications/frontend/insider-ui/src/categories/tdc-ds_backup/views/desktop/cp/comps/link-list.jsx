import helpers from 'ui-helpers';
import LinkList from 'aio-global-ui/molecules/link-list';

const comp = (props) => {
    const colorPairs = helpers.json.val(props, 'colorPairs', []);

    const links = (theme) => {
        return [
            {
                "label":"Link item - 1",
                "attrs":{
                    "href":"#"
                },
                "leftIcon":{
                    "name":"da"
                }
            }, {
                "label":"Link item - 2",
                "attrs":{
                    "href":"#",
                },
                "leftIcon":{
                    "name":"da"
                }
            }
        ]
    }


    const linkDs = (theme, def) => {
        if(def){
            return {
                "theme":{
                    "colorPairing":{
                        "default":theme,
                        "hover":"005"
                    }
                }
            }
        }
        return {
            "theme":{
                "colorPairing":{
                    "hover":theme
                }
            },
            "divider":{
                "ds":{
                    "theme":{
                        "colorPairing":{
                            "default":theme
                        }
                    }
                }
            }
        }
    }

    const ui = () => {
        if(colorPairs && colorPairs.length > 0){
            return colorPairs.map((item, index) => {
                return (
                    <ul className='full mr-t16 flx grid-wrapper grid-layout-5' key={index+item}>
                        <li className='pd-r16 bxs grid'>
                            <LinkList listOptions={links(item)} linkDs={linkDs(item, true)}/>
                        </li>
                        <li className='pd-r16 bxs grid'>
                            <LinkList listOptions={links(item)} linkDs={linkDs(item)}/>
                        </li>
                        <li className='pd-r16 bxs grid'>
                            <LinkList listOptions={links(item)} linkDs={linkDs(item, true)}/>
                        </li>
                        <li className='pd-r16 bxs grid'>
                            <LinkList listOptions={links(item)} linkDs={linkDs(item)}/>
                        </li>
                        <li className='pd-r16 bxs grid'>
                            <LinkList listOptions={links(item)} linkDs={linkDs(item, true)}/>
                        </li>
                    </ul>
                )
            })
        }else{
            return <></>
        }
    }

    return <>
        <p className='dis-md mr-b10'>Link List :</p>
        {ui()}
    </>
}

export default comp;