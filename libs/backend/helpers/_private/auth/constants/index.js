const uhelpers = process.aioUiLibs('helpers');

const response = (arg) => {
    return uhelpers.json.merge({
        valid:false,
        status:{
            code:400,
            message:"",
        }
    }, uhelpers.json.merge((arg || {}), {
        error:{
            code:'INVALID_REQ_DATA'
        }
    }))
}

const otpConfig = (arg) => {
    return uhelpers.json.merge({
        common:false,
        resend:60, // seconds
        expiry:600, // seconds
        channels:{
            //"appOtp":{},
            "sms":{
                "enable":true,
                "template":{
                    "id":""
                }
            },
            "email":{
                "enable":true,
                "template":{
                    "id":""
                }
            },
            "whatsapp":{
                "enable":false,
                "template":{
                    "id":""
                }
            }
        }
    }, (arg || {}));
}

const otpSchema = (arg) => {
    return uhelpers.json.merge({
        purpose:'REGISTER'
    }, (arg || {}))
}

const OTP_CONFIGS = {
    "ACCOUNT_LOGIN":otpConfig({}),
    "ADAPTIVE_LOGIN":otpConfig({}),
    "ACCOUNT_CREATE":otpConfig({})
}

const SCHEMA = {
    COMMON:otpSchema({}),
    ACCOUNT_CREATE:otpSchema({}),
    ACCOUNT_LOGIN:otpSchema({
        purpose:'LOGIN'
    }),
    ADAPTIVE_LOGIN:otpSchema({
        purpose:'ADAPTIVE_LOGIN'
    }),
    FORGOT_PASSWORD:otpSchema({
        purpose:'FORGOT_PASSWORD'
    })
}

const API_HASH = {
    "LOGIN_ACCOUNT":"ec55ff6853d5a821e50e83d6b7a624d9",
    "CREATE_ACCOUNT":"ec55ff6853d5a821e50e83d6b7a624d9",
    "ADAPTIVE_LOGIN":"ec55ff6853d5a821e50e83d6b7a624d9"
}

const ENCRIPTION_KEY = {
    "ACCOUNT_CREATE_ACCOUNT":'ec55ff6853d5a821e50e83d6b7a624d9',
    "ADAPTIVE_LOGIN_OTP_TOKEN_KEY":'ec55ff6853d5a821e50e83d6b7a624d9'
}

