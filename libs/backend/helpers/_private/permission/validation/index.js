const orders = ['user'];
const data = require('./data');
const access = require('./access');
const response = require('./response');
const collection = require('./collection');
const builder = require('./../builder');

const map = {
    user:require('./user')
}


const configs = {
    enable:true,
    config:{
        user:{ // ==> 1
            shouldBe:'INTERNAL', // INTERNAL | PUBLIC | MARCHENT
            authShouldBe:'LOGIN', // LOGIN | TOKENIZED | 
        },
        collection:{ // => 2
            operations:{
                fetch:{},
                update:{},
                create:{},
                remove:{}
            }
        },
        access:{ // => 3
            enable:true,
            type:'ROLEBASE', // PUBLIC | ROLEBASE
            configs:{
                "5f6e612f026bd011dff6d9b5329abf4fs":1
            }
        }
    }
}

const start = async (config, req, res, next) => {
    let vconfig = configs;
    //await builder.init(req, '694a53d47f1f599aa678df87');

    return await response.valid(req, res, next);

    if(vconfig.enable){
        let rval = await response.valid(req, res, next);

        for(let a in orders){
            let name = orders[a]

            if(map[name] && map[name].start){
                rval = await map[name].start(vconfig, req, res, next)
            }

            if(!rval.valid){
                break;
            }
        }

        if(rval.valid){
            rval = await collection.start(vconfig, req, res, next);
        }

        if(rval.valid || !rval.valid){
            rval = await access.start(vconfig, req, res, next);
        }

        return rval;
    }else{
        return await response.invalid(req, 'PERMISSION_NOT_GRANTED')
    }
}

exports.data = data;
exports.start = start;
