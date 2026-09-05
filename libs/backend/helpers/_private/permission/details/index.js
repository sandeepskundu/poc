const schema = {
    "GLOBAL":{
        "ORGANIZATION":{
            "GLOBAL_POLICY":{
                ACTIONS:{
                    fetch:true,
                    kundu:true,
                }
            },
            "GLOBAL_BENFIT":{
                ACTIONS:{
                    fetch:true
                }
            },
            "DOCUMENTS":{
                ACTIONS:{
                    fetch:true
                }
            },
            "COMMUNICATION":{
                ACTIONS:{
                    fetch:true
                }
            },
            "IT_SUPPORT":{
                ACTIONS:{
                    fetch:true
                }
            },
            "TRAINING":{
                ACTIONS:{
                    fetch:true
                }
            }
        },
        "EMPLOYEE_HUB":{
            "PERSONAL_INFORMATION":{
                ACTIONS:{
                    fetch:true
                }
            },
            "EMPLOYMENT_DETAILS":{
                ACTIONS:{
                    fetch:true
                }
            },
            "PAYROLL_DETAIL":{
                ACTIONS:{
                    fetch:true
                }
            },
            "WORK_SCHEDULE_ATTENDANCE":{
                ACTIONS:{
                    fetch:true
                }
            },
            "PERFORMANCE_AND_DEVELOPMENT":{
                ACTIONS:{
                    fetch:true
                }
            },
            "LEGAL_AND_COMPLIANCE":{
                ACTIONS:{
                    fetch:true
                }
            },
            "EMERGENCY_CONTACTS":{
                ACTIONS:{
                    fetch:true
                }
            },
            "COMPANY_ASSETS_AND_ACCESS":{
                ACTIONS:{
                    fetch:true
                }
            },
            "MISCELLANEOUS_NOTES":{
                ACTIONS:{
                    fetch:true
                }
            }
        }
    },
    "DEPARTMENT_BASE_ACCESS":{
        "GLOBAL":{
            "ORGANIZATION":{
                "TRAINING":{
                ACTIONS:{
                    update:true
                }
            }
            },
            "EMPLOYEE_HUB":{},
        }
    },
    "ROLE_BASE_ACCESS":{
        "GLOBAL":{
            "ORGANIZATION":{},
            "EMPLOYEE_HUB":{},
        }
    },
    "TEAM_BASE_ACCESS":{
       "GLOBAL":{
            "ORGANIZATION":{},
            "EMPLOYEE_HUB":{},
        }
    },
    "ASSIGNED_ACCESS":{
        "GLOBAL":{
            "ORGANIZATION":{},
            "EMPLOYEE_HUB":{},
        }
    }
}

const adata = require('./data');
const session = process.aioBeLibs('helpers/_private/session');

const userId = async (req, userId) => {
    if(userId && userId.length === 24){
        return userId;
    }else{
        let ad = await session.details(req);
        return ad.userId;
    }
}

const getFromDb = async (req, usrId) => {
    return await adata.init(req, await userId(req, usrId));
}


const get = async (req) => {
    let ad = await session.details(req);

    if(ad && ad.login === 1){
        return await getFromDb(req);
    }else{
        return null;
    }
}


exports.get = get;
exports.getFromDb = getFromDb;