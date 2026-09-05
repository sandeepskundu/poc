import helpers from 'ui-helpers';
import TbiDetailsTupple from 'aio-app-ui-common-atoms/tbi-details-tupple';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(10);
    let blank = helpers.json.val(props, 'blank');
    let results = helpers.json.val(props, 'results', []);

    if(blank){
        results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    const ui = () => {
        return results.map((arg, i) => {
            return (
                <div className='full bxs' key={id+i}>
                    <TbiDetailsTupple 
                        index={i}
                        data={arg}
                        blank={blank}
                    />
                </div>
            )
        });
    }

    return ui()
}

export default Comp;