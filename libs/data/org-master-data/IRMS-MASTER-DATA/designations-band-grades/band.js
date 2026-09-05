const band = (arg) => {
    return {...{
        "hasChilds":false,
        "isAccessControlled":true
    }, ...arg}
}


module.exports = {
    details:{
        "details": {
            "value": "BAND"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Band",
        "description":"Band in Designations – A band is a classification system used to group designations based on hierarchy, responsibility, experience, and compensation levels. Bands help standardize roles across departments, define reporting structures, determine salary ranges, and support career progression planning. Each band typically corresponds to a set of responsibilities and decision-making authority, making it easier to manage promotions, performance reviews, and talent planning.",
    },
    childs:{
        0:band({
            "details": {
                "value": "DEXE"
            },
            "name":"Deputy Executives",
            "description":"Deputy Executives",
        }),
        1:band({
            "details": {
                "value": "PRES"
            },
            "name":"President",
            "description":"President",
        }),
        2:band({
            "details": {
                "value": "DIREC"
            },
            "name":"Director",
            "description":"Director",
        }),
        3:band({
            "details": {
                "value": "MGR"
            },
            "name":"Managerial",
            "description":"Managerial",
        }),
        4:band({
            "details": {
                "value": "LEAD"
            },
            "name":"Lead",
            "description":"Lead",
        }),
        5:band({
            "details": {
                "value": "SR"
            },
            "name":"Senior",
            "description":"Senior",
        }),
        6:band({
            "details": {
                "value": "IC"
            },
            "name":"Individual Contributors",
            "description":"Individual Contributors",
        })
    }
}