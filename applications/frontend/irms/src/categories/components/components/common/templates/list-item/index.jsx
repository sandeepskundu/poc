import helpers from 'ui-helpers';
import ListItem from 'aio-global-ui/atoms/0/list/item';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const badge = () => {
        return [1].map(() => {
            return (
                <div className='grid pd-b20 pd-r20'>
                    <ListItem
                        childs={{
                            start:'S',
                            before:"BE",
                            center:"Sk",
                            after:"AF",
                            end:'END'
                        }}
                        dsTheme={{
                            wrapper:{
                                color:"c00000",
                                background:"c11007",
                                hbackground:"c11807",
                                border:'c00506',
                                hborder:'c00109',
                                className:'item-list-kundu bhaskar'
                            },
                            center:{
                                radius:2,
                                color:"c00506",
                                hcolor:"c00000",
                                font__d__size:'lg',
                                font__d__family:'sb',
                                hbackground:"c12108"
                            }
                        }}
                        config={{
                            wrapper:{
                                "attrs":{
                                    title:"Sandeep Kundu"
                                },
                                "dataAttrs":{
                                    ga:"GA"
                                }
                            },
                            center:{
                                "ds":{
                                    "theme":{
                                        background:{
                                            default:'c00207'
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </div>
            )
        })
    }
    
    const ui = () => {
        return (
            <div className='full pd-t60 grid-wrapper grid-layout-6'>
                {badge()}
            </div>
        )  
    }

    return ui();
}

export default Comp;