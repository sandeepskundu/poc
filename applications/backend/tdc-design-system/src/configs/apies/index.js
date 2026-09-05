module.exports = {
    //'/theme/colors/v1/base/create':require('./theme_colors_v1_base_create'),
    //'/theme/colors/v1/base/update':''
    //'designSystem/colors/v1/base/create':require('./designSystem_colors_v1_base_create'),
    'designSystem/theme/v1/color/create':require('./designSystem_theme_v1_color_create'),
    'designSystem/theme/v1/color/update':require('./designSystem_theme_v1_color_update'),
    'designSystem/theme/v1/getByHashId/fetch':require('./designSystem_theme_v1_getByHashId_fetch'),
    'designSystem/theme/v1/getByDsHashId/fetch':require('./designSystem_theme_v1_getByDsHashId_fetch'),

    'designSystem/details/v1/info/fetch':require('./designSystem_details_v1_info_fetch'),
    'designSystem/details/v1/info/create':require('./designSystem_details_v1_info_create'),
    'designSystem/details/v1/getByHashId/fetch':require('./designSystem_details_v1_getByHashId_fetch'),
}