export default {
    options:{
        boolean:{
            0:{
                'id':'true',
                'label':'True',
            },
            1:{
                'id':'false',
                'label':'False',
            },
        }
    },
    value:{
        kies:{
            0:{
                'id':'default',
                'label':'Default value',
            },
            1:{
                'id':'map',
                'label':'Map value from',
            },
            2:{
                'id':'fallback',
                'label':'Fallback value from',
            },
        },
        from:{
            options:{
                0:{
                    id:'props',
                    label:'Props'
                },
                1:{
                    id:'data',
                    label:'Data'
                },
                2:{
                    id:'query',
                    label:'Query'
                },
                3:{
                    id:'params',
                    label:'Params'
                },
                4:{
                    id:'body',
                    label:'Body'
                }
            }
        }
    },

}