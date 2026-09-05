import helpers from 'ui-helpers';
import React from 'react';

const AppPageWithMenu = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const rmenu = helpers.json.val(props, 'appRightMenu');

    const appMenuAttrsClassName = () => {
        return helpers.element.jsx.css.get(props.menuDs, 'app-m-wrpr bdr-1');
    }

    const appMenuAttrs = () => {
        let attrs = helpers.element.jsx.attrs(props.menuDs, false, 'attrs');
        return {...attrs, ...{className:appMenuAttrsClassName()}};
    }

    const appMenuContent = () => {
        let type = helpers.data.type.get(props.appMenu);
        switch(type) {
            case 'function':
                return props.appMenu(props);
            break;
            case 'string':
                return props.appMenu || ''
            break;
            default:
                return props.appMenu || ''
        }
    }

    const appRightMenuAttrsClassName = () => {
        return helpers.element.jsx.css.get(props.rightMenuDs, 'app-m-wrpr bdr-1 right');
    }

    const appRightMenuAttrs = () => {
        let attrs = helpers.element.jsx.attrs(props.rightMenuDs, false, 'attrs');
        return {...attrs, ...{className:appRightMenuAttrsClassName()}};
    }

    const appRightMenuContent = () => {
        let type = helpers.data.type.get(props.appRightMenu);
        switch(type) {
            case 'function':
                return props.appRightMenu(props);
            break;
            case 'string':
                return props.appRightMenu || ''
            break;
            default:
                return props.appRightMenu || ''
        }
    }

    const appMenu = () => {
        return (
            <div {...appMenuAttrs()}>
                {appMenuContent()}
            </div>
        )
    }

    const appRightMenu = () => {
        if(rmenu){
            return (
                <div {...appRightMenuAttrs()}>
                    {appRightMenuContent()}
                </div>
            )
        }else{ 
            return <></>
        }
        
    }

    const appPageAttrsClassName = () => {
        return helpers.element.jsx.css.get(props.pageDs, 'app-p-wrpr full bdr-1 bxs');
    }

    const appPageAttrs = () => {
        let attrs = helpers.element.jsx.attrs(props.pageDs, false, 'attrs');
        return {...attrs, ...{className:appPageAttrsClassName()}};
    }

    const appPageContent = () => {
        let type = helpers.data.type.get(props.appPage);
        switch(type) {
            case 'function':
                return props.appPage(props);
            break;
            case 'string':
                return props.appPage || ''
            break;
            default:
                return props.appPage || ''
        }
    }

    const appPage = () => {
        return (
            <div {...appPageAttrs()}>
                {appPageContent()}
            </div>
        )
    }

    const warpperAttrsClassName = () => {
        return helpers.element.jsx.css.get(props.wrapperDs, 'app-m-page');
    }

    const warpperAttrs = () => {
        let attrs = helpers.element.jsx.attrs(props, false, 'attrs');
        return {...attrs, ...{className:warpperAttrsClassName()}};
    }

    const ui = () => {
        return (
            <div {...warpperAttrs()}>
                <div className={`app-m-page-ctnt bxs ${rmenu?"has-right-menu":""}`}>
                    {appMenu()}
                    {appPage()}
                    {appRightMenu()}
                </div>
            </div>
        )
    }

    return ui();
}

AppPageWithMenu.__PROP__TYPES__

AppPageWithMenu.__DEFAULT__PROP__

export default AppPageWithMenu;