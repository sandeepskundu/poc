module.exports = {
    content:{
        type:"any",
        dvalue:"ku",
        description:"Content can have any option like, string, function and JSX element",
    },

    bool:{
        type:"boolean",
        dvalue:true
    },

    any:{
        type:"any",
        dvalue:"",
    },

    string:{
        type:'string',
        dvalue:""
    },

    number:{
        type:'number',
        dvalue:0
    },

    object:{
        type:'object',
        dvalue:{
            a:''
        }
    },

    function:{
        type:'function'
    },

    enum:{

    },

    jsx:{

    },

    nested:{
        type:'nested',
        ___:{
            nested:{
                name:{
                    type:'string',
                    dvalue:'Sandeep'
                },
                ln:{
                    type:"nested",
                     ___:{
                        nested:{
                            name:{
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

    compProp:{
        type:'compProps',
        ___:{
            compProps:{
                mapping:'components/atoms/0/kundu',
            }
        }
    },

    enum:{
        type:"enum",

        description:"Content can have any option like, string, function and JSX element",
        ___:{
            enum:{
                options:"",
                mapping:"",
            }
        }
    }
}