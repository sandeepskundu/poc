import helpers from 'ui-helpers';
import CreateDsDrawer from 'aio-app-ui-tdc-ds-organisms/create-ds-drawer';
import DsResultsList from 'aio-app-ui-tdc-ds-molecules/ds-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const id = helpers.random.id(10);

    // ds-theme, ds-spacing, ds-grid, theme-colors, ds-fonts-family, ds-fonts-typography

    const options = [
        {
            "id":"ds-themes",
            "label":"Themes"
        }, {
            "id":"",
            "label":""
        }, {
            "id":"",
            "label":""
        }, {
            "id":"",
            "label":""
        }, {
            "id":"",
            "label":""
        }, {
            "id":"",
            "label":""
        }, {
            "id":"",
            "label":""
        }
    ]

    const onClick = (arg) => {
        helpers.url.route.redirect(`tdc-ds.${arg.id}`, {
            params:{
                dsId:helpers.json.val(_siteProps_, 'router.params.dsId')
            }
        })
    }

    const link = (arg) => {
        return (
            <span className='cp link-u ns txt-ms' onClick={() => {onClick(arg)}}>{arg.label}</span>
        )
    }

    const list = () => {
        return options.map((arg, i) => {
            return (
                <li className='grid bxs pd-rl24' key={id+i}>{link(arg)}</li>
            )
        })
    }

    const ui = () => {
        return (
            <ul className='full bxs grid-wrapper grid-layout-5 pd-tb24'>
                {list()}
            </ul>
        )
    }

    return ui()
}

export default Comp;