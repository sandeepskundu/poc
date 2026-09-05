exports.db = {
    'COUNTER_INDEX_COLLECTION_NAME':"Icounter"
}

exports.rateLimit = {
    'RATE_LIMIT_COLLECTION_NAME':"RateLimit"
}

exports.token = {
    INTERNAL_API:{
        EXPIRY_TIME:'10M',
        HEADER_NAME:'internal-token',
        ENCRYPTION_SALT:"68aaf3fa142aadaf35b5b758"
    }
}

exports.otp = {
    "MODEL_CONFIGS":{
        "COMMON":{
            "response": {
                "exclude": {
                    "enable":true,
                    "kies":{
                        "ts":true,
                        "otps":true,
                        "mapId":true,
                        "status":true,
                        "created":true,
                        "channels":true,
                        "resendAt":true,
                        "validTill":true,
                        "recipients":true,
                    }
                }
            }
        }
    },
    "COOKIE_NAME":"otpToken",
    "ENCRYPTION_SALT":"OTPKEYAIOFOUNDATIONOTPKEY",
    "OTP_COLLECTION_NAME":"Otps",
    "OTP_ALLOWED_CHANNELS":["sms", "email", "appOtp", "whatsapp"],
    "RESPONSE":{
        "ERRORS":{
            "CREATE":{
                code:'OTP_CREATION_ERROR',
                description:''
            }
        },
        'OTP_METADATA_IS_AVAILABLE':{
            valid:true,
            error:null,
            status:{
                code:200,
                message:"",
                rcode:'OTP_METADATA_IS_AVAILABLE'
            },
        },
        'OTP_METADATA_NOT_AVAILABLE':{
            valid:false,
            status:{
                code:400,
                message:"",
                rcode:'OTP_METADATA_NOT_AVAILABLE'
            },
            error:{
                code:'INVALID_REQ_DATA',
                rcode:'OTP_METADATA_NOT_AVAILABLE',
                message:'OTP metadata is not available at the moment. Please request a new OTP or try again',
            }
        },
        "OTP_TOKEN_INVALID":{
            valid:false,
            status:{
                code:400,
                message:"",
                rcode:'OTP_TOKEN_INVALID'
            },
            error:{
                code:'INVALID_REQ_DATA',
                rcode:'OTP_TOKEN_INVALID',
                message:'Invalid OTP token. Please check and try again.',
            }
        },
        "OTP_INVALID":{
            valid:false,
            status:{
                code:400,
                rcode:'OTP_INVALID',
                message:"",
            },
            error:{
                code:'INVALID_REQ_DATA',
                rcode:'OTP_INVALID',
                message:'The OTP entered is invalid. Please check and try again.',
            }
        },
        "OTP_EXPIRED":{
            valid:false,
            status:{
                code:400,
                rcode:'OTP_EXPIRED',
                message:"",
            },
            error:{
                code:'INVALID_REQ_DATA',
                rcode:'OTP_EXPIRED',
                message:'This OTP is no longer valid. Please request a fresh OTP and try again.',
            }
        },
        "OTP_PARTIALLY_VERIFIED":{
            valid:false,
            status:{
                code:400,
                message:"",
            },
            error:{
                code:'INVALID_REQ_DATA',
                rcode:'OTP_PARTIALLY_VERIFIED',
                message:'OTP is partially verified.',
            }
        },
        "OTP_CANNOT_RESEND_TILL_TIME":{
            valid:false,
            status:{
                code:400,
                message:"",
            },
            error:{
                code:'INVALID_REQ_DATA',
                rcode:'OTP_CANNOT_RESEND_TILL_TIME',
                message:'An OTP is already on its way. Please wait a moment and try again.',
            }
        }
    },
    "DEFAULT_SEND_CONFGIS":{
        data:{},
        _recipients:{
            email:"sandeepskundu@gmail.com",
            mobile:{
                isd:'91',
                iso2:'IN',
                iso3:'IND',
                number:'8826401930'
            }
        },
        configs:{
            common:false,
            resend:600, // seconds
            expiry:300, // seconds
            channels:{
                "sms":{
                    "enable":false,
                    "template":{
                        "id":""
                    }
                },
                "email":{
                    "enable":false,
                    "template":{
                        "id":""
                    }
                },
                //"appOtp":{},
                "whatsapp":{
                    "enable":false,
                    "template":{
                        "id":""
                    }
                }
            }
        }
    },
    "RATE_LIMIT":{
        "API":{
            hash:null,
            postBlockThreshold:7,
            blockWindows:[15, 30, 45, 60, 120, 240, 480, 720, 1080],
            limit:{
                window:15,
                maxRequests:1500
            },
            quota:{
                limit:100,
                timeDurations:1440
            },
            includeInHash:{
                0:{
                    map:'id',
                    from:'params',
                }
            }
        },
        "OTP":{
            postBlockThreshold:5,
            blockWindows:[60, 120, 240, 480, 720, 1080],
            limit:{
                window:60,
                maxRequests:500
            },
            quota:{
                limit:50,
                timeDurations:1440
            },
            includeInHash:{
                params:{
                    id:true,
                },
                query:{
                    
                }
            }
        }
    }
}