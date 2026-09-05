const merge = require('./merge');
const dtype = require('./../../../data');
const json = require('./../../../json');
const inital = require('./../../../inital');
const random = require('./../../../random');

const define = (sProps, dProps, helpers, extend) => {
    let rval = json.merge(sProps || {}, dProps || {});

    if((rval && rval.bindJsComponents === true) && React && React.useEffect){
        React.useEffect(() => {
            inital.components.bind(helpers);
        });
    };

    if(extend && dtype.type.is(extend, 'object')){
        return json.merge(rval, extend);
    }

    return rval;
}

const assign = (rval, props, map) => {

    /*--
        rval => return value object
        props => Props object
        map => map object of props to assign to assignee and fallback values.

        (rval, props, {
				'dsTheme.dropdown.content.color':{
					assignee:'boxWrapper.color',
					fallback:'sksk'
				},
				'dsTheme.dropdown.content.hcolor':'boxWrapper.hcolor',
				'dsTheme.dropdown.content.background':'boxWrapper.background',
				'dsTheme.dropdown.content.hbackground':'boxWrapper.hbackground'
			})
    ---*/


    let rv = rval || {};
    let dval = random.id(24);
    for(let a in map){
        let val = json.get(props, a, dval);
        let isObj = dtype.type.is(map[a], 'object');
        if(isObj){
            let assignee = json.get(map[a], 'assignee', '');

            if(assignee){
                let fb = json.get(map[a], 'fallback', '');

                if(fb && val === dval){
                    rv = json.set(rv, assignee, fb, false, true);
                }else{
                    if(val != dval){
                        rv = json.set(rv, assignee, val, false, true);
                    }
                }
            }
        }else{
            if(map[a] && val != dval){
                rv = json.set(rv, map[a], val, false, true);
            }
        }
    };

    return rv;
}

exports.merge = merge;
exports.define = define;
exports.assign = assign;