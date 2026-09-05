module.exports = {
    content:{
        type:"any",
        dvalue:"ku",
        description:"Content can have any option like, string, function and JSX element",
        ___:{
            required:true
        }
    },

    bool:{
        type:"boolean",
        dvalue:true,
        ___:{
            required:true
        }
    },

    any:{
        type:"any",
        dvalue:"",
        ___:{
            required:true
        }
    },

    string:{
        type:'string',
        dvalue:"",
        ___:{
            required:true
        }
    },

    number:{
        type:'number',
        dvalue:0,
        ___:{
            required:true
        }
    },

    object:{
        type:'object',
        dvalue:{
            a:''
        },
        ___:{
            required:true
        }
    },

    function:{
        type:'function',
        ___:{
            required:true
        }
    },

    jsx:{
        ___:{
            required:true
        }
    },

    nested:{
        type:'nested',
        ___:{
            required:true,
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
            required:true,
            compProps:{
                mapping:'components/atoms/0/kundu',
            }
        }
    },

    enum:{
        type:"enum",
        description:"Content can have any option like, string, function and JSX element",
        ___:{
            required:true,
            enum:{
                from:"statics",
                options:"",
                mapping:"global.color",
            }
        }
    }
}