import accessRoleCreateRoot from './access-role-create-root';
import accessRoleCreateChild from './access-role-create-child';
import accessRoleCreateInfo from './access-role-create-info';
import accessRoleUpdateInfo from './access-role-update-info';

import apiPresetCreateRoot from './api-preset-create-root';
import apiPresetCreateChild from './api-preset-create-child';
import apiPresetUpdateChild from './api-preset-update-child';
import apiPresetCreateInfo from './api-preset-create-info';
import apiPresetUpdateInfo from './api-preset-update-info';

import apiPresetCreateInfoLinkedByRoleOrDepart from './api-preset-create-info-linke-by-role-or-department';
import apiPresetUpdateInfoLinkedByRoleOrDepart from './api-preset-update-info-linke-by-role-or-department';

import apiLinkedPresetCreate from './api-linked-preset-create';
import apiLinkedPresetUpdate from './api-linked-preset-update';

import createMap from './create-map';
import updateMap from './update-map';

export default {
    createMap:createMap,
    updateMap:updateMap,

    apiPresetCreateInfo:apiPresetCreateInfo,
    apiPresetCreateRoot:apiPresetCreateRoot,
    apiPresetUpdateInfo:apiPresetUpdateInfo,
    apiPresetCreateChild:apiPresetCreateChild,
    apiPresetUpdateChild:apiPresetUpdateChild,

    accessRoleCreateInfo:accessRoleCreateInfo,
    accessRoleUpdateInfo:accessRoleUpdateInfo,
    accessRoleCreateRoot:accessRoleCreateRoot,
    accessRoleCreateChild:accessRoleCreateChild,
    apiPresetUpdateInfoLinkedByRoleOrDepart:apiPresetUpdateInfoLinkedByRoleOrDepart,
    apiPresetCreateInfoLinkedByRoleOrDepart:apiPresetCreateInfoLinkedByRoleOrDepart,

    apiLinkedPresetCreate:apiLinkedPresetCreate,
    apiLinkedPresetUpdate:apiLinkedPresetUpdate
}