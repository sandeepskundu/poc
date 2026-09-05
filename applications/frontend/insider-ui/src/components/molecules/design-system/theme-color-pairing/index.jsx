import helpers from 'ui-helpers';
import ColorPairing from 'aio-app-ui-atoms/design-system/color-pairing';

const ThemeColorPairing = (props) => {
    let selected =  helpers.json.val(props, 'selected', {});
    let hsel = helpers.json.val(selected, 'hover');
    let dsel = helpers.json.val(selected, 'default');

    const onChange = (arg, type) => {
        let sel = helpers.json.copy(selected);

        if(arg.id){
            sel[type] = arg.id;
        }else{
            delete sel[type];
        }

        let sl = helpers.json.length(arg);

        if(props.onChange){
            if(sl > 0){
                props.onChange(sel);
            }else{
                props.onChange(false);
            }
        }
    }

    return (
        <div className='full pd-t10'>
            <p className='full fm-sb'>Color Pairing</p>
            <div className='full bxs _grid-wrapper _grid-layout-2'>
                <div className='full bxs pd-t24 _grid _pd-r20 bxs'>
                    <ColorPairing 
                        selected={dsel}
                        dsData={props.dsData}
                        label="Default Colors"
                        onChange={(arg) => {
                            onChange(arg, 'default')
                        }}
                    />
                </div>
                <div className='full bxs pd-t24 _grid _pd-r20'>
                    <ColorPairing 
                        selected={hsel}
                        dsData={props.dsData}
                        label="Hover Colors"
                        onChange={(arg) => {
                            onChange(arg, 'hover')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ThemeColorPairing;