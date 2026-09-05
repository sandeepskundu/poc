import helpers from 'ui-helpers';
import H6 from 'aio-global-ui/atoms/typography/heading/h3';

const Comp = (props) => {
    const blank = helpers.json.get(props, 'blank', false);
    const desc = helpers.json.get(props, 'data.storybook.details.parameters.docs.description.component', '');

    const ui = () => {
        if(blank){

        }else{
            return (
                <>
                    <H6 
                        config={{
                            content:helpers.json.get(props, 'data.component.path', ''),
                            ds:{
                                css:{
                                    class:{
                                        padding:{
                                            1:16,
                                            2:16
                                        }
                                    },
                                    flags:{
                                        boxSizing:true
                                    }
                                }
                            }
                        }}
                    />
                    <div className='full pd-rl16 pd-t16 pd-b40 txt-sm bxs' dangerouslySetInnerHTML={{ __html:desc}} />
                </>
            )
        }
    }

    return ui();
}

export default Comp;
