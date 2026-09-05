const express = require('express');
const router = express.Router({mergeParams:true});

const getAppListByType = require('./getAppListByType');

const getMerchantDetails = require('./getMerchantDetails');
const getMerchantDetailsById = require('./getMerchantDetailsById');

const getMerchantAppEnvs = require('./getMerchantAppEnvs');
const getMerchantAppEnvsById = require('./getMerchantAppEnvsById');

const validateMerchantUser = require('./validateMerchantUser');
const validateMerchantUserById = require('./validateMerchantUserById');
const validateMerchantUserByIds = require('./validateMerchantUserByIds');

const getMechantAuthToken = require('./getMerchantAuthToken');

router.get(`/getAppListByType/:type`, getAppListByType.routeAction);
//router.get(`/getMerchantAppCategories`);

router.get(`/getMerchantDetails`, getMerchantDetails.routeAction);
router.get(`/getMerchantDetailsById/:merchantId`, getMerchantDetailsById.routeAction);

router.get(`/getMerchantAppEnvs`, getMerchantAppEnvs.routeAction);
router.get(`/getMerchantAppEnvsById/:merchantId`, getMerchantAppEnvsById.routeAction);

router.get(`/validateMerchantUser`, validateMerchantUser.routeAction);
router.get(`/validateMerchantUserById/:userId`, validateMerchantUserById.routeAction);
router.get(`/validateMerchantUserByIds/:merchantId/:userId`, validateMerchantUserByIds.routeAction);

router.get(`/getMechantAuthToken`, getMechantAuthToken.routeAction);




module.exports = router;