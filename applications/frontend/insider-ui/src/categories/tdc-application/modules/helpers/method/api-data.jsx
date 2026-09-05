import helpers from 'ui-helpers';

const appId = (arg) => {
    return helpers.json.val(arg, 'appId', helpers.json.val(_siteProps_, 'router.params.appId', ''))
}

const parentId = (arg) => {
    return helpers.json.val(arg, 'parentId', helpers.json.val(_siteProps_, 'router.params.parentId', ''))   
}

const transform = (arg) => {
    return {
        type:'method',
        appId:appId(arg),
        parentId:parentId(arg),
        id:helpers.json.val(arg, 'vd.id', ''),
        dbId:helpers.json.val(arg, 'dbId', ''),
        model:helpers.json.val(arg, 'model', {}),
        signature:helpers.json.val(arg, 'signature', {}),
        validation:helpers.json.val(arg, 'validation', {}),
        collection:helpers.json.val(arg, 'collection', {}),
        name:helpers.json.val(arg, 'method.details.name', ''),
    }
}

export default {
    transform:transform
}