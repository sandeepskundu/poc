const express = require('express');
const router = express.Router({mergeParams:true});


const map = {
    'ds':require('./design-system'),
    'ds-enums':require('./ds-enums')
}

for(const a in map){
    console.log(map[a].action)
    if(map[a].action){
        router.use(`/${a}`, map[a].action);
    }
}

module.exports = router;