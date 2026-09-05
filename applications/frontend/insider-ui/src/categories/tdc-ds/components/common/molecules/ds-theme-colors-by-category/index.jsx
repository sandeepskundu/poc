import helpers from 'ui-helpers';
import DsThemeColorsShadesByCategory from 'aio-app-ui-tdc-ds-molecules/ds-theme-colors-shades-by-category'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const id = helpers.random.id(10);
    const blank = helpers.json.val(props, 'blank', false);
    const mapping = helpers.json.val(props, 'mapping', []);

    const types = helpers.json.val(props, 'data.types', {});
    const list = helpers.json.keys(types);

    const ui = () => {
        if(list && list.length > 0){
            return list.map((name, i) => {
                const m = [...mapping, 'types', name];
                const data = helpers.json.val(types, name, {})
                return (
                    <div className='full pd-t24 bxs grid-wrapper' key={id+i}>
                        <div className='bxs grid-w3 pd-r16'>
                            <p className='full fm-sb txt-sm bxs'>{helpers.json.val(data, 'heading', '')}</p>
                            <p className='full pd-t4 txt-xs bxs'>{helpers.json.val(data, 'description', '')}</p>
                        </div>
                        <div className='bxs grid-w9'>
                            <DsThemeColorsShadesByCategory
                                data={data}
                                mapping={m}
                                blank={blank}
                                details={props.details}
                                onChange={props.onChange}
                                onPickerToggle={props.onPickerToggle}
                            />
                        </div>
                    </div>
                )
            });
        }
    }

    return (
        <div className='full bxs'>
            {ui()}
        </div>
    )
}

export default Comp;