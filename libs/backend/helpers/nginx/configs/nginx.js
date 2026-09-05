const configs = `
#user  nobody;
worker_processes  1;

#error_log  /Library/Logs/nginx/error.log;

events {
    worker_connections  1024;
}

http {
    include mime.types;
    default_type  application/octet-stream;

    sendfile on;
    keepalive_timeout 65;

    index index.html index.php;
    root /Users/30057943/Documents/tools/nginx/html;

    __NGINX__LOGS__PLACEHOLDER__

    include ___NGINX__HTTP__UPSTREAM__DIR__/*.conf;
    include ___NGINX__HTTP__DEFAULT__CONFIG__DIR__/*.conf;
    include ___NGINX__HTTP__SITE__ENBLED__DIR__/*.conf; 
}`;

exports.rootConfigs = configs;