const RESPONSES = {
    "SUCESS":{
        "ACCOUNT_ENTER_PASSWORD_TO_LOGIN":{
            status:{
                code:200,
                rcode:"ACCOUNT_ENTER_PASSWORD_TO_LOGIN",
                message:'Please enter your password to continue.'
            }
        },

        "ACCOUNT_LOGOUT_SUCCESSFULLY":{
            status:{
                code:200,
                rcode:"ACCOUNT_LOGOUT_SUCCESSFULLY",
                message:'You have been successfully logged out of your account.'
            }
        },

        "ACCOUNT_USERNAME_UPDATED_SUCCESSFULLY":{
            status:{
                code:200,
                rcode:"ACCOUNT_USERNAME_UPDATED_SUCCESSFULLY",
                message:"Awesome! Your username is all set. You're ready to go!"
            }
        },

        "ACCOUNT_PASSWORD_UPDATED_SUCCESSFULLY":{
            status:{
                code:200,
                rcode:"ACCOUNT_PASSWORD_UPDATED_SUCCESSFULLY",
                message:"Your password was updated successfully. Please use your new credentials the next time you log in."
            }
        }
    },
    "ERRORS":{
        "ACCOUNT_ADAPTIVE_LOGIN_INVAILD_TOKEN":response({
            error:{
                code:'ACCOUNT_ADAPTIVE_LOGIN_INVAILD_TOKEN',
                rcode:'ACCOUNT_ADAPTIVE_LOGIN_INVAILD_TOKEN',
                message:"Oops! The token you provided is invalid or expired. Please double-check it and try again.",
            }
        }),
        "ACCOUNT_ADAPTIVE_LOGIN_UTILITY_INCORRECT_CONFIG":response({
            error:{
                code:'ACCOUNT_ADAPTIVE_LOGIN_UTILITY_INCORRECT_CONFIG',
                rcode:'ACCOUNT_ADAPTIVE_LOGIN_UTILITY_INCORRECT_CONFIG',
                message:"Oops! The adaptive login utility isn't configured according to the expected schema. Please check your setup and try again.",
            }
        }),
        "ACCOUNT_MOBILE_NUMBER_NOT_VALID":response({
            error:{
                code:'ACCOUNT_MOBILE_NUMBER_NOT_VALID',
                rcode:'ACCOUNT_MOBILE_NUMBER_NOT_VALID',
                message:"The mobile number you entered is not valid. Please check it and try again.",
            }
        }),
        "ACCOUNT_EMAIL_ADDRESS_NOT_VALID":response({
            error:{
                code:'ACCOUNT_EMAIL_ADDRESS_NOT_VALID',
                rcode:'ACCOUNT_EMAIL_ADDRESS_NOT_VALID',
                message:"The email address you entered is not valid. Please check it and try again.",
            }
        }),
        "ACCOUNT_EMAIL_NOT_LINKED_WITH_USERNAME":response({
            error:{
                code:'ACCOUNT_EMAIL_NOT_LINKED_WITH_USERNAME',
                rcode:'ACCOUNT_EMAIL_NOT_LINKED_WITH_USERNAME',
                message:"Email address is not linked to the provided username. Please verify your details and try again.",
            }
        }),
        "ACCOUNT_MOBILE_NOT_LINKED_WITH_USERNAME":response({
            error:{
                code:'ACCOUNT_MOBILE_NOT_LINKED_WITH_USERNAME',
                rcode:'ACCOUNT_MOBILE_NOT_LINKED_WITH_USERNAME',
                message:"Mobile number is not linked to the provided username. Please verify your details and try again.",
            }
        }),
        "ACCOUNT_LOGIN_INCORECT_PASSWORD":response({
            error:{
                code:'ACCOUNT_LOGIN_INCORECT_PASSWORD',
                rcode:'ACCOUNT_LOGIN_INCORECT_PASSWORD',
                message:"The password you entered is incorrect. Please try again or choose to log in with an OTP instead.",
            }
        }),
        "ACCOUNT_CONFIRM_PASSWORD_MISMATCH":response({
            error:{
                code:'ACCOUNT_CONFIRM_PASSWORD_MISMATCH',
                rcode:'ACCOUNT_CONFIRM_PASSWORD_MISMATCH',
                message:"Oops! Your passwords don’t match. Please check and try again.",
            }
        }),
        "ACCOUNT_USERNAME_NOT_AVAILABLE":response({
            error:{
                code:'ACCOUNT_USERNAME_NOT_AVAILABLE',
                rcode:'ACCOUNT_USERNAME_NOT_AVAILABLE',
                message:"Oops! That username is already in use. Try another one.",
            }
        }),
        "ACCOUNT_NOT_AUTHORIZED":response({
            error:{
                code:'ACCOUNT_NOT_AUTHORIZED',
                rcode:'ACCOUNT_NOT_AUTHORIZED',
                message:"You are not authorized to perform this action. Please log in and try again.",
            }
        }),
        "ACCOUNT_ALREADY_LOGGED_OUT":response({
            error:{
                code:'ACCOUNT_ALREADY_LOGGED_OUT',
                rcode:'ACCOUNT_ALREADY_LOGGED_OUT',
                message:"You are already logged out of your account.",
            }
        }),
        "ACCOUNT_SOMETHING_WENT_WRONG":response({
            error:{
                code:'ACCOUNT_SOMETHING_WENT_WRONG',
                rcode:'ACCOUNT_SOMETHING_WENT_WRONG',
                message:"Uh-oh! Something didn’t work as expected. Give it another try!",
            }
        }),

        "ACCOUNT_NOT_FOUND":response({
            error:{
                code:'ACCOUNT_NOT_FOUND',
                rcode:'ACCOUNT_NOT_FOUND',
                message:"Uh-oh! Something didn’t work as expected. Give it another try!",
            }
        }),
        "ACCOUNT_NOT_FOUND_BY_USERNAME":response({
            error:{
                code:'ACCOUNT_NOT_FOUND_BY_USERNAME',
                rcode:'ACCOUNT_NOT_FOUND_BY_USERNAME',
                message:"The provided username is not associated with any account. Please try a different username or register to continue.",
            }
        }),
        "ACCOUNT_NOT_FOUND_BY_MOBILE":response({
            error:{
                code:'ACCOUNT_NOT_FOUND_BY_MOBILE',
                rcode:'ACCOUNT_NOT_FOUND_BY_MOBILE',
                message:"The provided mobile number is not registered with us. Please try a different number or sign up to continue.",
            }
        }),
        "ACCOUNT_NOT_FOUND_BY_EMAIL":response({
            error:{
                code:'ACCOUNT_NOT_FOUND_BY_EMAIL',
                rcode:'ACCOUNT_NOT_FOUND_BY_EMAIL',
                message:"The provided email address is not registered with us. Please try a different email or sign up to continue.",
            }
        }),
        "USER_AUTHORISED_ALREADY":response({
            error:{
                code:'USER_AUTHORISED_ALREADY',
                rcode:'USER_AUTHORISED_ALREADY',
                message:"You're already authenticated and authorized.",
            }
        }),
        "ALREADY_REGISTERED":response({
            error:{
                code:'ACOOUNT_ALREADY_REGISTERED',
                rcode:'ACOOUNT_ALREADY_REGISTERED',
                message:'Both your email address and mobile number are already registered with us. Please try logging in instead of signing up.',
            }
        }),

        "ACOOUNT_EMAIL_AND_MOBILE_LINKED_WITH_OTHER_ACCOUNTS":response({
            error:{
                code:'ACOOUNT_EMAIL_AND_MOBILE_LINKED_WITH_OTHER_ACCOUNTS',
                rcode:'ACOOUNT_EMAIL_AND_MOBILE_LINKED_WITH_OTHER_ACCOUNTS',
                message:'Email address and mobile number you entered are already linked to existing accounts. Please try a different, unique combination or log in if you already have an account.',
            }
        }),

        "ACOOUNT_EMAIL_LINKED_WITH_OTHER_ACCOUNT":response({
            error:{
                code:'ACOOUNT_EMAIL_LINKED_WITH_OTHER_ACCOUNT',
                rcode:'ACOOUNT_EMAIL_LINKED_WITH_OTHER_ACCOUNT',
                message:'Email address you provided is already associated with another account. Please try a different email or try logging in instead.',
            }
        }),

        'ACOOUNT_MOBILE_LINKED_WITH_OTHER_ACCOUNT':response({
            error:{
                code:'ACOOUNT_MOBILE_LINKED_WITH_OTHER_ACCOUNT',
                rcode:'ACOOUNT_MOBILE_LINKED_WITH_OTHER_ACCOUNT',
                message:'Mobile number you provided is already associated with another account. Please try a different number or try logging in instead.',
            }
        }),

        'ACOOUNT_FORGOT_PASSWORD_INVALID_TRACK_ID':response({
            error:{
                code:'ACOOUNT_FORGOT_PASSWORD_INVALID_TRACK_ID',
                rcode:'ACOOUNT_FORGOT_PASSWORD_INVALID_TRACK_ID',
                message:'The password reset request is invalid or has expired. Please initiate a new password reset request.',
            }
        })
    }
}

exports.SCHEMA = SCHEMA;
exports.API_HASH = API_HASH;
exports.RESPONSES = RESPONSES;
exports.OTP_CONFIGS = OTP_CONFIGS;
exports.ENCRIPTION_KEY = ENCRIPTION_KEY;