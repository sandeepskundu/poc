const valid = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');



/*----

{
        "message":{
            "error":{
                "checks":{
                    "regex":utils.regex.email.message,
                    "required":"Email id is required.",
                    "date":"Invalid date"
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.email.value
            },
            "required":{
                "value":"required"
            },
            __date:{
                value:{
                    valuemap:{
                        from:"body-item",
                        map:"adult"
                    },
                    to:'2025-08-11',
                    from:'2025-08-11'
                },
                range:{
                    datemap:{
                        from:"body-item",
                        map:"adult"
                    },
                    details:{
                        year:{
                            min:{
                                type:'minus'
                                count:20
                            },
                            max:{
                                type:'minus'
                                count:20
                            }
                        },
                        days:{
                            min:{
                                type:'minus'
                                count:20
                            },
                            max:{
                                type:'minus'
                                count:20
                            }
                        }
                    }
                }
            }
        }
    }

__date:{
                value:{
                    valuemap:{
                        from:"body-item",
                        map:"adult"
                    },
                    to:'2025-08-11',
                    from:'2025-08-11'
                }
            }



----*/

module.exports = async (req) => {
    return {
        "request":{
            "body":await validation.build(req, 'request.body.object'),
            "methods":{
                "post":await validation.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "body":{
                
                //"photo":false,
                //"dob":await validation.build(req, 'date.adult'),
                "name.first":await validation.build(req, 'name.fn'),
                "name.title":await validation.build(req, 'name.titles.adults'),
                "name.last":await validation.build(req, 'name.ln', valid.optional()),
                "name.middle":await validation.build(req, 'name.mn', valid.optional()),
                "country":await validation.build(req, 'country.iso3'),
                "mapId":await validation.build(req, 'universal.mongoId'),
                "marital":await validation.build(req, 'marital.status.default'),
                "gender":await validation.build(req, 'gender.types.default'),
            }
        }
    }
}