import helpers from 'ui-helpers';
import Text from 'aio-global-ui/atoms/typography/text';
import H1 from 'aio-global-ui/atoms/typography/heading/h1';
import H2 from 'aio-global-ui/atoms/typography/heading/h2';
import H3 from 'aio-global-ui/atoms/typography/heading/h3';
import H4 from 'aio-global-ui/atoms/typography/heading/h4';
import H5 from 'aio-global-ui/atoms/typography/heading/h5';
import H6 from 'aio-global-ui/atoms/typography/heading/h6';
import Heading from 'aio-global-ui/atoms/typography/heading';
import Description from 'aio-global-ui/atoms/typography/text/description';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const headings = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 hide'>
                <li className='full pd-b32'>
                    <Heading config={{content:"Default Heading"}}/>
                </li>
                <li className='full pd-b32'>
                    <H1 config={{content:"Heading - 1"}}/>
                </li>
                <li className='full pd-b32'>
                    <H2 config={{content:"Heading - 2"}}/>
                </li>
                <li className='full pd-b32'>
                    <H3 config={{content:"Heading - 3"}}/>
                </li>
                <li className='full pd-b32'>
                    <H4 config={{content:"Heading - 4"}}/>
                </li>
                <li className='full pd-b32'>
                    <H5 config={{content:"Heading - 5"}}/>
                </li>
                <li className='full pd-b32'>
                    <H6 config={{content:"Heading - 6"}}/>
                </li>
            </ul>
        )
    }

    const T = () => {
        return 'This is simple body text ldkdkdk ksksskk skssk kssksk kssksk This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk,This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk. This is simple body text ldkdkdk ksksskk skssk kssksk kssksk This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk,This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk. This is simple body text ldkdkdk ksksskk skssk kssksk kssksk This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk,This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk, This is simple body text ldkdkdk ksksskk skssk kssksk kssksk'
    }

    const text = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 hide'>
                <li className='full pd-b32'>
                    <Text size="md" text={{content:"This is simple body text ldkdkdk ksksskk skssk kssksk kssksk "}}></Text>
                </li>
                <li>
                    <Description text={{content:<T />}} toggle={{
                        enabled:true
                    }}/>
                </li>
                <li className='full pd-b32'>
                    <H1 config={{content:"Heading - 1"}}/>
                </li>
                <li className='full pd-b32'>
                    <H2 config={{content:"Heading - 2"}}/>
                </li>
                <li className='full pd-b32'>
                    <H3 config={{content:"Heading - 3"}}/>
                </li>
                <li className='full pd-b32'>
                    <H4 config={{content:"Heading - 4"}}/>
                </li>
                <li className='full pd-b32'>
                    <H5 config={{content:"Heading - 5"}}/>
                </li>
                <li className='full pd-b32'>
                    <H6 config={{content:"Heading - 6"}}/>
                </li>
            </ul>
        )
    }

    const ui = () => {
        debugger;
        return (
            <div className='full'>
                {text()}
                {headings()}
            </div>
        )  
    }

    return ui();
}

export default Comp;