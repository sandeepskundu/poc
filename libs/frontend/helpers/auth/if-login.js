const uHelpers = require('./../url');
const details = require('./details');

const redirectToRoute = (rmap, sprops) => {
    const ad = details.get(sprops);

    if(ad.login === 1){
        uHelpers.route.redirect(rmap);
    }
}

exports.redirectToRoute = redirectToRoute;