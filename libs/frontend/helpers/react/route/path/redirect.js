const get = require('./get');

const toPage = (page, arg, sprops) => {
    const u = get.pagePath(page, arg, sprops);
}

exports.toPage = toPage;