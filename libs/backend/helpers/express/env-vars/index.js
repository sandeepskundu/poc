const path = require('path');
const tokens = require('./tokens');

const set = async (appConfig) => {
    let helpers = process.helpers();
    let confDir = helpers.json.val(appConfig, 'appConfig.configDir', 'configs');
    let envs = {
        local:true,
        runtime:true
    }

    process.nodeModules('dotenv').config({
        override:true,
        path: path.resolve(process.cwd(), `./${confDir}/envs/.env`)
    });

    for(const a in envs){
        if(envs[a]){
            process.nodeModules('dotenv').config({
                override:true,
                path: path.resolve(process.cwd(), `./${confDir}/envs/.${a}.env`)
            });
        }
    }
}

exports.set = set;
exports.tokens = tokens;