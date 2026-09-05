module.exports = {
    1:{
        type:"any",
        defaultValue:"",
        description:"Content can have any option like, string, function and JSX element",
    },

    2:{
        type:'nested',
        ___:{
            nested:{
                name:{
                    type:'string',
                    dvalue:'Sandeep'
                },
                more:{
                    type:"nested",
                     ___:{
                        nested:{
                            mn:{
                                type:'string',
                                dvalue:'Sandeep'
                            },
                            ln:{
                                type:"string",
                                dvalue:'Kundu'
                            }
                        }
                    }
                }
            }
        }
    },

    3:{
        type:"enum",
        description:"Content can have any option like, string, function and JSX element",
        ___:{
            value:'',
            enum:{
                options:"",
                mapping:"",
            }
        }
    }
}