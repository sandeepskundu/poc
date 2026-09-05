const band = (arg) => {
    return {...{
        "hasChilds":false,
        "isAccessControlled":true
    }, ...arg}
}


module.exports = {
    details:{
        "details": {
            "value": "GRAD"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Grades",
        "description":"Designations grades",
    },
    childs:{
        0:band({
            "details": {
                "value": "A1"
            },
            "name":"Grade A1",
            "description":"Grade A1",
        }),
        1:band({
            "details": {
                "value": "A2"
            },
            "name":"Grade A2",
            "description":"Grade A2",
        }),
        2:band({
            "details": {
                "value": "A3"
            },
            "name":"Grade A3",
            "description":"Grade A3",
        }),
        3:band({
            "details": {
                "value": "A4"
            },
            "name":"Grade A4",
            "description":"Grade A4",
        }),
        4:band({
            "details": {
                "value": "B1"
            },
            "name":"Grade B1",
            "description":"Grade B1",
        }),
        5:band({
            "details": {
                "value": "B2"
            },
            "name":"Grade B2",
            "description":"Grade B2",
        }),
        6:band({
            "details": {
                "value": "B3"
            },
            "name":"Grade B3",
            "description":"Grade B3",
        }),
        7:band({
            "details": {
                "value": "B4"
            },
            "name":"Grade B4",
            "description":"Grade B4",
        }),
        8:band({
            "details": {
                "value": "C1"
            },
            "name":"Grade C1",
            "description":"Grade C1",
        }),
        9:band({
            "details": {
                "value": "C2"
            },
            "name":"Grade C2",
            "description":"Grade C2",
        }),
        10:band({
            "details": {
                "value": "C3"
            },
            "name":"Grade C3",
            "description":"Grade C3",
        }),
        11:band({
            "details": {
                "value": "C4"
            },
            "name":"Grade C4",
            "description":"Grade C4",
        }),
        12:band({
            "details": {
                "value": "C5"
            },
            "name":"Grade C5",
            "description":"Grade C5",
        }),
        13:band({
            "details": {
                "value": "D1"
            },
            "name":"Grade D1",
            "description":"Grade D1",
        }),
        14:band({
            "details": {
                "value": "D2"
            },
            "name":"Grade D2",
            "description":"Grade D2",
        }),
        15:band({
            "details": {
                "value": "D3"
            },
            "name":"Grade D3",
            "description":"Grade D3",
        }),
        16:band({
            "details": {
                "value": "E1"
            },
            "name":"Grade E1",
            "description":"Grade E1",
        }),
        17:band({
            "details": {
                "value": "E2"
            },
            "name":"Grade E2",
            "description":"Grade E2",
        }),
        18:band({
            "details": {
                "value": "E3"
            },
            "name":"Grade E3",
            "description":"Grade E3",
        }),
        19:band({
            "details": {
                "value": "F1"
            },
            "name":"Grade F1",
            "description":"Grade F1",
        })
    }
}