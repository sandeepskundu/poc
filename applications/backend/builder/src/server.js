require('dotenv').config();
require('module-alias/register');
const express = require('express');
const { xss } = require('express-xss-sanitizer');
const cors = require('cors');
const path = require('path');
const app = express();
const utils = require('./utils');
const routes = require('./routes');
const helpers = require('helpers');
const controllers = require('controllers');

//sandeepkundu28 / gbpZGFCnkbrCinRs
//mongodb+srv://sandeepkundu28:<db_password>@vkdb.xrcwo.mongodb.net/?retryWrites=true&w=majority&appName=vkdb

const getEnvProps = () => {
    return {
        MERCHANT_ID:helpers.json.val(process, 'env.MERCHANT_ID'),
        MERCHANT_USER_ID:helpers.json.val(process, 'env.MERCHANT_USER_ID'),
        MERCHANT_AUTH_TOKEN:helpers.json.val(process, 'env.MERCHANT_AUTH_TOKEN'),
        MERCHANT_SIGNATURE_TOKEN:helpers.json.val(process, 'env.MERCHANT_SIGNATURE_TOKEN'),
        MERCHANT_APP_ENVIRONMENT:helpers.json.val(process, 'env.MERCHANT_APP_ENVIRONMENT'),
    }
}

const init = async (arg) => {
    const envProps = getEnvProps();
    const start = async (config) => {
        const appConfig = {...{
            PORT:1000,
            APP_ENV:'local',
            NO_OF_INSTANCES:1,
        }, ...{config}}

        const parser = {
            body: require('body-parser'),
            cookie: require('cookie-parser'),
        };
        
        app.disable('x-powered-by');
        app.use(express.static('statics'));
        app.use(cors());
        app.use(xss());
        app.options('*', cors());
        app.use(parser.cookie());
        app.use(parser.body.json());
        app.use(parser.body.urlencoded());
        app.use(parser.body.urlencoded({ extended: true }));

        app.use((req, res, next) => {
            req.utils = utils;
            req.helpers = helpers;
            req.envProps = envProps;
            req.appConfig = appConfig;
            req.controllers = controllers;
            res.header('X-Frame-Options', 'SAMEORIGIN');
            res.header('X-Xss-Protection', '1; mode=block');
            res.header('X-Content-Type-Options', 'nosniff');
            res.header('Content-Security-Policy', "frame-ancestors 'self'");
            res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
            next();
        });

        app.use(`/:balancer?/${config.pathPrefix}`, routes);

        app.use((err, req, res, next) => {
            let query = req.query;
            let outReseponse = 'Something broke!';
            if (query.showerror) {
            outReseponse = err.stack;
            }
            res.status(500).send(outReseponse);
        });
        
        for (let a = 0; a < appConfig.NO_OF_INSTANCES; a++) {
            let current = (parseInt(appConfig.PORT)+parseInt(a));
                app.listen(current, () => {
                    console.log('Port:', current);
                    console.log('Env:', appConfig.APP_ENV);
                    console.log('Time:', new Date().toString());
                    console.log('Express server listening on %d, in %s mode', current, appConfig.APP_ENV);
                });
        } 
    }

    return await start(arg);
}

module.exports = init({
    pathPrefix:'builder',
})