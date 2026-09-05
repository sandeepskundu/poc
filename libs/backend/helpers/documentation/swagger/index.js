const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});
const swaggerUi = process.nodeModules('swagger-ui-express');

router.use((req, res, next) => {
    next();
});

const map = {
    swagger:"2.0",
    info:{
        title:"Sample API",
        description:"API description in Markdown.",
        version:"1.0.0",
        host: "api.example.com",
        basePath:" /v1",
        schemes:"- https",
    },
    paths:{
        "/users/{userId}":{
            "post":{
                summary: "Returns a list of users",
                description: "Optional extended description in Markdown.",
                produces:"- application/json",
                consumes:'- application/json',
                parameters:[
                    {
                        "in":"path",
                        "name":"userId",
                        required:true,
                        "description":"userId is required params to get",
                        "schema":{
                            "description":"getBookList",
                            "type":"number"
                        }
                    }, {
                        "in":"query",
                        "name":"ksskskk",
                        "description":"userId is required params to get",
                        "schema":{
                            "description":"getBookList",
                            "type":"string"
                        }
                    }, {
                        "in":"body",
                        "name":"data",
                        "description":"userId is required params to get",
                        "schema":{
                            "description":"getBookList",
                            "type":"object",
                            "properties":{
                                "userName":{
                                   "type": 'string'
                                }
                            }
                        }
                    }
                ],
                responses:{
                    "200" : {
                        "description" : "Successful Response",
                        "schema" : {
                            "type":"object",
                            "properties":{
                                "userName":{
                                   "type": 'string'
                                }
                            }
                        }
                      }
                }
            }
        },
        
    }
}


router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(map));

module.exports = router;