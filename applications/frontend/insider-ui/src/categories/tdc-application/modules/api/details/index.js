import getDetails from './get';
import getApp from './../get-app';
import helpers from 'ui-helpers';

const get = (props, callback, details) => {
    let action = helpers.json.val(_siteProps_, 'router.params.action', '');

    switch (action) {
        case 'create':
            getDetails.init(props, callback, details);
        break;
        case 'update':
            getDetails.init(props, callback, details);
        break;
        case 'delete':
        break;
        case 'fetch':
        break;
        default :
    };
}

export default {
    get:get
}