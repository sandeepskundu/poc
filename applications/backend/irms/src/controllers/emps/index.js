const helpers = process.uiHelpers();
const controllers = process.aioBeLibs('helpers/_private/auth/controllers');

const extend = {
     'login.v1.fpwd.create':true,
     'login.v1.cpwd.create':true,
     'login.v1.logout.fetch':true,
     'login.v1.access.fetch':true,
     'login.v1.details.fetch':true,
     'login.v1.verify.create':true,
     'login.v1.session.create':true,
     'account.v1.password.create':true,
     'account.v1.username.create':true
}

module.exports = (() => {
     let rval = {
          account:require('./account')
     };
     let common = controllers.compile();

     for(const a in extend){
          if(extend[a]){
               let val = helpers.json.val(common, a);
               let isfun = helpers.data.type.is(val, 'function');

               if(isfun){
                    rval = helpers.json.set(rval, a, val);
               }
          }
     };

     return rval;
})()