import yourTheme from './theme';
import {addons} from '@storybook/manager-api';

addons.setConfig({
    theme:yourTheme,
    showNav:false,
    showPanel:false,
    showToolbar:true,
    isFullscreen:false,
    enableShortcuts:true,
    panelPosition:'bottom',
    initialActive:'sidebar',
    selectedPanel:undefined,
    sidebar:{
        showRoots:false,
        collapsedRoots:['other']
    },
    toolbar: {
        title:{
            hidden:false
        },
        zoom:{
            hidden:false
        },
        eject:{
            hidden:false
        },
        copy:{
            hidden:false
        },
        fullscreen:{
            hidden:false
        }
    }
});