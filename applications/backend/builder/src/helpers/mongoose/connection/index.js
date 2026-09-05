const name = ['m', 'o', 'n', 'g', 'o', 'o', 's', 'e'].join('');
const mdb = require(name);

const init = async (appConfig, helpers) => {
    let conf = await helpers[name].token.decript(appConfig, helpers);
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

    if(cs){
      await mdb.connect(cs, {});
    }else{
      return false;
    }

    return mdb;

    

    


    /*--
    appConfig, helpers

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const sleep = async (fn, ...args) => {
        await timeout(3000);
        return fn(...args);
    }


    const blogSchema = new mongoose.Schema({
        title: {
            type: String,
            required:true
        },
        author: {
            type: String,
            default:'',
        },
        meta: {
          votes: Number,
          favs: Number,
          part:{
            type: String,
            required:true
          }
        }
      }, {
        timestamps:{
            createdAt:'created',
            updatedAt:'updated'
        },
        versionKey:false,
        virtuals: {
          'a.b': {
            get() {
              debugger;
              return `${this.meta.part} ${this.author}`;
            },
            set(v) {
              this.name.first = v.substr(0, v.indexOf(' '));
              this.name.last = v.substr(v.indexOf(' ') + 1);
            }
          }
        },
        id: true,
  toJSON: {
    virtuals:true,
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
    }
  }
      });

      debugger;

      const docu = mongoose.model('Test', blogSchema, 'kundu');
      const dv = new docu({ title: 'SandeepKundu', author:'sandy', meta:{votes:10, favs:10, part:'INLD'}, kundu:'slsksksks'});
      const dc = await docu.create(dv);
      const item = await docu.find({title:'SandeepKundu'}, 'meta author fullName');
      debugger;
          console.log(item);
     // const person = await item.exec();


      return item;


      let error = dv.validateSync();

      debugger;

      console.log(person);

      try {
        await dv.save();
      } catch (err) {
        error = err;
      }

      console.log(dv);
      console.log(error)

   
      console.log(blogSchema)

    const rv = await sleep(async (arg) => {
        debugger;

        const collections = await mongoose.connection.db.listCollections().toArray();
   console.log(collections)
        console.log(mongoose)
    });

    debugger;

    return rv;--*/
}

exports.init = init;