import Json from './json';
import Output from './output';
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const builder = helpers.json.schema.builder.init('props', {
        utils:{
            keyRegex:null,
            dataType:null,
            _iconByType:null,
            dvalueByType:null
        }
    });

    console.log(builder);

    return (
        <ul className='grid-wrapper grid-layout-2 full bxs mr-t60'>
            <li className='grid bxs pd-r14'>
                <Json 
                    builder={builder}
                    onChange={(json, tree, valid) => {
                        console.log(json, tree, valid);
                    /*--setJson({
                        json:json,
                        valid:valid
                    })--*/
                    }}
                />
            </li>
            <li className='grid pd-l14 bxs'>
                <Output />
            </li>
        </ul>
    )

}


export default Comp;