let count = 0;
const appMap = require('./map');
const envVars = require('./env-vars');
const firewall = require('./firewall');
const runtimeAppConfig = require('./app-config/runtime');

module.exports = async (config) => {
    const init = async (appConfig) => {
            envVars.set(appConfig);
        let helpers = process.helpers();
        let cors = process.nodeModules('cors');
        let express = process.nodeModules('express');
        let {xss} = process.nodeModules('express-xss-sanitizer');
        let mdbn = ['m', 'o', 'n', 'g', 'o', 'o', 's', 'e'].join('');
        let mdb = await helpers[mdbn].initialize(appConfig, helpers);
        let parser = {
            body:process.nodeModules('body-parser'),
            cookie:process.nodeModules('cookie-parser'),
        };

        const hygiene = await process.aioBeLibs('helpers/_private/hygiene');
        const session = await process.aioBeLibs('helpers/_private/session');
        const token = process.aioBeLibs('helpers/_private/token/internal-api');

        const corsOpts = {
            origin:true,
            exposedHeaders:['fwId', 'token'],
          };

        let app = express();
            app.use(xss());
            app.use(cors(corsOpts));
            //app.options('*', cors(corsOpts));
            app.use(parser.cookie());
            app.disable('x-powered-by');

            app.set('trust proxy', true);
            app.use(parser.body.json());
            app.use(express.static('statics'));
            app.use(parser.body.urlencoded({extended:true}));

            app.use(express.json({limit: '10kb' }));
            app.use(express.urlencoded({extended:true, limit: '10kb'}));
            app.use(express.text({ limit: '10kb' }));
            app.use(express.raw({ limit: '10kb' }));
            app = helpers.express.appConfig.parse(app, config);

            setInterval(() => {
                //const mem = process.memoryUsage();
               // console.log(`Heap Used: ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
            }, 5000);

            app.use(async (req, res, next) => {
                //count = count+1;
                //console.log(count, req.socket.localPort);

                req.mdb = mdb;
                req.runtime = {};
                req.helpers = helpers;
                req.enums = helpers.enums;
                req.appConfig = app.appConfig;
                req.appConfig = await runtimeAppConfig.parse(req, res, next);

                req.appConfig.appConfig.appEnv = 'local'

                req.getEnum = (arg, map) => {
                    return helpers.json.val(arg, `enums.${map}`);
                }

                firewall.validate(req, res, next);

                res.header('X-Frame-Options', 'SAMEORIGIN');
                res.header('X-Xss-Protection', '1; mode=block');
                res.header('X-Content-Type-Options', 'nosniff');
                res.header('Content-Security-Policy', "frame-ancestors 'self'");
                res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        
                if (req.path == '/core/.well-known/apple-app-site-association') {
                    res.header('Content-Type', 'application/json');
                }

                

                hygiene.req(req);
                await session.init(req, res, next);
                req.headers = await token.set(req.headers, req, {}); // This will be remove on later stage,

                /*--req.helpers.nginx.setup.siteEnabled.init({
                    appConfig:appConfig,
                    nginxConf:{
                        logs:{
                            enabled:true,
                            configs:{}
                        },
                        sites:{
                            enabled:true,
                            nginxDetails:{
                                ports:{
                                    20:true,
                                    80:true,
                                    443:true
                                },
                                isDefault:true,
                                isMobileSite:true,
                                host:'api.sample.com',
                            },
                            configs:{
                                server:{
                                    0:{
                                        "name":"map",
                                        "type":'object',
                                        "match":`$time_iso8601 $year`,
                                        "childs":{
                                            0:{
                                                name:`default`,
                                                match:`'0000'`
                                            }
                                        }
                                    }
                                },
                                apps:{
                                    0:{
                                        appConfig: {
                                            "applicationType": "ui",
                                            "inspectAt": 21,
                                            "category": "ui",
                                            "appName": "application-b-c-d",
                                            "port": 2300,
                                            "appExposedIn":{
                                                "public":true,
                                                "partner":true,
                                                "internal":true,
                                            },
                                            "instances":{
                                                "public":10,
                                                "partner":10,
                                                "internal":10
                                            },
                                            "ports":{
                                                "public":2000,
                                                "partner":2100,
                                                "internal":2200
                                            }
                                        },
                                        configs:{
                                            location:{
                                                base:{
                                                    childs:{
                                                        0:{
                                                            name:'kunud',
                                                            match:'sandeep'
                                                        }
                                                    }
                                                },
                                                childs:{
                                                    0:{
                                                        name:'kunud',
                                                        match:'sandeep'
                                                    }
                                                },
                                                proxy:{
                                                    0:`
                                                        location __APPEND__APP__ROOT__PATH__MATCH__/kundu/skske {
                                                            proxy_pass kundu
                                                        }
                                                    `
                                                }
                                            }
                                        }
                                    },
                                    1:{
                                        appConfig: {
                                            "applicationType": "ui",
                                            "inspectAt": 21,
                                            "category": "ui",
                                            "appName": "sandeep-kundu",
                                            "port": 2300,
                                            "appExposedIn":{
                                                "public":true,
                                                "partner":true,
                                                "internal":true,
                                            },
                                            "instances":{
                                                "public":10,
                                                "partner":10,
                                                "internal":10
                                            },
                                            "ports":{
                                                "public":2000,
                                                "partner":2100,
                                                "internal":2200
                                            }
                                        },
                                        configs:{
                                            server:{
                                                0:{
                                                    "name":"map",
                                                    "type":'object',
                                                    "match":`$time_iso8601 $year`,
                                                    "childs":{
                                                        0:{
                                                            name:`default`,
                                                            match:`'0000'`
                                                        }
                                                    }
                                                }
                                            },
                                            location:{
                                                base:{
                                                    childs:{
                                                        0:{
                                                            name:'kunud',
                                                            match:'sandeep'
                                                        }
                                                    }
                                                },
                                                childs:{
                                                    0:{
                                                        name:'kunud',
                                                        match:'sandeep'
                                                    }
                                                },
                                                proxy:{
                                                    0:`
                                                        location __APPEND__APP__ROOT__PATH__MATCH__/kundu/skske {
                                                            proxy_pass kundu
                                                        }
                                                    `
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, req, res, next);--*/

                /*--req.helpers.nginx.setup.root.init({
                    appConfig:appConfig,
                    nginxConf:{
                        logs:{
                            enabled:true,
                            configs:{}
                        },
                        sites:{
                            enabled:true,
                            config:{

                            }
                        }
                    }
                }, req, res, next);--*/
                next();
            });

            app = appMap(app, config);
            //app.use(['/', '*'], helpers.express.response.r404);

            app.use((err, req, res, next) => {
                console.error(err);
            });

            const runApp = (port, instances, mode) => {
                const APP_ENV = helpers.json.val(config, 'appConfig.appEnv');

                for (let a = 0; a < instances; a++) {
                    let current = (parseInt(port)+parseInt(a));
                        app.listen(current, () => {
                            console.log('Port:', current);
                            console.log('Env:', APP_ENV);
                            console.log('Mode', mode);
                            console.log('Time:', new Date().toString());
                            console.log('Express server listening on %d, in %s mode', current, APP_ENV);
                        });
                }
            }

            const modes = helpers.json.val(config, 'appConfig.appExposedIn');

            if(modes){
                for(const a in modes){
                    if(modes[a]){
                        const port = helpers.json.val(config, `appConfig.ports.${a}`);
                        const instance = helpers.json.val(config, `appConfig.instances.${a}`);

                        if(port && instance){
                            runApp(port, instance, a);
                        }
                    }
                }
            }else{
                const PORT = helpers.json.val(config, 'appConfig.PORT');
                const INSTANCES = helpers.json.val(config, 'appConfig.NO_OF_INSTANCES', 1);
                runApp(PORT, INSTANCES, 'normal')
            }

        return app;
    }

    return await init(config);
};