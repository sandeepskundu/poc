const name = ['m', 'o', 'n', 'g', 'o', 'o', 's', 'e'].join('');
const mdb = process.nodeModules(name);

const init = async (appConfig, helpers) => {
    let conf = await helpers[name].token.decript(appConfig, helpers);

    //console.log(conf, 'SANDEPPEK KSKSK');

    let cs = helpers.json.val(conf, 'connection');

    /*--
    const timeout = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const sleep = async (fn, ...args) => {
        await timeout(3000);
        return fn(...args);
    }

    const rv = await sleep(async (arg) => {
      const collections = await mdb.connection.db.listCollections().toArray();
      //console.log(collections)
    }); --*/

    console.log(cs)

    //mdb.set('runValidators', true);

    if(cs){
      await mdb.connect(cs, {
        useUnifiedTopology: true,
      });
    }else{
      return false;
    }

    return mdb;
}

exports.init = init;