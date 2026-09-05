const props = {
    compInfo:{
        "cmsDetails":{
            name:'Header'
        },
        "description":"Details description about component."
    },
    props:{
        ds:{
            "cmsDetails":{
                name:'Header'
            },
            description:"Details description about prop",
            type:'', //string|design-system|extended-design-system|object|boolean|function|jsx|enum|number
            required:false, // true|false
            value:{
                config:{

                },
                value:{
                    validation:{
                        config:{
                            "value":{
                                type:'string',
                                map:'', // Map mean from where to fetch data
                                schema:'' // Schema mean from where to fetch schem data
                            },
                            "valid":{
                                type:'boolean',
                                map:'', // Map mean from where to fetch data
                                schema:'' // Schema mean from where to fetch schem data
                            },
                            "error":{
                                type:'boolean',
                                map:'', // Map mean from where to fetch data
                                schema:'' // Schema mean from where to fetch schem data
                            },
                            "message":{
                                type:'string',
                                map:'', // Map mean from where to fetch data
                                schema:'' // Schema mean from where to fetch schem data
                            }
                        },
                        value:{
                            value:'',
                            valid:true,
                            error:false,
                            message:'',
                            validation:{
                                config:{
                                    "checks":{
                                        type:"object",
                                        map:'',
                                        schema:''
                                    }
                                },
                                value:{
                                    checks:{
                                        "regex":"",
                                        "enums":"",
                                        "minlength":0,
                                        "maxlength":1000,
                                        "required":""
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



export default props;