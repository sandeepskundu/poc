import helpers from 'ui-helpers';
import DsThemeColorShade from 'aio-app-ui-tdc-ds-atoms/ds-theme-colors-shade';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const id = helpers.random.id(10);
    const blank = helpers.json.val(props, 'blank', false);
    const mapping = helpers.json.val(props, 'mapping', []);

    const shades = helpers.json.val(props, 'data.shades', {});
    const list = helpers.json.keys(shades);

    const ui = () => {
        if(list && list.length > 0){
            return list.map((name, i) => {
                const m = [...mapping, 'shades', name];
                const data = helpers.json.val(shades, name, {})
                return (
                    <div className='grid bxs pd-rl6' key={id+i}>
                        <div className='full bxs'>
                            <DsThemeColorShade 
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
        <div className='full bxs grid-wrapper grid-layout-12'>
            {ui()}
        </div>
    )
}

export default Comp;