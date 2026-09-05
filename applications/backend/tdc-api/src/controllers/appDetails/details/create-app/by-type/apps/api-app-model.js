module.exports = {
    "valuemap": {
        "_merchantId": {
            "valuemap": {
                "map": "id",
                "from": "merchant"
            }
        },
        "appConfig.appName": {
            "valuemap": {
                "map": "appName",
                "from": "body-item"
            }
        },
        "appConfig.category": {
            "valuemap": {
                "map": "category",
                "from": "body-item"
            }
        }
    },
    "query": {
        "hidden": {
            "enable": true,
            "configs": {
                "columns": {
                    "merchantId": {
                        "enable": true
                    }
                }
            }
        }
    },
    "schema": {
        "category": true,
        "appName": true,
        "appConfig.srcDir": true,
        "appConfig.buildDir": true,
        "appConfig.applicationType": true,
        "appConfig.scriptDir": true,
        "appConfig.appScriptsDir": true,
        "appConfig.staticsDir": true,
        "appConfig.compress": true,
        "appConfig.languages": true,
        "appConfig.appEnv": true,
        "appConfig.category": true,
        "appConfig.appName": true,
        "appConfig.ports.public": true,
        "appConfig.ports.partner": true,
        "appConfig.ports.internal": true,
        "appConfig.ports.scheduler": true,
        "appConfig.instances.public": true,
        "appConfig.instances.partner": true,
        "appConfig.instances.internal": true,
        "appConfig.instances.scheduler": true,
        "appConfig.appExposedIn.public": true,
        "appConfig.appExposedIn.partner": true,
        "appConfig.appExposedIn.internal": true,
        "appConfig.appExposedIn.scheduler": true,
        "packageJson.scripts": true,
        "packageJson.dependencies": true,
        "packageJson.devDependencies": true,
        "packageJson.license": true,
        "appInfo.author": true,
        "appInfo.version": true,
        "appInfo.description": true,
        "appInfo.appId": true,
        "hashId": true,
        "portHashId": true,
        "partnerPortHashId": true,
        "internalPortHashId": true,
        "schedulerPortHashId": true,
        "appConfig.dbConfigs.defaultCollections.merchant": true,
        "appConfig.dbConfigs.defaultCollections.apiSchema": true,
        "appConfig.dbConfigs.defaultCollections.collections": true,
        "appConfig.dbConfigs.defaultCollections.appDetails": true
    },
    "md5Hash": {
        "hashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.applicationType",
                    "from": "body-item"
                },
                "2": {
                    "map": "appName",
                    "from": "body-item"
                }
            }
        },
        "portHashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.ports.public",
                    "from": "body-item"
                }
            }
        },
        "internalPortHashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.ports.internal",
                    "from": "body-item"
                }
            }
        },
        "partnerPortHashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.ports.partner",
                    "from": "body-item"
                }
            }
        },
        "schedulerPortHashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.ports.scheduler",
                    "from": "body-item"
                }
            }
        }
    }
}