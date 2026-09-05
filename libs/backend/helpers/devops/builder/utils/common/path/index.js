const path = require('path');
const helpers = process.helpers();
const configs = require('./../../configs');

/*--
    getProjectRootDirPath => Method will return root dir path of project dir. Like as below:
    Project Dir: 
        - AIO << this path will be retrun
            - applications
            - libs
--*/

const getProjectRootDirPath = () => {
    return path.resolve('./../../../');
}

/*--
    getProjectRootDirPath => Method will return root dir path of project dir. Like as below:
    Project Dir: 
        - AIO 
            - applications
            - libs
                - ui... << this path will be retrun
--*/

const getBeLibsDirPath = () => {
    return path.resolve(`./../../../libs/backend`);
}

const getUiLibsDirPath = () => {
    return path.resolve(`./../../../libs/frontend`);
}


/*--
    getProjectRootDirPath => Method will return root dir path of project dir. Like as below:
    Project Dir: 
        - AIO 
            - applications
            - libs
                - ui... << this path will be retrun
--*/

const getUiCompsLibsDirPath = (p) => {
    return path.resolve(`./../../../libs/frontend/${p}`);
}

/*--
    getApplicationsDirPath => Method will return path of application folder path from project dir. Like as below:
    Project Dir AIO:
        - AIO
            - applications << this path will be retrun
            - libs
--*/

const getApplicationsDirPath = () => {
    return path.join(getProjectRootDirPath(), (configs.applicationsDir || 'applications'));
}

/*--
    getApplicationsCategoryDirPath => Method will return path of application category folder path from project dir. Like as below:
    Project Dir AIO:
        - AIO
            - applications
                - fronend << this path will be retrun
                - backend 
            - libs
--*/

const getApplicationsCategoryDirPath = (cate) => {
    return path.join(getApplicationsDirPath(), cate);
}

/*--
    getApplicationsCategoryDirPath => Method will return path of application category folder path from project dir. Like as below:
    Project Dir AIO:
        - AIO
            - applications
                - fronend << this path will be retrun
                - backend 
            - libs
--*/

const getApplicationDirPath = (cate, appName) => {
    return path.join(getApplicationsCategoryDirPath(cate), appName);
}

exports.getUiLibsDirPath = getUiLibsDirPath;
exports.getBeLibsDirPath = getBeLibsDirPath;
exports.getUiCompsLibsDirPath = getUiCompsLibsDirPath;
exports.getApplicationDirPath = getApplicationDirPath;
exports.getProjectRootDirPath = getProjectRootDirPath;
exports.getApplicationsDirPath = getApplicationsDirPath;
exports.getApplicationsCategoryDirPath = getApplicationsCategoryDirPath;