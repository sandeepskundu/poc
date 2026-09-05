import helpers from 'ui-helpers';
import DsThemeColorsByCategory from 'aio-app-ui-tdc-ds-molecules/ds-theme-colors-by-category';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const id = helpers.random.id(10);
    const details = helpers.json.val(props, 'details', {});
    const blank = helpers.json.val(props, 'details.blank', false);
    const colors = helpers.json.val(details, 'data.rootTheme.definition.colors', {});
    const list = helpers.json.keys(colors);

    const ui = () => {
        if(list && list.length > 0){
            return list.map((name, i) => {
                const data = helpers.json.val(colors, name, {})
                return (
                    <div className='full bxs pd-tb20' key={id+i}>
                        <p className='full fm-sb txt-xl bxs'>{helpers.json.val(data, 'heading', '')}</p>
                        <p className='full pd-t6 txt-sm bxs pd-b10'>{helpers.json.val(data, 'description', '')}</p>
                        <DsThemeColorsByCategory
                            data={data}
                            blank={blank}
                            details={details}
                            onChange={props.onChange}
                            mapping={['colors', name]}
                            onPickerToggle={props.onPickerToggle}
                        />
                    </div>
                )
            });
        }
    }

    return (
        <div className='full bxs pd-20 pd-tn'>
            {ui()}
        </div>
    )
}

export default Comp;